const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Contacts']
    mongodb.getDatabase().db('contacts').collection('contacts').find().toArray((err, contacts) => {
        if (err) {
            res.status(400).json({ message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const userId = new ObjectId(req.params.id);
    mongodb.getDatabase().db('contacts').collection('contacts').find({ _id: userId }).toArray((err, contacts) => {
        if (err) {
            res.status(400).json({ message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db('contacts').collection('contacts').insertOne(contact);
    if (result.acknowledged) {
        res.status(201).send();
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db('contacts').collection('contacts').updateOne({ _id: userId }, { $set: contact });
    if (result.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('contacts').collection('contacts').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};