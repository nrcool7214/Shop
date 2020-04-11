// const Students = require('../models/students')
const path = require('path')
const db = require('./database')

const getIndexHTML = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"))
};

// ALL INFORMATION RELATED TO THE CART:

const addToCart = (req, res) => {
    // console.log(req);
    let itemAdded = db.get('Products').find({ _id: req.body._id }).value();
    let itemAddedName = itemAdded.name;
    let itemAddedPrice = itemAdded.price;
    let itemAddedId = itemAdded._id;

    itemAdded.stock = itemAdded.stock - 1;
    db.get('Products').assign(itemAdded).write();

    let quantity = itemAdded.initial_stock - itemAdded.stock;

    let cart = db.get('Cart').value();

    console.log('CART BEFORE: ', cart);

    if (cart.length === 0) {
        console.log('MESSAGE: IT WAS NULL');
        // cart.push({ itemAddedId, itemAddedName, itemAddedPrice, quantity }); 
        db.get('Cart').push({ itemAddedId, itemAddedName, itemAddedPrice, quantity }).write();
        // res.json({ status: cart });
    } else {
        cart.map(el => {
            if (el.itemAddedId === req.body._id) {
                console.log('MESSAGE: QUANTITY + 1');
                console.log('REQ.BODY.ID: ', req.body._id);
                console.log('ELEMENT: ', el);
                let itemUpdated = db.get('Cart').find({ itemAddedId: req.body._id }).value();
                itemUpdated.quantity += 1;
                // console.log('itemUpdated: ', itemUpdated);
                db.get('Cart').remove(el).write();
                db.get('Cart').push(itemUpdated).write();
                // db.get('Cart').push({ itemAddedId, itemAddedName, itemAddedPrice, quantity }).write();

                // db.get('Cart').find({ itemAddedId: req.body._id }).value().unset(itemUpdated).write();
                // db.get('Cart').find({ itemAddedId: req.body._id }).value()
                // .assign(itemUpdated).write();
                // res.json({ status: cart });
            } else {
                console.log('MESSAGE: NORMAL PUSH');
                // cart.push({ itemAddedId, itemAddedName, itemAddedPrice, quantity });
                db.get('Cart').push({ itemAddedId, itemAddedName, itemAddedPrice, quantity }).write();
                // res.json({ status: cart });
            }
        })
    };
    console.log('CART AFTER: ', cart);

    // db.get('Cart').push({ itemAddedId, itemAddedName, itemAddedPrice, quantity }).write();
    console.log('LAST ITEM ADDED TO CART: ', itemAdded);

    // console.log(itemAdded.name);
    res.json({ status: cart });
}

const removeItem = (req, res) => {
    // console.log('REQ.PARAMS: ', req.params);
    let itemRemoved = db.get('Products').find({ _id: req.params._id }).value();
    itemRemoved.stock = itemRemoved.stock + 1;
    db.get('Products').assign(itemRemoved).write();

    let cart = db.get('Cart').value();
    let newCart = cart.filter(el => el.itemAddedId !== req.params._id);
    // console.log(newCart);
    db.get('Cart').remove().write();
    db.get('Cart').assign(newCart).write()
    console.log('CART: ', cart);
    res.json({ status: cart });
}

const removeAllItems = (req, res) => {
    let allProducts = db.get('Products').value();
    allProducts.map(el => el.stock = 10);
    db.get('Products').assign(allProducts).write()

    db.get('Cart').remove().write();
    let cart = db.get('Cart').value();
    res.json({ status: cart });
}

// USER INFORMATION:

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


module.exports = { getIndexHTML, addToCart, removeItem, removeAllItems };