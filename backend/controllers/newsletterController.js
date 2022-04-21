const Newsletter = require('../models/newsletter');

const ErrorHandler = require('../utils/errorHandler');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Add mail to list   =>   /api/cosmotech/newsletter
exports.createNewsletter = catchAsyncErrors(async (req, res, next) => {
    const newsletter = await Newsletter.create(req.body);

    res.status(201).json({
        success: true,
        newsletter
    })
})

//get all mail in list => /api/cosmotech/newsletters
exports.getAllNewsletters = catchAsyncErrors(async (req, res, next) => {

    const newsletters = await Newsletter.find();

    if (!newsletters) {
        return next(new ErrorHandler('No mail found found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: newsletters
    });
});

//get single mail => /api/cosmotech/newsletter/:id
exports.getSingleNewsletter = catchAsyncErrors(async (req, res, next) => {

    const newsletter = await Newsletter.findById(req.params.id);

    if (!newsletter) {
        return next(new ErrorHandler('No mail found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: newsletter
    });
});


