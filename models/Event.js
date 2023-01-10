const { Schema, model } = require('mongoose');

const EventSchema = Schema({

    title: {
        type: String,
        require: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }
    
});

EventSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    return {
        id: _id,
        ...object
    }
})

module.exports = model('Event', EventSchema);