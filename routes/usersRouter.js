const express = require('express');
const router = express.Router();
const { User, Photo } = require('../models');      //pull a known export called User

// ----------------------------------------------------------------------------
//                                GET ALL                                      
// ----------------------------------------------------------------------------
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get('/photos', async (req, res) => {
    const users = await User.findAll({
        include: [{
            model: Photo
        }]
    });
    res.json(users);
});

// ----------------------------------------------------------------------------
//                                CREATE                                      
// ----------------------------------------------------------------------------
router.post('/', async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const newUser = await User.create({
        firstName,
        lastName,
        email
    });

    res.json({
        "message": "new user created successfuly",
        "id": newUser.id
    });
});

// ----------------------------------------------------------------------------
//                                UPDATE                                       
// ----------------------------------------------------------------------------
router.post('/:id', async (req, res) => {
    const { id } = req.params;   
    // Assuming that `req.body` is limited to
    // the keys firstName, lastName, and email
    const updatedUser = await User.update(req.body, {
      where: {
        id
      }
    });  
    res.json(updatedUser);
});

// ----------------------------------------------------------------------------
//                                DELETE                                       
// ----------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {      // '/users/:id' is a route param
    const { id } = req.params;      //destructuring the id
    const deletedUser = await User.destroy({
        where: {
            id
        }
    });
    res.json(deletedUser);
});

module.exports = router;