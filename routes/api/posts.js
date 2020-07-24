const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/posts
// @desc Creation d'un post
// @access Private
router.post(
    '/',
    [
        auth, 
        [
            check('text', 'Texte requis !')
                .not()
                .isEmpty()
        ] 
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });
            const post = await newPost.save();
            res.json(post);
                
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Erreur Serveur.");
        }
    }
);

// @route GET api/posts
// @desc Get tous les posts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur.");
    }
});

// @route GET api/posts/:id
// @desc Get post par son ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
    const post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json({ msg: 'Post non trouvé...' });
    }

    res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post non trouvé...' });
        }
        res.status(500).send("Erreur Serveur.");
    }
});

// @route DELETE api/posts/:id
// @desc Delete un post
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
    const post = await Post.findById(req.params.id);

    if(!post) {
        return res.status(404).json( { msg: "Post non trouvé" });
    }
    //Check user
    if(post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Utilisateur non autorisé.' });
    }

    await post.remove();

    res.json({ msg: 'Post supprimé.'});

    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post non trouvé...' });
        }
        res.status(500).send("Erreur Serveur.");
    }
});

// @route PUT api/posts/like/:id
// @desc like un post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //On check si le post a déjà été liké
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post déjà liké !' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur Serveur.');
        
    }
});


// @route PUT api/posts/unlike/:id
// @desc unlike un post
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //On check si le post a déjà été liké
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "Le message n'a pas encore été liké !" });
        }

        //On recherche l'index du like
        const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur Serveur.');
        
    }
});

// @route POST api/posts/comment/:id
// @desc Commentaire dans un post
// @access Private
router.post(
    '/comment/:id',
    [
        auth, 
        [
            check('text', 'Texte requis !')
                .not()
                .isEmpty()
        ] 
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);

            await post.save();

            res.json(post.comments);
                
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Erreur Serveur.");
        }
    }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Suppression d'commentaire dans un post
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //retirer le commentaire
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //Soyons sur que le commentaire existe
        if(!comment) {
            return res.status(404).json({ msg: "Ce commentaire n'existe pa..." });
        }
        //Check Utilisateur
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Utilisateur non autorisé." })
        }

        //On recherche l'index du like
        const removeIndex = post.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur.");
    }
});

module.exports = router;