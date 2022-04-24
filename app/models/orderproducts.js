module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            price: String,
            qty: Number,
            amount: Number,
            image: String,
            orderStatus: Boolean
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Orderscart = mongoose.model("productsorder", schema);
    return Orderscart;
};