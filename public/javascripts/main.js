/**
 * Created by 小康 on 2015/7/25.
 */
$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 500)
            $('.go-top').show();
        else
            $('.go-top').hide();
    });
    var scrollt = document.documentElement.scrollTop + document.body.scrollTop;
    if(scrollt > 500){
        $('.go-top').show();
    }
    $('.go-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 200);
    });
});