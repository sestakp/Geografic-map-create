import logo from './logo.svg';
import './App.css';
import * as ReactDOM from 'react-dom';
import { LocationIq } from 'locationiq';
import { useEffect, useRef, useState } from "react"
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import compass from "./assets/compass.png"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import Slider from '@mui/material/Slider';

import downloadSvg from 'svg-crowbar'
import { SketchPicker } from 'react-color'
import { connect } from 'react-redux';
import settingSelector from './redux/setting/settingSelector';
import settingActions from './redux/setting/settingActions';

function App(props) {
  const autocompleteRef = useRef(null)
  const [timer, setTimer] = useState(null)
  const [locationField, setLocationField] = useState("")
  const [options, setOptions] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState(null)

  function downloadMap() {
    const svgElement = document.querySelector('svg#map')
    downloadSvg(svgElement)
  }

  function locationFieldChanged(e) {
    let newValue = e.nativeEvent.target.value
    clearTimeout(timer)
    setLocationField(newValue)
    setTimer(setTimeout(() => triggerChange(e.target.value), 500))
  }

  function triggerChange(locField) {
    fetch("https://us1.locationiq.com/v1/search?key=" + process.env.REACT_APP_LOCATION_IQ_API_KEY + "&q=" + locField + ",Czech%20Republic&format=json")
      .then(res => res.json())
      .then(data => {
        setOptions(data.map(record => ({
          name: record.display_name,
          coordinates: [record.lon, record.lat],
          fillColor: props.markerFillColor,
          strokeColor: props.markerStrokeColor,
          textColor: props.markerTextColor,
          strokeWidth: props.markerStrokeWidth,
          fontSize: props.markerFontSize,
          size: props.markerSize,
          textOffsetY: props.textOffsetY,
          textOffsetX: props.textOffsetX,
        })))

      })
  }




  function addMarker(e, data) {
    if (data !== null) {
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
          ref={autocompleteRef}
          //disablePortal
          id="combo-box-demo"
          options={options}
          onChange={addMarker}
          clearOnBlur
          clearOnEscape
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} value={locationField} onChange={locationFieldChanged} label="Address" />}
          getOptionLabel={(option) => {
            return option.name/*+" [Lon: "+option.coordinates[0]+", Lat: "+option.coordinates[1]+"]"*/ ?? ""
          }}
        />

        <Button variant="outlined" onClick={downloadMap}>Download map</Button>
        <Button variant="outlined" onClick={() => {setSelectedMarker(null);setShowSettings(!showSettings)}}>{showSettings ? "Hide settings" : "Show settings"}</Button>

      </nav>
      <Grid container>
        <Grid item md={selectedMarker ? 9 : 12}>
          <div style={{ justifyContent: "space-around", display: showSettings ? "flex" : "none" }}>
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
            <div>
              <h3>Marker text color</h3>
              <SketchPicker
                color={props.markerTextColor}
                onChangeComplete={(color) => props.setMarkerTextColor(color.hex)}
              />
            </div>
          </div>
          <div style={{ display: showSettings ? "flex" : "none", justifyContent: "space-evenly" }}>
            <div style={{ width: "20%" }}>
              <Typography id="input-slider" gutterBottom>
                Marker size
              </Typography>
              <Slider value={props.markerSize} onChange={(e) => props.setMarkerSize(e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={1} max={20} />
            </div>
            <div style={{ width: "20%" }}>
              <Typography id="input-slider" gutterBottom>
                Marker stroke width
              </Typography>
              <Slider value={props.markerStrokeWidth} onChange={(e) => props.setMarkerStrokeWidth(e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={20} />
            </div>

            <div style={{ width: "20%" }}>
              <Typography id="input-slider" gutterBottom>
                Marker text offset Y
              </Typography>
              <Slider value={props.textOffsetY} onChange={(e) => props.setTextOffsetY(e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={-30} max={30} />
            </div>
            <div style={{ width: "20%" }}>
              <Typography id="input-slider" gutterBottom>
                Marker text offset X
              </Typography>
              <Slider value={props.textOffsetX} onChange={(e) => props.setTextOffsetX(e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={-30} max={30} />
            </div>
            <div style={{ width: "20%" }}>
              <Typography id="input-slider" gutterBottom>
                Marker font size
              </Typography>
              <Slider value={props.markerFontSize} onChange={(e) => props.setMarkerFontSize(e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={1} max={30} />
            </div>
          </div>
          <div style={{ position: "relative" }} id="map-image">
            <ComposableMap
              id="map"
              width={800}
              height={400}
              projection="geoAzimuthalEqualArea"
              projectionConfig={{
                rotate: [-15.4, -49.7, 0],
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
              {props.markers.map((marker) => (
                <Marker key={marker.name} coordinates={marker.coordinates} onClick={() => { setShowSettings(false);setSelectedMarker(marker)}}>
                  <circle r={marker.size} fill={marker.fillColor} stroke={marker.strokeColor} strokeWidth={marker.strokeWidth} />
                  <text
                    textAnchor="middle"
                    y={marker.textOffsetY}
                    x={marker.textOffsetX}
                    style={{ fontFamily: "system-ui", fill: marker.textColor, fontSize: marker.fontSize + "px" }}
                  >
                    {marker.name.split(',')[0]}
                  </text>
                </Marker>
              ))}
            </ComposableMap>
          </div>
          <div style={{ justifyContent: "space-around", display: selectedMarker ? "flex" : "none" }}>
            <div>
              <h3>{selectedMarker?.name.split(",")[0]} marker fill color</h3>
              <SketchPicker
                color={selectedMarker?.fillColor}
                onChangeComplete={(color) => props.setMarkerFillColorForMarker(selectedMarker,color.hex)}
              />
            </div>
            <div>
              <h3>{selectedMarker?.name.split(",")[0]} marker stroke color</h3>
              <SketchPicker
                color={selectedMarker?.strokeColor}
                onChangeComplete={(color) => props.setMarkerStrokeColorForMarker(selectedMarker,color.hex)}
              />
            </div>
            <div>
              <h3>{selectedMarker?.name.split(",")[0]} marker text color</h3>
              <SketchPicker
                color={selectedMarker?.textColor}
                onChangeComplete={(color) => props.setMarkerTextColorForMarker(selectedMarker,color.hex)}
              />
            </div>
          </div>
        </Grid>
        <Grid item md={3} style={{ display: selectedMarker ? "initial" : "none" }}>
          <h3>{selectedMarker?.name}</h3>
          <div style={{ width: "50%", display: "inline-block" }}>
              <Typography id="input-slider" gutterBottom>
                Marker text offset Y
              </Typography>
              <Slider value={selectedMarker?.textOffsetY} onChange={(e) => props.setTextOffsetYForMarker(selectedMarker, e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={-30} max={30} />
            </div>
            <div style={{ width: "50%", display: "inline-block" }}>
              <Typography id="input-slider" gutterBottom>
                Marker text offset X
              </Typography>
              <Slider value={selectedMarker?.textOffsetX} onChange={(e) => props.setTextOffsetXForMarker(selectedMarker,e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={-30} max={30} />
            </div>
            <div style={{ width: "50%", display: "inline-block" }}>
              <Typography id="input-slider" gutterBottom>
                Marker font size
              </Typography>
              <Slider value={selectedMarker?.fontSize} onChange={(e) => props.setMarkerFontSizeForMarker(selectedMarker, e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={1} max={30} />
            </div>
            <div style={{ width: "50%", display: "inline-block" }}>
              <Typography id="input-slider" gutterBottom>
                Marker size
              </Typography>
              <Slider value={selectedMarker?.size} onChange={(e) => props.setMarkerSizeForMarker(selectedMarker, e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={1} max={30} />
            </div>
            <div style={{ width: "100%" }}>
              <Typography id="input-slider" gutterBottom>
                Marker stroke width
              </Typography>
              <Slider value={selectedMarker?.strokeWidth} onChange={(e) => props.setMarkerStrokeWidthForMarker(selectedMarker,e.target.value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={20} />
            </div>
          <Button variant="outlined" onClick={() => {props.removeMarker(selectedMarker); setSelectedMarker(null);}}>DELETE MARKER</Button>
          <Button variant="outlined" onClick={() => {setSelectedMarker(null);}}>BACK</Button>
        </Grid>
      </Grid>

      <footer>
        <Grid container>
          <Grid item md={4}>

          </Grid>
          <Grid item md={4}>

          </Grid>
          <Grid item md={4}>
            <p>Author: Pavel Šesták</p>
            <p>Email:
              <span>p</span>
              <span>a</span>
              <span>v</span>
              <span>e</span>
              <span>l</span>
              <span>.</span>
              <span>s</span>
              <span>e</span>
              <span>s</span>
              <span>t</span>
              <span>a</span>
              <span>k</span>
              <span>1</span>
              <span>0</span>
              <span>@</span>
              <span>g</span>
              <span>m</span>
              <span>a</span>
              <span>i</span>
              <span>l</span>
              <span>.</span>
              <span>c</span>
              <span>o</span>
              <span>m</span>
            </p>
          </Grid>
        </Grid>
      </footer>
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
  textOffsetY: settingSelector.getTextOffsetY(state),
  textOffsetX: settingSelector.getTextOffsetX(state),
  markers: settingSelector.getMarkers(state),
  markerTextColor: settingSelector.getMarkerTextColor(state),
  markerFontSize: settingSelector.getMarkerFontSize(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setMapFillColor: (color) => dispatch(settingActions.setMapFillColor(color)),
  setMarkerTextColor: (color) => dispatch(settingActions.setMarkerTextColor(color)),
  setMapStrokeColor: (color) => dispatch(settingActions.setMapStrokeColor(color)),
  setMarkerFillColor: (color) => dispatch(settingActions.setMarkerFillColor(color)),
  setMarkerStrokeColor: (color) => dispatch(settingActions.setMarkerStrokeColor(color)),
  setMarkerStrokeWidth: (size) => dispatch(settingActions.setMarkerStrokeWidth(size)),
  setMarkerSize: (size) => dispatch(settingActions.setMarkerSize(size)),
  setTextOffsetY: (size) => dispatch(settingActions.setTextOffsetY(size)),
  setTextOffsetX: (size) => dispatch(settingActions.setTextOffsetX(size)),
  addMarker: (marker) => dispatch(settingActions.addMarker(marker)),
  removeMarker: (marker) => dispatch(settingActions.removeMarker(marker)),
  setMarkerFontSize: (size) => dispatch(settingActions.setMarkerFontSize(size)),
  setTextOffsetYForMarker: (marker, textOffsetY) => dispatch(settingActions.setTextOffsetYForMarker({marker, textOffsetY})),
  setTextOffsetXForMarker: (marker, textOffsetX) => dispatch(settingActions.setTextOffsetXForMarker({marker, textOffsetX})),
  setMarkerFontSizeForMarker: (marker, fontSize) => dispatch(settingActions.setMarkerFontSizeForMarker({marker, fontSize})),
  setMarkerSizeForMarker: (marker, size) => dispatch(settingActions.setMarkerSizeForMarker({marker, size})),
  setMarkerStrokeWidthForMarker: (marker, strokeWidth) => dispatch(settingActions.setMarkerStrokeWidthForMarker({marker, strokeWidth})),
  setMarkerFillColorForMarker: (marker, fillColor) => dispatch(settingActions.setMarkerFillColorForMarker({marker, fillColor})),
  setMarkerStrokeColorForMarker: (marker, strokeColor) => dispatch(settingActions.setMarkerStrokeColorForMarker({marker, strokeColor})),
  setMarkerTextColorForMarker: (marker, textColor) => dispatch(settingActions.setMarkerTextColorForMarker({marker, textColor})),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
