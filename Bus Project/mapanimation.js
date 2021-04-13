// List Mapbox token 
mapboxgl.accessToken = 'pk.eyJ1Ijoic29mdGV4cGVyaW1lbnQiLCJhIjoiY2tjMngyZm9rMDFvajJzczJ3aWo0bnh6aiJ9.Bc_qK9Xf8SFBXkFM_x2gpg';

// Create map variable
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-71.104081, 42.365554],
    zoom: 12
  });

// Set marker
  var marker = new mapboxgl.Marker()

// Create the function that will retrieve and use the data
async function run(){
    // get bus data    
	const locations = await getBusLocations();
  // Create an array for the coordinates
  var coords = []
  coords.push([locations[0].attributes.longitude, locations[0].attributes.latitude]);  
  // Update marker
  marker.setLngLat(coords[0]);
  marker.addTo(map);
  // Initiate the time interval for the function to run
	setTimeout(run, 15000);
  }

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

