const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on('error', function (e) {console.error(e);});

//schema
let VisitorSchema  = mongoose.Schema({
    name: String,
    count: {type: Number, default: 1},
});

//model
let Visitor = mongoose.model('Visitor', VisitorSchema );

const insertVisitor = async (name) => {

    const visitor = new Visitor({ name: name || "Anónimo" });
    await visitor.save()

    return 'El visitante fue almacenado con éxito';
};

const findVisitor = async (name) => {
    return await Visitor.find({ name: name })
    .then(visitor =>{
        return visitor;
    })
    .catch( err => {
        console.error(err);
    });
};

const updateCountVisitor = async (visitor) => {
    await Visitor.findByIdAndUpdate({_id: visitor[0]._id}, {$set: {count: visitor[0].count + 1}})
                    .then(visitor =>{
                        return visitor;
                    })
                    .catch(err =>{
                        console.error(err);
                    });
};

const listVisitors = async () => {
    return await Visitor.find({}, 'name count')
                        .then(visitors => {
                            return visitors;
                        })
                        .catch(err => {
                            console.error(err);
                        });
};

module.exports = { insertVisitor, findVisitor, updateCountVisitor, listVisitors };