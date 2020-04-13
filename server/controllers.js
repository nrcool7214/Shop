const path = require('path')
const db = require('./database')

const getIndexHTML = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"))
};

// ALL INFORMATION RELATED TO THE CART:


const addToCart = (req, res) => {
    // console.log('REQ: ', req);
    const requestedId = req.body._id;
    console.log('REQ_ID: ', req.body._id);

    const requestedProduct = db.get('Products').find({ _id: requestedId }).value();
    console.log('REQ_PROD: ', requestedProduct);
    requestedProduct.stock -= 1;
    db.get('Products').assign(requestedProduct).write();

    const itemAddedId = requestedProduct._id;
    const itemAddedName = requestedProduct.name;
    const itemAddedPrice = requestedProduct.price;
    const itemAddedQuantity = requestedProduct.initial_stock - requestedProduct.stock;
    let itemAdded = { itemAddedId, itemAddedName, itemAddedPrice, itemAddedQuantity };
    console.log('itemAdded: ', itemAdded);
    console.log('CART BEFORE: ', db.get('Cart').value());

    let cart = db.get('Cart').value();

    const itemAddedIndex = cart.findIndex((el => el.itemAddedId === requestedId));
    console.log('itemAddedIndex: ', itemAddedIndex);
    if (itemAddedIndex !== -1) {
        console.log('ITEMADDEDQUANTITYYYYYYYYY: ', cart[itemAddedIndex].itemAddedQuantity)
        cart[itemAddedIndex].itemAddedQuantity += 1;

    } else {
        cart.push(itemAdded);
    }

    db.get('Cart').assign(cart).write()
    console.log('CART: ', cart);
    res.json({ status: cart });
}

const removeItem = (req, res) => {
    console.log('REQ.PARAMS: ', req.params);
    let itemRemoved = db.get('Products').find({ _id: req.params._id }).value();
    console.log('ITEM TO BE REMOVED: ', itemRemoved);
    itemRemoved.stock += 1;
    console.log('ITEM TO BE REMOVED (STOCK): ', itemRemoved);
    db.get('Products').assign(itemRemoved).write();

    console.log('THIS IS THE CART: ', cart);
    let newCart = cart.filter(el => el.itemAddedId !== req.params._id);
    console.log('THIS IS THE NEW-CART: ', newCart);

    // let itemUpdated = cart.find(el => el.itemAddedId === req.params._id);
    // console.log('ITEM TO BE UPDATED: ', itemUpdated);
    // if (itemUpdated.quantity !== 1) {
    //     itemUpdated.quantity -= 1;
    //     newCart.push(itemUpdated);
    //     db.get('Cart').remove().write();
    //     db.get('Cart').assign(newCart).write()
    // } else {
    //     db.get('Cart').assign(newCart).write()
    //     console.log('CART: ', cart);
    //     db.get('Cart').remove().write();
    // }
    // res.send({ status: cart });


    cart.forEach(el => {
        if (el.itemAddedId === req.params._id) {
            console.log('MESSAGE: QUANTITY - 1');
            console.log('REQ.BODY.ID: ', req.params._id);
            console.log('ELEMENT: ', el);
            if (el.quantity === 1) {
                console.log('ITEM QUANTITY === 1');
                db.get('Cart').remove().write();
                db.get('Cart').assign(newCart).write()
            } else {
                console.log('ITEM QUANTITY !== 1');
                el.quantity -= 1;
                newCart.push(el);
            }
        }
    })

    // console.log(newCart);
    // db.get('Cart').remove().write();
    res.send({ status: cart })
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