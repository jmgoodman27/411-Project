var commentsModal = new tingle.modal({
    closeMethods: ['button', 'escape'],
    closeLabel: "Close"
});

var Comments = function(id) {
    commentsModal.setContent(document.getElementById('comments_content_'+id).innerHTML);
    commentsModal.open();
};

var editCommentModal = new tingle.modal({
    closeMethods: ['button', 'escape'],
    closeLabel: "Close"
});

var EditComment = function(id) {
    editCommentModal.setContent(document.getElementById('edit_comment_'+id).innerHTML);
    editCommentModal.open();
};

var DeleteComment = function(e, id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", "/delete-comment/"+id, true);
    xmlhttp.send();
    console.log(xmlhttp);
    editCommentModal.close();
    window.location.href = "/favorites";
}

var ratingsModal = new tingle.modal({
    closeMethods: ['button', 'escape'],
    closeLabel: "Close"
});
var Ratings = function(id) {
    ratingsModal.setContent(document.getElementById('ratings_content_'+id).innerHTML);
    ratingsModal.open();
};