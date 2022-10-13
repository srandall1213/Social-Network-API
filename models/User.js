const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        // username: string, unique, required, trimmed
        username: { 
            type: String, 
            unique: true, 
            required: true, 
            trim: true 
        },
        // email: string, required, unique, matches a valid email
        email: { 
            type: String, 
            required: true, 
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        // thoughts: array of _id values referencing the Thought model
        thoughts: [
            { 
                type: Schema.Types.ObjectId,
                ref: 'Thought' 
            }
        ],
        // friends: array of _id values referencing the User model (self-reference)
        friends: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'User' 
            }
        ],
    },
    {
        toJSON: { 
            virtuals: true 
        },
        id: false,
    }
);

// virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('User', userSchema);

module.exports = User;