import React from "react";

import FarmerLocationMap from "../components/FarmerLocation";


function AddFarmLocation(){


return (

<div className="farm-location-page">


<h1>
Add Your Farm Location
</h1>


<p>
Click on the map to select your farm location
</p>


<FarmerLocationMap/>


</div>

);


}


export default AddFarmLocation;