
// // Import required modules
// const dotenv = require('dotenv');

// const express = require('express');

// // Create an instance of Express
// const app = express();

// dotenv.config();

// // Define a sample API endpoint
// app.get('/', (req, res) => {
//     const data = {
//         message: 'Hello, this is a sample API!'
//     };
//     res.json(data);
// });




// Express Setup: Import the required modules (express, mysql, cors), create an instance of the Express app, and set up middleware (express.json() for parsing JSON and cors() for handling CORS).


const express = require('express')

const dotenv = require('dotenv');

const app = express()

const mysql = require('mysql')

const  cors = require ('cors')  //The cors middleware in Node.js is used to handle Cross-Origin Resource Sharing. It enables controlled cross-origin requests, allowing a web server to accept requests from different domains. This middleware adds specific HTTP headers to responses, indicating which origins are permitted to access the server's resources. This helps improve security by preventing unauthorized access and enabling safe communication between different domains in web applications.

dotenv.config();

app.use(cors());

app.use(express.json());

// MySQL Connection: Create a connection to the MySQL database using the mysql module. The database credentials are provided (username, host, password, database name).

const db =mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'anurag',
    database:'cliniclist'
});

// POST Endpoint (/create): Handles the creation of a new clinic. It retrieves clinic data from the request body and inserts it into the "clinics" table.

app.post('/create',(req,res)=>{
    const clinicname=req.body.clinicname;

    const contactnumber=req.body.contactnumber;

    const aboutclinic=req.body.aboutclinic;

    const clinicaddress=req.body.clinicaddress;

    const clinichour=req.body.clinichour;

    db.query("INSERT INTO clinics (clinicname,contactnumber,aboutclinic,clinicaddress,clinichour) VALUES (?,?,?,?,?)",

    [clinicname,contactnumber,aboutclinic,clinicaddress,clinichour],

     (err,result)=>{

        if(err){
            console.log(err)
        }
        
        else{
            res.send("Values Inserted");
        }
    }
    );

});


// GET Endpoint (/clinics): Retrieves all clinic records from the database and sends them as a response.

app.get('/clinics',(req,res)=>{
    db.query("SELECT * FROM clinics",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// PUT Endpoint (/update): Handles updating clinic timings. It receives the clinic ID and new timings from the request body and updates the corresponding record in the database.

app.put('/update',(req,res)=> {

const id= req.body.id;

const clinichour=req.body.clinichour;

db.query("UPDATE clinics SET  clinichour=? WHERE id =?",[clinichour,id],
(err,result)=>{
    if(err){
        console.log(err);
    }else{
        res.send(result);
    }
}
);

});

// DELETE Endpoint (/delete/:id): Handles deleting a clinic by ID. It receives the clinic ID as a URL parameter and removes the corresponding record from the database.

app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id

    db.query("DELETE FROM clinics WHERE id = ?",id,(err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})










let port = process.env.PORT || 3000
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
