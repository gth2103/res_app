var setUserOptions = function(){

	current_user_items = current_user.items_list

    is_current_user_item = false;

	current_user_items.forEach(function(current_user_item){

    	if (item.item_id  === current_user_item){
    			is_current_user_item = true;
    	}

    })
    var div  = ""
    if (is_current_user_item){
    	div = '<br><button id="' + item.item_id + '"  class="update btn btn-outline-warning m-2 m-sm-2 m-md-3 m-lg-5" type="submit">Update</button><button id="' + item.item_id + '"  class="delete btn btn-outline-danger m-2 m-sm-2 m-md-3 m-lg-5" type="submit">Delete</button>'
    }
    else {

    	div = '<br><button id="' + item.item_id + '" class="add_to_cart btn btn-outline-info m-2 m-sm-2 m-md-3 m-lg-5" type="submit">Add to Cart</button><button id="' + item.item_id + '"  type="submit" class="contact btn btn-outline-secondary border-0 m-2 m-sm-2 m-md-3 m-lg-5" data-toggle="modal" data-target="#contact_seller">Contact Seller</button>'
    }
    $('#item-left-side').append(div);
    message()
    update()
    delete_item()
}

var send_message = function(message){
    var message_to_send = message
    $.ajax({
        type: "POST",
        url: "/send_message",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(message_to_send),
        success: function(result){
            console.log(result);
            $('.close_modal').click()
            sent_flash()
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

var message = function(){

    var form = $('#add_item_form')

    form.validate()

    $('.send').on('click', function(e){

        e.preventDefault()

        var message_text = $.trim($('textarea#contact_seller_message').val()).replace(/\"/g, "\\\"").replace(/\n/g, "\\n")
        var user_id = current_user.user_id
        var seller = item.user_id

        var new_message = jQuery.parseJSON( '{ "message_text": "' + message_text + '", "user_id": "' + user_id + '", "seller": "' + seller + '" }')

        send_message(new_message)
    })

}

var sent_flash = function(){

    $('#sent_flash').removeClass('alert_show')
    $('#sent_flash').addClass('alert_show')

    var flash_timer = setTimeout(function(){
        $('#sent_flash').removeClass('alert_show')
        $('#sent_flash').addClass('alert_hide')
        clearTimeout(flash_timer)
    }, 3500)
}

var add_to_cart = function(){

	$('.add_to_cart').on('click', function(e){

		e.preventDefault()

		var item_id = $(this).attr("id")
		var user_id
		var seller = ""
		var title = ""

		items.forEach(function(item){
			if(item.item_id == item_id){
				user_id = item.user_id
				title = $.trim(item.title).replace(/\"/g, "\\\"").replace(/\n/g, "\\n")
			}

		})
		users.forEach(function(user){
			if(user.user_id == user_id){
				seller = user.user
			}
		})

        var new_item = jQuery.parseJSON( '{ "item_id": "' + item_id + '", "user_id": "' + user_id + '", "seller": "' + seller + '", "title": "' + title + '" }')

		add_item_to_cart(new_item)
	})
}

var add_item_to_cart = function(new_item){
	var item_to_add = new_item
    $.ajax({
        type: "POST",
        url: "/add_to_cart",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(item_to_add),
        success: function(result){
            console.log(result);
            var all_items = result["buyers"]
            added_flash()
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

var added_flash = function(){

    $('#added_flash').removeClass('alert_show')
    $('#added_flash').addClass('alert_show')

    var flash_timer = setTimeout(function(){
        $('#added_flash').removeClass('alert_show')
        $('#added_flash').addClass('alert_hide')
        clearTimeout(flash_timer)
    }, 3500)
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

var delete_flash = function(){

    $('#delete_flash').removeClass('alert_show')
    $('#delete_flash').addClass('alert_show')

    var flash_timer = setTimeout(function(){
        $('#delete_flash').removeClass('alert_show')
        $('#delete_flash').addClass('alert_hide')
        clearTimeout(flash_timer)
    }, 3500)
}

var home = function(){

	$('.home').on('click', function(){
		window.location = '/'
	})
}

var update  =  function(){

    $('.update').on('click', function(e){

        e.preventDefault()

        var item_id = $(this).attr("id")

        window.location = '/update_item/' + item_id
    })
}

var  del_item = function(item_id) {
    $.ajax({
        type: "POST",
        url: "/delete/" + item_id,                
        success: function(result){
            delete_flash()
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

var delete_item = function(){
    $('.delete').on('click', function(e){

        e.preventDefault()

        var item_id = $(this).attr("id")

        if(confirm("Are you sure you would like to delete this item?")){
            del_item(item_id)
        }
    })
}

var get_previous = function(){
    return localStorage.getItem("previous");
}

var back = function(){

    $('.back').on('click', function(){

        location.href = get_previous()
    })
}

$(document).ready(function(){

	setUserOptions()
	add_to_cart()
	home()
    back()

})