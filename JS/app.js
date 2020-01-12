$("document").ready(function() {
  let apiKey = "38068f8dbeb00ea35c18384c9fb8712c";
  let queryURL = `http://api.openweathermap.org/data/2.5/forecast?id=524901&units=imperial&APPID=${apiKey}`;
  let moscowLon = "37.6156";
  let moscowLat = "55.7522";
  let uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${moscowLat}&lon=${moscowLon}`;
  let searchInput = $("input#searchinput");
  let searchBtn = $("button#search");
  let cityBtn = $("button.button");
  cityBtn.on("click", function(e) {
    e.preventDefault;
    queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${$(
      this
    ).text()},us&units=imperial&APPID=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      //Assigning text content of button to API
      $("h3#cityname").text(`${response.city.name}`);
      $("img#icon").attr(
        "src",
        `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`
      );
      $("h5#temp").text(`Temperature: ${response.list[0].main.temp}°F`);
      $("p#humidity").text(`Humidity: ${response.list[0].main.humidity}%`);
      $("p#windspeed").text(`Wind: ${response.list[0].wind.speed} mph`);
      let cityLat = response.city.coord.lat;
      let cityLon = response.city.coord.lon;
      uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${cityLat}&lon=${cityLon}`;
      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function(response) {
        $("p#uvindex").text(`UV Index: ${response.value}`);
      });
    });
  });
  searchBtn.on("click", function(e) {
    e.preventDefault();
    let citySearch = searchInput.val();
    queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${citySearch},us&units=imperial&APPID=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      //Assigning text content of corresponding element tag to API
      $("h3#cityname").text(`${response.city.name}`);
      $("img#icon").attr(
        "src",
        `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`
      );
      $("h5#temp").text(`Temperature: ${response.list[0].main.temp}°F`);
      $("p#humidity").text(`Humidity: ${response.list[0].main.humidity}%`);
      $("p#windspeed").text(`Wind: ${response.list[0].wind.speed} mph`);
      let cityLat = response.city.coord.lat;
      let cityLon = response.city.coord.lon;
      uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${cityLat}&lon=${cityLon}`;
      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function(response) {
        $("p#uvindex").text(`UV Index: ${response.value}`);
      });
    });
  });
});
