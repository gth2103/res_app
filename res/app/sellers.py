sellers = []

sellers_search_items = []

sellers_index = 0

def initiate_sellers():
	print(users)
    for user in users:
    	for key, value  in user.items():
    		if key == 'items_list':
    			if value:
    				for key, value in user.items():
    					if key == 'user_id':
    						print(user_id)
    						add_to_list("sellers", sellers, value, len(sellers))