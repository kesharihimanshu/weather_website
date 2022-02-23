const request=require('request');


const forcast=(l1,l2,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=c95c55f0f6b90b671306c915a9399281&query='+ l1 +','+ l2 +'&units=s';
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('CHECK YOUR NETWORK');
        }
        else if(body.error){
            callback('Unable to find the location');
        }
        else{
            callback(undefined,{
                current:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feelslike:body.current.feelslike
            })
        }
    })
   
}
module.exports=forcast;