const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/me
// @desc Obtenir le profile de l'utilisateur courant
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
        ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({msg: "Il n'y a pas de profile pour cette utilisateur."});
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur !!!");
    }
});

module.exports = router;