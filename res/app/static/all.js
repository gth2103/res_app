var getItems = function(list){

    clearItems()

    if (list.length < 1) {

        var div = '<div class="col-4 my-5 mx-3 p-5 text-center bg-white overflow-auto">Sorry, your search didn\'t return any results.</div>'

        $('#items').append(div)
    }
    else {

        list.forEach(function(item){

            if(item != null && item.item_id != null){

                current_user_items = current_user.items_list

                is_current_user_item = false;

                current_user_items.forEach(function(current_user_item){

                    if (item.item_id  === current_user_item){
                        is_current_user_item = true;
                    }
                })

                var div = ""

                if (is_current_user_item){

                    div = '<div class="item col-3 my-5 mx-3 text-center bg-white overflow-auto"><img accesskey="' + item.item_id + '" class="item-thumbnail mt-4 mb-4" src="' + item.image + '"><br><div class="item_title overflow-auto mb-1">' + item.title + '</div><p class="buy_price m-1"> $' + item.price + '</p><button id="' + item.item_id + '" class="view btn btn-outline-secondary mt-0 mb-3 text-center" type="submit">View Item</button></div>'
                }
                else {

                    div = '<div class="item col-3 my-5 mx-3 text-center bg-white overflow-auto"><img accesskey="' + item.item_id + '" class="item-thumbnail mt-4 mb-4" src="' + item.image + '"><br><div class="item_title overflow-auto mb-1">' + item.title + '</div><p class="buy_price m-1"> $' + item.price + '</p><button id="' + item.item_id + '" class="view btn btn-outline-secondary mt-0 mb-3 ml-3 float-left" type="submit">View Item</button><button id="' + item.item_id + '" class="add_to_cart btn btn-outline-info mt-0 mb-3 mr-3 float-right" type="submit">Add to cart</button></div>'
                }
                $('#items').append(div)
            }
        })
        add_to_cart()
        view()
        thumbnail_view()
    }
}

var add_icon = function(list){

    var min = 0
    var max = list.length

    var random_number = Math.floor(Math.random() * (+max - +min) + +min)

    var div0 = '<img class="titel-menu-thumbnail mt-4 mb-4 rounded-circle" src="' + list[random_number].image + '"><br>'

    $('#household').prepend(div0)

    var div1 = '<img class="titel-menu-thumbnail mt-4 mb-4 rounded-circle" src="' + list[random_number].image + '"><br>'

    $('#furniture').prepend(div1)

    var div2 = '<img class="titel-menu-thumbnail mt-4 mb-4 rounded-circle" src="' + list[random_number].image + '"><br>'

    $('#electronics').prepend(div2)

    var div3 = '<img class="titel-menu-thumbnail mt-4 mb-4 rounded-circle" src="' + list[random_number].image + '"><br>'

    $('#appliances').prepend(div3)

    var div4 = '<img class="titel-menu-thumbnail mt-4 mb-4 rounded-circle" src="' + list[random_number].image + '"><br>'

    $('#tools').prepend(div4)
}


var search = function(input){
    var input_to_search = input
    $.ajax({
        type: "POST",
        url: "/buy/all",                
        dataType : "json",
        contentType: "text; charset=utf-8",
        data : input_to_search.toString(),
        success: function(result){
            console.log(result);
            var buyers_search_items = result["buyers_search_items"]
            getItems(buyers_search_items)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var do_search = function(){

    $('#search').on('click', function(e){

        e.preventDefault()

        var input = $('#search_input').val()

        search(input)
    })
}

var clearItems = function(){
    $('#items').empty()
}

var do_clear = function(){

    $('#clear').on('click', function(e){

        e.preventDefault()

        var input = ""
        search(input)
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
            alert("Your item has been added! Click 'View Cart' in the menu to see it.")
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

var view_item = function(item_id){
    $.ajax({
        type: "POST",
        url: "/view_item/" + item_id,                
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
    });
}

var filter = function(category){
    $.ajax({
        type: "POST",
        url: "/buy/" + category,                
        success: function(result){
            console.log(result)
            var search_items = result["category_items"]
            getItems(category_items)
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

var view = function(){

	$('.view').on('click', function(e){

		e.preventDefault()

		var item_id = $(this).attr("id")

		view_item(item_id)
	})


}

var thumbnail_view = function(){

    $('img.item-thumbnail').on('click', function(e){

        e.preventDefault()

        var item_id = $(this).attr('accesskey')

        view_item(item_id)
    })
}

var cart = function(){

	$('.cart').on('click', function(){
		window.location = '/cart'
	})
}

const NUMBER_OF_BANNER_IMAGES = 9;

var image_index = 0

var do_slide_show = function()  {

    if(image_index >= NUMBER_OF_BANNER_IMAGES){

        image_index = 0
    }
    var current_banner_image = "/static/images/banner_" + image_index++ + ".png"

    setTimeout(do_slide_show, 15000)

    $('.banner').css('background-image', 'url(' + current_banner_image + ')')
      
}

var set_previous = function() {

    var pathname = window.location.pathname;

    localStorage.setItem("previous", ".." + pathname);

    console.log(pathname)

    console.log(localStorage.getItem("previous"))
}

var categories_dropdown = function(){

    $('.nav-link').on('mouseover', function(){

        $('.dropdown-menu').css('display', 'block')
    })

    $('.dropdown-menu').on('mouseover', function(){

        $('.dropdown-menu').css('display', 'block')
    })

    $('.dropdown-menu').on('mouseout', function(){

        $('.dropdown-menu').css('display', 'none')
    })
}

var filter_search = function(){

    $('.title-menu-item').on('click', function(){

        var category = $(this).attr('id')

        filter(category)
    })

}

$(document).ready(function(){

    do_search()
	getItems(items)
	cart()
    do_slide_show()
    set_previous()
    categories_dropdown()
    add_icon(items);

})