const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    newFriend,
    removeFriend
} = require('../../controllers/userController');
  
// /api/user
// GET ALL users
// POST a new user
router
    .route('/')
    .get(getUsers)
    .post(createUser);
  
// /api/user/:userId
// GET SINGLE user by _id & populated thought & friend data
// PUT to update a user by its _id
// DELETE to remove user by its _id
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends
// POST to add a new friend to a user's friend list
router.route('/:userId/friends').post(newFriend);

// /api/users/:userId/friends/:friendId
// DELETE to remove a friend from a user's friend list
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;