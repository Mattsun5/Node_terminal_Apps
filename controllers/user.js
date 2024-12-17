const User = require('../models/user');

// get all users
async function handleGetAllUsers(req, res) {
    const users = await User.find({ });
    if (!users){
        return res.status(400).json({msg: 'no users found'});
    }
    return res.json(users);
}

// get one user
async function handleGetUserById(req, res) {
    const user = await User.findById({_id: req.params.id});
    if (!user){
        return res.status(400).json({msg: 'user not found'});
    }
    return res.json(user);
}

// update user
async function handleUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id, {first_name: 'updated'});
    return res.json({status: 'success'});
}

// delete user
async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: 'success'})
}

// create user
async function handleCreateNewUser(req, res) {
    if (
        !req.body.first_name||
        !req.body.last_name||
        !req.body.email||
        !req.body.gender||
        !req.body.occupation
    ) {
        return res.status(400).json({ msg: 'all field is required'});
    }

    const result = await User.create({
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "gender": req.body.gender,
        "occupation": req.body.occupation
    });

    return res.status(201).json({ status: 'success', id: result._id});
    
}

module.exports = { 
    handleGetAllUsers, 
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}