 const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on('error', function (e) {console.error(e);});

//schema
let UserSchema  = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// hashes the password
UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

//model
let User = mongoose.model('User', UserSchema );

const insertUser = async (newUser) => {
    const user = new User({ name: newUser.name, 
                            email: newUser.email, 
                            password: newUser.password,
                        });
    await user.save()
};

const listUsers = async () => {
    return await User.find({}, 'name email')
                        .then(users => {
                            return users;
                        })
                        .catch(err => {
                            console.error(err);
                        });
};

const validateAuth = async (user) =>{    
    const userFound = await User.find({ email: user.email })
                                .then(user =>{
                                    return user;
                                })
                                .catch( err => {
                                    console.error(err);
                                });
    
    if (userFound.length > 0) {
        const compare = bcrypt.compareSync(user.password, userFound[0].password);
        return compare;
    } else {
        return false;
    }

};

const findVisitor = async (user) => {
    return await User.find({ email: user.email })
    .then(user =>{
        return user;
    })
    .catch( err => {
        console.error(err);
    });
};

module.exports = { insertUser, listUsers, validateAuth };