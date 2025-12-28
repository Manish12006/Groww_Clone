const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    instrument: String,
    Qty: Number,
    AvgCost: Number,
    CurValue: Number,
    PandL: Number
});

const ItemModel = mongoose.model("GrowwDBCollection", ItemSchema);
module.exports = ItemModel;
