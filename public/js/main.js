
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

$(document).on("click", "#myModal", function(){
    console.log("click is working")
    $('#myModal').modal('show');
})

$(document).on("submit","#noteForm",function(event){
    event.preventDefault();
    let note = $("#note").val();
    console.log(note)


    $("#note").val("");

})