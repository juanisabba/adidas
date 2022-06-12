const { findOne, findById } = require("../models/Product");
const Product = require("../models/Product");
const router = require("express").Router();

//CREATE
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.send(error);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qPopular = req.query.popular;
  const qSearch = req.query.search;
  const qSubmenu = req.query.submenu;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ time: -1 }).limit(10);
    } else if (qPopular) {
      products = await Product.find().sort({ stars: -1 }).limit(10);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else if (qSearch) {
      products = await Product.find({
        title: { $regex: qSearch, $options: "i" },
      });
    } else if (qSubmenu) {
      products = await Product.find({
        title: { $regex: qSubmenu, $options: "i" },
      }).limit(5)
    } else {
      products = await Product.find();
    }
    res.send(products.length > 0 ? products : { error: 404 });
  } catch (error) {
    res.json("error");
  }
});

//FIND BY ID
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (error) {
    res.json({ error: 404 });
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      {_id: req.params.id},
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
