import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Predict from "../Modal/Predict";

// Delete the default Leaflet icon to avoid broken image links
delete L.Icon.Default.prototype._getIconUrl;

// Merge custom Leaflet icon options
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const LocationFinderDummy = ({ onLocationClick }) => {
  const map = useMapEvents({
    click(e) {
      console.log(e.latlng);
      onLocationClick(e.latlng); // Pass the clicked location to the parent component
    },
  });
  return null;
};

const Map = () => {
  const [latlng, setLatlng] = useState({ lat: 0, lng: 0 });
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [result, setResult] = useState("");

  const mapStyles = {
    width: "100%",
    height: "500px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  let circleStyles;
  let circles;

  if (result && result.prediction[0] === 2) {
    // Render red circle
    circles = [{ latitude: latlng.lat, longitude: latlng.lng, radius: 10000 }];
    circleStyles = {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
    };
  } else if (result && result.prediction[0] === 1) {
    // Render yellow circle
    circles = [{ latitude: latlng.lat, longitude: latlng.lng, radius: 10000 }];
    circleStyles = {
      color: "yellow",
      fillColor: "yellow",
      fillOpacity: 0.2,
    };
  } else {
    // No circle to render
    circles = [];
    circleStyles = {};
  };

  // Function to handle circle click event
  const handleCircleClick = (e, circleData) => {
    const curPos = e.latlng;
    alert(`Clicked on circle with radius ${circleData.radius} at: ${curPos.lat} : ${curPos.lng}`);
  };

  // Function to handle map click event
  const handleMapClick = (clickedLatLng) => {
    setLatlng(clickedLatLng);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <MapContainer
        center={[28.3949, 84.1240]}
        zoom={13}
        scrollWheelZoom={false}
        style={mapStyles}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetmap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latlng.lat, latlng.lng]}>
          <Popup position={[latlng.lat, latlng.lng]}>
            <p>hello</p>
          </Popup>
        </Marker>

        {/* Render circles dynamically */}
        {circles.map((circleData, index) => (
          <Circle
            key={index}
            center={[circleData.latitude, circleData.longitude]}
            pathOptions={circleStyles}
            radius={circleData.radius}
            eventHandlers={{
              click: (e) => handleCircleClick(e, circleData), // Attach click event handler
            }}
          ></Circle>
        ))}

        <LocationFinderDummy onLocationClick={handleMapClick} />
      </MapContainer>

      <div className="flex flex-col p-4 ml-4 bg-white rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="Latitude" className="text-lg font-semibold " style={{ color: 'red' }}>
            Latitude
          </label>
          <input
            type="text"
            value={latlng.lat}
            className="border-2 border-neutral-700 ml-2 p-2 rounded-md"
          />
          <label htmlFor="longitude" className="ml-2 text-lg font-semibold">
            Longitude
          </label>
          <input
            type="text"
            value={latlng.lng}
            className="border-2 border-neutral-700 ml-2 p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="month" className="text-lg font-semibold">
            Month
          </label>
          <input
            type="number"
            value={month}
            className="border-2 border-neutral-700 ml-2 p-2 rounded-md"
            onChange={(e) => setMonth(e.target.value)}
          />
          <label htmlFor="day" className="ml-2 text-lg font-semibold">
            Day
          </label>
          <input
            type="number"
            value={day}
            className="border-2 border-neutral-700 ml-2 p-2 rounded-md"
            onChange={(e) => setDay(e.target.value)}
          />

          {/* Get Prediction button */}
          <button
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
            onClick={() => console.log("Get Prediction clicked")} // Add your logic here
          >
            Get Prediction
          </button>
        </div>
      </div>

      <Predict
        latitude={latlng.lat}
        longitude={latlng.lng}
        month={month}
        day={day}
        setResult={setResult}
      />
    </div>
  );
};

export default Map;
