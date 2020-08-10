// const request=require('request')

// const forecast=(longtitude,latitude,callback)=>{
//     const url='http://api.weatherstack.com/current?access_key=3f53328d3d4b3166a4c10d5aeff16b52&query=' + latitude  + ',' + longtitude + '&units=f'
    
//     //request({url: url,json:true},(error,response)=>{
//     request({url ,json:true},(error,{ body })=>{
//         if(error){
//             callback('Unable to connect to Weather Service!',undefined)
//         }
//         else if(body.error){
//             callback('Unable to find the location!',undefined)
        
//         }else{
//             callback(undefined,{
//                  // weatherDesc: response.body.current.weather_descriptions[0],
//                 // temperature: response.body.current.temperature,
//                 // feelslike: response.body.current.feelslike
//                 weatherDesc: body.current.weather_descriptions[0],
//                 temperature: body.current.temperature,
//                 feelslike: body.current.feelslike
//             })
//         }
//         // } else {
//         //     callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out but feels like  ' + body.current.feelslike + '% degrees.')
//         // }
//     })
// }

// module.exports=forecast

const request=require('request')

const forecast=(longtitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=3f53328d3d4b3166a4c10d5aeff16b52&query=' + latitude  + ',' + longtitude + '&units=f'
    
    //request({url: url,json:true},(error,response)=>{
    request({url ,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to Weather Service!',undefined)
        }
        else if(response.body.error){
            callback('Unable to find the location!',undefined)
        
        }else{
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. but feels like ' + response.body.current.feelslike + ' degrees.')
            /*callback(undefined,{
                 // weatherDesc: response.body.current.weather_descriptions[0],
                // temperature: response.body.current.temperature,
                // feelslike: response.body.current.feelslike
                weatherDesc: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
                
            })*/
        }
        
    })
}

module.exports=forecast