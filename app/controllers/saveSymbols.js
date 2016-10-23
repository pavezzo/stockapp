const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    symbols: Array
})

const Data = mongoose.model('data', dataSchema)


exports.save = (symbol) => {

    Data.findOne({}, (err, thisData) => {
        thisData.symbols.push(symbol);
        thisData.save()
    })
}


exports.view = (callback) => {

    Data.findOne({}, (err, thisData) => {
        if (thisData) {
            callback(thisData.symbols)
        } else {
            const initialData = new Data({symbols: []});
            initialData.save()
            callback(initialData.symbols)
        }
    })
}


exports.delete = (symbol) => {

    Data.findOne({}, (err, thisData) => {
        for (var i = 0; i < thisData.symbols.length; i++) {
            if (thisData.symbols[i] === symbol) {
                thisData.symbols.splice(i, 1);
            }
        }
        thisData.save()
    })
}
