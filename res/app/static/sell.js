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

                    div = '<div class="item col-3 my-5 mx-3 text-center bg-white overflow-auto"><img accesskey="' + item.item_id + '" class="item-thumbnail mt-4 mb-4" src="' + item.image + '"><br><div class="item_title overflow-auto mb-1 text-dark">' + item.title + '</div><p class="sell_price m-1"> $' + item.price + '</p><button id="' + item.item_id + '" class="update btn btn-outline-warning border-0 mt-0 mb-3 ml-3 float-left" type="submit">Update</button><button id="' + item.item_id + '" class="delete btn btn-outline-danger border-0 mt-0 mb-3 mr-3 float-right" type="submit">Delete</button></div>'
                }
                $('#items').append(div)
            }
        })
        update()
        delete_item()
        thumbnail_view()
    }
}

var search = function(input){
    var input_to_search = input
    $.ajax({
        type: "POST",
        url: "sell",                
        dataType : "json",
        contentType: "text; charset=utf-8",
        data : input_to_search.toString(),
        success: function(result){
            console.log(result);
            var sellers_search_items = result["sellers_search_items"]
            getItems(sellers_search_items)
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

var do_clear = function(){

    $('#clear').on('click', function(e){

        e.preventDefault()

        var input = ""
        search(input)
    })
}

var clearItems = function(){
    $('#items').empty()
}

var  del_item = function(item_id) {
    $.ajax({
        type: "POST",
        url: "/delete/" + item_id,                
        success: function(result){
            window.location = '/sell'
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

var update  =  function(){

    $('.update').on('click', function(e){

        e.preventDefault()

        var item_id = $(this).attr("id")

        window.location = '/update_item/' + item_id
    })
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
    });
}

var thumbnail_view = function(){

    $('img.item-thumbnail').on('click', function(e){

        e.preventDefault()

        var item_id = $(this).attr('accesskey')

        view_item(item_id)
    })
}

var set_previous = function() {

    var pathname = window.location.pathname;

    localStorage.setItem("previous", ".." + pathname);

    console.log(pathname)

    console.log(localStorage.getItem("previous"))
}

$(document).ready(function(){

    do_search()
    do_clear()
    getItems(items)
    set_previous()
})