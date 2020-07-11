const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const { models } = require('mongoose');
const User = require('../../models/User');

// @route POST api/users
// @desc Register User
// @access Public
router.post('/', [
    check('name', 'Votre nom est obligatoire.')
    .not()
    .isEmpty(),
    check('email', "Merci d'écrire un email valide.").isEmail(),
    check('password', "Merci d'ecrire un mot de passe de plus de 6 caractères.")
    .isLength({min: 6})
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
const { name, email, password } = req.body;

try {
    //Verification si l'user existe déja par l'adresse email
    let user = await User.findOne({ email });

    if(user) {
        return res
            .status(400)
            .json({ errors : [{ msg: "L'utilisateur existe déjà !" }] });
    }
    //Get users gravatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });

    user = new User({
        name,
        email,
        avatar,
        password
    });

    //Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

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