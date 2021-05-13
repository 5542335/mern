const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

router.get("/handle", (request, response) => {
  response.status(201).json({ message: "Пользователь создан" });
});

router.post(
  "/register",
  [
    check("firstName", "Введите Ваше настоящее имя")
      .isLength({ min: 1 }, { max: 32 })
      .isString(),
    check("lastName", "Введите Вашу настоящую фамилию")
      .isLength({ min: 1 }, { max: 32 })
      .isString(),
    check("password", "Неверный формат пароля").isLength(
      { min: 8 },
      { max: 32 }
    ),
    check("email", "Некорректный email").isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }

      const { firstName, lastName, password, email } = req.body;

      const candidate = await User.findOne({ firstName, lastName, email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        firstName,
        lastName,
        password: hashedPassword,
        email,
      });

      await user.save();

      res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.post("/login", async (req, res) => {});

module.exports = router;
