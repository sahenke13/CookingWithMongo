
$(document).on("click","#saveArticle",function(){
    console.log("testing, testing, is this working")

    var thisId = $(this).attr("data-id");
    console.log("ID: "+thisId);

    $.ajax({
        method: "POST",
        url: "/cookingArticles/saved/" + thisId       
    }).then(function(){
        window.location="/";    
    });



})