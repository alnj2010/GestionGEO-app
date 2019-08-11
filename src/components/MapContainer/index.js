import React from 'react';
import {GOOGLE_API_MAP} from '../../services/constants'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
  const {
    handleDragEnd,
    isMarkerShown,
    lat,
    lng,
  }= props;
  let center = { lat: (lat ? lat: 40.76467686462384), lng:( lng ? lng: -73.98246484375) };

  return <GoogleMap
    defaultZoom={9}
    defaultCenter={center}
  >
    {isMarkerShown && <Marker position={center} draggable onDragEnd={handleDragEnd}/>}
  </GoogleMap>
}))

const MapContainer=(props)=>{ 

  return <MyMapComponent
    handleDragEnd={props.handleDragEnd}
    lat={props.lat}
    lng={props.lng}
    isMarkerShown
    googleMapURL={GOOGLE_API_MAP}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
/>}
export default MapContainer;