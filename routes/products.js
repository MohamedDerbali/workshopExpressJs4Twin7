const express = require("express");
const router = express.Router();
const products = require("../products.json");
const isObjectEmpty = require("../utils/isObjectEmpty");

router.get("/", function (req, res, next) {
  try {
    if (!products || isObjectEmpty(products)) {
      throw new Error("products not found!");
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    if (!products || isObjectEmpty(products)) {
      throw new Error("products not found!");
    }
    if (!products[id.toUpperCase()]) {
      throw new Error("id must be valid");
    }
    res.json(products[id.toUpperCase()]);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/instock/:qt", (req, res, next) => {
  try {
    const { qt } = req.params;
    if (!Number.isInteger(qt) && parseInt(qt) < 0) {
      throw new Error("qt must be integer and >0");
    }
    if (!products || isObjectEmpty(products)) {
      throw new Error("products not found!");
    }
    let productsToBuy = [];
    for (const key in products) {
      if (products[key].stock >= qt) {
        productsToBuy.push(products[key]);
      }
    }
    if (productsToBuy.length === 0) {
      throw new Error("products not found!");
    }
    res.status(200).json(productsToBuy);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/:id/:qt", (req, res, next) => {
  try {
    const { id, qt } = req.params;
    if (!Number.isInteger(qt) && parseInt(qt) < 0) {
      throw new Error("qt must be integer and >0");
    }
    if (!products || isObjectEmpty(products)) {
      throw new Error("products not found!");
    }
    if (!products[id.toUpperCase()]) {
      throw new Error("id must be valid");
    }
    let productToBuy = {
      id: id.toUpperCase(),
      qt: parseInt(qt),
      unit_price: parseInt(products[id.toUpperCase()].price),
      total_price: parseInt(products[id.toUpperCase()].price) * parseInt(qt),
    };
    if (!productToBuy || isObjectEmpty(productToBuy)) {
      throw new Error("product to buy is not defined!");
    }
    res.status(200).json(productToBuy);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
