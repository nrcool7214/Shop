const Route = require('express').Router()
const { getIndexHTML, addToCart, removeItem } = require('./controllers')

Route.get("/", getIndexHTML);
Route.get("/glasses", getIndexHTML);
Route.get("/sunglasses", getIndexHTML);
Route.get("/cart", getIndexHTML);

// Route.get("/getallstudents", getAllStudents);

// Route.get('/:id', findStudentById)

Route.post("/addtocart", addToCart)

// Route.patch("/update/:name", updateStudent)

// Route.put('/updatebyid/:id', changeStudent)

Route.delete('/remove/:_id', removeItem)

module.exports = Route;