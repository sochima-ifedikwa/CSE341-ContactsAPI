const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const result = await mongodb.getDatabase().db('contacts').collection('contacts').find();
        const contacts = await result.toArray();
        
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message:error})
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('contacts').collection('contacts').find({ _id: userId });
        const contacts = await result.toArray();

        // Check if contact exists
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({
                message: `Contact with ID ${req.params.id} not found`
            });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    } catch (error) {
        res.status(500).json({ message:error});
    }
};

const createContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        
        const result = await mongodb.getDatabase().db('contacts').collection('contacts').insertOne(contact);
        
        if (result.acknowledged) {
            res.status(201).json({
                message: 'Contact created successfully',
                contactId: result.insertedId
            });
        } else {
            res.status(500).json({ 
                message: 'Failed to create contact'
            });
        }
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ 
            message: 'Error creating contact',
            error: error.message 
        });
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        // Validate ID format
        if (!req.params.id || !ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid contact ID format'
            });
        }

        const userId = new ObjectId(req.params.id);
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const result = await mongodb.getDatabase().db('contacts').collection('contacts').updateOne(
            { _id: userId }, 
            { $set: contact }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: `Contact with ID ${req.params.id} not found`
            });
        }

        if (result.modifiedCount > 0) {
            res.status(200).json({
                message: 'Contact updated successfully'
            });
        } else {
            res.status(200).json({
                message: 'No changes made to the contact'
            });
        }
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ message:error });
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        // Validate ID format
        if (!req.params.id || !ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid contact ID format'
            });
        }

        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('contacts').collection('contacts').deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: `Contact with ID ${req.params.id} not found`
            });
        }

        res.status(200).json({
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            message: 'Error deleting contact',
            error: error.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};