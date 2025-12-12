// navbar
var links = document.querySelectorAll('.nav-link');
var currentPage = window.location.pathname.split("/").pop();

for (var i = 0; i < links.length; i++) {
  var href = links[i].getAttribute('href');
  if (href === currentPage) {
    links[i].classList.add('active');
  } else {
    links[i].classList.remove('active');
  }
}

//end navbar
/*const links = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split("/").pop();
    links.forEach(link => {
      if(link.getAttribute('href') === currentPage){
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    */
// search for wether
async function search(city) {
  let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4b697729882c4706bc1111149253010&q=${city}&days=6`);
  if (t.ok && 400 != t.status) {
    let city = await t.json();
    displayCurrent(city.location, city.current),
      displayAnother(city.forecast.forecastday)
  }else {
    console.log("Please enter correct city");

  }
}
// search for city
document.getElementById("search").addEventListener("keyup", function(city) {
  search(city.target.value);
});

// time
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(city, t) {
  if (null != t) {
    var i = new Date(t.last_updated.replace(" ", "T"));
    let cartona = `
            <div class="today forecast col-lg-4 col-md-12">
                <div class="forecast-header" id="today">
                    <div class="day">${days[i.getDay()]}</div>
                    <div class="date">${i.getDate() + monthNames[i.getMonth()]}</div>
                </div>
                <div class="forecast-content" id="current">
                    <div class="location">${city.name}</div>
                    <div class="degree">
                        <div class="num">${t.temp_c}<sup>o</sup>C</div>
                        <div class="forecast-icon">
                             <img src="https:${t.condition.icon}" alt="condition.icon" width=90>
                        </div>
                    </div>
                    <div class="custom">${t.condition.text}</div>
                    <span><img src="images/icon-umberella.png" alt="umberella-icon">20%</span>
                    <span><img src="images/icon-wind.png" alt="wind-icon">18km/h</span>
                    <span><img src="images/icon-compass.png" alt="compass-icon">East</span>
                </div>
            </div>`;


    document.getElementById("forecast").innerHTML = cartona
  }
}
// display next two day's weather
function displayAnother(city) {
  var t = "";
  for (var i = 1; i < city.length; i++) {
    t += `
          <div class="forecast col-lg-4 col-md-12">
              <div class="forecast-header">
                  <div class="day">${days[new Date(city[i].date.replace(" ", "T")).getDay()]}</div>
              </div>
              <div class="forecast-content">
                  <div class="forecast-icon">
                      <img src="https:${city[i].day.condition.icon}" alt="condition" width=48>
                  </div>
                  <div class="degree">${city[i].day.maxtemp_c}<sup>o</sup>C</div>
                  <small>${city[i].day.mintemp_c}<sup>o</sup></small>
                  <div class="custom">${city[i].day.condition.text}</div>
              </div>
          </div> `;
  }

  document.getElementById("forecast").innerHTML += t
}
search("tanta");



