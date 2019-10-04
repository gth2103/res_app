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
    	div = '<br><button class="update btn btn-outline-warning m-5" type="submit">Update</button><button class="delete btn btn-outline-danger m-5" type="submit">Delete</button>'
    }
    else {

    	div = '<br><button class="add_to_cart btn btn-outline-info m-5" type="submit">Add to Cart</button><button type="submit class="contact btn btn-outline-secondary border-0 m-5" data-toggle="modal" data-target="#contact_seller">Contact Seller</button>'
    }
    $('#item-left-side').append(div);
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
				title = item.title
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
        url: "add_to_cart",                
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

var home = function(){

	$('.home').on('click', function(){
		window.location = '../'
	})
}

var  del_item = function(item_id) {
    $.ajax({
        type: "POST",
        url: "delete/" + item_id,                
        success: function(result){
            window.location = '../update'
        },
        error: function(request, status, error){
            alert("Oops! Something went wrong. Please try again.")
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

        del_item(item_id)
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