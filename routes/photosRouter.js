const express = require('express');
const router = express.Router();
const { User, Photo } = require('../models');      //pull a known export called User

app.get('/', async (req, res) => {
    const photos = await Photo.findAll();
    res.json(photos); 
});

app.post(':id', async (req, res) => {
    const { id } = req.params;   
    // Assuming that `req.body` is limited to
    // the keys firstName, lastName, and email
    const updatedPhoto = await Photo.update(req.body, {
      where: {
        id
      }
    });  
    res.json(updatedPhoto);
});

app.get('/users', async (req, res) => {
    const users = await User.findAll({
        include: [{
            model: Photo
        }]
    });
    res.json(users);
});
module.exports = router;