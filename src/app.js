const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const foreCast=require('./utils/forecast')
const app=express()
const port=process.env.PORT || 3000
//Define paths for Express config
const publicDirPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialViewsPath=path.join(__dirname,'../templates/partial')

//Set up Handlebars engine and Views locatioh
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialViewsPath)

//Set up static directory to serve
app.use(express.static(publicDirPath))

//the below section will no longer be used and hecne commenting it
/*app.get('',(req,res)=>{
    // res.send('Hello World!')
    res.send('<h1>Weather</h1>')
})*/

//Replacing the below logic with app.use(express.static(<path>)) logic.Hence commenting them
/*app.get('/help',(req,res)=>{
    res.send([{
        name: 'Nagini'
    },
    {
        name:'Ashwin'
    }])
})

app.get('/about',(req,res)=>{
    // res.send('About Page!')
    res.send('<h1>About Page - Title</h1>')
})*/

//Print dynamic content in all pages using handlebar i..e hbs supported by express


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Nagini'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Nagini'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpmessasge:'This is a Help page.',
        title:'Help',
        name:'Nagini'
    })
})

// app.get('/weather',(req,res)=>{
//     // res.send('About Weather!')
//     res.send({
//         forecast : 'It is snowy',
//         location: 'Philadelfia'
//     })
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address value!'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
      
        foreCast(longitude, latitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
        //   console.log('Location: ',location)
        //   console.log('Data', forecastdata)
            res.send({
                forecast : forecastdata,
                // location: location,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Error',
        name:'Nagini',
        message:'Help article not found!'
    })
})
app.get('*',(req,res)=>{
    // res.send('My 404 Page!!')
    res.render('404',{
        title:'404 Error',
        name:'Nagini',
        message:'Page not found.'
    })
})


app.listen(port,()=>{
    console.log('Server is up on port ' + port + '!')
})
