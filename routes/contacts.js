const express = require('express');
const router = express.Router();


const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate.js');

router.get('/', contactsController.getAll); // Get all contacts
router.get('/:id', contactsController.getSingle); // Get a single contact by ID

router.post('/', validation.saveContact, contactsController.createContact); // Create a new contact
router.put('/:id', validation.saveContact, contactsController.updateContact); // Update an existing contact

router.delete('/:id', contactsController.deleteContact); // Delete a contact

module.exports = router;
