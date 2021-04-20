const router = require('express').Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

//get all users
router.get('/',(req,res)=>{
    db.query("SELECT * FROM users",(error,result)=>{
        if(error){
            return res.status(400).send(error);
        }

        res.status(200).send(result);
    })
})

//register
router.post('/',(req,res)=>{
    const user = req.body;
    db.query(`INSERT INTO users (name,email,password,image,phone,isAdmin) VALUES ('${user.name}','${user.email}','${user.password}','${user.image}','${user.phone}','${user.isAdmin}')`,
    (error,result)=>{
        if(error){
            return res.status(400).send(error);
        }

        res.send(result);
    }
    )
})


//sign in 
router.post('/sign-in',(req,res)=>{
    let user = req.body;
    const query = `SELECT * FROM users WHERE email='${user.email}'AND password='${user.password}'`;
    db.query(query,(error,result)=>{
        if(result.length == 0){
            return res.status(500).send('Wrong Email or Password');
        }
        if(error){
            res.status(400).send(error);
        }

        user = result[0];
        const token = jwt.sign({id:user.id,name:user.name,email:user.email,isAdmin:user.isAdmin},'movies')
        res.send(token);
    })

})

//get user profile
router.get('/profile/:id',(req,res)=>{
    let userId = req.params.id;
    const query = `SELECT name,email,image,phone,created_at FROM users WHERE id='${userId}'`;
    db.query(query,(error,result)=>{
       
        if(result.length == 0){
            return res.status(500).send('No user Found');
        }
        if (error){
            res.send(error);
        }

        const user=result[0];
        res.status(200).send(user);
    })

})



module.exports = router;