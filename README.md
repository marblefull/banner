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
### 2. 图片左右滑动
要实现图片左右滑动就要计算出滑动的距离，通过设置图片区域的位置，来控制显示哪一张图片。具体思路见下面的描述，可能语言表达的有一些不清晰，还望见谅。

```js
    // offset为图片每次应该滑动的距离
    // imgWidth为图片容器的宽度
    // len为图片的张数
    function slideImg(offset, imgWidth, len) {
        var realLeft = parseInt(bannerImg.style.left) + offset // 当前图片区域真正的left值
        bannerImg.style.left = realLeft + "px"; // 设置图片区域的left值
        if (realLeft > -imgWidth) { // 如果当前图片区域left值大于第一张图片显示的left值，也就是这时候已经切换到第一张还要往左
            bannerImg.style.left = -imgWidth * len + "px" // 那么这时候应该显示最后一张
        }
        if (realLeft < -imgWidth * len) { // 如果当前图片区域left值小于最后一张图片显示的left值，也就是这时候已经切换到最后一张还                                           // 要往右
            bannerImg.style.left = -imgWidth + "px" // 那么这时候应该显示第一张
        }
    }
```
### 3.左右按钮点击事件
左右按钮点击主要是根据上面的滑动函数，如果是往右点，那么就是offset的值就应该是每张图片大小的赋值；如果是往左点offset的值就应该是每张图片大小。我们还需要设置一个index值来表示图片的索引，即当前图片是第几张。

还有就是要注意临界的问题，就是当且换到了第4张的时候，这时候应该让index的值变成第一张的索引值，即初始值0；反之如果切换到第一张index就要变成最后一张图片的索引。

```js
 // 左右按钮点击事件
    var banner = document.getElementById("banner");
    var bannerImg = document.querySelector(".banner-img");
    var bannerTabs = document.querySelectorAll(".banner-tabs span");
    var prev = document.querySelector(".prev");
    var next = document.querySelector(".next");
    // index为每次滑动图片的索引
    var index = 0;
    // 定义计时器
    var timer;
    banner.addEventListener("click", function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target == next) {
            index++;
            if (index > bannerTabs.length-1) {
                index = 0;
            }
            addCtiveClass();
            slideImg(-1200, 1200, 4);
        }
        if (target == prev) {
            index--;
            if (index < 0) {
                index = bannerTabs.length-1;
            }
            addCtiveClass();
            slideImg(1200, 1200, 4);
        }
    });
```
### 3.底部按钮功能实现

底部按钮有分成两部分：

* #### 切换图片时对应选中样式
也就是通过索引值index得到当亲是那张图片，在将对应的按钮加上选中时的样式,每次先清空底部按钮的选中类，再给当前项加上样式
```js
  function addCtiveClass() {
        bannerTabs.forEach(function (currentValue, key, array) {
            // 先清空选中的类
            currentValue.className = '';
        }, this)
        // 当前项添加选中样式
        bannerTabs[index].className = "active";
    }
```
* #### 按钮点击事件
点击按钮时除了要执行上面的内容外，还要实现点击按钮时显示对应的图片。因为显示哪张图片是通过偏移量来实现的，那么我们就要算出这个偏移量offset。offset的值就是当前点击按钮也就意味着我要显示哪一张图片，减去当前显示的图片的索引，在乘以每张图片单位内的偏移量就可以了。
```js
 // 底部按钮点击事件
    bannerTabs.forEach(function (currentValue, key, array) {
        currentValue.addEventListener("click", function () {
            {
                if (currentValue.className == 'active') {  //如果点击的按钮就是当前项，则不执行下面内容
                    return;
                }
                var offset = parseInt((key - index) * (-1200));
                slideImg(offset, 1200, 4);
                index = key;  // 显示完图片之后，改变当前图片的索引
                addCtiveClass(); // 并添加样式
            }
         }, false)
    }, this);
```
