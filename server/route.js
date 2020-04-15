const Route = require('express').Router()
const { getIndexHTML, addToCart, removeItem, removeAllItems } = require('./controllers')
const db=require("./database")
Route.get("/", getIndexHTML);
Route.get("/glasses", getIndexHTML);
Route.get("/sunglasses", getIndexHTML);
Route.get("/cart", getIndexHTML);

Route.post("/addtocart", addToCart)

Route.delete('/remove/:_id', removeItem);

Route.delete('/removeall', removeAllItems);


Route.get("/getdb",(req,res)=>{
    let data= db.get("All").value()
    res.json(data)
})
module.exports = Route;