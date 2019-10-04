
var get_cart_items = function(){

	if (cart_items === undefined || cart_items.length == 0) {

		var div = '<li class="cart-item mt-2 mb-2"><hr>Your cart is  empty!</li>'

    	$('#cart').append(div)
	}
	else {

        current_cart = []

		cart_items.forEach(function(item_id){

			var div = ""

			items.forEach(function(item){

                if(item != null && item.item_id != null){

                    if(item.item_id == item_id && $.inArray(item.item_id, current_cart) != -1) {

                        console.log(current_cart)

                        console.log(item_id)

                        console.log($.inArray(item_id, current_cart) == -1)

                        div = '<li class="cart-item mt-2 mb-2"><hr><img class="item-mini mb-2" src="' + item.image + '"><span class="ml-5">' + item.title + '</span><span class="ml-5 cart_price">$' + item.price + '</span><button id="' + item.item_id + '" class="remove btn btn-outline-danger mt-4 mr-2 float-right" type="submit"> Remove </button><button id="' + item.item_id + '" class="view btn btn-outline-warning mt-4 mr-2 float-right" type="submit"> View </button><button id="' + item.item_id + '" class="contact btn btn-outline-secondary mt-4 mr-2 float-right" type="submit"> Contact Seller</button></li>'

                        current_cart.push(item_id)
                    }
                }
			})
    		$('#cart').append(div)
    	})
	}

      
    remove()
    view()
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
        	window.location = '../item/' + item_id
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
		window.location = '../'
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

$(document).ready(function(){

	get_cart_items()
	home()
    set_previous()
})