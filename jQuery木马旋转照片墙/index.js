var img = $('img');
var len = img.length;
var timer;

function init() {
    var deg = 360 / len;
    for (var i = 0; i < len; i++) {
        img.eq(i).css({
            // 每一张图片 先绕着y轴旋转 不同的角度   然后再沿着z轴方向平移
            transform : 'rotateY(' + i * deg + 'deg) translateZ(300px)',
            // 每一张图片进行运动时 进行延迟
            transition : 'transform 0.5s linear ' + (len - 1 - i) * 0.1 + 's',
        });
    }
    bindEvent();
}
init();

function bindEvent(){
    var lastX,lastY,nowX,nowY,disX,disY;
    var roX = 0,roY = 0;
   
    $('body').on('mousedown',function(e){
        clearInterval(timer);
        lastX = e.clientX;
        lastY = e.clientY;

        $('body').on('mousemove',function(e){
            nowX = e.clientX;
            nowY = e.clientY;

            disX = nowX - lastX;
            disY = nowY - lastY;

            roX -= disY * 0.2;
            roY += disX * 0.2;

            $('.box').css({
                transform :'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
            });

            lastX = nowX;
            lastY = nowY;

        });
        $('body').on('mouseup',function(){
            $('body').off('mousemove');

            timer = setInterval(function(){
                disX *= 0.95;
                disY *= 0.95;

                // 角度同时也变小
                roX -= disY*0.5;
                roY += disX*0.5;

                $('.box').css({
                    transform : 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                });

                // 清除定时器
                if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
                    clearInterval(timer);
                }

            },20);
        })
        return false;
    })
}
