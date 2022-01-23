const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const sendSms = require('../utils/sendSMS');
const sendEmail = require('../utils/sendEmail');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    if(order){
        try {

            await sendEmail({
                email: req.user.email,
                subject: 'shop-mo.app - Order Placed',
                message: order.orderItems.map(item => `${item.product.name} x ${item.quantity}`).join('\n')
            })
            console.log('Email sent')
        } catch (err) {console.log(err)}
    }

    res.status(200).json({
        success: true,
        order
    })
})


// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})


// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    const user  = await User.findById(order.user)

    const message = `Your order has been processed. Your order ID is ${order._id}.
 Please check your orders at https://www.shop-mo.app/order/me for more details.`;
    

    
       // sendSms(/*order.shippingInfo.phone, `Your order ${order.orderNumber} has been delivered.`*/)
        try {

            await sendEmail({
                email: user.email,
                subject: 'shop-mo.app - Order Processed',
                message
            })
            console.log('Email sent')
        } catch (err) {console.log(err)}

        if (order.orderStatus === 'Delivered') {

        return next(new ErrorHandler('Order already delivered', 400))
    }
    

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}

// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})