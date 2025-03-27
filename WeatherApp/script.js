const ApiKey = "ebd165225243f6fb601888e0c8f5598e"



let city = "London";
weather(city, ApiKey); 

const cityInput = document.querySelector("#city"); 
const button = document.querySelector("button");

button.addEventListener("click", function (event) {
    event.preventDefault();
    let city = cityInput.value.trim() || "London"; 

    console.log("Selected city:", city);
    weather(city, ApiKey);
})


async function getgeo(city, ApiKey){ 
    try{ 
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${ApiKey}`)
 
        if(!response.ok){
                console.log(' not ok');
                throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if(!data){
            console.log(' not ok');
            throw new Error('Network response was not ok');
        }
            console.log(data);
            return {
                lat: data[0].lat,
                lon: data[0].lon
            };
        }
        catch(error){ 
            console.error('There was a problem with the fetch operation:', error);
        }
        
}

async function weather(city, ApiKey){ 
    try{ 
        let geo = await getgeo(city, ApiKey);
        console.log(geo);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=${ApiKey}`)
        
            console.log('ok');
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            document.querySelectorAll(".weather_icon").forEach(icon => icon.style.display = "none");
            if(data.weather[0].main=="Rain"){
                document.querySelector("#rain").style.display = "block";
            }
            else if(data.weather[0].main=="Snow"){
                document.querySelector("#snow").style.display = "block";
            }
            else if(data.weather[0].main=="Clear"){
                document.querySelector("#sun").style.display = "block";
            }
            else if(data.weather[0].main == "Clouds"){
                if (data.clouds.all > 50) {
                    document.querySelector("#cloud").style.display = "block";
                } else {
                    document.querySelector("#cloud_sun").style.display = "block";
                }
            }
            document.querySelector("#City").textContent = city;
            document.querySelector("#temp").textContent = (data.main.temp - 273.15).toFixed(2);
            document.querySelector("#humidity").textContent = (data.main.humidity).toFixed(2);
            document.querySelector("#wind").textContent = (data.wind.speed * 3.6).toFixed(2);
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
}

