const { Thought , User } = require('../models');

module.exports = {
    // GET ALL THOUGHTS
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // GET SINGLE THOUGHTS
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // ADD THOUGHT
    createThought(req, res) {
      Thought.create(req.body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            {},
            { $push: { thoughts: _id } },
            { new: true }
          )
        })
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Thought created, but found no user with that ID',
              })
            : res.json('Thought created!')
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // UPDATE THOUGHT
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this ID!' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // DELETE THOUGHT
    removeThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId }, { new: true, runValidators: true })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this ID!' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'Thought deleted but no user with this ID!' })
            : res.json({ message: 'Thought successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },
    // NEW REACTION
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this ID!' })
            : res.json(video)
        )
        .catch((err) => res.status(500).json(err));
    },
    // REMOVE REACTION
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this ID!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};