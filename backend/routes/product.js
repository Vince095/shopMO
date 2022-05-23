const express = require('express')
const router = express.Router();


const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getSoldOutProducts,
    createProductReview,
    getProductReviews,
    deleteReview,
    getProductFromSeller,

} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/seller/products').get(getProductFromSeller);

router.route('/product/:id').get(getSingleProduct);
router.route('/admin/soldOut').get(getSoldOutProducts);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin','seller'), newProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin','seller'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin','seller'), deleteProduct);


router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports = router;