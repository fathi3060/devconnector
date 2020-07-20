const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

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

// @route POST api/profile
// @desc Creation ou modification du profile user
// @access Private
router.post(
    '/',
    auth,
    [
        check('status', 'Statut requis')
            .not()
            .isEmpty(),
        check('skills', 'Skills requis')
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //construction objet profile
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        //construction oject Social
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if(profile) {
                //update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Creation du Profile
            profile = new Profile(profileFields);
            
            await profile.save();
            res.json(profile);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Erreur Serveur.');
        }
        res.send('Hello');

    }

);


// @route GET api/profile
// @desc GET la liste de tous les profiles
// @access Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur Serveur.');
    }
});

// @route GET api/profile/user/:user_id
// @desc GET profile par son user ID
// @access Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']);

        if (!profile) 
            return res.status(400).json({msg: "Profile inexistant."});

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind = "ObjectId") {
            return res.status(400).json({msg: "Profile inexistant."});
        }
        res.status(500).send('Erreur Serveur.');
    }
});

// @route DELETE api/profile
// @desc Delete profile, user & posts
// @access Private

router.delete('/', auth, async (req, res) => {
    try {
        // @todo supprimer les posts users
        // Remove profile
        await Profile.findOneAndRemove( {user: req.user.id});
        // Remove user
        await User.findOneAndRemove( { _id: req.user.id});
        res.json({msg: "Utilisateur supprimé !"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur Serveur.');
    }
});

// @route PUT api/profile/experience
// @desc Add profile experience
// @access Private
router.put('/experience', [
        auth,
        [
            check('title', 'Titre requis.')
                .not()
                .isEmpty(),
            check('company', 'Compagnie requis.')
                .not()
                .isEmpty(),
            check('from', 'Date de : requis.')
                .not()
                .isEmpty(),
        ]
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({user: req.user.id});

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Erreur Serveur.");
        }
    }
);

// @route DELETE api/profile/experience/:exp_id
// @desc delete experience from profile
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        //recuperation de l'index à supprimer
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);
        
            profile.experience.splice(removeIndex,1);

            await profile.save();

            res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur.");
    }
});
//************************************/
//EDUCATION
//************************************/
// @route PUT api/profile/education
// @desc Add profile education
// @access Private
router.put(
    '/education', 
    [
        auth,
        [
            check('school', 'Ecole requis.')
                .not()
                .isEmpty(),
            check('degree', 'Niveau requis.')
                .not()
                .isEmpty(),
            check('fieldofstudy', "Domaine d'étude requis.")
                .not()
                .isEmpty(),
            check('from', 'Date de : requis.')
                .not()
                .isEmpty(),
        ]
    ], 
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur.");
    }
}
);

// @route DELETE api/profile/education/:edu_id
// @desc delete education à partir profile
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
try {
    const profile = await Profile.findOne({user: req.user.id});
    //recuperation de l'index à supprimer
    const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
    
        profile.education.splice(removeIndex,1);

        await profile.save();

        res.json(profile);

} catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur Serveur.");
}
});


module.exports = router;
