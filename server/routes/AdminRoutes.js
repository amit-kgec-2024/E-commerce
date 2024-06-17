const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Products = require("../modules/Products");
const Admin = require("../modules/Admin");
const Mobiles = require("../modules/Mobiles")
const Appliances = require("../modules/Appliances")
const Electronics = require("../modules/Electronics")
const Beauty = require("../modules/Beauty")
const Kitchen = require("../modules/Kitchen")
const Furniture = require("../modules/Furniture")
const Grocery = require("../modules/Grocery")

// Admin register.....................
router.post("/admin/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(200).send("Plese all require files");
    } else {
      const isAlreadyExist = await Admin.findOne({ email });
      if (isAlreadyExist) {
        res.status(400).send("User alredy Exist");
      } else {
        const newUser = new Admin({ username, email });
        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          newUser.set("password", hashedPassword);
          newUser.save();
          next();
        });
        return res.status(200).send("user register Successfully");
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});
// login...............
router.post("/admin/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Plese all require files");
    } else {
      const user = await Admin.findOne({ email });
      if (!user) {
        res.status(400).send("User Email & Password is Incorrect");
      } else {
        const valideteUser = await bcryptjs.compare(password, user.password);
        if (!valideteUser) {
          res.status(400).send("User Email & Password is Incorrect");
        } else {
          const payload = {
            userId: user._id,
            email: user.email,
          };
          const JWT_SECRET_KEY =
            process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_SECRET_KEY";
          jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: 86400 },
            async (err, token) => {
              await Admin.updateOne({ _id: user._id }, { $set: { token } });
              user.save();
              res.status(200).json({
                user: {
                  id: user._id,
                  email: user.email,
                  password: user.password,
                  username: user.username,
                },
                token: token,
              });
            }
          );
        }
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});
// Mobile Section............................................................
// Mobile register.........
router.post("/mobile/register", async (req, res) => {
  try {
    const { imgUrl, title, price, models, stars, discount, category, sale } = req.body;

    const newProducts = new Mobiles({
      img: imgUrl,
      title,
      price,
      models,
      stars,
      discount,
      category,
      sale,
    });
    newProducts.save();

    return res.status(200).send("mobile register Successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
});

// Mobile GET request..................
router.get("/mobiles/data", async (req, res) => {
  try {
    const products = await Mobiles.find();
    const productData = Promise.all(
      products.map(async (product) => {
        return {
          product: {
            id: product._id,
            img: product.img,
            title: product.title,
            price: product.price,
            models: product.models,
            discount: product.discount,
            stars: product.stars,
            category: product.category,
            sale: product.sale,
          },
        };
      })
    );
    res.status(200).send(await productData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// Delete Mobiles...............
router.delete("/mobiles/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Mobiles.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "mobile not found" });
    }

    res.status(200).send({ message: "mobiles deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});
// Appliances Section............................................................
// Appliances register.........
router.post("/appliances/register", async (req, res) => {
  try {
    const { imgUrl, title, price, models, stars, discount, category, sale } = req.body;

    const newProducts = new Appliances({
      img: imgUrl,
      title,
      price,
      models,
      stars,
      discount,
      category,
      sale,
    });
    newProducts.save();

    return res.status(200).send("Appliances register Successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
});

// Appliances GET request..................
router.get("/appliances/data", async (req, res) => {
  try {
    const products = await Appliances.find();
    const productData = Promise.all(
      products.map(async (product) => {
        return {
          product: {
            id: product._id,
            img: product.img,
            title: product.title,
            price: product.price,
            models: product.models,
            discount: product.discount,
            stars: product.stars,
            category: product.category,
            sale: product.sale,
          },
        };
      })
    );
    res.status(200).send(await productData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// Delete Appliances...............
router.delete("/product/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Appliances.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "Appliances not found" });
    }

    res.status(200).send({ message: "Appliances deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});
// electronics Section............................................................
// electronics register.........
router.post("/electronics/register", async (req, res) => {
  try {
    const { imgUrl, title, price, models, stars, discount, category, sale } = req.body;

    const newProducts = new Electronics({
      img: imgUrl,
      title,
      price,
      models,
      stars,
      discount,
      category,
      sale,
    });
    newProducts.save();

    return res.status(200).send("electronics register Successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
});

// electronics GET request..................
router.get("/electronics/data", async (req, res) => {
  try {
    const products = await Electronics.find();
    const productData = Promise.all(
      products.map(async (product) => {
        return {
          product: {
            id: product._id,
            img: product.img,
            title: product.title,
            price: product.price,
            models: product.models,
            discount: product.discount,
            stars: product.stars,
            category: product.category,
            sale: product.sale,
          },
        };
      })
    );
    res.status(200).send(await productData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// Delete electronics...............
router.delete("/electronics/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Electronics.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "electronics not found" });
    }

    res.status(200).send({ message: "electronics deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});
// beauty Section............................................................
// beauty register.........
router.post("/beauty/register", async (req, res) => {
  try {
    const { imgUrl, title, price, models, stars, discount, category, sale } = req.body;

    const newProducts = new Beauty({
      img: imgUrl,
      title,
      price,
      models,
      stars,
      discount,
      category,
      sale,
    });
    newProducts.save();

    return res.status(200).send("beauty register Successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
});

// beauty GET request..................
router.get("/beauty/data", async (req, res) => {
  try {
    const products = await Beauty.find();
    const productData = Promise.all(
      products.map(async (product) => {
        return {
          product: {
            id: product._id,
            img: product.img,
            title: product.title,
            price: product.price,
            models: product.models,
            discount: product.discount,
            stars: product.stars,
            category: product.category,
            sale: product.sale,
          },
        };
      })
    );
    res.status(200).send(await productData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// Delete beauty...............
router.delete("/beauty/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Beauty.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "beauty not found" });
    }

    res.status(200).send({ message: "beauty deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});
// kitchen Section............................................................
// kitchen register.........
router.post("/kitchen/register", async (req, res) => {
  try {
    const { imgUrl, title, price, models, stars, discount, category, sale } = req.body;

    const newProducts = new Kitchen({
      img: imgUrl,
      title,
      price,
      models,
      stars,
      discount,
      category,
      sale,
    });
    newProducts.save();

    return res.status(200).send("kitchen register Successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
});

// kitchen GET request..................
router.get("/kitchen/data", async (req, res) => {
  try {
    const products = await Kitchen.find();
    const productData = Promise.all(
      products.map(async (product) => {
        return {
          product: {
            id: product._id,
            img: product.img,
            title: product.title,
            price: product.price,
            models: product.models,
            discount: product.discount,
            stars: product.stars,
            category: product.category,
            sale: product.sale,
          },
        };
      })
    );
    res.status(200).send(await productData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// Delete kitchen...............
router.delete("/kitchen/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Kitchen.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "kitchen not found" });
    }

    res.status(200).send({ message: "kitchen deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});
// furniture Section............................................................
// furniture register.........
router.post("/furniture/register", async (req, res) => {
  try {
    const { imgUrl, title, price, models, stars, discount, category, sale } = req.body;

    const newProducts = new Furniture({
      img: imgUrl,
      title,
      price,
      models,
      stars,
      discount,
      category,
      sale,
    });
    newProducts.save();

    return res.status(200).send("furniture register Successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
});

// furniture GET request..................
router.get("/furniture/data", async (req, res) => {
  try {
    const products = await Furniture.find();
    const productData = Promise.all(
      products.map(async (product) => {
        return {
          product: {
            id: product._id,
            img: product.img,
            title: product.title,
            price: product.price,
            models: product.models,
            discount: product.discount,
            stars: product.stars,
            category: product.category,
            sale: product.sale,
          },
        };
      })
    );
    res.status(200).send(await productData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// Delete furniture...............
router.delete("/furniture/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Furniture.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "furniture not found" });
    }

    res.status(200).send({ message: "furniture deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});
// grocery Section............................................................
// grocery register.........
router.post("/grocery/register", async (req, res) => {
  try {
    const { imgUrl, title, price, models, stars, discount, category, sale } = req.body;

    const newProducts = new Grocery({
      img: imgUrl,
      title,
      price,
      models,
      stars,
      discount,
      category,
      sale,
    });
    newProducts.save();

    return res.status(200).send("grocery register Successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
});

// grocery GET request..................
router.get("/grocery/data", async (req, res) => {
  try {
    const products = await Grocery.find();
    const productData = Promise.all(
      products.map(async (product) => {
        return {
          product: {
            id: product._id,
            img: product.img,
            title: product.title,
            price: product.price,
            models: product.models,
            discount: product.discount,
            stars: product.stars,
            category: product.category,
            sale: product.sale,
          },
        };
      })
    );
    res.status(200).send(await productData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// Delete grocery...............
router.delete("/grocery/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Grocery.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "grocery not found" });
    }

    res.status(200).send({ message: "grocery deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});
// Fashion Section............................................................
// Fashion register.........
router.post("/fashion/register", async (req, res) => {
  try {
    const { imgUrl, title, price, stars, discount, category, sale } = req.body;

    const newProducts = new Products({
      img: imgUrl,
      title,
      price,
      stars,
      discount,
      category,
      sale,
    });
    newProducts.save();

    return res.status(200).send("fashion register Successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
});

// Fashion GET fashion..................
router.get("/fashion/data", async (req, res) => {
  try {
    const products = await Products.find();
    const productData = Promise.all(
      products.map(async (product) => {
        return {
          product: {
            id: product._id,
            img: product.img,
            title: product.title,
            price: product.price,
            discount: product.discount,
            stars: product.stars,
            category: product.category,
            sale: product.sale,
          },
        };
      })
    );
    res.status(200).send(await productData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// Delete Fashion...............
router.delete("/fashion/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Products.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "fashion not found" });
    }

    res.status(200).send({ message: "fashion deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

module.exports = router;
