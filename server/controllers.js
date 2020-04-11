// const Students = require('../models/students')
const path = require('path')
const db = require('./database')

const getIndexHTML = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"))
};

const addToCart = (req, res) => {
    // console.log(req);
    let itemAdded = db.get('Products').find({ _id: req.body._id }).value();
    let itemAddedName = itemAdded.name;
    let itemAddedPrice = itemAdded.price;
    let itemAddedId = itemAdded._id;
    let cart = db.get('Cart').value();
    db.get('Cart').push({ itemAddedId, itemAddedName, itemAddedPrice }).write();
    // console.log(itemAdded);
    // console.log(itemAdded.name);
    res.json({ status: cart });
}

// const findStudentById = (req, res) => {
//     console.log(req.params.id);
//     let studentById = db.get('Students').find({ id: parseInt(req.params.id) }).value()
//     // let user = Students.find(student => student.id === Number(req.params.id))
//     res.json(studentById)
// }

// const addNewStudent = (req, res) => {
//     console.log(req.body);

//     db.get('Students').push(req.body).write()
//     let allStudents = db.get('Students').value()
//     res.json(allStudents);
// }

// const updateStudent = (req, res) => {
//     console.log(req.params.name);
//     let student = db.get('Students').find({ name: req.params.name }).value();

//     student.age = student.age + 1
//     db.get('Students').assign(student).write()

//     res.json(student);
// }

// const changeStudent = (req, res) => {
//     console.log(req.params);
//     console.log(req.body);
//     db.get('Students').find({ id: parseInt(req.params.id) }).assign(req.body).write()
//     res.send('student changed')
// }

const removeItem = (req, res) => {
    // console.log('REQ.PARAMS: ', req.params);
    let cart = db.get('Cart').value();
    let newCart = cart.filter(el => el.itemAddedId !== req.params._id);
    // console.log(newCart);
    db.get('Cart').remove().write();
    db.get('Cart').assign(newCart).write()
    res.json(newCart);
}

module.exports = { getIndexHTML, addToCart, removeItem };