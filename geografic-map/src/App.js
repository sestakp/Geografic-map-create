import logo from './logo.svg';
import './App.css';
import * as ReactDOM from 'react-dom';
import { LocationIq } from 'locationiq';
import {useEffect, useState} from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import Slider from '@mui/material/Slider';

import downloadSvg from 'svg-crowbar'
import { SketchPicker} from 'react-color'
import { connect } from 'react-redux';
import settingSelector from './redux/setting/settingSelector';
import settingActions from './redux/setting/settingActions';

function App(props) {

  const [timer, setTimer] = useState(null)
  const [locationField, setLocationField] = useState("")
  const [options, setOptions] = useState([])
  const [showSettings, setShowSettings] = useState(false)

  console.log("markers: ", props.markers)
  function downloadMap(){
    const svgElement = document.querySelector('svg#map')
    downloadSvg(svgElement)
  }

  function locationFieldChanged(e){
    let newValue = e.nativeEvent.target.value
    console.log("location field changed: ", newValue)
    clearTimeout(timer)
    setLocationField(newValue)
    setTimer(setTimeout(() => triggerChange(e.target.value),1000))
  }

  function triggerChange(locField){
    console.log("trigger change with query: ", locField)
    fetch("https://us1.locationiq.com/v1/search?key="+process.env.REACT_APP_LOCATION_IQ_API_KEY+"&q="+locField+",Czech%20Republic&format=json")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setOptions(data.map(record => ({
          name: record.display_name.split(",")[0],
          coordinates: [ record.lon, record.lat]
        })))
        
      })
  }


  /*
  function addLocation(){

      fetch("https://us1.locationiq.com/v1/search?key="+process.env.REACT_APP_LOCATION_IQ_API_KEY+"&q="+locationField+",Czech%20Republic&format=json")
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if(data[0].display_name !== "Česko"){
            props.addMarker({
              name: data[0].display_name.split(",")[0],
              coordinates: [ data[0].lon, data[0].lat]
            })

            setLocationField("")
        }
      })
  }*/

  function addMarker(_,data) {
    if (data !== null){
      console.log("adding marker: ",data)
      props.addMarker(data)
    }

    setLocationField("")
    setOptions([])
  }

  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/czech-republic/czech-republic-regions.json";

  return (  
    <div className="App">
      <nav>
      <Autocomplete
        //disablePortal
        id="combo-box-demo"
        freeSolo
        options={options}
        onChange={addMarker}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} value={locationField} onChange={locationFieldChanged} label="Address"/>}
        getOptionLabel={(option) => {
          return option.name+" [Lon: "+option.coordinates[0]+", Lat: "+option.coordinates[1]+"]" ?? ""
        }}
      />
        
        <Button variant="outlined" onClick={downloadMap}>Download map</Button>
        <Button variant="outlined" onClick={() => setShowSettings(!showSettings)}>{showSettings ? "Hide settings" : "Show settings"}</Button>
        <div style={{width: "15%", display: showSettings ? "initial" : "none"}}>
        <Typography id="input-slider" gutterBottom>
          Marker size
        </Typography>
          <Slider value={props.markerSize} onChange={(e) => props.setMarkerSize(e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={1} max={20} />
        </div>
        <div style={{width: "15%", display: showSettings ? "initial" : "none"}}>
          <Typography id="input-slider" gutterBottom>
            Marker stroke width
          </Typography>
          <Slider value={props.markerStrokeWidth} onChange={(e) => props.setMarkerStrokeWidth(e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={20}   />
        </div>

        <div style={{width: "15%", display: showSettings ? "initial" : "none"}}>
          <Typography id="input-slider" gutterBottom>
            Marker text offset
          </Typography>
          <Slider value={props.textOffset} onChange={(e) => props.setTextOffset(e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={-30} max={30}   />
        </div>
        
        
      </nav>
      <div style={{justifyContent: "space-around", display: showSettings ? "flex" : "none"}}>
        <div>
          <h3>Map fill color</h3>
          <SketchPicker  
            color={props.mapFillColor}
            onChangeComplete={(color) => props.setMapFillColor(color.hex)}
          />
        </div>

        <div>
          <h3>Map stroke color</h3>
          <SketchPicker  
            color={props.mapStrokeColor}
            onChangeComplete={(color) => props.setMapStrokeColor(color.hex)}
          />
        </div>

        <div>
          <h3>Marker fill color</h3>
          <SketchPicker  
            color={props.markerFillColor}
            onChangeComplete={(color) => props.setMarkerFillColor(color.hex)}
          />
        </div>

        <div>
          <h3>Marker stroke color</h3>
          <SketchPicker  
            color={props.markerStrokeColor}
            onChangeComplete={(color) => props.setMarkerStrokeColor(color.hex)}
          />
        </div>
      </div>      
      
      <ComposableMap
      id="map"
      width={800}
      height={800}
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-15.4, -48.3, 0],
        scale: 8000 
      }}
    > 
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={props.mapFillColor}
              stroke={props.mapStrokeColor}
            />
          ))
        }
      </Geographies>
      {props.markers.map(({ name, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={props.markerSize} fill={props.markerFillColor} stroke={props.markerStrokeColor} strokeWidth={props.markerStrokeWidth} />
          <text
            textAnchor="middle"
            y={props.textOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({
  mapFillColor: settingSelector.getMapFillColor(state),
  mapStrokeColor: settingSelector.getMapStrokeColor(state),
  markerFillColor: settingSelector.getMarkerFillColor(state),
  markerStrokeColor: settingSelector.getMarkerStrokeColor(state),
  markerStrokeWidth: settingSelector.getMarkerStrokeWidth(state),
  markerSize: settingSelector.getMarkerSize(state),
  textOffset: settingSelector.getTextOffset(state),
  markers: settingSelector.getMarkers(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setMapFillColor: (color) => dispatch(settingActions.setMapFillColor(color)),
  setMapStrokeColor: (color) => dispatch(settingActions.setMapStrokeColor(color)),
  setMarkerFillColor: (color) => dispatch(settingActions.setMarkerFillColor(color)),
  setMarkerStrokeColor: (color) => dispatch(settingActions.setMarkerStrokeColor(color)),
  setMarkerStrokeWidth: (size) => dispatch(settingActions.setMarkerStrokeWidth(size)),
  setMarkerSize: (size) => dispatch(settingActions.setMarkerSize(size)),
  setTextOffset: (size) => dispatch(settingActions.setTextOffset(size)),
  addMarker: (marker) => dispatch(settingActions.addMarker(marker)),
  removeMarker: (marker) => dispatch(settingActions.removeMarker(marker)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
