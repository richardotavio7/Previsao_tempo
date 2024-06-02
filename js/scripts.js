// Variáveis e seleção de Elementos

const apiKey = "5420b1222c7bd183d1a3e4693258a9b2";
const apiCountryURL = "https://flagsapi.com/";
const apiFinalURL = "/flat/64.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

// Funções:

const getWeatherData = async (city) => {
    try {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

        const res = await fetch(apiWeatherURL);
        if (!res.ok) {
            throw new Error("Erro ao obter dados do clima");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        alert("Não foi possível obter os dados do clima. Verifique a cidade e tente novamente.");
    }
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    if (!data) return;

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    countryElement.setAttribute("src", `${apiCountryURL}${data.sys.country}${apiFinalURL}`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;
};

// Eventos:
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();
    if (city) {
        showWeatherData(city);
    } else {
        alert("Por favor, insira o nome de uma cidade.");
    }
});






