import { addNewContact,
        getAllContacts,
        getIndividualContact,
        findAndUpdate,
        findAndDelete } from '../controllers/crmController';

import { loginRequired, login, registerUser } from '../controllers/userController';

const routes = (app) => {
    // Routes related to /contact
    app.route('/contact')
        .get((req,res,next) => {
            console.log(`Request is from ${req.originalUrl}`);
            next();
        }, loginRequired, getAllContacts)
        .post(loginRequired, addNewContact);
    
    // Routes related to /contact/:contactID
    app.route('/contact/:contactID')
        .get(loginRequired, getIndividualContact)
        .put(loginRequired, findAndUpdate)
        .delete(loginRequired, findAndDelete);

    // Registration Route
    app.route('/auth/register')
        .post(registerUser);
    
    // Login Route
    app.route('/auth/login')
        .post(login);

};

export default routes;