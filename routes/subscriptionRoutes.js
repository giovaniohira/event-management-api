const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:id/subscribe', authMiddleware, subscriptionController.subscribeToEvent);
router.delete('/:id/unsubscribe', authMiddleware, subscriptionController.unsubscribeFromEvent);

module.exports = router;
