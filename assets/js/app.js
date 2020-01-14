$("document").ready(function () {
  let apiKey = "38068f8dbeb00ea35c18384c9fb8712c";
  let queryURL = `http://api.openweathermap.org/data/2.5/forecast?id=4138106&units=imperial&APPID=${apiKey}`;
  let currentLon = "37.6156";
  let currentLat = "55.7522";
  let uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${currentLat}&lon=${currentLon}`;
  let searchInput = $("input#searchinput");
  let searchBtn = $("button#search");
  let cityBtn = $("button.button");
  let currentBtn = $(this).text();
  function ajaxFunction() {

  }
  $.ajax({
    url: queryURL,
    method: "GET",
    data: {
      q: "Washington DC",
      appid: apiKey
    }
  }).then(function (response) {
    //Assigning text content of button to API
    $("h3#cityname").text(`${response.city.name}`);
    $("img#icon").attr("src", `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`);
    $("h5#temp").text(`Temperature: ${response.list[0].main.temp}°F`);
    $("h6#date").text(response.list[0].dt_txt)
    $("p#humidity").text(`Humidity: ${response.list[0].main.humidity}%`);
    $("p#windspeed").text(`Wind: ${response.list[0].wind.speed} mph`);
    let cityLat = response.city.coord.lat;
    let cityLon = response.city.coord.lon;
    uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${cityLat}&lon=${cityLon}`;
    $.ajax({
      url: uvURL,
      method: "GET",
      data: {
        appid: apiKey,
        lat: cityLat,
        lon: cityLon
      }
    }).then(function (response) {
      $("p#uvindex").text(`UV Index: ${response.value}`);
    });
    function fiveDayForecast() {
      for (let i = 1; i < 6; i++) {
        $(`div#${i}`).find($("img.icon")).attr("src", `http://openweathermap.org/img/wn/${response.list[8 * i - 1].weather[0].icon}@2x.png`);
        $(`div#${i}`).find($("h3.date")).text(`${response.list[8 * i - 1].dt_txt}`)
        $(`div#${i}`).find($("p.temp")).text(`Temp: ${response.list[8 * i - 1].main.temp}°F`);
        $(`div#${i}`).find($("p.humidity")).text(`Humidity: ${response.list[8 * i - 1].main.humidity}%`);
      }
    }
    fiveDayForecast();
  });

  cityBtn.on("click", function (e) {
    e.preventDefault();
    queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${$(this).text()},us&units=imperial&APPID=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      //Assigning text content of button to API
      $("h3#cityname").text(`${response.city.name}`);
      $("img#icon").attr("src", `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`);
      $("h5#temp").text(`Temperature: ${response.list[0].main.temp}°F`);
      $("h6#date").text(response.list[0].dt_txt)
      $("p#humidity").text(`Humidity: ${response.list[0].main.humidity}%`);
      $("p#windspeed").text(`Wind: ${response.list[0].wind.speed} mph`);
      let cityLat = response.city.coord.lat;
      let cityLon = response.city.coord.lon;
      uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${cityLat}&lon=${cityLon}`;
      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (response) {
        $("p#uvindex").text(`UV Index: ${response.value}`);
      });
      function fiveDayForecast() {
        for (let i = 1; i < 6; i++) {
          $(`div#${i}`).find($("img.icon")).attr("src", `http://openweathermap.org/img/wn/${response.list[8 * i - 1].weather[0].icon}@2x.png`);
          $(`div#${i}`).find($("h3.date")).text(`${response.list[8 * i - 1].dt_txt}`)
          $(`div#${i}`).find($("p.temp")).text(`Temp: ${response.list[8 * i - 1].main.temp}°F`);
          $(`div#${i}`).find($("p.humidity")).text(`Humidity: ${response.list[8 * i - 1].main.humidity}%`);
        }
      }
      fiveDayForecast();
    });
  });

  searchBtn.on("click", function (e) {
    e.preventDefault();
    let citySearch = searchInput.val();
    queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${citySearch},us&units=imperial&APPID=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      //Assigning text content of corresponding element tag to API
      $("h3#cityname").text(`${response.city.name}`);
      $("img#icon").attr("src", `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`);
      $("h5#temp").text(`Temperature: ${response.list[0].main.temp}°F`);
      $("p#humidity").text(`Humidity: ${response.list[0].main.humidity}%`);
      $("p#windspeed").text(`Wind: ${response.list[0].wind.speed} mph`);
      let cityLat = response.city.coord.lat;
      let cityLon = response.city.coord.lon;
      uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${cityLat}&lon=${cityLon}`;
      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function (response) {
        $("p#uvindex").text(`UV Index: ${response.value}`);
      });

      for (let i = 1; i < 6; i++) {
        $(`div#${i}`).find($("img.icon")).attr("src", `http://openweathermap.org/img/wn/${response.list[8 * i - 1].weather[0].icon}@2x.png`);
        $(`div#${i}`).find($("p.temp")).text(`Temp: ${response.list[8 * i - 1].main.temp}°F`);
        $(`div#${i}`).find($("p.humidity")).text(`Humidity: ${response.list[8 * i - 1].main.humidity}%`);
      };
    });
  });
});
