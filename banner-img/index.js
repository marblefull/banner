window.onload = function () {
    var banner = document.getElementById("banner");
    var bannerImg = document.querySelector(".banner-img");
    var bannerTabs = document.querySelectorAll(".banner-tabs span");
    var prev = document.querySelector(".prev");
    var next = document.querySelector(".next");
    // index为每次滑动图片的索引
    var index = 0;
    // 定义计时器
    var timer;
    bannerImg.style.left = "0px"
    // 图片切换
    // offset为图片每次应该滑动的距离
    // imgWidth为图片容器的宽度
    // len为图片的张数
    function slideImg(imgWidth) {
        bannerImg.style.left = -imgWidth * index + "px";
        
    }
    // 给底部小按钮添加选中的样式
    function addCtiveClass() {
        bannerTabs.forEach(function (currentValue, key, array) {
            // 先清空选中的类
            currentValue.className = '';
        }, this)
        // 当前项添加选中样式
        bannerTabs[index].className = "active";
    }
    // 自动播放
    function autoSlide() {
        timer = setInterval(function () {
            index++;
            if (index > bannerTabs.length-1) {
                index = 0;
            }
            addCtiveClass();
            slideImg(1200);
        }, 3000);
    }
    
    // 左右按钮点击事件
    banner.addEventListener("click", function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target == next) {
            index++;
            if (index > bannerTabs.length-1) {
                index = 0;
            }
            addCtiveClass();
            slideImg(1200);
        }
        if (target == prev) {
            index--;
            if (index < 0) {
                index = bannerTabs.length-1;
            }
            addCtiveClass();
            slideImg(1200);
            
        }
    })

    // 底部按钮点击事件
    bannerTabs.forEach(function (currentValue, key, array) {
        currentValue.addEventListener("click", function () {
            {
                if (currentValue.className == 'active') {
                    return;
                }
                bannerImg.style.left = -1200 * key + "px";
                index = key;
                addCtiveClass();
            }
         }, false)
    }, this);
    // 鼠标移动上面，清除定时器
    banner.addEventListener("mouseover", function () {
        clearInterval(timer);
    }, false);
    // 鼠标离开，自动播放
    banner.addEventListener("mouseout", function () {
        autoSlide();
    }, false)
    // 自动播放
    autoSlide();
}