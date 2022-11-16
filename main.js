$(function () {
    var stageWidth = $('#page').width();
    var stageHeight = $('#page').height();
    var childWidth = $('#child').width();
    var childHeight = $('#child').height();
    var ballWidth = $('#ball').width();
    var ballHeight = $('#ball').height();
    var widtPos = stageWidth - childWidth;
    var clock;
    var pos = 0;
    $('#show').html('Begin...').slideUp(1500);
    //-------------------------------------------------------
    var stage = {
        width: stageWidth,
        height: stageHeight,
        speed: 4,
        score: 0,
        level: 1,
        nextLevel: 2,
        winLevel: 5,
        childMinus: 30
    };
    //-------------------------------------------------------
    var ball = {
        width: ballWidth,
        height: ballHeight,
        left: 0,
        top: 0,
        leftSet: -1,
        topSet: -1
    };
    //-------------------------------------------------------
    $(document).mousemove(function (e) {
        var x = e.pageX;
        var cx = $('#page').position().left;
        var xPos = x - cx;
        var xTemp = xPos - childWidth / 2;
        if (xTemp >= 0 && xTemp <= widtPos)
            $('#child').css({
                'left': xTemp + 'px'
            });
        pos = xTemp;
    });
    //-------------------------------------------------------
    clock = setInterval(function () {

        if (ball.left >= stage.width - ball.width || ball.left <= 0)
            ball.leftSet *= -1;

        if (ball.top <= 0)
            ball.topSet = 1;

        if ((ball.left + ball.width / 2) >= pos && (ball.left + ball.width / 2) <= (pos + childWidth) && ball.top >= (stage.height - childHeight) - ball.height) {
            stage.score++;
            if (stage.score == stage.nextLevel) {
                stage.score = 0;
                stage.speed += 5;
                if (childWidth > 30) {
                    childWidth -= stage.childMinus;
                    widtPos += 30;
                }
                $('#child').width(childWidth);
                $('#show').html('Next Level...').slideDown(1000);
                $('#show').slideUp(1000);
                stage.level++;
                if (stage.level == stage.winLevel) {
                    $('#show').html('You Win').slideDown(1000);
                    clearInterval(clock);
                }
            }
            ball.topSet = -1;
        }
        else if (ball.top >= stage.height - (ball.height / 2) - childHeight) {
            $('#show').html('lose!!!').slideDown(1000);
            clearInterval(clock);
        }

        ball.left += stage.speed * ball.leftSet;
        ball.top += stage.speed * ball.topSet;

        $('#ball').css({
            left: ball.left,
            top: ball.top
        });
    }, 30);
});