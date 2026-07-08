import React, { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";


// Map click handler
function LocationMarker({ setLocation }) {

  useMapEvents({

    click(e){

      setLocation({

        latitude:e.latlng.lat,

        longitude:e.latlng.lng

      });

    }

  });


  return null;

}



// Move map after search
function ChangeMapView({coords}){


const map = useMap();


if(coords){

map.setView(
[
coords.latitude,
coords.longitude
],
15
);

}


return null;

}




function FarmerLocation(){


const [location,setLocation]=useState(null);


const [search,setSearch]=useState("");


const [mapPosition,setMapPosition]=useState(null);



const searchLocation = async()=>{


if(!search){

alert(
"Enter location"
);

return;

}



try{


const response = await fetch(

`https://nominatim.openstreetmap.org/search?format=json&q=${search}`

);



const data = await response.json();



if(data.length===0){

alert(
"Location not found"
);

return;

}



const coords={


latitude:
parseFloat(data[0].lat),


longitude:
parseFloat(data[0].lon)


};



setMapPosition(coords);


setLocation(coords);



}

catch(error){

console.log(error);

alert(
"Search failed"
);

}


};





const saveLocation=()=>{


console.log(location);


alert(
"Farm location saved"
);


};




return (

<div>


<h2
style={{
color:"#2e7d32"
}}
>

📍 Select Farm Location

</h2>



<div

style={{

display:"flex",

gap:"10px",

margin:"20px 0"

}}

>


<input

type="text"

placeholder="Search village, city, area..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

style={{

flex:1,

padding:"12px",

border:"1px solid #ccc",

borderRadius:"8px"

}}

/>



<button

onClick={searchLocation}

style={{

background:"#2e7d32",

color:"white",

border:"none",

padding:"12px 20px",

borderRadius:"8px",

cursor:"pointer"

}}

>

Search

</button>



</div>




<MapContainer


center={[20.5937,78.9629]}


zoom={5}


style={{

height:"450px",

width:"100%",

borderRadius:"15px"

}}



>


<TileLayer


url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

/>




{

mapPosition &&

<ChangeMapView coords={mapPosition}/>

}




<LocationMarker

setLocation={setLocation}

/>




{

location &&

<Marker

position={[

location.latitude,

location.longitude

]}

>


<Popup>

Farm Location

</Popup>


</Marker>

}



</MapContainer>




{

location &&

<div

style={{

marginTop:"20px",

padding:"20px",

background:"#f1f8e9",

borderRadius:"10px"

}}

>


<h3>

Selected Farm Location

</h3>


<p>

Latitude:
{location.latitude}

</p>


<p>

Longitude:
{location.longitude}

</p>



<button

onClick={saveLocation}

style={{

padding:"12px 25px",

background:"#388e3c",

color:"white",

border:"none",

borderRadius:"8px",

cursor:"pointer"

}}

>

Save Location

</button>



</div>

}



</div>


);

}


export default FarmerLocation;