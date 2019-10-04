from app.users import users

sellers = read_data(sellers)

sellers_search_items = read_data(sellers_search_items)

sellers_index = 0

def initiate_sellers():
    for user in users:
    	for key, value  in user.items():
    		if key == 'items_list':
    			if value:
    				for key, value in user.items():
    					if key == 'user_id':
    						sellers.append(value)