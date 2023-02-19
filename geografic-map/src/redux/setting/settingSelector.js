

const settingSelector = {

    getMapFillColor: (state) => state.mapFillColor,
    getMapStrokeColor: (state) => state.mapStrokeColor, 
    getMarkerFillColor: (state) => state.markerFillColor, 
    getMarkerStrokeColor: (state) =>state.markerStrokeColor, 
    getMarkerStrokeWidth: (state) => state.markerStrokeWidth,
    getMarkerTextColor: (state) => state.markerTextColor,
    getMarkerSize: (state) => state.markerSize,
    getTextOffsetY: (state) => state.textOffsetY,
    getTextOffsetX: (state) => state.textOffsetX,
    getMarkers: (state) => state.markers,
    getMarkerFontSize: (state) => state.markerFontSize
} 

export default settingSelector;