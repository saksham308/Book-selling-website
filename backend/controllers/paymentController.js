// name: { type: String, required: true },
//     Author: { type: String, required: true },
//     description: { type: String, required: true },
//     price: {
//       type: Number,
//       required: true,
//       min: [0, "Price cannot be negative"],
//     },
//   },

const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");
const User = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.SECRET_KEY);

const payment = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  const { type, amount } = req.body;

  const idemPotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: amount * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `${type}:${amount}`,
        },
        idemPotencyKey
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});
module.exports = { payment };
