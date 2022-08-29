const { Schema, model } = require('mongoose');

const CategSchema = Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true
    },
    status:{
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
}


module.exports = model('Categ', CategSchema);