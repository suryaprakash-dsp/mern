const express = require("express");
const path = require("path");

const app = express();

const PORT = 5000;

app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));


let students = [];

//post 
app.post("/students", (req, res) => {

    const { name, email, age } = req.body;

    const student = {
        id: students.length + 1,
        name: name,
        email: email,
        age: age
    };

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student: student
    });
});


//get
app.get("/students", (req, res) => {

    res.json(students);

});



//get by id
app.get("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    res.json(student);

});


//put
app.put("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    student.name = req.body.name;
    student.email = req.body.email;
    student.age = req.body.age;

    res.json({
        message: "Student updated successfully",
        student: student
    });

});


//delete

app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });

});


app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});