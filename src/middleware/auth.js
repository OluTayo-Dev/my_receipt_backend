import jwt from "jsonwebtoken";
import Admin from "../model/admin.js";


const config = process.env.JWT_SECRET_KEY;


// 

const createProduct = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]?.split(" ");

    if (!authHeader) {
      return res.status(401).json({ message: "Not authorized, token not available" });
    }

    if (authHeader[0] !== "Bearer") {
      return res.status(403).json({ message: "Login required" });
    }

    //const decodedToken = jwt.verify(authHeader[1], config);
    const decodedToken = process.env.JWT_SECRET_KEY(authHeader[1], config)

    // Assuming the user role is stored in the JWT payload
    const userId = decodedToken.userId; // Adjust based on your JWT payload structure
    const isAdmin = await Admin.findById(userId);

    if (isAdmin) {
      // User is an admin, allow access to createProduct
      return next();
    } else {
      return res.status(403).json({ message: "Permission denied" });
    }

  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "User not authorized" });
    } else {
      return res.status(401).json({ message: "User not recognized" });
    }
  }
};

export default createProduct;

