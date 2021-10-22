// Api weather map


let container = document.getElementById("container");
let searchform = document.getElementById("search_submit");
let searchInput = document.getElementById("search_input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timeZone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");

//declarar funciones secundarias
 
const displayBackgroundImage = (obj) =>{
   console.log(obj.list[2].dt);
    //extraer la hora del objeo de los datos del tiempo
     let Hora = new Date(obj.list[2].dt*1000).toLocaleString("co-CO",{
        timeStyle: "short",
        dateStyle: "long"
     });
    
   // console.log(datespanish);
    //convertirlo a formato legible
    //manipular el dom incluir es hora
    date.textContent = `Actualizacion ${Hora}`
    //estraer la hora
    const dayHour = new Date(obj.list[2].dt*1000).getHours();
   // console.log(dayHour);

    //logica
     if(dayHour > 6 && dayHour < 18){
         container.classList.remove("night");
         container.classList.add("day")
     }else{
         container.classList.remove("day");
         container.classList.add("night")
     }
};

const displayData = (obj) =>{
    console.log(obj);
    temperatureDegrees.textContent = Math.floor(obj.list[0].main.temp);
    timeZone.textContent = obj.list[0].name;
    const icon = obj.list[0].weather[0].icon;
    weatherIcon.innerHTML = `<img src="icons/${icon}.png"></img>`
    min.textContent = Math.floor(obj.list[0].main.temp_min);
    max.textContent = Math.floor(obj.list[0].main.temp_max);
    temperatureDescription.textContent = obj.list[0].weather[0].description.charAt(0).toUpperCase()+
    obj.list[0].weather[0].description.slice(1);
};
//Declarar getWeatherDAta

const getWeatherData = async (city)=>{
    //hacer la peticion ala api
    const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric&lang=sp`, {
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "f1198922f1msha3927e5a9a40e48p10f03fjsn71bfe6ea4a79"
        }});
        const data = await res.json();
        console.log(data);
    //fetch
    //cambiar el fondo depende de la hora
    displayBackgroundImage(data);
    //mostrar os ddatos en pantalla 
    displayData(data);
}

searchform.addEventListener("submit", e=>{
    e.preventDefault();
   getWeatherData(searchInput.value)
})
//Al cargar la pagina inicialmete carga la ciudad

window.onload = ()=>{
    getWeatherData("Bogota");
}