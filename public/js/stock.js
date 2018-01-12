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
            dataType: "omk",
            url: "http://127.0.0.1:3333/api/stock/"+itemRID,
            data: itemRID,
            success: function (res) {
                let response = $.parseJSON(res);
                console.log(response);
                // return res.map(res.JSON());

            },
            error: function (err) {
                console.log("err is", err);
                
            }
        });
    }
});