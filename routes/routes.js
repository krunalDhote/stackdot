import { Router } from "express";
import { registerUser, getUsers } from "./user.routes.js";
import { createSlugs, getSlugs } from "./slug.js";
const router = Router();

router.get("/", function (req, res) {
  try {
    res.status(200).json({
      status: true,
      data: [],
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({ status: false, data: null, message: error.message });
  }
});

router.post("/user", registerUser);
router.get("/user", getUsers);

router.post("/slug/:slug", createSlugs);
router.get("/slug/:slug", getSlugs);

export { router };
