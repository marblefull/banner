# banner轮播图
## 轮播图主要功能
轮播图使我们很常见的的功能，基本上网站都会有，它主要分为以下几个部分：
1. 可以自动进行图片切换
2. 可以通过左右按钮进行图片的切换
3. 可以通过底部导航按钮进行图片的切换
4. 当鼠标进过时图片停止播放
5. 当鼠标离开时自动播放
## banner轮播图实现原理

![image](https://github.com/zhangxinmei/banner/raw/master/banner-img/img/b1.png)

轮播图利用的就是根据计算出计算偏移量来改变图片位置，从而实现图片的切换，再用定时器实现自动播放。但是在切换的过程中会发现当切换到最后一张，再要切换到第一张的时候会出现留白的现象，所以要实现无缝滚动查了资料，可以用上面的方法实现（图是自己做的，可能有些丑），就是在图片容器中复制最后一张图片放在第一张图片前面，复制第一张图片放在最后一张图片后面。这样在切换的时候就可以通过这个假象实现无缝滚动。


### 1. DOM结构的设计
* 首先要布局好DOM结构，我们主要有三部分：图片区域部分、底部导航按钮区域、左右按钮区域。

```html
<div id="banner">
        <!-- 图片部分 -->
        <div class="banner-img">
            <div class="img-item">
                <img src="./img/p4.jpg" alt="">
            </div>
            <div class="img-item">
                <img src="./img/p1.jpg" alt="">
            </div>
            <div class="img-item">
                <img src="./img/p2.jpg" alt="">
            </div>
            <div class="img-item">
                <img src="./img/p3.jpg" alt="">
            </div>
            <div class="img-item">
                <img src="./img/p4.jpg" alt="">
            </div>
            <div class="img-item">
                <img src="./img/p1.jpg" alt="">
            </div>
        </div>
        <!-- 底部按钮部分 -->
        <div class="banner-tabs">
            <span class="active" index="0"></span>
            <span index="1"></span>
            <span index="2"></span>
            <span index="3"></span>
        </div>
        <!-- 左右按钮 -->
        <div class="btn prev animated fadeInLeft"></div>
        <div class="btn next animated fadeInRight"></div>
    </div>
```
* 然后进行布局，主要要让图片容器部分只显示第一张图片，其他部分隐藏，就要设置banner部分的overflow为hidden，再使用绝对定位对图片区域进行定位，使用浮动让图片在一行显示。
```css
#banner {
  position: relative;
  width: 1200px;
  height: 320px;
  margin: 0 auto;
  overflow: hidden;
 
}
#banner .banner-img {
  position: absolute;
  left:-1200px;
  top: 0;
  width: 600%;
  height: 100%;
 
}
#banner .banner-img .img-item {
  width: 1200px;
  height: 100%;
  float: left;
}
#banner .banner-tabs {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
}
#banner .banner-tabs span {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: #999;
  border-radius: 50%;
  cursor: pointer;
}
#banner .banner-tabs span:hover {
  background: #10c55b;
}
#banner .banner-tabs .active {
  background: #10c55b;
}
#banner .btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 70px;
  border-radius: 3px;
  cursor: pointer;
  z-index: 1;
}
#banner .prev {
  left: 5px;
  background: url(//icon.51yuansu.com/component/index/img/index-banner-al.png) center no-repeat;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
}
#banner .next {
  right: 5px;
  background: url(//icon.51yuansu.com/component/index/img/index-banner-ar.png) center no-repeat;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
}
#banner:hover .animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%,-50%,0);
  }
  to {
    opacity: 1;
    transform: translate3d(0,-50%,0);
  }
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%,-50%,0);
  }
  to {
    opacity: 1;
    transform: translate3d(0,-50%,0);
  }
}
#banner:hover .fadeInLeft {
  animation-name: fadeInLeft;
}
@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%,-50%,0);
  }
  to {
    opacity: 1;
    transform: translate3d(0,-50%,0);
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%,-50%,0);
  }
  to {
    opacity: 1;
    transform: translate3d(0,-50%,0);
  }
}
#banner:hover .fadeInRight {
  animation-name: fadeInRight;
}

```
