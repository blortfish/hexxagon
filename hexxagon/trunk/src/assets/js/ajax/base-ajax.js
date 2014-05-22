function ajaxCall(GetPost, d, callback) {
    $.ajax({
        type: GetPost,
        async: true,
        cache: false,
        url: "mid.php",
        data: d,
        dataType: "json",
        success: callback
    });
}