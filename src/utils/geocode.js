const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmFnaW5pdmVudWdvcGFsIiwiYSI6ImNrY2szd2Z5eTEyaHcyeHM1enN4eG1uZWcifQ.ERYrU8PkxiPeLOlcyaWuUg&limit=1'
    // request({url: url,json:true},(error,response)=>{
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Location Service!',undefined)
        } else if(body.features.length===0){
            callback('Unable to find the location. Please enter some valid values to the URL.',undefined)
        } else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode