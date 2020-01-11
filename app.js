let apiKey = "38068f8dbeb00ea35c18384c9fb8712c";
let queryURL = `http://api.openweathermap.org/data/2.5/forecast?id=524901&units=imperial&APPID=${apiKey}`;
/*
http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
*/
let moscowLon = "37.6156";
let moscowLat = "55.7522";
let uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${moscowLat}&lon=${moscowLon}`;
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  //going to use variable to try to set text content, but first, going to display city name with created p tag
  $("h3#cityname").text(response.city.name);
  $("h5#temp").text(`Temperature: ${response.list[0].main.temp}°F`);
  $("p#humidity").text(`Humidity: ${response.list[0].main.humidity}%`);
  $("p#windspeed").text(`Wind: ${response.list[0].wind.speed} mph`);
});

$.ajax({
  url: uvURL,
  method: "GET"
}).then(function(response) {
  $("p#uvindex").text(`UV Index: ${response.value}`);
});
