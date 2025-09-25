// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  event.preventDefault()
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day


  
  if (stormname.value == "" || year.value == ""){
    alert("You forgot to put in the name and year")
  }

  else{

    let oldTable = document.getElementById("dataset");
    if (oldTable != null){
      let parentElement = oldTable.parentNode;
      parentElement.removeChild(oldTable);
    }

    const stormname = document.querySelector( "#stormname" ),
          year = (document.querySelector( "#year" )),
          windspeed = (document.querySelector( "#windspeed" )),
          airpressure = (document.querySelector( "#airpressure" ))
    
    const dataset = document.createElement('table');

    const data = {
      Name: stormname.value,
      Year: year.value,
      Windspeed: windspeed.value,
      Airpressure: airpressure.value
    };
    
    
    
    console.log(JSON.stringify(data))

    fetch( "/submit", {
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(data)
    }).then(function(response) {return response.json();})
    .then(function(json) {
      
      const categories = document.createElement('thead');
      const hurricanes = document.createElement('tbody');

      const catRow = document.createElement('tr');
      Object.keys(json[0]).forEach(key => {
        if (key !== "_id"){
          const cat = document.createElement('th');
          cat.textContent = key;
          if (cat.textContent === "Windspeed"){
            cat.textContent = "Wind Speed (mph, 1-minute sustained)"
          }
          if (cat.textContent === "Airpressure"){
            cat.textContent = "Air Pressure (mbar)"
          }
          catRow.appendChild(cat);
          if (key === "Windspeed"){
            const cat2 = document.createElement('th');
            cat2.textContent = "Category"
            catRow.appendChild(cat2);
          }
        }
      });
      categories.appendChild(catRow);

      json.forEach( item => {
        let wind = 0;
        const hurricane = document.createElement('tr');
        Object.values(item).forEach(value => {
          wind++;
          if (wind !== 1){
          const property = document.createElement('td');
          property.textContent = value;
          hurricane.appendChild(property);
          }
          if (wind == 4){
            if (value >= 157){
              hurricane.style.backgroundColor = 'pink';
              const ss = document.createElement('td');
              ss.textContent = "Category 5 Major Hurricane";
              hurricane.appendChild(ss);
            }
            else if (value >= 130){
              hurricane.style.backgroundColor = 'red';
              const ss = document.createElement('td');
              ss.textContent = "Category 4 Major Hurricane";
              hurricane.appendChild(ss);
            }
            else if (value >= 111){
              hurricane.style.backgroundColor = 'orange';
              const ss = document.createElement('td');
              ss.textContent = "Category 3 Major Hurricane";
              hurricane.appendChild(ss);
            }
            else if (value >= 96){
              hurricane.style.backgroundColor = 'yellow';
              const ss = document.createElement('td');
              ss.textContent = "Category 2 Hurricane";
              hurricane.appendChild(ss);
            }
            else if (value >= 74){
              hurricane.style.backgroundColor = 'white';
              const ss = document.createElement('td');
              ss.textContent = "Category 1 Hurricane";
              hurricane.appendChild(ss);
            }
            else if (value >= 39){
              hurricane.style.backgroundColor = 'cyan';
              const ss = document.createElement('td');
              ss.textContent = "Tropical Storm";
              hurricane.appendChild(ss);
            }
            else{
              hurricane.style.backgroundColor = 'blue';
              const ss = document.createElement('td');
              ss.textContent = "Tropical Depression";
              hurricane.appendChild(ss);
            }
          }
        })
        hurricanes.appendChild(hurricane);

      })

      dataset.appendChild(categories);
      dataset.appendChild(hurricanes);

      dataset.id = "dataset";

      document.body.appendChild(dataset);

    })
  }

}

const deletion = async function( event ) {
  event.preventDefault()
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day


  
  if (stormname.value == "" || year.value == ""){
    alert("You forgot to put in the name and year")
  }

  else{

    let oldTable = document.getElementById("dataset");
    if (oldTable != null){
      let parentElement = oldTable.parentNode;
      parentElement.removeChild(oldTable);
    }

    const stormname = document.querySelector( "#stormname" ),
          year = (document.querySelector( "#year" )),
          windspeed = (document.querySelector( "#windspeed" )),
          airpressure = (document.querySelector( "#airpressure" ))
    
    const dataset = document.createElement('table');

    const data = {
      Name: stormname.value,
      Year: year.value,
      Windspeed: windspeed.value,
      Airpressure: airpressure.value
    };
    
    
    
    console.log(JSON.stringify(data))

    fetch( "/delete", {
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(data)
    }).then(function(response) {return response.json();})
    .then(function(json) {
      
      const categories = document.createElement('thead');
      const hurricanes = document.createElement('tbody');

      const catRow = document.createElement('tr');
      Object.keys(json[0]).forEach(key => {
        if (key !== "_id"){
          const cat = document.createElement('th');
          cat.textContent = key;
          if (cat.textContent === "Windspeed"){
            cat.textContent = "Wind Speed (mph, 1-minute sustained)"
          }
          if (cat.textContent === "Airpressure"){
            cat.textContent = "Air Pressure (mbar)"
          }
          catRow.appendChild(cat);
          if (key === "Windspeed"){
            const cat2 = document.createElement('th');
            cat2.textContent = "Category"
            catRow.appendChild(cat2);
          }
        }
      });
      categories.appendChild(catRow);

      json.forEach( item => {
        let wind = 0;
        const hurricane = document.createElement('tr');
        Object.values(item).forEach(value => {
          wind++;
          if (wind !== 1){
          const property = document.createElement('td');
          property.textContent = value;
          hurricane.appendChild(property);
          }
          if (wind == 4){
            if (value >= 157){
              hurricane.style.backgroundColor = 'pink';
              const ss = document.createElement('td');
              ss.textContent = "Category 5 Major Hurricane";
              hurricane.appendChild(ss);
            }
            else if (value >= 130){
              hurricane.style.backgroundColor = 'red';
              const ss = document.createElement('td');
              ss.textContent = "Category 4 Major Hurricane";
              hurricane.appendChild(ss);
            }
            else if (value >= 111){
              hurricane.style.backgroundColor = 'orange';
              const ss = document.createElement('td');
              ss.textContent = "Category 3 Major Hurricane";
              hurricane.appendChild(ss);
            }
            else if (value >= 96){
              hurricane.style.backgroundColor = 'yellow';
              const ss = document.createElement('td');
              ss.textContent = "Category 2 Hurricane";
              hurricane.appendChild(ss);
            }
            else if (value >= 74){
              hurricane.style.backgroundColor = 'white';
              const ss = document.createElement('td');
              ss.textContent = "Category 1 Hurricane";
              hurricane.appendChild(ss);
            }
            else if (value >= 39){
              hurricane.style.backgroundColor = 'cyan';
              const ss = document.createElement('td');
              ss.textContent = "Tropical Storm";
              hurricane.appendChild(ss);
            }
            else{
              hurricane.style.backgroundColor = 'blue';
              const ss = document.createElement('td');
              ss.textContent = "Tropical Depression";
              hurricane.appendChild(ss);
            }
          }
        })
        hurricanes.appendChild(hurricane);

      })

      dataset.appendChild(categories);
      dataset.appendChild(hurricanes);

      dataset.id = "dataset";

      document.body.appendChild(dataset);

    })
  }

}

window.onload = function() {
   const button = document.querySelector("button");
  if (button != null){
  button.onclick = submit;
  }

   const removal = document.querySelector("#delete");
  if (removal != null){
  removal.onclick = deletion;
  }
   
}