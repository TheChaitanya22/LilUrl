const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    }
})


const urlSchema = new Schema({
    longUrl: {
        type: String,
        required: true
    },

    shortCode: {
        type: String,
        required: true,
        unique: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    clicks: {
        type: Number,
        default: 0
    }

})

const User = mongoose.model("User", userSchema);
const Url = mongoose.model("Url", urlSchema);

module.exports = {
    User,
    Url,
};