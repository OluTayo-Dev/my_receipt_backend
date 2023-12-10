import Admin from "../model/admin.js";


const createAdmin = async (req, res) => {
  const { loginID, password, role } = req.body;

  try {
    // Validation checks
    if (!loginID || loginID.length < 10 || !password) {
      return res.status(400).json({ message: "Invalid Login Credentials" });
    }

    // Create a new admin instance
    const newAdmin = new Admin({
      loginID,
      password,
      role,
    });

    // Save the new admin to the database
    const admin = await newAdmin.save();

    return res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    console.error('Error creating admin:', error);

    // Check for duplicate key error
    if (error.code === 11000 || error.code === 11001) {
      return res.status(400).json({ message: "Duplicate key error. Admin with the same loginID already exists." });
    }

    return res.status(500).json({ message: "Failed to create Admin", error: error.message });
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

    if (!adminExist || adminExist.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      // Extract userId from the found adminExist object
      const userId = adminExist._id; // Assuming the userId is stored in the _id field

      return res.status(201).json({ message: "Login Successful",loginID, userId });
    }
  } catch (error) {
    console.error('Error signing in admin:', error);
    return res.status(500).json({ message: "Failed to sign in admin", error });
  }
};


export {createAdmin, signInAdmin};