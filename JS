
const apiKey = "50d7798f1887e3f52aed3488402a5835";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

//estão ligadas ao html e são responsáveis por manipular (variáveis)
const cityElement = document.querySelector("#city"); 
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherData = document.querySelector("#weather-data");

const cityErrorElement = document.querySelector("#error-message");

//FUNÇÕES
const getWeatherData = async(city) =>{
    const apiWheatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWheatherURL);
    const data = await res.json();

    return data;

    ;
};
//mostrar os dados do clima: (showWeatherData)
const showWeatherData = async(city) => {
    const data = await getWeatherData(city);
//get: pegar os dados dessa cidade
//verificar se a cidade existe e faz o tratamento do erro:
    if(data.cod === "404"){
        window.alert("A cidade que você digitou não existe")
    }

    cityElement.innerText = data.name; 
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherData.classList.remove("hide");
}; 

//tratamento de erros
const showErroMessahe = (city) => (
    cityErrorElement.innerText = city;
    erroMessageContainer.classList.remove("hide");
)


//Eventos
searchBtn.addEventListener("click", (e) =>{
    e.preventDefault() //evita o envio do formulário
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});
