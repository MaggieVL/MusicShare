const express = require('express');

const router = express.Router();

router.post('/login', async (req, res) => {
    const users = await req.app.locals.db.collection('users').find().toArray();
    console.log(users);
    const user = users.find(user => user.email == req.body.email )
    
    console.log('ín post request');
    if(user == null) {
        return res.status(400).send('User not registered.');
    }

    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Passwords match');
        } else {
            res.send('Invalid username or password')
        }
    } catch {
        res.status(500).send("Internal server error");
    }
});

module.exports = router;