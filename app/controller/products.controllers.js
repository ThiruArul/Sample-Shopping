const db = require("../models/index.models");
// const Produsts  = db.shoppingcart;
const Produsts = db.products;

// Create and Save a new Produsts

exports.addproducts = (req, res) => {
  console.log(req.title);
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const produsts = new Produsts({
    product_id: req.body.pdtCatId,
    title: req.body.title,
    description: req.body.description, 
    manufacturer: req.body.manufacturer,
    price: req.body.price,
    image: req.body.image ? req.body.image : "",
  });
  produsts
    .save(produsts)
    .then((data) => {
      // res.send(data);
      res.status(200).send(
        { status: "Ok",
          message: "Products has been created!" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Produsts.",
      });
    });
};

// Retrieve all Tutorials from the database.

exports.productsFindAll = (req, res) => {
  const title = req.body.title;
  var condition = title
    ? { title: { $regex: new RegExp(pdtCatId), $option: "i" } }
    : {};

  Produsts.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving produsts.",
      });
    });
};

// Find a single Produsts with an id
exports.productsFindOne = (req, res) => {
  const id = req.params.id;

  Produsts.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found tutorials with id" + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving produsts with id=" + id,
      });
    });
};

// Update a Produsts by the id in the request

exports.updateProducts = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.body.id;

  Produsts.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Produsts with id=${id}. Maybe Produsts was not found!`,
        });
      } else {
        res.send({ message: "Produsts was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating produsts with id=" + id,
      });
    });
};

// Delete a Produsts with the specified id in the request

exports.deleteProducts = (req, res) => {
  const id = req.params.id;

  Produsts.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot remove Produsts with id=${id}. Maybe Produsts was not found!`,
        });
      } else {
        res.send({ message: "Produsts was deleted successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete produsts with id=" + id,
      });
    });
};

