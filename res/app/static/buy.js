var go_to_category = function(category){
    $.ajax({
        type: "POST",
        url: "buy/" + category,                
        success: function(result){
            console.log(result)
            window.location = /buy/. + category
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

var category = function(){

    $('.title-menu-item').on('click', function(){

        var category = $(this).attr('id')

        go_to_category(category)
    })

}

var cart = function(){

    $('.cart').on('click', function(){
        window.location = '/cart'
    })
}

$(document).ready(function(){
    do_slide_show()
    set_previous()
    categories_dropdown()
    category()
    cart()
})