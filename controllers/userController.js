const { User, Thought } = require('../models');

module.exports = {
    // GET ALL USERS
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // GET SINGLE USER
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
    // ADD USER
    createUser(req, res) {
      User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    // UPDATE USER
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this ID!' })
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
          .then(() => res.json({ message: 'User & their thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
    },
    // ADD FRIEND
    addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this ID!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // REMOVE FRIEND
    removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true },
        )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this ID!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
}