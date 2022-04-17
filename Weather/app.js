const button = document.querySelector(".btn");
const inputvalue = document.querySelector(".inputvalue");
var city = document.querySelector(".city");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");

button.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputvalue.value +
      "&appid=5ea20c34427b9975a24ca2c9d4b64486"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      var namevalue = data.name;
      var tempvalue = data["main"]["temp"];
      var descvalue = data["weather"][0]["description"];
      city.innerHTML = "City: " + namevalue;
      temp.innerHTML = "Temprature: " + (Math.floor(tempvalue - 273) + "°");
      desc.innerHTML = "Cloud: " + descvalue;
    })
    .catch((err) => alert("Enter Vaild City Name"));
});
