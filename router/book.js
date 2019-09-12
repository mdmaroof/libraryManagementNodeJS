const express = require('express');
const books = express.Router();
const conn = require('../config.js');

books.get('/books', function(req, res) {
    let data = {};
    let value = [];
    conn.query("SELECT * FROM `books`", function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } 
        else{
            var obj = {};
            results.forEach(((x,index)=>{
                conn.query(`SELECT COUNT(student_books.book_id) AS booksTaken FROM student_books JOIN students ON (students.studentId = student_books.student_id AND students.returnBook = 0) WHERE student_books.book_id = ${x.id}` , function (err, rows, fields) {
                    if (err){
                        console.log(error)
                        res.sendStatus(400);
                    } 
                    else{
                        obj = x;
                        obj['booksTaken']=rows[0].booksTaken;
                        obj['booksAvailable']= x.totalBook - rows[0].booksTaken;
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
                });
            }))

        }
    });
});

books.get('/books/:className', function(req, res) {
    let data = {};
    let value = [];

    conn.query(`SELECT * FROM books WHERE class_book_related = '${req.params.className}'`, function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } 
        else{
        var obj = {};
            results.forEach(((x,index)=>{
                conn.query(`SELECT COUNT(student_books.book_id) AS booksTaken FROM student_books JOIN students ON (students.studentId = student_books.student_id AND students.returnBook = 0) WHERE student_books.book_id = ${x.id}` , function (err, rows, fields) {
                    if (err){
                        console.log(error)
                        res.sendStatus(400);
                    } 
                    else{
                        obj = x;
                        obj['bookTaken']=rows[0].booksTaken;
                        obj['booksAvailable']= x.totalBook - rows[0].booksTaken;
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
                });
            }))

            // data['result'] = results;
            // res.json(data)
        }
    });
});

books.post('/addbooks', function(req, res) {
    // console.log(req.body)
    let data={}
    const bookName= req.body.bookName;
    const className= req.body.className;
    conn.query(`INSERT INTO books (book_name,class_book_related) VALUES ('${bookName}','${className}')`, function (error, results, fields) {
        if (error){
            console.log(error)
            data['message'] = 'Unable To Add Data'; 
            res.status(203).json(data);
        } 
        else{
            data['message'] = 'Succesfully Added';
            res.json(data)
        }
    });
})

books.post('/bookReturn', function (req, res) {
    let data = {}
    const fine = req.body.fine;
    const studentId = req.body.studentId;


    conn.query(`INSERT INTO returnBooks (studentId,fineAmount) VALUES ('${studentId}','${fine}')`, function (error, results, fields) {
        if (error) {
            console.log(error)
            data['message'] = 'Unable To Add Data';
            res.status(203).json(data);
        }
        else {
            conn.query(`UPDATE students SET returnBook='1' WHERE studentId='${studentId}'`, function (err, rows, fields) {
                if (err) {
                    console.log(err)
                    data['message'] = 'Unable To Add Data';
                    res.status(203).json(data);
                }
                else {
                    data['message'] = 'Succesfully Added';
                    res.json(data)
                }
            })

        }
    });
})

books.get('/returnBookData', function (req, res) {
    let data = {}
    conn.query("SELECT `returnBooks`.`studentId`,`students`.`studentName`,`returnBooks`.`currentDate`,`returnBooks`.`fineAmount` FROM `returnBooks` JOIN students ON (`returnBooks`.`studentId` = `students`.studentId)", function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } 
        else{
            data['result'] = results;
            res.json(data)
        }
    })
})

module.exports = books;