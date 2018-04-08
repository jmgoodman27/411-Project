$(".favorite").unbind().click(function (event) {
    event.preventDefault();
    var url = "/favorite-episode";
    var self = this;
    $.ajax({
        type: "POST",
        url: url,
        data: jQuery(this).closest("form").serialize(),
        success: function (data) {
            if($(self).data('icon') == "filled") {
                console.log("test1");
                jQuery(self).data('icon', 'unfilled').html("<i class='material-icons'>star_border</i>");
            } else {
                console.log("test2");
                jQuery(self).data('icon', 'filled').html("<i class='material-icons'>star</i>");
            }
        }
    });
    return false;
});