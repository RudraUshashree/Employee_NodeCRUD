const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee_controllers');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/authenticate');


router.get('/all',authenticate, employeeController.getAllEmployees);            //Get records of some fields
router.get('/sort',authenticate, employeeController.getSortEmployees);          //Get Sorted records
router.get('/',authenticate, employeeController.getAllEmployeesByPagination);   //Get records according to pagination
router.get('/',authenticate, employeeController.getAllEmployees);               //Get all Employees records
//router.post('/',upload.single('photo'),employeeController.addEmployees);      //insert with single file/image
router.post('/',upload.array('photo[]'),employeeController.addEmployees);       //insert with multiple files/images
router.get('/:id',employeeController.findById);                                 //Get records by id
router.get('/search/:key',employeeController.findbyname);                       //Get records by fieldname
router.delete('/:id',employeeController.deleteEmployee);                        //Delete records
router.post('/:id',employeeController.updateEmployee);                          //Update records

module.exports = router;