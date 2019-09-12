const express = require('express');
const student = express.Router();
const conn = require('../config.js');

student.get('/students', function(req, res) {
    let data = {};

    let value = []

    const queryString = "SELECT * FROM students"
    conn.query(queryString, function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } 
        else{
            var obj = {};
            results.forEach((x,index)=>{
                const queryString = "SELECT books.book_name FROM student_books JOIN books ON (student_books.book_id = books.id) WHERE student_books.student_id = "+x.studentId +" "
                conn.query(queryString, function (err, rows, fields) {
                    if (error){
                        console.log(error)
                        res.sendStatus(400);
                    } 
                    else{
                        obj = x;
                        obj['books']=rows;
                        value.push(obj);

                        if (results.length === index + 1) {
                            if (value.length === 0) {
                                console.log('error')
                                res.status(200).send('No Result Found')
                            } else {
                                data['result'] = value;
                                res.json(data)
                            }
                        }

                    }
                })
            })
        }
    });
})

student.get('/student/:bookId', function(req, res) {
    let data = {};
    let value = []
    const queryString = "SELECT students.* FROM students JOIN student_books ON (student_books.student_id =  students.studentId) WHERE  student_books.book_id = '"+ req.params.bookId +"' "
    conn.query(queryString, function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } 
        else{
            var obj = {};
            results.forEach((x,index)=>{
                const queryString = "SELECT books.book_name FROM student_books JOIN books ON (student_books.book_id = books.id) WHERE student_books.student_id = "+x.studentId +" "
                conn.query(queryString, function (err, rows, fields) {
                    if (error){
                        console.log(error)
                        res.sendStatus(400);
                    } 
                    else{
                        obj = x;
                        obj['books']=rows;
                        value.push(obj);

                        if (results.length === index + 1) {
                            if (value.length === 0) {
                                console.log('error')
                                res.status(200).send('No Result Found')
                            } else {
                                data['result'] = value;
                                res.json(data)
                            }
                        }

                    }
                })
            })

        }
    });

})

student.post('/student', function(req, res) {
    let data={}

    const studentName= req.body.studentName;
    const className= req.body.className;
    const fromDate= req.body.fromDate;
    const toDate= req.body.toDate;
    const bookReturn = 0

    const selectedBooks= req.body.selectedBooks;
    


    conn.query(`INSERT INTO students (studentName,className,fromDate,toDate,returnBook) VALUES ('${studentName}','${className}','${fromDate}','${toDate}',${bookReturn})`, function (error, results, fields) {
        if (error){
            console.log(error)
            data['message'] = 'Unable To Add Data'; 
            res.status(203).json(data);
        } 
        else{
            selectedBooks.forEach((x)=>{
                conn.query(`INSERT INTO student_books (student_id,book_id) VALUES ('${results.insertId}','${parseInt(x)}')`, function (err, results, fields) {
                    if (err){
                        console.log(err)
                        data['message'] = 'Unable To Add Data'; 
                        res.status(203).json(data);
                    } else{
                        console.log('added')
                    }
                })

            })
            data['message'] = 'Succesfully Added';
            res.json(data)
        }
    });


});

student.get('/bookNotReturnStudents', function(req, res) {
    let data = {};
    conn.query("SELECT studentId,studentName FROM `students` WHERE returnBook = '0' ", function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } 
        else{
            data['result'] = results;
            res.json(data)
        }
    });
})

student.get('/studentSelected/:studentId', function(req, res) {
    let data = {};

    let value = []

    const queryString = "SELECT * FROM students WHERE studentId = '"+ req.params.studentId +"' "
    conn.query(queryString, function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } 
        else{
            var obj = {};
            results.forEach((x,index)=>{
                const queryString = "SELECT books.book_name FROM student_books JOIN books ON (student_books.book_id = books.id) WHERE student_books.student_id = "+x.studentId +" "
                conn.query(queryString, function (err, rows, fields) {
                    if (error){
                        console.log(error)
                        res.sendStatus(400);
                    } 
                    else{
                        obj = x;

                        // DUE DATE DIFFERENCE
                        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                        function dateDiffInDays(a, b) {
                            const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                            const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

                            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
                        }
                        const a = new Date(x.toDate),
                        b = new Date(),
                        difference = dateDiffInDays(a, b);

                        if (difference <= 0) {
                            obj['dayDiff'] = 0
                            obj['fine'] = 0
                        }
                        else {
                            obj['dayDiff'] = difference
                            obj['fine'] = difference * 10
                        }
                        // DUE DATE DIFFERENCE

                        obj['books']=rows;
                        value.push(obj);

                        if (results.length === index + 1) {
                            if (value.length === 0) {
                                console.log('error')
                                res.status(200).send('No Result Found')
                            } else {
                                data['result'] = value;
                                res.json(data)
                            }
                        }

                    }
                })
            })

        }
    });
})

module.exports = student;