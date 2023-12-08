import express from 'express';
import xss from 'xss';
import validation from '../validation.js'
import { addStore } from '../data/stores.js';
import { bindStoreWithUser } from '../data/users.js';
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        res.status(200).render('addStore', {
            title: "add store",
            selected: { default: 'selected' }
        })
    })
    .post(async (req, res) => {
        const adminId = req.session.user.id;
        let address = xss(req.body.address).trim();
        let city = xss(req.body.city).trim();
        let state = xss(req.body.state).trim();
        let zipCode = xss(req.body.zipCode).trim();
        let phoneNumber = xss(req.body.phoneNumber).trim();
        let email = xss(req.body.email).trim();
        let errors = [];
        try {
            const location = {
                address: address,
                city: city,
                state: state,
                zip: zipCode,
            }
            validation.checkIfLocationValid(location);
        } catch (e) {
            errors.push(e);
            const selected = { default: 'selected' };
            return res.status(400).render('addStore', {
                title: "add store",
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                phoneNumber: phoneNumber,
                email: email,
                selected: selected,
                hasErrors: true,
                errors: errors,
            });
        }
        try {
            validation.checkIfPhoneNumberValid(phoneNumber);
            validation.checkEmail(email, "E-mail");
        } catch (e) {
            errors.push(e);
            const selected = { [`${state}`]: 'selected' };
            return res.status(400).render('addStore', {
                title: "add store",
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                phoneNumber: phoneNumber,
                email: email,
                selected: selected,
                hasErrors: true,
                errors: errors,
            });
        }
        let storeId;
        try {
            storeId = await addStore({
                adminId: adminId,
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                phoneNumber: phoneNumber,
                email: email,
            });
        } catch (e) {
            errors.push(e);
            return res.status(400).render('addStore', {
                title: "add store",
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                phoneNumber: phoneNumber,
                email: email,
                hasErrors: true,
                errors: errors,
            });
        }
        try {
            const insertedStore = await bindStoreWithUser(storeId, adminId);
            if (insertedStore.insertStore) {
                return res.status(200).redirect(`/store/${storeId}`);
            } else {
                return res.status(400).render('addStore', {
                    title: "add store",
                    address: address,
                    city: city,
                    state: state,
                    zipCode: zipCode,
                    phoneNumber: phoneNumber,
                    email: email,
                    hasErrors: true,
                    errors: errors,
                });
            }
        } catch (e) {
            errors.push(e);
            return res.status(400).render('addStore', {
                title: "add store",
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                phoneNumber: phoneNumber,
                email: email,
                hasErrors: true,
                errors: errors,
            });
        }
    })

export default router;