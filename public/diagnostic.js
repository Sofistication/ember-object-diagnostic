/// Ember Object Diagnostic ///
import Ember from 'ember';

// Use Ember Objects and Classes to represent a shopping cart!
// Your abstractions will be `Cart` and `Order`.
//
// An Order should have
//  -  a unit price
//  -  a quantity
//  -  a computed property called `orderPrice`, equal to price times quantity

const Order = Ember.Object.extend({
  productName: null,
  unitPrice: null,
  quantity: null,

  orderPrice: Ember.computed('unitPrice', 'quantity', function () {
    return this.unitPrice * this.quantity;
  })
});

// A Cart should have
//  -  an `addToCart` method, which adds a given Item to an array
//      called `orders` (HINT: You'll probably need to look through the
//      documentation for this one.)
//  -  a computed property called `totalPrice`, equal to the sum of
//      the `orderPrice` values for everything in the cart); it should be
//      recalculated any time an Order is added to the cart, removed from the
//      cart, or modified.

const Cart = Ember.Object.extend({
  orders: [],

  totalPrice: Ember.computed('orders', function () {
    return this.orders.reduce((acc, val) => acc += val.get('orderPrice'), 0);
  }),

  addToCart(name, price, quantity) {
    this.orders.push(Order.create({
      productName: name,
      unitPrice: price,
      quantity: quantity
    }));
    return this; // allow method chaining
  }
});

// Once you've created the necessary Ember Classes, create a new Cart instance,
//  and fill that cart up with three new product orders having the following
//  quantities, product names, and prices:
//  -  Order 1 : 2 hats ($5 each)
//  -  Order 2 : 1 desk lamp ($20 each)
//  -  Order 3 : 3 hand towels ($8 each)

const myCart = Cart.create();

myCart.addToCart('hats', 5, 2)
      .addToCart('desk lamp', 20, 1)
      .addToCart('hand towels', 8, 3);
