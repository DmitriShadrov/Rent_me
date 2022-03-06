import React from 'react';
import {GoogleMap, Marker}  from '@react-google-maps/api'
import './Map.css';
import { CurrentLocationMarker } from '../CurrentLocationMarker/CurrentLocationMarker';
// import { Marker } from '../Marker';


const containerStyle = {
    width: 'inherit',
    height: 'inherit',
    // zIndex: '-100',
  };
 
const defaultOptions = {
    backgroundColor: 'LightSkyBlue',
    // fullscreenControl: false,
    // keyboardShortcust: false,
    // mapTypeControl: false,
    // streetViewControl: false,
    // panControl: false,
    disableDefaultUI: true,
    zoomControl: true,
    // styles: defaultTheme,

}

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
}

export const Map = ({center, mode, markers, onMarkerAdd}) => {
    const mapRef = React.useRef(undefined)

    const onLoad = React.useCallback(function callback(map) {       
        mapRef.current = map;
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined;
      }, [])

      const onClick = React.useCallback((loc) => {
        if(mode === MODES.SET_MARKER){
          const lat = loc.latLng.lat();
          const lng = loc.latLng.lng();
          console.log({lat, lng});
          onMarkerAdd({lat, lng});
        }
      }, [mode, onMarkerAdd]);

    return <div className='container' style={{height: '100%', width: '100%'}}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={onClick}
                options={defaultOptions}
            >
              {/* <CurrentLocationMarker position={center} />
              {markers.map((pos) => {
                return <Marker  position={pos}/>; 
              })} */}
            </GoogleMap>
    </div>
};
