<template>
  <div class="home-page">
    <main>
      <div class="couver" :class="{'left-show':isShow}">
      
      </div>
      <div class="info-box" :class="{'right-show':isShow}">
        <div class="position-trigon"></div>
        <div class="info">
          <ul>
            <li>你不知道的JS</li>
            <li>JS设计模式与实践</li>
            <li>跨平台听歌</li>
          </ul>
          <div class="contact-way">
            <div class="profile">
              <div class="profile-img"></div>
            </div>
            <div class="contact-info">
              <div >
                <span>wechat</span>
                <span>tsdhr1</span>
              </div>
              <div>
                <span>github</span>
                <span>dogdogbrother</span>
              </div>
              <div>
                <span>qq</span>
                <span>476410344</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
    <img src="../../../public/img/couver.png" alt="" @load="isShow=true" class="img-load">
  </div>
</template>

<script>
// import '../style/home.css'
import Vue from 'vue'

export default {
  data(){
    return{
      isShow: false
    }
  },
  methods:{
  }
}
</script>

<style>
@media screen and (min-width:900px){
.home-page{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.home-page main{
  width: 100%;
  height: 100%;
  display: flex;
}
.couver{
  flex: 1;
  height: 100%;
  left: -100vw;
  transition: 2s ease;
}
.info-box{
  width: 360px;
  box-sizing: border-box;
  padding: 40px 60px 28px 90px;
  position: relative;
  transition: 1.4s ease;
  right: -40vw;
}
.position-trigon{
  background-color: #fff;
  position: absolute;
  z-index: 10;
  top: -20px;
  left: -55px;
  width: 95px;
  height: 120%;
  transform:rotate(5deg);
}
.home-page li{
  font-size: 22px;
  line-height: 1.2;
  margin: 22px 0;
  cursor: pointer;
  font-weight: 550;
}
.home-page li:hover{
  color: #3eaf7c;
}
.info{
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.contact-way{
  position: relative;
  z-index: 20;
  margin-left: -60px;
  display: flex;
  justify-content: flex-start;
}
.contact-way div{
  text-align: center;
}
.contact-way span{
  margin-right: 5px;
  font-size: 14px;
  font-size: 1.4;
}
.profile{
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 24px;
}
.profile-img{
  width: 60px;
  height: 60px;
}
.left-show{
  left: 0;
}
.right-show{
  right: 0;
}
}
@media screen and (max-width:900px){
  .home-page main{
    height: 100vh;
  }
  .couver{
    height: 40vh;
    top: -40vh;
    transition: 1s ease;
  }
  .left-show{
    top: 0;
  }
  .info-box{
    height: 60vh;
    position: relative;
  }
  .info{
    height: 100%;
    box-sizing: border-box;
    padding: 50px 40px 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .info li{
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
  }
  .profile{
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 20px;
  }
  .contact-way{
    display: flex;
    font-size: 14px;
  }
}











.img-load{
  display: none;
}
.couver{
  background-image: url('../../../public/img/couver.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
}
.profile-img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: url('../../../public/img/profile.jpg');
  background-size: cover;
}
</style>