//  const myApiKey= "ddbd2ff09e4b94d5367fbca27e5e3e75"; 


// const main=document.querySelector("#main");
// const btn=document.querySelector("#btn");
// const searchLoc=document.querySelector("#searchLoc");

// const url= (city) => 
// `https://api.openweathermap.org/data/2.5/weather?q=bangalore&units=metric`;
// `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${myApi}` ;


// async function getWeatherByLocation(city){
    
//     const res= await fetch( url(city),{
//         origin: "cors"
//     });
//     const resData= await res.json();
//     console.log(resData);

//     // showWeather(resData);
// }

// function showWeather(data){
//     const temp= KtoC(data.main.temp);
//     const humidity= data.main.humidity;
//     const windSpeed= data.wind.speed;
//     const clouds= data.clouds.value;
//     const visibility= data.visibility.value;
//     const feelsLike= data.feels_like.value;

//     const weather= document.createElement("div");
//     weather.classList.add("weather");

//     // weather.innerHTML= `
//     // <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
//     // </h2>
//     // <small>${data.weather[0].main}</small>
//     // <div class="more-info">
//     // <p>Humidity : <span>${humidity}%</span></p>
//     // <p>Wind speed : <span>${+Math.trunc(windSpeed * 3.16)}km/h</span></p>
//     // </div>
//     // `;

//     main.innerHTML="";

//     main.appendChild(weather);
    
// }

// function KtoC(K){
//     return Math.floor(K - 273.15);

// }


// btn.addEventListener("click", (e)=>{
//     e.preventDefault();

//     const city= searchLoc.value;

//     if(city){
//         getWeatherByLocation(city);
//     }
// });




// async function getWeatherByLocation(){
//     try{
//         let res= await axios.get(url);
//         console.log(res);
//     }catch(e){
//         console.log(`[]`);
//     }
// }


const apiKey= "ddbd2ff09e4b94d5367fbca27e5e3e75";
const apiUrl= 
`https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;


const btn=document.querySelector("#btn");
const searchLoc=document.querySelector("#searchLoc");
const weatherIcon= document.querySelector(".weather-icon");

btn.addEventListener("click", ()=>{
   const cityName= searchLoc.value;
   
    if(cityName){
        getWeather(cityName);
    }else{
        console.log("city not found");
    }

    

});

async function getWeather(city){
   
    let h2= document.querySelector(".city");
    let errFix= document.querySelector(".err-fix");
    let div= document.querySelector("#main-weather");
    

    try{
        let res =  await fetch(apiUrl + city + `&appid=${apiKey}` );
       
        if(res.status == "404"){
            
            errFix.style.display= "block";
            div.style.display= "none";
        } else {
            let resData= await res.json();
        // console.log(resData);

        h2.innerHTML= resData.name;
        document.querySelector(".temp").innerHTML= Math.round(resData.main.temp) + "°C";
        document.querySelector(".fl-temp").innerHTML= resData.main.feels_like + "°";
        document.querySelector(".wsp").innerHTML= resData.wind.speed + "km/h";
        document.querySelector(".humid").innerHTML= resData.main.humidity + "%";
        document.querySelector(".press").innerHTML= resData.main.pressure + "mbar";
   
        if(resData.weather[0].main == "Clouds"){
            weatherIcon.src= "asset/clouds.png";
         } else if(resData.weather[0].main == "Clear"){
             weatherIcon.src= "asset/clear.png";
          } else if(resData.weather[0].main == "Rain"){
             weatherIcon.src= "asset/rain.png";
          } else if(resData.weather[0].main == "Drizzle"){
             weatherIcon.src= "asset/drizzle.png";
          } else if(resData.weather[0].main == "Mist"){
             weatherIcon.src= "asset/mist.png";
          }
         
          div.style.display= "block";
          errFix.style.display= "none";

        }

      }catch(e){
        console.log(`Error= ${e}`);
      }
}

getWeather(); 