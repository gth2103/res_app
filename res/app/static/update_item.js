var update_item = function(new_item){
	var item_to_add = new_item
    $.ajax({
        type: "POST",
        url: '/update_item/' + new_item.item_id,                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(item_to_add),
        success: function(result){
            update_flash()
            setTimeout(function(){
                window.location = '/sell'
            }, 4000) 
        },
        error: function(request, status, error){
        	error_flash()
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var error_flash = function(){

    $('#error_flash').removeClass('alert_show')
    $('#error_flash').addClass('alert_show')

    var flash_timer = setTimeout(function(){
        $('#error_flash').removeClass('alert_show')
        $('#error_flash').addClass('alert_hide')
        clearTimeout(flash_timer)
    }, 3500)
}

var update_flash = function(){

    $('#update_flash').removeClass('alert_show')
    $('#update_flash').addClass('alert_show')

    var flash_timer = setTimeout(function(){
        $('#update_flash').removeClass('alert_show')
        $('#update_flash').addClass('alert_hide')
        clearTimeout(flash_timer)
    }, 3500)
}

var submit = function(){

    var form = $('#update_item_form')

    form.validate()

    $('#submit_item').on('click', function(e){

        e.preventDefault()

        var item_id = $('input#item-id').val()
        var title = $('input#title').val().replace(/\"/g, "\\\"").replace(/\n/g, "\\n")
        var location = $('input#location').val()
        var image = $('input#img').val()
        var categories = $('input#categories').val()
        var details = $.trim($('textarea#textareaDetails').val()).replace(/\"/g, "\\\"").replace(/\n/g, "\\n")
        var price = $('input#price').val()

        console.log(details)

        var new_item = jQuery.parseJSON( '{ "item_id": "' + item_id + '", "title": "' + title + '", "location": "' + location + '", "image": "' + image + '",  "categories": "' + categories + '", "details": "' + details + '\\\\", "price": "' + price + '" }')

        // TODO: If form valid, update


        update_item(new_item)
    }) 
}

var get_previous = function(){
    return localStorage.getItem("previous");
}


var cancel = function(){

    $('#cancel').on('click', function(){

        location.href = get_previous()
    })
}

$(document).ready(function(){

    submit()
    cancel()	   
})