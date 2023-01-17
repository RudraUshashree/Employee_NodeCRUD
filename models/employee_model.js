const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const employeeSchema = new mongoose.Schema({
    name:{
        type:String       
    },
    designation:{
        type:String      
    },
    email:{
        type:String       
    },
    phone:{
        type:String        
    },
    age:{
        type:Number        
    },
    photo:{
        type:String
    }  
},{timestamps: true});

employeeSchema.plugin(mongoosePaginate);
module.exports=mongoose.model('tblemployee',employeeSchema);