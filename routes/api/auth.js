const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route GET api/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.errore(err.message);
        res.status(500).send("Erreur Serveur!!!")
    }
});

// @route POST api/auth
// @desc Authentification User & get token
// @access Public
router.post('/', [
    check('email', "Merci d'écrire un email valide.").isEmail(),
    check('password', "Password requis.").exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const { email, password } = req.body;

    try {
        //Verification si l'user existe déja par l'adresse email
        let user = await User.findOne({ email });

        if(!user) {
            return res
                .status(400)
                .json({ errors : [{ msg: "Informations d'identification invalides !" }] });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res
                .status(400)
                .json({ errors : [{ msg: "Informations d'identification invalides !" }] });
        }

        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
        //res.send('Utilisateur engegistré');
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Erreur Server.');
    }
});
module.exports = router;