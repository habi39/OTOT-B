import contactModel from '../models/contact-model.js';

// Handle index actions
export async function getContact(req, res) {
    try {
        contactModel.find(function (err, contacts) {
            const contactMsg = contacts.length? "contacts retrieved":"no contacts stored"
            if (err) {
                return res.json({
                    status: "error",
                    message: err,
                });
            }
            return res.json({
                status: "success",
                message: contactMsg,
                data: {
                    count: contacts.length,
                    contacts: contacts
                }
            });
        });
    }   catch (err) {
        return res.status(500).json({message: 'Database failure when finding contact!'})
    }
};
// Handle create contact actions
export async function createContact(req, res) {
    try {
        var contact = new contactModel();
        if (!(req.body.email && req.body.name)) {
            return res.status(400).json({message: 'email and name has to be specified'});
          }
        contact.name = req.body.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
    // save the contact and check for errors
        contact.save(function (err) {
            if (err){
                return res.json(err);
            }
                
        return res.status(200).json({
                message: 'successfully added contact',
                data: contact
            });
        });
    }   catch (err) {
        return res.status(500).json({message: 'Database failure when creating new contact!'})
    }
};
// Handle view contact info
export async function viewContact(req, res) {
    try {
    contactModel.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        if(contact==null){
            return res.status(400).json({
                message: "user not found",
            });
        }
        return res.json({
            message: 'Contact details loading..',
            data: contact
        });
        
    });
    }   catch (err) {
        return res.status(500).json({message: 'Database failure when viewing contacts!'})
    }
};
// Handle update contact info
export async function updateContact(req, res) {
    try {
    if (!req.params.contact_id) {
        return res.json({
            message: 'No contact id provided',
        });
    }
    contactModel.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        if(contact==null){
            return res.status(400).json({
                message: "user not found",
            });
        }
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender ? req.body.gender : contact.gender;
        contact.email = req.body.email ? req.body.email : contact.email;
        contact.phone = req.body.phone ? req.body.phone : contact.phone;
        // save the contact and check for errors
        contact.save(function (err) {
            if (err){
                return res.json(err);
            }
               
            return res.json({
                message: 'Contact Info updated',
                data: {
                    updated: contact
                }
            });
        });
    });
    }   catch (err) {
        return res.status(500).json({message: 'Database failure when updating contact!'})
    }
};
// Handle delete contact
export async function deleteContact(req, res) {
    try {
        if (!req.params.contact_id) {
            return res.json({
                message: 'No contact id provided',
            });
        }
        contactModel.findById(req.params.contact_id, function (err, contact) {
            if(contact==null){
                return res.status(400).json({
                    message: "user not found",
                });
            }
            contactModel.deleteOne({
                _id: req.params.contact_id
            }, function (err, contact) {
                if (err){
                    return res.send(err);
                }
                if(contact==null){
                    return res.json({
                        status: "error",
                        message: "user not found",
                    });
                }
                return res.json({
                    status: "success",
                    message: 'successfully removed contact',
                });
            });
        
        })

    }   catch (err) {
        return res.status(500).json({message: 'Database failure when deleting contact!'})
    }
    
};