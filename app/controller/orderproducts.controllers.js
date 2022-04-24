const db = require("../models/index.models");

const OrderProdusts  = db.orderscart;

// Create and Save a new Produsts Order

exports.addCart = (req, res) => {
  console.log(req.title);
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let price = req.body.price;
  let qty = req.body.qty;
  let totalAmount = price * qty;
  const orderProduct = new OrderProdusts({
    title: req.body.title,
    price: req.body.price,
    qty: req.body.qty,
    amount: totalAmount,
    image: req.body.image ? req.body.image : "",
    orderStatus: req.body.orderStatus
  });
  orderProduct
    .save(orderProduct)
    .then((data) => {
      // res.send(data);
      res.status(200).send(
        { status: "Ok",
          content: "Products has been Ordered!" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Produsts Order.",
      });
    });
};

// Retrieve all Tutorials from the database.

exports.orderFindAll = (req, res) => {
  const title = req.body.title;
  var condition = title
    ? { title: { $regex: new RegExp(pdtCatId), $option: "i" } }
    : {};

    OrderProdusts.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving produsts.",
      });
    });
};


// Update a Produsts Order by the id in the request

exports.orderUpdate = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.body.id;

  let price = req.body.price;
  let qty = req.body.qty;
  req.body.amount = price * qty;

  OrderProdusts.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Produsts Order with id=${id}. Maybe Produsts Order was not found!`,
        });
      } else {
        res.send({ message: "Produsts Order was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Produsts Order with id=" + id,
      });
    });
};

exports.ordercancel = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.body.id;
  req.body.orderStatus = true;

  OrderProdusts.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Produsts Order with id=${id}. Maybe Produsts Order was not found!`,
        });
      } else {
        res.send({ message: "Produsts Order was Cancelled successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error cancelled Produsts Order with id=" + id,
      });
    });
};

// Delete a Produsts Order with the specified id in the request

exports.orderdelete = (req, res) => {
  const id = req.params.id;

  OrderProdusts.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot remove Produsts Order with id=${id}. Maybe Produsts Order was not found!`,
        });
      } else {
        res.send({ message: "Produsts Order was deleted successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Produsts Order with id=" + id,
      });
    });
};

