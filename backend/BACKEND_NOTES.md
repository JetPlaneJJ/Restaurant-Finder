# Purpose of App
- To retrieve restaurant information and submit/edit/delete reviews of restaurants

# Quickstart
- To start the server: go to backend folder > nodemon start

# DAO (Data Access Object)
- Goal: isolate the application/business layer from the persistence layer (like a DB) using an abstract API (hide complexities of directly talking to DB or CRUD/Create Read Update Delete operations)
- Controller talks to DAO using implemented methods

# CRUD
- GET: http://localhost:{port}/api/v1/restaurants/
  - http://localhost:{port}/api/v1/restaurants/id/5eb3d668b31de5d588f4296c (get details + reviews of some restaurant)

- POST example: http://localhost:5000/api/v1/restaurants/review --> 
```
{
	"restaurant_id": "5eb3d669b31de5d588f45e8f",
	"text": "Great!!!!!!",
	"user_id": "1234",
	"name": "Person B"
}
```

- PUT: PUT http://localhost:5000/api/v1/restaurants/review
```
{
	"review_id": "615549b0e6387074acb90427",
	"text": "Great food.",
	"user_id": "1234",
	"name": "Person B"
}
```

- DELETE: DELETE http://localhost:5000/api/v1/restaurants/review?id=615549b0e6387074acb90427
```
{
	"user_id": "1234",
	"name": "Person B"
}
```

# MongoDB syntax
- Variables can hold any BSON type data. 
- Access value -> prefix var name with double dollar signs -> "$$<variable>".
- Use $field-name format when referencing a FIELD from the original or intermediary document
  - Ex: $restaurant_id
  
# [WIP] HuskyADAPT fields
TOYS
- *_id [ObjectId]
- *name
- manufacturer
- output (light, sound, motion...)
- switch_type (momentary, latching)
- adaptation_difficulty (easy, medium, difficult)
- image_general_link
- image_unadapted_link
- image_adapted_circuity_link
- purchase_link
- toy_activation_video_link

```js
{
	"name": "Spinning Olaf Plush",
	"manufacturer": "Disney",
	"output": "sound, motion",
	"switch_type": "latching",
	"adaptation_difficulty": "easy/medium",
	"image_general_link": "",
	"image_unadapted_link": "",
	"image_adapted_circuity_link": "",
	"toy_activation_video_link": "",
	"purchase_link": "https://www.amazon.com/gp/product/B00JSONCB8/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00JSONCB8&linkCode=as2&tag=huskyadapt04-20&linkId=aa3d7abdf7cdb8441db2806fd5089f7b",
	"count": "0"
}
```