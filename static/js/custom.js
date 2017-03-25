$(function() {
    $("#myimg").click(function(e) {
        var o = {
            left: e.pageX,
            top: e.pageY
        };
        $("#test").show(2000).offset(o);
    });
});

$(window).bind("resize", function(){
    var w = $(window).width();
    var h = $(window).height();

    $("#mycanvas").css("width", w + "px");
    $("#mycanvas").css("height", h + "px"); 
});