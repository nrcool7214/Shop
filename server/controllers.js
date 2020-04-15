const path = require('path')
const db = require('./database')

const getIndexHTML = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"))
};

// ALL INFORMATION RELATED TO THE CART:


const addToCart = (req, res) => {
    // console.log('REQ: ', req);
    const requestedId = req.body._id;

    const requestedProduct = db.get('Products').find({ _id: requestedId }).value();
    // console.log('REQ_PROD: ', requestedProduct);
    requestedProduct.stock -= 1;
    db.get('Products').assign(requestedProduct).write();

    const itemAddedId = requestedProduct._id;
    const itemAddedName = requestedProduct.name;
    const itemAddedPrice = requestedProduct.price;
    const itemAddedQuantity = requestedProduct.initial_stock - requestedProduct.stock;
    let itemAddedStock = requestedProduct.stock;
    let itemAdded = { itemAddedId, itemAddedName, itemAddedPrice, itemAddedQuantity, itemAddedStock };
    // console.log('itemAdded: ', itemAdded);
    console.log('CART BEFORE: ', db.get('Cart').value());

    let cart = db.get('Cart').value();

    const itemAddedIndex = cart.findIndex(el => el.itemAddedId === requestedId);
    // console.log('itemAddedIndex: ', itemAddedIndex);
    if (itemAddedIndex !== -1) {
        cart[itemAddedIndex].itemAddedStock -= 1;
        cart[itemAddedIndex].itemAddedQuantity += 1;
    } else {
        itemAddedStock -= 1;
        cart.push(itemAdded);
    }

    db.get('Cart').assign(cart).write()
    console.log('CART NOW: ', cart);
    res.send({ cart: cart });
}

const removeItem = (req, res) => {
    // console.log('REQ.PARAMS: ', req.params);
    const requestedId = req.params._id;

    const requestedProduct = db.get('Products').find({ _id: requestedId }).value();
    // console.log('REQ_PROD: ', requestedProduct);
    requestedProduct.stock += 1;
    db.get('Products').assign(requestedProduct).write();

    // console.log('CART BEFORE: ', db.get('Cart').value());

    let cart = db.get('Cart').value();

    const itemAddedIndex = cart.findIndex(el => el.itemAddedId === requestedId);
    console.log('itemAddedIndex: ', itemAddedIndex);
    if (cart[itemAddedIndex].itemAddedQuantity > 1) {
        cart[itemAddedIndex].itemAddedQuantity -= 1;
    } else {
        cart.splice(itemAddedIndex, 1);
    }

    db.get('Cart').assign(cart).write();
    // console.log('CART NOW: ', cart);
    res.send({ cart: cart });
}

const removeAllItems = (req, res) => {
    let allProducts = db.get('Products').value();
    allProducts.map(el => el.stock = 10);
    db.get('Products').assign(allProducts).write()

    let cart = db.get('Cart').value();
    cart = [];
    db.get('Cart').remove().write();
    db.get('Cart').assign(cart).write()
    res.send({ cart: cart });
}

// USER INFORMATION:

// to do


module.exports = { getIndexHTML, addToCart, removeItem, removeAllItems };