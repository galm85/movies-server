const router = require('express').Router();
const db = require('../config/db');


router.get('/',(req,res)=>{
    db.query("SELECT * FROM movies",(error,result)=>{
        if(error){
            return res.status(400).send(error);
        }

        res.status(200).send(result);
    })
})


router.post('/',(req,res)=>{
    const movie = req.body;
    db.query(`INSERT INTO movies (title,article,image,author,trailer) VALUES ('${movie.title}','${movie.article}','${movie.image}','${movie.author}','${movie.trailer}')`,
    (error,result)=>{
        if(error){
            return res.status(400).send(error);
        }

        res.send(result);
    }
    )
})



module.exports = router;