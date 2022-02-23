const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forcast=require('./utils/forcast');

const app=express();
const port=process.env.PORT || 3000
// Define path for express config
const publicDic=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials');


// set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to serve.
app.use(express.static(publicDic));

app.get('',(req,res)=>{
    res.render('index', {
        title:'Home page',
        name:'Himanshu Keshari'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Himanshu Keshari'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send('Please provide the Address');
    }
    geocode(req.query.address,(error,{ latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(longitude, latitude,(error,forcastData)=>{
            if(error){
              return  res.send({error})
            }
            res.send({
                forcast:forcastData,
                location,
                address:req.query.address
            })
        })
       
    })
  
   
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
      return  res.send('error');
    }
    console.log(req.query);
    res.send({
        product:[]
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Himanshu Keshari'
    })
})
 
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Himanshu Keshari',
        errormsg:'Help content not found'
    });
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Himanshu Keshari',
        errormsg:'404 Page Not Found'
    });
})



app.listen(port,()=>{
    console.log('Server started');
})
