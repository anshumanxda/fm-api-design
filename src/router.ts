import { Router } from "express";
import { body } from "express-validator";

import { handleInputErrors } from "./module/middleware";
import {
  createProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdates,
  getOneUpdate,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/*
 **PRODUCT
 */

router.get("/product", getAllProduct);

router.get("/product/:id", getOneProduct);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

router.delete("/product/:id", deleteProduct);

/*
 **UPDATE
 */

router.get("/update", getAllUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status").isIn(["IN_PROGRESS", "DEPRECATED", "SHIPPED"]).optional(),
  body("version").optional().isString(),
  handleInputErrors,
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  handleInputErrors,
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/*
 **UPDATE POINT
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  () => {}
);
router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  handleInputErrors,
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
