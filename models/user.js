const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please Enter an Email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please Enter an password'],
        minlength:[6, 'Minimum password length is 6 character']
    }
});

// userSchema.post('save',function(doc,next) {
//     console.log("user was created",doc);
//     next();
// });

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;