## session 的配置
讲注册前要先把session配置弄明白了。  
session指得是服务端的会话信息，是根据前端的cookie信息生成得来的。koa中可以使用 `koa-generic-session` 来对浏览器的cookie和redis中的session进行操作。
```shell
npm i koa-generic-session --save
```

在根文件下注册使用：
```js
// app.js
const Koa = require('koa')
const app = new Koa()
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')

// session 配置
app.keys = ['UIsdf_7878#$'] // keys是对客户端的cookie值进行加密的。 
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 `koa.sid` 开头
  prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:` 开头
  cookie: {
    path: '/', //值得是生成的cookie在所有目录都能访问
    httpOnly: true, // 只能服务端修改，客户端不能修改。就是你盗用了一个用户的cookie，却不能在另一个浏览器获取信息。
    maxAge: 24 * 60 * 60 * 1000  // 单位 ms。cookie过期时间。其实这里还有一个默认做法，就是把 session 的过期时间也设置为一致的了。 
  },
  store: redisStore({ // 把session的信息存到redis数据库中
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))
```
## 注册
先想一想写有个注册接口我们要做什么？  
1. model里面写 schema，定义数据库内容格式。
2. 执行同步数据库函数操作，让mysql的表更新。
3. 定义路由和 control 业务层。
4. 接受参数时进行进行格式校验。
5. 把具体的报错模型和信息整合起来。
6. 密码加密。

### 1. 定义用户的 model/schema
```js
// db/model/User.js
const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: '性别（1 男性，2 女性，3 保密）'
    },
    picture: {
        type: STRING,
        comment: '头像，图片地址'
    },
    city: {
        type: STRING,
        comment: '城市'
    }
})

module.exports = User
```
`types` 是用于整合 Sequelize 数据类型的文件:
```js
// db/types.js
const Sequelize = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    BOOLEAN: Sequelize.BOOLEAN
}
```
新建一个 index.js 文件，用于整合 model。
```js
const User = require('./User')
module.exports = {
    User
}
```

### 2. 同步表模型数据
sync.js 文件上面写了，这里改良下，把职责分配下，连接数据库和更新数据分成两个文件。
```js
// db/seq.js
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')
const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
}
if (isTest) {
    conf.logging = () => {}
}
// 线上环境，使用连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池中最大的连接数量
        min: 0, // 最小
        idle: 10000  // 如果一个连接池 10 s 之内没有被使用，则释放
    }
}
const seq = new Sequelize(database, user, password, conf)
module.exports = seq
```
```js
// db/sync.js
const seq = require('./seq')
require('./model/index')
// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth err')
})
// 执行同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})
```
`node ./sync.js` 即可。

### 3. route 和 control
```js
// routes/user.js
const router = require('koa-router')()
const { register } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')

router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

module.exports = router
```
****** 
```js
// controller/user.js
const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1 男，2 女，3 保密）
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return ErrorModel(registerUserNameExistInfo)
    }

    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

module.exports = {
    register
}
```
> `genValidator(userValidate)` 检验参数的中间件和规则参数是自己定义的，报错的模型和具体的报错的信息也是自己定义的。

### 4. 自定义的参数校验
```js
// middlewares/validator.js
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
    // 定义中间件函数
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            // 验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        // 验证成功，继续
        await next()
    }
    // 返回中间件
    return validator
}
module.exports = {
    genValidator
}
```
具体的校验规格文件如下：
```js
// validator/use.js
const validate = require('./_validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
            maxLength: 255,
            minLength: 2
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        newPassword: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        nickName: {
            type: 'string',
            maxLength: 255
        },
        picture: {
            type: 'string',
            maxLength: 255
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        gender: {
            type: 'number',
            minimum: 1,
            maximum: 3
        }
    }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function userValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = userValidate
```
真正校验的方法是用 `ajv` 工具做的:
```js
// validator/_validator.js
const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true // 输出所有的错误（比较慢）
})

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate
```

### 5. 报错信息模型和信息
```js
// model/ResModel.js 包括了成功信息和错误信息的处理
/**
 * 基础模块
 */
class BaseModel {
    constructor({errno, data, message}) {
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({
            errno: 0,
            data
        })
    }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
    constructor({ errno, message }) {
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
```
报错的具体信息和状态码一个文件保管。
```js
// model/ErrorInfo.js
module.exports = {
    // 用户名已存在
    registerUserNameExistInfo: {
        errno: 10001,
        message: '用户名已存在'
    },
    // 注册失败
    registerFailInfo: {
        errno: 10002,
        message: '注册失败，请重试'
    },
    // 用户名不存在
    registerUserNameNotExistInfo: {
        errno: 10003,
        message: '用户名未存在'
    },
    // 登录失败
    loginFailInfo: {
        errno: 10004,
        message: '登录失败，用户名或密码错误'
    },
    // 未登录
    loginCheckFailInfo: {
        errno: 10005,
        message: '您尚未登录'
    },
    // 修改密码失败
    changePasswordFailInfo: {
        errno: 10006,
        message: '修改密码失败，请重试'
    },
    // 上传文件过大
    uploadFileSizeFailInfo: {
        errno: 10007,
        message: '上传文件尺寸过大'
    },
    // 修改基本信息失败
    changeInfoFailInfo: {
        errno: 10008,
        message: '修改基本信息失败'
    },
    // json schema 校验失败
    jsonSchemaFileInfo: {
        errno: 10009,
        message: '数据格式校验错误'
    },
    // 删除用户失败
    deleteUserFailInfo: {
        errno: 10010,
        message: '删除用户失败'
    },
    // 添加关注失败
    addFollowerFailInfo: {
        errno: 10011,
        message: '添加关注失败'
    },
    // 取消关注失败
    deleteFollowerFailInfo: {
        errno: 10012,
        message: '取消关注失败'
    },
    // 创建微博失败
    createBlogFailInfo: {
        errno: 11001,
        message: '创建微博失败，请重试'
    },
    // 删除微博失败
    deleteBlogFailInfo: {
        errno: 11002,
        message: '删除微博失败，请重试'
    }
}
```
> 这种信息报错机制吧，我觉得一般，不如知乎项目的那种通过http状态码处理来的舒服。

### 6. 密码加密
加密用的是node自带的 `crypto` 工具。
```js
// utils/cryp.js
const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * md5 加密
 * @param {string} content 明文
 */
function _md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 明文
 */
function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = doCrypto
```
秘钥样本如下：
```js
// conf/secretKeys.js
module.exports = {
    CRYPTO_SECRET_KEY: 'SD123ui_sd$@',
    SESSION_SECRET_KEY: 'UIsdf_7878#$'
}
```