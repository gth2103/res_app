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

    localStorage.setItem("previous", pathname);

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

var cart = function(){

    $('.cart').on('click', function(){
        window.location = '/cart'
    })
}

var add_icon = function(category, list){

    var min = 0
    var max = list.length

    var random_number = Math.floor(Math.random() * (+max - +min) + +min)

    var div = '<img class="titel-menu-thumbnail mt-4 mb-4 rounded-circle" src="' + list[random_number].image + '"><br>'

    $('#' + category).prepend(div)
}


var scroll_on_hover = function(){

    $('#scroll_left').hover(function(){
        scroll_left()
    }, stop())

    $('#scroll_right').hover(function(){
        scroll_right()
    }, stop())



}

var scroll_left = function(){

    $('.featured_list').stop().animate({
            scrollLeft: '+=40'
        }, 'fast', 'linear', scroll_left);
}

var scroll_right = function(){

    $('.featured_list').stop().animate({
            scrollLeft: '-=40'
        }, 'fast', 'linear', scroll_right);
}

function stop(){
    $('.featured_list').stop();
}

$(document).ready(function(){
    do_slide_show()
    set_previous()
    categories_dropdown()
    cart()
    add_icon('all', items);
    add_icon('household', household_items);
    add_icon('furniture', furniture_items);
    add_icon('appliances', appliances_items);
    add_icon('electronics', electronics_items);
    add_icon('tools', tools_items);
    scroll_on_hover()
})