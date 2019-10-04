import os, json
from flask import request
from app.items import items
from ast import literal_eval

def add_data(index):

	user_id = get_value(current_user, 'user_id')

	json_data = request.get_json()
	item_id = index
	title = json_data["title"]
	location = json_data["location"]
	image = json_data["image"]
	categories = json_data["categories"]
	details = json_data["details"]
	price = json_data["price"]

	new_item_entry = {
		"user_id": user_id,
		"item_id": item_id,
		"title": title,
		"location": location,
		"image": image,
		"categories": categories,
		"details": details.replace("\\", ""),
		"price": price
	}

	add_to_list("items", items, new_item_entry, index)

	set_value(current_user, 'items_list', item_id)

	write_data("current_user", current_user)

def read_data(file_name):

	if(os.stat("/home/grant/res_app/res/data/" + file_name + ".txt").st_size > 0):
		file_in = open("/home/grant/res_app/res/data/" + file_name + ".txt", "r")
		file_content_in = file_in.readlines()
		file_content_string = "".join(file_content_in)
		file_content = literal_eval(file_content_string)
		print(type(file_content))
		file_in.close()
		return file_content
	return []

def write_data(data_name, data_in):
	file_out = open("/home/grant/res_app/res/data/" + data_name + ".txt", "w")
	if(type(data_in) is dict):
		file_content_out = json.dumps(data_in)
		file_out.writelines(file_content_out)
	elif(type(data_in) is list):
		data_in = list(dict.fromkeys(data_in))
		file_content_out = "["
		file_content = ",\n".join(str(value) for value in data_in)
		file_content_out = file_content_out + file_content + "]"
		file_out.writelines(file_content_out)
	file_out.close()

def over_write_data(data_name, data_in):
	file_out = open("/home/grant/res_app/res/data/" + data_name + ".txt", "w")
	if(type(data_in) is dict):
		file_content_out = json.dumps(data_in)
		file_out.writelines(file_content_out)
	elif(type(data_in) is list):
		file_content_out = "".join(str(value) for value in data_in)
		file_out.writelines(file_content_out)
	file_out.close()

def search(list_name, search_list_out, search_list_in):

	search_in = request.data.decode("utf-8")

	for item in search_list_in:
		for key, value in item.items():
			if key ==  'title' or key == 'location' or key == 'details':
				if search_in.lower() in value.lower() and item not in search_list_out:
					add_to_list(list_name, search_list_out, item, len(search_list_out))

def get_items_by_id(list_name, item_list_in, item_id_list, item_list_out):
	for item in item_list_in:
		for key, value in item.items():
			if(key == 'item_id'):
				if (value in item_id_list):
					add_to_list(list_name, item_list_out, item, len(item_list_out))

def get_items_by_category(item_list_in, category, item_list_out):
	for item in item_list_in:
		for key, value in item.items():
			if(key == 'categories'):
				if (category in value):
					item_list_out.append(item)
					print(item_list_out)

def get_index(list):
    return len(list)

def add_to_list(list_name, item_list, item, index):
	if item not in item_list:
		if int(index) < len(item_list):
			item_list.pop(int(index))
		item_list.insert(int(index), item)
		write_data(list_name, item_list)

def get_value(json_object, key_string):
	for key, value in json_object.items():
		if key == key_string:
			return value

def set_value(json_object, key_string, new_value):
	for key, value in json_object.items():
		if key == key_string:
			value.append(new_value)

def delete_data(json_object, key_string, item_list, id_to_remove):

	null_entry = {
		"item_id": None,
	}

	for key, value in json_object.items():
		if (key == key_string):
			for item_id in value:
				if (str(item_id)  == id_to_remove):
					value.remove(item_id)

	for item in item_list:
		for key, value in item.items():
			if (key == 'item_id'):
				if (str(value) == id_to_remove):
					item_list.remove(item)
					item_list.insert(int(value), null_entry)


