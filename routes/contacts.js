const express = require('express');
const router = express.Router();


const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll); // Get all contacts
router.get('/:id', contactsController.getSingle); // Get a single contact by ID

router.post('/', contactsController.createContact); // Create a new contact
router.put('/:id', contactsController.updateContact); // Update an existing contact

router.delete('/:id', contactsController.deleteContact); // Delete a contact

module.exports = router;
