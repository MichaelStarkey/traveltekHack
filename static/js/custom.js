$(function() {
    $("#myimg").click(function(e) {
        var o = {
            left: e.pageX,
            top: e.pageY
        };
        $("#test").show(2000).offset(o);
    });
});