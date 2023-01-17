const express = require('express');
const mongoose = require('mongoose');
const morgan = require('express');
const bodyparser = require('body-parser');
const employeeRouter = require('./routers/employee_route');
const userRouter = require('./routers/user_route');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(bodyparser.json());

mongoose.set('strictQuery', true);

const dburl = 'mongodb+srv://Ushashree:usha@cluster0.8pw2ran.mongodb.net/EmployeeDB?retryWrites=true&w=majority';

mongoose.connect(dburl, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    .then(() => console.log('Database is connected...'))
    .catch(err => console.log(err));


app.use('/employees',employeeRouter);
app.use('/users',userRouter);
app.use('/uploads',express.static('uploads'));

app.listen(PORT, ()=>{
    console.log(`Server is running on port...${PORT}`);
});

