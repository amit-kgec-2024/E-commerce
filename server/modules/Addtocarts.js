const mongoose = require('mongoose')

const addtocartSchema = mongoose.Schema({
    userId: {
        type: String
    },
    productId: {
        type: String
    }
})

const AddToCarts = mongoose.model('AddToCares', addtocartSchema)

module.exports = AddToCarts;