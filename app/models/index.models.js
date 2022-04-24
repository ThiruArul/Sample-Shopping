const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./products.models")(mongoose);
db.orderscart = require("./orderproducts")(mongoose);

module.exports = db;