const express=require('express');
const app = express();
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'password',
    database : 'smartbrain'
  }
});

// db.select('*').from('users').then(data=>{
//   console.log(data);
// });

app.use(express.json());


const database={
  users:[
    {
      id:'123',
      name:'Michael',
      password:'cookies',
      email:'mike@gmail.com',
      entries:0,
      joined:new Date()
    },
    {
      id:'124',
      name:'sally',
      password:'bananas',
      email:'sally@gmail.com',
      entries:0,
      joined:new Date()
    }
  ],
  login:[
    {
      id:'987',
      hash:'',
      email:'mike@gmail.com'
    }
  ]
}

app.use(cors());

app.get('/',(req,res)=>{res.send('Success');})
app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})//this is called dependecy INJECTION
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})
//

// bcrypt.hash(password, null, null, function(err, hash) {
//   console.log(hash);
// });

// Load hash from your password DB.



app.listen(process.env.PORT || 3000, ()=>{
  console.log(`app is running on port ${process.env.PORT}`);
})


/*
/--> res= 'this is working'
/signin --> post = success/fail
/register --> post = user
/profile/:userId --> get=user
/image --> put=user


*/