const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { contactRules, validate } = require('../middleware/validate');

router.get('/', contactsController.getAll); // Get all contacts
router.get('/:id', contactsController.getSingle); // Get a single contact by ID

// Apply validation rules to POST and PUT routes
router.post('/', contactRules(), validate, contactsController.createContact); // Create a new contact
router.put('/:id', contactRules(), validate, contactsController.updateContact); // Update an existing contact

router.delete('/:id', contactsController.deleteContact); // Delete a contact

module.exports = router;
