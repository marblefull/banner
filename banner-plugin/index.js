var bannerPlugin = {
    options: {
        "id": "",
        "img": {},
        "width": 1200,
        "height": 320,
        "time": 3000,
    },
    config: function (op) {
        for(var k in this.options){
            if (op[k]) {
                this.options[k] = op[k];
            }
        }
        this.init();
    },
    init: function () {
        var container = document.getElementById(this.options.id);
        var html = '';
        var imgData = this.options.img;
        var imgWidth = this.options.width;
        var imgHeight = this.options.height;
        var imgLength = Object.keys(imgData).length;
        var imgTime = this.options.time;
        var imgId=this.options.id;
        html+= '<div class="banner" style="width: '+imgWidth+'px;height: '+imgHeight+'px">'
        +'<div id="'+imgId+ '-img"'+' class="banner-img" style="width:'+imgWidth*imgLength+'px;height:100%">' 
        for(var i in imgData){
            html+=' <div class="img-item" style="width:'+imgWidth+'px;height:100%"><img src="';
            html+= imgData[i];
            html+='/>';
        }
       
        html+='</div>';
        html+='<div class="banner-tabs" id=">'+imgId+'-tab'+'">';
        for(var i=0;i<imgLength;i++){
            html += '<span class="tabs"></span>';
        }
        container.innerHTML=html;
        var bannerImg=document.getElementById(imgId+'-img');
        var bannerTabs=document.getElementById(imgId+'-tab');
        var tabsOptions=document.querySelectorAll(".tabs");
        tabsOptions[0].className='active';

    }
};
