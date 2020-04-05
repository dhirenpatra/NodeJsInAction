import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModels';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req,res) => {
    let newContact = new Contact(req.body);
    newContact.save((err,contact) => {
        if(err)
            res.send(err);
        res.json(contact);
    });
}

export const getAllContacts = (req, res) => {
    Contact.find({} , (err, contacts) => {
        if(err)
            res.send(err);
        res.json(contacts);
    });
}

export const getIndividualContact = (req, res) => {
    Contact.findById(req.params.contactID,(err, contact) => {
        if(err)
            res.send(err);
        res.json(contact);
    });
}

export const findAndUpdate = (req, res) => {
    Contact.findOneAndUpdate({
        _id: req.params.contactID
    },
    req.body, 
    { new : true , useFindAndModify : false},
    (err, contact) => {
        if(err)
            res.send(err);
        res.json(contact);
    });
}

export const findAndDelete = (req, res) => {
    Contact.deleteOne({
        _id: req.params.contactID
    },
    (err, contact) => {
        if(err)
            res.send(err);
        res.json({ msg : `Successfully deleted contact with ID ${req.params.contactID}`});
    });
}