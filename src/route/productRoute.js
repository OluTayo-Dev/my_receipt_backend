import express from "express";
import {createProduct, updateProduct, getProductById, getAllProduct, deleteProduct} from "../controller/productController.js";
import auth from "../middleware/auth.js";


const router = express.Router();
router.post("/createProduct", auth, createProduct)
router.route("/updateProduct/:id").put(updateProduct);
router.route("/getProductById/:id").get(getProductById);
router.route("/deleteProduct/:id").delete(deleteProduct);
router.route("/getAllProduct").get(getAllProduct);


export default router;