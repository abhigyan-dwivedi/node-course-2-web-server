const express=require('express')
const hbs=require('hbs')
const fs=require('fs')


app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
    //logs req data to screen
    //next is used to tell express when we are done
    var now=new Date().toString();
    var log=`${now}:${req.method} ${req.url}`

    fs.appendFile('server.log',log+'\n',(err)=>{
      if(err){
        console.log('Unable to append server log.');
      }
    });
    next();//if next is not provided/called the request hadnlers never get fired in the first place.
});

//Occurs only in order  of occurrance in code
//Try using /help.html it renders insted of maintainence page
//Try any route it lands here
// app.use((req,res,next)=>{
//   res.render('maintainence.hbs');
// });

app.use(express.static(__dirname+'/public' ));//Built in Middileware


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  //  res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Hi Guys,You are welcome here.'
    });
});

app.get('/about',(req,res)=>{
  //  res.send('<h1>Hello Express</h1>');
    //res.send('About Page');
    res.render('about.hbs',{
      pageTitle:'About Page Dynamic',
      });
});

app.get('/bad',(req,res)=>{
  //  res.send('<h1>Hello Express</h1>');
    res.send({errorMessage:'Unable to fulfill this request.'});
});

app.listen(3000,()=>{
  console.log('Server is up on port:3000');
});
