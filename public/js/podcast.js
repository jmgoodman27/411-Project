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
                jQuery(self).data('icon', 'unfilled').html("<i class='material-icons'>star_border</i>");
            } else {
                jQuery(self).data('icon', 'filled').html("<i class='material-icons'>star</i>");
            }
        }
    });
    return false;
});