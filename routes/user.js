const express = require('express');

const router = express.Router();
const { 
    handleGetAllUsers, 
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
} = require('../controllers/user')


// post and get route
router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)



//manipulate user by id
router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)


// all users using SSR(server side rendering) for HTML
// router.get('/users', (req, res) => {
//     let html = '<ul>';
//     users.map((user) => {
//         html += `<li>${user.first_name}</li>`;
//     })
//     html += '</ul>';
//     return res.send(html);
// })
// router.route('/users/:id')
//     .get((req, res) => {
//         const id = Number(req.params.id);
//         const user = users.find((user) => user.id === id);
//         let html = '';
//         if (user){
//             html += `<p>My name is ${user.first_name}, I am a ${user.occupation}.</P>`;
//         } else {
//             res.status(400);
//             html += 'User does not exist';
//         }
//         res.setHeader("x-name", "Matthew"); //custom header
//         return res.send(html);
//     })
//     .delete((req, res) => {
//         const id = Number(req.params.id);
//         const user = users.find((user) => user.id === id);
//         let html = '';
//         if (user) {
//             const userIndex = users.indexOf(user);
//             users.splice(userIndex, 1);
//             rewriteUser();
//             html += `${userIndex + 1}, ${user.first_name} deleted successfully`;
//         } else {
//             res.status(400);
//             html += `user not found`;
//         }
//         return res.send(html);
//     })


    

module.exports = router;