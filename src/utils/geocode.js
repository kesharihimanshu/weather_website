
const request=require('request');

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?types=country&access_token=pk.eyJ1Ijoia2VzaGFyaWhpbWFuc2h1IiwiYSI6ImNrenI4bjBhejBhemcydm1vNnI3Z3Q2ZGQifQ.JDk-RKpstLk8HifmnOXS-w&limit=1'
    request({url,json:true},(error,{body})=>{
            if(error)
            {
                callback('THERE IS SOME ERROR');
            }
            else if(body.features.length === 0)
            {
                callback('Unable to find the location: Try again later');
            }
            else{
                    callback(undefined,{
                        latitude : body.features[0].center[0],
                         longitude: body.features[0].center[1],
                         location: body.features[0].place_name

                    })
            }
    })
}
module.exports=geocode;