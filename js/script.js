// using asyn function - Reason for using this, it gives promise to us.

async function restCountires() {
  try {
    // using fetch for getting data's in API
    const response = await fetch("https://restcountries.com/v3.1/all")
    const countries = await response.json();
    // console.log(countries)

    //create div tag for class container
    const bootstrapContainer = document.createElement("div");
    bootstrapContainer.className = "container";
    document.body.appendChild(bootstrapContainer);

    // sub-div for class row in container class
    const subDiv = document.createElement("div");
    subDiv.className = "row";
    bootstrapContainer.appendChild(subDiv);

    // h1 tag with class text-enter in container.
    const title = document.createElement("h1");
    title.id = "title";
    title.className = "text-center";
    title.textContent = "All the Country details and weather reports";
    subDiv.appendChild(title);

    // another div have class row col-lg-4 col-sm-12 in  class row in div tag
    const classDiv = document.createElement("div");
    classDiv.className = "col-sm-6.col-md-4.col-lg-4.col-xl-4'";
    subDiv.appendChild(classDiv);


    // Using for each method to get each countries data
    countries.forEach((country) => {
      // here a create div tag with class name card
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";

      // Another div tag creating for header with class name card-header
      const cardHeadDiv = document.createElement("div");
      cardHeadDiv.className = "card-header";
      cardHeadDiv.textContent = country.name.common;


      // div tag for card-body
      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.className = "card-body";


      // creating image tag with class flag-image
      const flagImg = document.createElement("img");
      flagImg.setAttribute("class", "flag-image");
      flagImg.src = country.flags.png;


      // creating div tag with class card-text with innerHTML texts
      const cardText = document.createElement("div");
      cardText.className = "card-text";
      cardText.innerHTML = `Native Name: ${country.capital}<br>
      Region:   ${country.region}<br>
      Latlng:  ${country.latlng} <br>
      Country Code:${country.cca3}<br>
      Population: ${country.population}`;


      //create button in div with class btn btn-primary and text content click for weather
      const btn = document.createElement("div");
      const button = document.createElement("button");
      button.textContent = "Click for Weather";
      button.setAttribute("class", "btn btn-primary");

      // set attribute --> to set data-country with  data of our needed
      button.setAttribute("data-country", country.name.common);
      button.setAttribute("target", "_blank");

      // adding event listener for clicking event in button

      button.addEventListener("click", async () => {
        try {
          //using get attribute to get data data by data-country
          const countryName = button.getAttribute("data-country");

          //fetching data from API
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&APPID=291b48f910151fdb26b65d8ca0f5f6a5`
          );
          const weatherDetail = await weatherResponse.json();

          // some weather details are shown in button after clicked
          const weatherText = `Weather:${weatherDetail.weather[0].description} Temperature: ${weatherDetail.main.temp}°C & Humidity:${weatherDetail.main.humidity}%`;
          button.textContent = weatherText;

          //here using handler function for weather API ,if we got error it will tell in console.
        } catch (error) {
          console.error("Error for getting weather data:", error);
        }
      });

      cardBodyDiv.appendChild(flagImg);
      cardBodyDiv.appendChild(cardText);
      cardBodyDiv.appendChild(button);
      cardBodyDiv.appendChild(btn);

      cardDiv.appendChild(cardHeadDiv);
      cardDiv.appendChild(cardBodyDiv);

      classDiv.appendChild(cardDiv);
    });

    // handler function for restcountries API
  } catch (error) {
    console.error("Error", error);
  }
}
restCountires();
