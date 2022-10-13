const { User, Thought } = require('../models');

module.exports = {
    //GET ALL USERS
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //GET SINGLE USER
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // NEW USER
    createUser(req, res) {
      User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    // UPDATE USER
    updateUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    // DELETE USER & THOUGHTS
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User deleted!' }))
          .catch((err) => res.status(500).json(err));
    },
    // NEW FRIEND
    newFriend(req, res) {
        User.create(req.body)
          .then((friendData) => res.json(friendData))
          .catch((err) => res.status(500).json(err));
      },
    // REMOVE FRIEND
    removeFriend(req, res) {
        User.findOneAndDelete({ _id: req.params.friendId })
          .then(() => res.json({ message: 'Friend deleted!' }))
          .catch((err) => res.status(500).json(err));
    },
  };