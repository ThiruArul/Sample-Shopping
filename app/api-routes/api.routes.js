module.exports = app => {
    const products = require("../controller/products.controllers");

    const shoppingCart = require('../controller/orderproducts.controllers');

    var router = require("express").Router();

    // Products Controllers route

    router.post("/addproducts", products.addproducts);

    router.get("/getproducts", products.productsFindAll);

    router.get("/getproductsOne/:id", products.productsFindOne);

    router.put("/productsUpdate", products.updateProducts);

    router.delete("/productsdelete/:id", products.deleteProducts);


    // Order Products Controller route

    router.post("/addOrederproduct", shoppingCart.addCart);

    router.post("/orderCancel", shoppingCart.ordercancel);


    router.get("/getOrderlist",shoppingCart.orderFindAll)

    router.put("/orderproductsUpdate", shoppingCart.orderUpdate);

    router.delete("/orderproductsdelete/:id", shoppingCart.orderdelete);


    app.use("/api", router);

}