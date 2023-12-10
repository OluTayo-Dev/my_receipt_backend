import express from "express";
import {createAdmin, signInAdmin} from "../controller/adminInfo.js";


const router = express.Router();
router.route("/createAdmin").post(createAdmin);
router.route("/signInAdmin").post(signInAdmin);



export default router;