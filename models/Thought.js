const { Schema, Types, model } = require('mongoose');

// used as the reaction field's subdocument schema in the Thought model
const reactionSchema = new Schema(
    {
    // reactionId: Mongoose's ObjectId data type, default value is set to a new ObjectId
        reactionId: { 
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId() 
        },
        // reactionBody: string, required, 280 character max
        reactionBody: { 
            type: String, 
            required: true, 
            maxlength: 280 
        },
        // username: string, required
        username: { 
            type: String, 
            required: true 
        },
        // createdAt: date, default to current timestamp, getter method to format the timestamp on query
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: (date) => formatDate(date)
        },

    },
    {
        toJSON: { 
            getters: true 
        },
        id: false,
    }
);

const thoughtSchema = new Schema(
    {
        // thoughtText: string, required, between 1-280 characters
        thoughtText: { 
            type: String, 
            required: true, 
            minlength: 1, 
            maxlength: 280 
        },
        // createdAt: date, default to current timestamp, getter method to format the timestamp on query
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: (date) => formatDate(date)
        },
        // username: string, required
        username: { 
            type: String, 
            required: true 
        },
        // reactions: array of nested documents created with the reactionSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: { 
            getters: true,
            virtuals: true 
        },
        id: false,
    }
);

//formats queried timestamps
function formatDate(timeStamp) {
    let formattedDate =
        timeStamp.toLocaleDateString
        ('en-us', 
            { 
                year:"numeric", 
                month:"numeric", 
                day:"numeric", 
                hour:"2-digit", 
                minute:"2-digit", 
            }
        )
    return formattedDate;
}

// virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;