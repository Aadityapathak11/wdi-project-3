var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Prompt   = require('./prompt');
var Story    = require('./story');



/// Schema configuration
var UserSchema = new mongoose.Schema({
    local: {
        penName: String,
        email: String,
        password: String
    },
    prompts: [{type: mongoose.Schema.ObjectId, ref: 'Prompt'}],
    stories: [{type: mongoose.Schema.ObjectId, ref: 'Story'}]

});

UserSchema.methods.encrypt = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);

