const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'abcd1234',
    database: 'student'
})

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM student_info";
    db.query(sqlGet,(err, result) => {
        res.send(result);
        console.log(result);
    
    })
})

app.get("/",(req,res) => {
    console.log(res)
})

app.post("/api/insert", (req, res)=> {

    const userName = req.body.userName
    const roll_no = req.body.roll_no
    const stdClass = req.body.stdClass
    const tsub = req.body.tsub
    const age = req.body.age

    const sqlInsert = "INSERT INTO student_info (userName, roll_no, stdClass, tsub, age) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [userName, roll_no, stdClass, tsub, age], (err, result)=> {

        console.log(result);

    });
});

app.delete("/api/delete/:roll_no", (req, res)=> {
    const roll_no = req.params.roll_no;
    const sqlDelete = "DELETE FROM student_info WHERE roll_no = ?";
    db.query(sqlDelete, roll_no, (err, result) => {
        if (err) console.log(err);
    });
});

app.put("/api/update", (req, res)=> {
    const userName = req.body.userName;
    const stdClass = req.body.stdClass;
    const roll_no = req.body.roll_no;
    const tsub = req.body.tsub;
    const age = req.body.age;
    const sqlUpdate = "UPDATE student_info SET userName = ?, stdClass  = ?, tsub = ?, age = ? WHERE roll_no = ?";
    db.query(sqlUpdate, [userName, roll_no, stdClass, tsub, age], (err, result) => {
        if (err) console.log(err);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});
