const { response } = require('express');
const employeeModel = require('../models/employee_model');

//Get all the employees records with only selected fields
const getAllEmployees = (req,res,next) =>{
        employeeModel.find().select({ _id:0, name:1, degignation:1, email:1, phone:1, age:1})                              //All Employees will listed....
        .then((response)=>{
            res.json({
                response,
            })
        }).catch((error)=>{
            res.json({
                message: `An error occur while getting all records...${error}`
            })
        });
}

//Get all Employees records in sorted manner
const getSortEmployees= (req,res,next) =>{
    //employeeModel.find().sort({ name: -1 })   Descending
    employeeModel.find().sort({ name: 1 })  //Ascending                            
    .then((response)=>{
        res.json({
            response,
        })
    }).catch((error)=>{
        res.json({
            message: `An error occur while getting all records...${error}`
        })
    });
}

//All Employess listing with pagination by giving api like this http://localhost:5000/employees?page=1&limit=3 and by changing page no. in api you can change pages.
const getAllEmployeesByPagination = (req,res,next) =>{
    if(req.query.page && req.query.limit){                         
        employeeModel.paginate({},{page: req.query.page, limit: req.query.limit})
        .then((data)=>{
            res.status(200).json({
                data,
            })
        }).catch((error)=>{
            res.status(400).json({
                message: `An error occur while getting all records...${error}`
            })
        })
    }else{                          //else list all Employees....
        employeeModel.find()                   
        .then((data)=>{
            res.status(200).json({
                data,
            })
        }).catch((error)=>{
            res.status(400).json({
                message: `An error occur while getting all records...${error}`
            })
        })
    }

}

//Adding Employee
const addEmployees = (req,res,next)=>{
    let newEmployee = new employeeModel({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    // if(req.file){                                                            //for single image
    //     newEmployee.photo = req.file.path;           
    // }
    if(req.files){                                                              //for multiple images
        let path= '';
        req.files.forEach(function(files,index,arr){
            path = path + files.path + ',';
        })           
        path = path.substring(0, path.lastIndexOf(","));
        console.log(path);
        newEmployee.photo = path;
    }
    newEmployee.save()
        .then((response)=>{ 
            res.json({
                message: 'New Employee Added to the database...'
            })
        }).catch((error)=>{
            res.json({
                message: `Error occuer while adding employee ${error}`
            })
        });
}

//Find by Id
const findById = (req,res,next)=>{
    let {id} = req.params;
    employeeModel.findById(id).then((response)=>{
        res.json({
            response
        })
    }).catch((error)=>{
        res.json({
            message: `Error occur while finding by id...${error}`
        })
    });
}

//Find by employee name

const findbyname = async(req,res,next)=>{
   let data = await employeeModel.find({
      "$or":[
        {name:{$regex:req.params.key}}
      ]
   })
   res.send(data);

    
}

//Delete by id
const deleteEmployee = (req,res,next)=>{
    let {id} = req.params;
    employeeModel.findByIdAndDelete(id).then(()=>{
        res.json({
            message: `${id} Id Employee deleted..`
        })
    }).catch((error)=>{
        res.json({
            message: `Error occur while deleting...${error}`
        })
    });
}

//Update by id
const updateEmployee = (req,res,next)=>{
    let {id} = req.params;

    let updatedEmployee = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    employeeModel.findByIdAndUpdate(id,{$set: updatedEmployee})
        .then(()=> {
            res.json({
                message: 'Updated successfully...'
            })
        }).catch((error)=>{
            res.json({
                message:`Error occur while updating...${error}`
            })
        });
}

module.exports = {
    getAllEmployees,
    getSortEmployees,
    getAllEmployeesByPagination,
    addEmployees,
    findById,
    findbyname,
    deleteEmployee,
    updateEmployee,
};

