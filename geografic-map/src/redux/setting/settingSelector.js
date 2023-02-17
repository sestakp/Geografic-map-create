

const settingSelector = {

    getMapFillColor: (state) => state.mapFillColor,
    getMapStrokeColor: (state) => state.mapStrokeColor, 
    getMarkerFillColor: (state) => state.markerFillColor, 
    getMarkerStrokeColor: (state) =>state.markerStrokeColor, 
    getMarkerStrokeWidth: (state) => state.markerStrokeWidth,
    getMarkerSize: (state) => state.markerSize,
    getTextOffset: (state) => state.textOffset,
    getMarkers: (state) => state.markers,
}

export default settingSelector;