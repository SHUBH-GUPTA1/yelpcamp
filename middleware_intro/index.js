const express=require ('express');
const app=express();
const morgan=require('morgan');

const AppError=require('./AppError')

// app.use(morgan('dev'))
// app.use(morgan('tiny'))
app.use(morgan('common'))
 
// app.use((req,res,next)=>{
//   console.log("this is my first middleware")
//     next();    //if we dont write next(); here it will stop the middleware it wont execute second or any request middleware.
//     console.log("This is my first middleware after calling next()")
// })

// app.use((req,res,next)=>{
//     console.log("this is my second middleware")
//       next();
//   })

app.use((req,res,next)=>{
    // req.method=GET;
    req.requestTime=Date.now();
    console.log(req.method.toUpperCase(),req.path);
    next();
})

app.use('/dogs',(req,res,next)=>{
    console.log('I love dogs');
    next();
})

const verifypassword=((req,res,next)=>{

    const {password}=req.query;
    if(password==='chickennugget'){
        next();
    }
    // res.send('Sorry you need a password');
    // throw new Error('Password required');          //default 500 status code error express app generates
    throw new AppError('password required',401);
})

app.get('/',(req,res)=>{
    console.log(`Request date:${req.requestTime}`)
    res.send('HOME PAGE');
})

app.get('/error',(req,res)=>{
    chicken.fly();
})

app.get('/dogs',(req,res)=>{
    console.log(`Request date:${req.requestTime}`) 
    console.log('WOOF WOOF!')
})

app.get('/secret',verifypassword,(req,res)=>{
    res.send('My secret is: sometimes i wear headphones in public so i dont talk to anyone')
})

app.get('/admin',(req,res)=>{
    throw new AppError('You are not an Admin',403);
})

app.use((req,res)=>{
    res.status(404).send("not found!")
})

// app.use((err,req,res,next)=>{
//     console.log("**********************************************");
//     console.log("*******************ERROR****************");
//     console.log("**********************************************");
//     // res.status(500).send('Oh boy we got an error!!!');
//     console.log(err);                                                           //in async function for error handling u must pass next argument & write error in next(jdabsjcbhshdcvhj);
//     next(err);                                                                  //or use try{}catch(e){next(e);} OR use wrapAsync();[video:441]
// })

const handleValidationError=err=>{
    console.dir(err);
    return new AppError(`Validation Failed...${err.message}`,400);
}

app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name==='ValidationError') err=handleValidationError(err);
    next(err);
})

app.use((err,req,res,next)=>{
    const{status=500,message='Something went wroong'}=err;
    res.status(status).send(message);
})
app.listen(3000,()=>{
    console.log('App is running on localhost:3000')
})