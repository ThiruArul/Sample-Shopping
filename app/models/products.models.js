module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            product_id: Number,
            title: String,
            description: String,
            manufacturer: String,
            price: Number,
            image: String,

        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Produtscart = mongoose.model("products", schema);
    return Produtscart;
};