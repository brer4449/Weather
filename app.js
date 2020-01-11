let apiKey = "38068f8dbeb00ea35c18384c9fb8712c";
let queryURL = `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${apiKey}`;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  //going to use variable to try to set text content, but first, going to display city name with created p tag
  // let cityname = $("h3#cityname").text();
  let pTag = $("<p>");
  let cityname = response.city.name;
  pTag.text(cityname);
  $("h3#cityname").append(pTag);
});
