console.log('JavaScript is loaded');
// query selector
const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const msg1=document.querySelector('#msg1');
const msg2=document.querySelector('#msg2');
const box=document.querySelector('.box');


msg1.textContent='';
msg2.textContent='';
weatherForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const location = search.value;
  msg1.textContent='Loading...';
  msg2.textContent='';
  fetch('/weather?address='+location).then((response)=>{
response.json().then((data)=>{
     if(data.error)
     {
       box.classList.remove("ok");
      box.classList.add("erro");
        msg2.textContent='';
         msg1.textContent='Your location is invalid';
         
     }
     else{
      box.classList.remove("erro");
      box.classList.add("ok");
         msg1.textContent='The current status of the country is '+data.forcast.current +' with Temp:'+data.forcast.temperature+' Kelvin';
         msg2.textContent=data.location;
        //    console.log(data.location);
           console.log(data.forcast);
     }
})
})
})