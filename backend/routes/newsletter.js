const express = require('express')
const router = express.Router();

const {
    createNewsletter,
    getAllNewsletters,

    getSingleNewsletter
} = require('../controllers/newsletterController');

router.route('/newsletters').get(getAllNewsletters);
router.route('/newsletter').post(createNewsletter);
router.route('/newsletter/:id').get(getSingleNewsletter);

module.exports = router;