/**
 * 轮播图插件
 * @param id  轮播图id       
 * @param img 图片列表    
 * @param width 图片的宽度，默认为0
 * @param height 图片的高度，默认为0
 */
var bannerPlugin = {
    // 需要传入参数
    options: {
        "id": "",
        "img": {},
        "width": 0,
        "height": 0,
    },
    // 设置传入参数
    config: function (op) {
        for (var k in this.options) {
            if (op[k]) {
                this.options[k] = op[k];
            }
        }
        this.init();
    },
    // 初始化函数
    init: function () {
        var html = '';
        var imgData = this.options.img;
        var imgWidth = this.options.width;
        var imgHeight = this.options.height;
        var imgLength = Object.keys(imgData).length; // 得到图片长度
        var imgId = this.options.id;
        var container = document.getElementById(imgId);
        // 创建DOM START
        html += '<div class="banner" style="width: ' + imgWidth + 'px;height: ' + imgHeight + 'px">' +
            '<div id="' + imgId + '-img"' + ' class="banner-img" style="width:' + imgWidth * imgLength + 'px;">'
        for (var i in imgData) {
            html += ' <div class="img-item" style="width:' + imgWidth + 'px;"><img src="';
            html += imgData[i];
            html += '" ></div>';

        }
        html += '</div>';
        html += '<div class="banner-tabs" id="' + imgId + '-tab' + '">';
        for (var i = 0; i < imgLength; i++) {
            html += '<span class="tabs"></span>';
        }
        html += '</div>';
        html += '<div class="btn prev animated fadeInLeft" id="' + imgId + '-prev' + '"></div> <div class="btn next animated fadeInRight" id="' + imgId + '-next' + '"></div>'
        html += '</div>'
        container.innerHTML = html;
        // 创建DOM END
        var index = 0; //图片索引
        var interval; //定时器
        var bannerId = document.getElementById(imgId);
        var bannerImg = document.getElementById(imgId + '-img');
        var bannerTabs = document.getElementById(imgId + '-tab');
        var tabsOptions = bannerTabs.querySelectorAll(".tabs");
        var prev = document.getElementById(imgId + '-prev');
        var next = document.getElementById(imgId + '-next');
        bannerImg.style.left = "0px";
        tabsOptions[0].className = 'tabs active';
        // 左右按钮点击事件
        bannerId.addEventListener("click", function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;
            if (target == next) {
                index++;
                if (index > tabsOptions.length - 1) {
                    index = 0;
                }
                // 添加底部按钮选中样式
                tabsOptions.forEach(function (currentValue, key, array) {
                    currentValue.className = 'tabs';
                }, this)
                tabsOptions[index].className = "tabs active";
                // 图片对应切换
                bannerImg.style.left = -imgWidth * index + "px";
            }
            if (target == prev) {
                index--;
                if (index < 0) {
                    index = tabsOptions.length - 1;
                }
                tabsOptions.forEach(function (currentValue, key, array) {
                    currentValue.className = 'tabs';
                }, this)
                tabsOptions[index].className = "tabs active";
                bannerImg.style.left = -imgWidth * index + "px";

            }
        });
        // 底部按钮点击事件
        tabsOptions.forEach(function (currentValue, key, array) {
            currentValue.addEventListener("click", function () {
                {
                    if (currentValue.className == 'tabs active') {
                        return;
                    }
                    bannerImg.style.left = -imgWidth * key + "px";
                    index = key;
                    tabsOptions.forEach(function (currentValue, key, array) {
                        currentValue.className = 'tabs';
                    }, this)
                    tabsOptions[index].className = "tabs active";
                }
            }, false)
        }, this);
        // 鼠标移动上面，清除定时器
        bannerId.addEventListener("mouseover", function () {
            clearInterval(interval);
        }, false);
        // 鼠标离开，自动播放
        bannerId.addEventListener("mouseout", function () {
            interval = setInterval(function () {
                index++;
                if (index > tabsOptions.length - 1) {
                    index = 0;
                }
                tabsOptions.forEach(function (currentValue, key, array) {
                    currentValue.className = 'tabs';
                }, this)
                tabsOptions[index].className = "tabs active";
                bannerImg.style.left = -imgWidth * index + "px";
            }, 3000);
        }, false);
        // 自动播放
        interval = setInterval(function () {
            index++;
            if (index > tabsOptions.length - 1) {
                index = 0;
            }
            tabsOptions.forEach(function (currentValue, key, array) {
                currentValue.className = 'tabs';
            }, this)
            tabsOptions[index].className = "tabs active";
            bannerImg.style.left = -imgWidth * index + "px";
        }, 3000);
    }
};