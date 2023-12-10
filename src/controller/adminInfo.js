import Admin from "../model/admin.js";
import bcrypt from "bcryptjs";



const createAdmin = async (req, res) => {
  const { loginID, password, role } = req.body;

  try {
    // Validation checks
    if (!loginID || loginID.length < 10 || !password) {
      return res.status(400).json({ message: "Invalid Login Credentials" });
    }

    // Check if an admin with the provided loginID already exists
    const existingAdmin = await Admin.findOne({ loginID });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this loginID already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new admin instance with hashed password
    const newAdmin = new Admin({
      loginID,
      password: hashedPassword,
      role,
    });

    // Save the new admin to the database
    const admin = await newAdmin.save();

    return res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    console.error('Error creating admin:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};






const signInAdmin = async (req, res) => {
  const { loginID, password } = req.body;

  try {
    // Validation checks
    if (!loginID || !password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (loginID.length < 10) {
      return res.status(401).json({ message: "Field is less than the required characters" });
    }

    // Check if an admin with the provided loginID exists
    const adminExist = await Admin.findOne({ loginID });

    if (!adminExist) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, adminExist.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      // Extract userId from the found adminExist object
      const userId = adminExist._id; // Assuming the userId is stored in the _id field

      return res.status(201).json({ message: "Login Successful", loginID, userId });
    }
  } catch (error) {
    console.error('Error signing in admin:', error);
    return res.status(500).json({ message: "Failed to sign in admin", error });
  }
};


export {createAdmin, signInAdmin};