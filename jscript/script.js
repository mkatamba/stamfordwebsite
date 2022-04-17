if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./serviceWorker.js', { scope: './' })
        .then(function (registration) {
            console.log("Service Worker Registered");
        })
    .catch(function (err) {
        console.log("Service Worker Failed to Register", err);
    })
};

const EnableNotificationsButton = document.getElementById("EnableNotificationsButton");
if (EnableNotificationsButton !== null) {
    EnableNotificationsButton.addEventListener("click", enableNotifications, false);
}

function hideNotificationMsg() {
    const NotificationPrompt = document.getElementById("NotificationPrompt");
    if(checkNotificationPromise() !== true) {
        NotificationPrompt.style.display = "none";
    }
    else if(Notification.permission !== 'default') {
        NotificationPrompt.style.display = "none";
    }
}
hideNotificationMsg();

function enableNotifications() {
    if(checkNotificationPromise() === true) {
        Notification.requestPermission().then(function(result) {
            hideNotificationMsg();
            console.log(result);
          });
    }
}

function checkNotificationPromise() {
    //Check browser supports notifications
    if (!('Notification' in window)) {
        return false;
    } 
    else {
        return true;
    }
}

function speak(text) {
    var msg = new SpeechSynthesisUtterance();

    // Set the text.
    msg.text = text;

    // Set the attributes.
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    msg.voice = speechSynthesis.getVoices().filter(function (voice) { return voice.name == "Microsoft Sonia Online (Natural) - English (United Kingdom)"; })[0];
}
   
function TopMenuToggle() {
    var x = document.getElementById("TopNav");
    if (x.className === "TopNav") {
        x.className += " Responsive";
    } 
    else {
        x.className = "TopNav";
    }
}

const MenuToggleButton = document.getElementById("MenuToggleButton");
MenuToggleButton.addEventListener("click", TopMenuToggle, false);

//Call the getWeatherData function defined below if the element exists on the page - on Drinks page
var temeratureLocationID = document.getElementById("TemeratureLocationID");
if(temeratureLocationID !== null) {
    getWeatherData();
}

//Call the getCoffeeData function defined below if the element exists on the page
var RandomCoffeeDetails = document.getElementById("RandomCoffeeDetails");
var DrinksMenu = document.getElementById("DrinksMenu");
if(RandomCoffeeDetails !== null || DrinksMenu !== null) {
    getCoffeeData();
}


    

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


function loadData(method, url) {
    //url = `${url}&${new Date().getTime()};`
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        //xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}


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
