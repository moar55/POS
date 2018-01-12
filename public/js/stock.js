$(document).ready(function () {
    console.log("jq is ready!");

    $('.itemR').on('click', function () {
        var itemID = $(this).attr('id');
        console.log(itemID);
        sendItemIDtoServer(itemID);
    })  
    // var itemRID = $('.itemR').id;
    // console.log(itemID);
    function sendItemIDtoServer (itemRID) {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: `http://127.0.0.1:3333/api/stock/${itemRID}`
        })
        .done( (res) => {
            console.log(`res: `,res);
            var response = 
        })
        .fail((err) => {
            console.log("err:",err.responseJSON.err);
            
        })
    }
    //
})