"use strict";

const searchInput = document.querySelector(".search_input");
const searchBtn = document.querySelector(".search_btn");
const searchInputEnter = document.querySelector(".searchInput");
const searchBtnEnter = document.querySelector(".searchBtn");
const firstPage = document.querySelector(".firstPage");
const mainSection = document.querySelector(".main_section");
const aside = document.querySelector(".aside");

const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const icons = document.querySelector(".icons_time");

const feelsLike = document.querySelector(".feels_like_value");
const humidity = document.querySelector(".humidity_value");
const pressure = document.querySelector(".pressure_value");
const windSpeed = document.querySelector(".wind_speed_value");

let peticion;

const weather = {
    apiKey : "You need your apiKey in openweathermap",
    lang: "pt",
    units: "metric",
}
function temperaturaLocal(){
    peticion = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem("city")}&appid=${weather.apiKey}&units=${weather.units}&lang=${weather.lang}`);
    peticion.then((res)=>res.json())
            .then((res)=>{
                res
                temperature.innerHTML = `${Math.round(res.main.temp)}°`;
                feelsLike.innerHTML = `${res.main.feels_like}°`;
                humidity.innerHTML = `${res.main.humidity}%`;
                pressure.innerHTML = `${res.main.pressure}`;
                windSpeed.innerHTML = `${res.wind.speed} km/h`;
                city.innerHTML = `${res.name}`;
                country.innerHTML = `${res.sys.country}`;
                icons.src  = `./IMG/${res.weather[0].icon}.png`;
            });
};
window.addEventListener("load", ()=>{
    if(localStorage.getItem("city") && localStorage.getItem("city").length > 0){
        temperaturaLocal()
        firstPage.style.display = "none";
        mainSection.style.display = "flex";
        aside.style.display = "flex";
    };
});
searchBtnEnter.addEventListener("click", ()=>{
    localStorage.setItem("city", searchInputEnter.value);
    localStorage.getItem("city");
    firstPage.style.display = "none";
    mainSection.style.display = "flex";
    aside.style.display = "flex";
    temperaturaLocal()
});
searchBtn.addEventListener("click", ()=>{
    localStorage.setItem("city", searchInput.value);
    temperaturaLocal();
    searchInput.value = "";
});
