# 爬虫小案例
用原生python爬,不用框架不用登陆不用验证的小案例.

```python
import re

from urllib import request

class Spider():
    url = 'https://www.douyu....'
    root_pattern = '<div class="video-info">[\s\S]*?</div>'

    def _fetch_content(selt):
        r = request.urlopen(Spider.url)
        htmls = r.read()
        htmls = str(htmls, encoding='utf-8')
        return htmls

    def _analysis(self, htnls):
        root_html = re.findall(Spider.root_pattern, htmls)

    
    def go(self):
        htmls = self.__fetch_content()
        self._analysis(htmls)

spider = Spider()
spider.go()
```
>没写完,不打算写了,找下网上的资源复制下把,跟着视频写太累了.