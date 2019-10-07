var item;


var get_cart_items = function(){

	if (cart_items === undefined || cart_items.length == 0) {

		var div = '<li class="cart-item mt-2 mb-2"><hr>Your cart is  empty!</li>'

    	$('#cart').append(div)
	}
	else {
		cart_items.forEach(function(item_id){

			var div = ""

			items.forEach(function(item){

                if(item != null && item.item_id != null){

                    if(item.item_id == item_id) {

                        div = '<div class="position-relative"><li class="cart-item mt-2 mb-2 d-inline-block"><hr><img class="item-mini mb-2" src="' + item.image + '"><div class="cart_title ml-5 mt-4 d-inline-block">' + item.title + '</div><div class="ml-5 cart_price d-inline-block mt-4 align-top">$' + item.price + '</div><button id="' + item.item_id + '" class="remove cart_remove btn btn-outline-danger mt-4 mr-2 position-absolute" type="submit"> Remove </button><button id="' + item.item_id + '" class="view cart_view btn btn-outline-warning mt-4 mr-2 position-absolute" type="submit"> View </button><button id="' + item.item_id + '" class="contact cart_contact btn btn-outline-secondary mt-4 mr-2 position-absolute" data-toggle="modal" data-target="#contact_seller" type="submit"> Contact Seller</button></li></div>'
                    }
                }
			})
    		$('#cart').append(div)
    	})
	}
    message()
    remove()
    view()
    get_id()
}

var get_id = function(){

    $('.contact').on('click', function(){

        var id = $(this).attr('id')

        items.forEach(function(element){
            if(element.id == id){
                item = element;
            }
        })
    })
}

var remove_from_cart = function(item_id){
	$.ajax({
        type: "POST",
        url: "remove_from_cart/" + item_id,                
        success: function(result){
        	window.location.reload()
        },
        error: function(request, status, error){
        	alert("Oops! Something went wrong. Please try again.")
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

var remove  = function(){

	$('.remove').on('click', function(e){

		e.preventDefault()

		var item_id = $(this).attr("id")

		remove_from_cart(item_id)


	})
}

var view_item = function(item_id){
    $.ajax({
        type: "POST",
        url: "view_item/" + item_id,                
        success: function(result){
        	window.location = '/item/' + item_id
        },
        error: function(request, status, error){
        	alert("Oops! Something went wrong. Please try again.")
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

var view = function(){

	$('.view').on('click', function(e){

		e.preventDefault()

		var item_id = $(this).attr("id")

		view_item(item_id)
	})


}

var home = function(){

	$('.home').on('click', function(){
		window.location = '/'
	})
}

var get_previous = function(){
    return localStorage.getItem("previous");
}


var set_previous = function() {

    var pathname = window.location.pathname;

    localStorage.setItem("previous", ".." + pathname);

    console.log(pathname)

    console.log(localStorage.getItem("previous"))
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

var error_flash = function(){

    $('#error_flash').removeClass('alert_show')
    $('#error_flash').addClass('alert_show')

    var flash_timer = setTimeout(function(){
        $('#error_flash').removeClass('alert_show')
        $('#error_flash').addClass('alert_hide')
        clearTimeout(flash_timer)
    }, 3500)
}

$(document).ready(function(){

	get_cart_items()
	home()
    set_previous()
})