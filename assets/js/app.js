$("document").ready(function () {
  const apiKey = "38068f8dbeb00ea35c18384c9fb8712c";
  let queryURL = `http://api.openweathermap.org/data/2.5/forecast?id=4138106&units=imperial&APPID=${apiKey}`;
  const searchInput = $("input#search-input");
  const searchBtn = $("button#search");

  //set creation of DOM elements and assigned values as well as double ajax call (one inside of the other) in this function
  function getData() {
    $.ajax({
      url: queryURL,
      method: "GET",
      data: {
        q: "Washington DC",
        appid: apiKey,
      },
    }).then(function (response) {
      //Default text when page loads
      //All of these DOM elements are hard coded with ids
      //Setting text/attr to the AJAX response specific object/array index
      $("h3#city-name").text(`${response.city.name}`);
      //setting the sauce for image tag of that specific day's icon using the response chain
      $("img#icon").attr(
        "src",
        `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`
      );
      $("h5#temp").text(`Temperature: ${response.list[0].main.temp}°F`);
      //splitting this node to separate date and time, and then just printing out date (index 0 of the split array) instead of both date and time
      $("h6#date").text(response.list[0].dt_txt.split(" ")[0]);
      $("p#humidity").text(`Humidity: ${response.list[0].main.humidity}%`);
      $("p#wind-speed").text(`Wind: ${response.list[0].wind.speed} mph`);
      //using the coordinates of the response city to determine URL for UV index
      let cityLat = response.city.coord.lat;
      let cityLon = response.city.coord.lon;
      let uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${cityLat}&lon=${cityLon}`;

      //nested AJAX to use first response to get coordinates of that specific city
      $.ajax({
        url: uvURL,
        method: "GET",
        data: {
          appid: apiKey,
          lat: cityLat,
          lon: cityLon,
        },
      }).then(function (response) {
        $("p#uv-index").text(`UV Index: ${response.value}`);
      });
      //for loop to dynamically create div content for 5 day forecast, set the i to 1 and multiplying by 8 since the objects returned from the response are 3 hour increments (3*8=24) so essentially going to the next day. Only 39 objects so subtracting one at the end so it doesn't get mad
      for (let i = 1; i < 6; i++) {
        //setting the sauce for image tag of that specific day's icon using the response chain
        $(`div#${i}`)
          .find($("img.icon"))
          .attr(
            "src",
            `http://openweathermap.org/img/wn/${
              response.list[8 * i - 1].weather[0].icon
            }@2x.png`
          );
        //splitting this node to separate date and time, and then just printing out date (index 0 of the split array)
        $(`div#${i}`)
          .find($("h3.date"))
          .text(`${response.list[8 * i - 1].dt_txt.split(" ")[0]}`);
        $(`div#${i}`)
          .find($("p.temp"))
          .text(`Temp: ${response.list[8 * i - 1].main.temp}°F`);
        $(`div#${i}`)
          .find($("p.humidity"))
          .text(`Humidity: ${response.list[8 * i - 1].main.humidity}%`);
      }
    });
  }

  //all of the above DOM elements created with this function:
  getData();

  //Event listener for click on search button
  searchBtn.on("click", function (e) {
    e.preventDefault();
    let citySearch = searchInput.val();
    //clearing the input field after search commences
    searchInput.val("");
    //setting local storage:
    let savedCities = JSON.parse(localStorage.getItem("savedCities"));
    if (!savedCities) {
      savedCities = [];
    }
    if (savedCities.includes(citySearch) || citySearch === "") {
      return;
    } else {
      savedCities.push(citySearch);
    }
    $(".list-group").empty();
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
    //for loop to dynamically added buttons from what's in local storage
    for (let i = 0; i < savedCities.length; i++) {
      let cityBtn = $("<button>");
      cityBtn.text(savedCities[i]);
      cityBtn.addClass("btn btn-primary");
      cityBtn.attr("style", "margin: 2px");
      $(".list-group").append(cityBtn);

      cityBtn.on("click", function (e) {
        e.preventDefault();
        queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${$(
          this
        ).text()},us&units=imperial&APPID=${apiKey}`;

        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function (response) {
          $("h3#city-name").text(`${response.city.name}`);
          $("img#icon").attr(
            "src",
            `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`
          );
          $("h5#temp").text(`Temperature: ${response.list[0].main.temp}°F`);
          $("h6#date").text(response.list[0].dt_txt);
          $("p#humidity").text(`Humidity: ${response.list[0].main.humidity}%`);
          $("p#wind-speed").text(`Wind: ${response.list[0].wind.speed} mph`);

          let cityLat = response.city.coord.lat;
          let cityLon = response.city.coord.lon;
          uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${cityLat}&lon=${cityLon}`;
          $.ajax({
            url: uvURL,
            method: "GET",
          }).then(function (response) {
            $("p#uv-index").text(`UV Index: ${response.value}`);
          });

          for (let i = 1; i < 6; i++) {
            $(`div#${i}`)
              .find($("img.icon"))
              .attr(
                "src",
                `http://openweathermap.org/img/wn/${
                  response.list[8 * i - 1].weather[0].icon
                }@2x.png`
              );
            $(`div#${i}`)
              .find($("h3.date"))
              .text(`${response.list[8 * i - 1].dt_txt.split(" ")[0]}`);
            $(`div#${i}`)
              .find($("p.temp"))
              .text(`Temp: ${response.list[8 * i - 1].main.temp}°F`);
            $(`div#${i}`)
              .find($("p.humidity"))
              .text(`Humidity: ${response.list[8 * i - 1].main.humidity}%`);
          }
        });
      });
    }
  });
});
