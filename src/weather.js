const apikey = '318a63368240db461c6605a709f02bb9';
let weatherTemp = document.getElementById('temp');
let weatherMaxTemp = document.getElementById('temp_high');
let weatherMinTemp = document.getElementById('temp_min');
let weatherHum = document.getElementById('humidity');
let weatherPressure = document.getElementById('pressure');
let weatherFeel = document.getElementById('feelLike');
let weatherTimezone = document.getElementById('timezone');
let weatherIcon = document.getElementsByClassName('icon'); 
function WeatherValue(response){
	console.log(response);
    weatherTemp.textContent = response.current.temp;
    /* the temp max and temp min are mostly the same as the normal temp so they are optional
    
    weatherMaxTemp.innerHTML = response.current.temp_max;
    weatherMinTemp.innerHTML = response.current.temp_min;*/
    weatherHum.innerHTML = response.current.humidity;
    weatherPressure.innerHTML = response.current.pressure;
    weatherFeel.innerHTML = response.current.feels_like;
    weatherTimezone.innerHTML = response.timezone;
}
document.getElementById('weatherBtn').addEventListener('click', function(){
  const lon = document.getElementById('lon').value;
	const lat = document.getElementById('lat').value;
 let a = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
	.then(response => response.json())
	.then(function(res){
		  WeatherValue(res);
	});
});

/*function displayFmessage() {
  document.getElementById('temp').value;
  if(weatherTemp.value >= 35) {
    document.getElementById('fmessage').style.display='block';
  }
  displayFmessage();
};

function displaySmessage(){
  document.getElementById('temp').value;
  if(weatherTemp.value < 30){
    document.getElementById('smessage').style.display='block';
  }
  displaySmessage();
}; 
*/
