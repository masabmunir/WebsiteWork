var express = require('express');
const router = express.Router();
const userdata = require('./userinfo.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ObjectID = require('mongoose').Types.ObjectId;

//Get Api

router.get('/', (req, res) => {
    userdata.find((err, doc) => {
        if (err) {
            console.log('Error in get Data' + err)
        } else {
            res.send(doc);
        }
    })
});


//Get Id of Single Person

router.get('/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
        userdata.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in get data' + err)
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(400).send('No record found with ID' + req.params.id);
    }
});




//Post Api

router.post('/signUp', async (req, res) => {
    try {

        let user = await new userdata({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            contact: req.body.contact
        }).save()


        
        return res.status(200).json
            ({
                Message: "Success",
                user: user
            })

    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Error",
            error: error
        })
    }

});


// Data Post Inside Website

router.post('/addUser', async (req, res) => {
    try {

        let user = await new userdata({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            contact: req.body.contact
        }).save()

        return res.status(200).json
            ({
                Message: "Success",
                user: user
            })

    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Error",
            error: error
        })
    }

});

// Ends Here

// Api of Login Component

router.post('/loginUser', async (req, res) => {
    const { email, password } = req.body;
    userdata.findOne({ email: email }, async(err, userdata) => {
        if (userdata) {
            //const validPassword = await bcrypt.compare(body.password, user.password);
            if (password === userdata.password) {
                // res.send({ message: "login successfully", userdata: userdata })
                const token = await userdata.generateAuthToken();
                console.log("token is " + token);

                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 30000),
                    httpOnly: true
                });
                res.send({ message: "login successfully", userdata: userdata })
            } else {
                res.send({ message: "wrong credentials" })
            }
        }
        else {
            res.send("not register")
        }
    })
});



//Put ( Update ) Data

router.put('/:id', (req, res) => {

    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        contact: req.body.contact
    }

    if (ObjectID.isValid(req.params.id)) {
        userdata.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
            if (err) {
                console.log('Data is Deleted' + err)
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(400).send('No record found with ID' + req.params.id);
    }
});


// Delete Data

router.delete('/:id', (req, res) => {

    if (ObjectID.isValid(req.params.id)) {
        userdata.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log('Data is Deleted' + err)
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(400).send('No record found with ID' + req.params.id);
    }
});


module.exports = router;