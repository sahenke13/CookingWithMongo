
$(document).on("click","#saveArticle",function(){
    

    var thisId = $(this).attr("data-id");
    console.log("ID: "+ thisId);

    $.ajax({
        method: "POST",
        url: "/cookingArticles/saved/" + thisId       
    }).then(function(){
        window.location="/";    
    });

});

$(document).on("click","#removeArticle", function(){

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/savedArticles/delete/" + thisId
    }).then(function(){
        window.location="/savedArticles"
    });

})





$(document).on("submit","#noteForm",function(event){
    event.preventDefault();

    let thisId = $(this).attr("data-id");
    console.log(thisId);
    //grab comment
    let comment = $("#comment"+thisId).val();
    console.log(comment)
    //grab data-id button
   

    $.ajax({
        method: "POST",
        url: "/savedArticles/" + thisId,
        data:{
            note: comment
        }
    }).then(function(data){
        console.log(data)
        window.location="/savedArticles"
    });

    $("#comment"+thisId).val("");

});

$(document).on("click","#deleteNote", function(){
   
    let thisNoteId = $(this).attr("data-id");
    console.log("NoteID is: "+ thisNoteId);


    $.ajax({
        method: "POST",
        url:"/savedArticles/Comment/delete/"+thisNoteId
    }).then(function(data){
        console.log(data);
        window.location="/savedArticles"
    });




});