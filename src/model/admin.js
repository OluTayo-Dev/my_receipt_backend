import mongoose from "mongoose";



const Schema = mongoose.Schema;




const adminSchema = new Schema({
    loginID: {
        type: String,
        required: true,
       
    },


    password: {
        type: String,
        required: true,
      
    },
    
    role: {
        type: String,
        enum: ["Admin", "Supervisor", "Manager", "Inventry"],  
        required:true
    }
},{
    timestamps: true

})

const Admin = mongoose.model('Administrator', adminSchema);




export default Admin;