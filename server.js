const express = require('express');
const Sequelize = require('sequelize');
const { User, Photo } = require('./models');

const usersRouter = require('./routes/usersRouter');
const photosRouter = require('./routes/photosRouter')


const app = express();
app.use(express.json());

app.use('/users', usersRouter)
app.use('/photos', photosRouter)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.post('/users', async (req, res) => {
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



app.delete('/users/:id', async (req, res) => {      // '/users/:id' is a route param
    const { id } = req.params;      //destructuring the id
    const deletedUser = await User.destroy({
        where: {
            id
        }
    });
    res.json(deletedUser);
});

app.post('/users/:id', async (req, res) => {
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

app.get('/photos', async (req, res) => {
    const photos = await Photo.findAll();
    res.json(photos); 
});

app.post('/photos/:id', async (req, res) => {
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

app.get('/users/photos', async (req, res) => {
    const users = await User.findAll({
        include: [{
            model: Photo
        }]
    });
    res.json(users);
});

// Setting up PORT and link to Localhost
app.listen(process.env.PORT || 3000, () => {        //() => {} is a Callback
    console.log(`
    http://localhost:3000
    `);
});