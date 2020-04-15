const Route = require('express').Router()
const { getIndexHTML, getDB, addToCart, removeItem, removeAllItems } = require('./controllers')

Route.get("/", getIndexHTML);
Route.get("/glasses", getIndexHTML);
Route.get("/sunglasses", getIndexHTML);
Route.get("/cart", getIndexHTML);

Route.get("/getdb", getDB);

Route.post("/addtocart", addToCart)

Route.delete('/remove/:_id', removeItem);

Route.delete('/removeall', removeAllItems);

module.exports = Route;