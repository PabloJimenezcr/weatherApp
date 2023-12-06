const container = document.querySelector('.container'),
    search = document.querySelector('.searchBox button'),
    weatherBox = document.querySelector('.weatherBox'),
    weatherDetails = document.querySelector('.weatherDetails'),
    error = document.querySelector('.notFound');


search.addEventListener('click', () => {
    const apiKey = '92e9956d5f0b681bc39925687f94b7d2',
        city = document.querySelector('.searchBox input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(json => {


            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error.style.display = 'block';
                error.classList.add('fadeIn');
                return;
            }

            error.style.display = 'none';
            error.classList.remove('fadeIn');

            const image = document.querySelector('.weatherBox img'),
                temperature = document.querySelector('.weatherBox .temperature'),
                description = document.querySelector('.weatherBox .description'),
                humidity = document.querySelector('.weatherDetails .humidity span'),
                wind = document.querySelector('.weatherDetails .wind  span');


            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;

                case 'Rain':
                    image.src = 'img/rain.png';
                    break;

                case 'Snow':
                    image.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'img/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'img/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${(json.weather[0].description)}`;
            humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '650px';

        });
});