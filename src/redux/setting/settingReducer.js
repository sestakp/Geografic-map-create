import settingTypes from './settingTypes';

const INITIAL_STATE = {
    mapFillColor: "#d5d3d3",
    mapStrokeColor: "#000000",
    markerFillColor: "#FF0000",
    markerStrokeColor: "#ffffff",
    markerTextColor: "#ffffff",
    markerStrokeWidth: 1,
    markerFontSize: 12,
    markerSize: 3,
    textOffsetY: -6,
    textOffsetX: 0,
    markers: [],
};

const loadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case settingTypes.SET_MAP_FILL_COLOR:
            return {...state, mapFillColor: action.payload}
        case settingTypes.SET_MAP_STROKE_COLOR:
            return {...state, mapStrokeColor: action.payload}
        case settingTypes.SET_MARKER_FILL_COLOR:
            return {...state, markerFillColor: action.payload}
        case settingTypes.SET_MARKER_FONT_SIZE:
            return {...state, markerFontSize: action.payload}
        case settingTypes.SET_MARKER_STROKE_COLOR:
            return {...state, markerStrokeColor: action.payload}
        case settingTypes.SET_MARKER_TEXT_COLOR:
            return {...state, markerTextColor: action.payload}
        case settingTypes.SET_MARKER_STROKE_WIDTH:
            return {...state, markerStrokeWidth: action.payload}
        case settingTypes.SET_MARKER_SIZE:
            return {...state, markerSize: action.payload}
        case settingTypes.SET_TEXT_OFFSET_Y:
            return {...state, textOffsetY: action.payload}
        case settingTypes.SET_TEXT_OFFSET_X:
            return {...state, textOffsetX: action.payload}
        case settingTypes.SET_TEXT_OFFSET_X_FOR_MARKER:
            var newMarkers = state.markers
            var item = newMarkers.find(m => m.name == action.payload.marker.name)
            var index = newMarkers.indexOf(item)
            if(index !== -1){
                newMarkers[index].textOffsetX = action.payload.textOffsetX
            }
            return {...state, markers:[...newMarkers]}
        case settingTypes.SET_TEXT_OFFSET_Y_FOR_MARKER:
            var newMarkers = state.markers
            var item = newMarkers.find(m => m.name == action.payload.marker.name)
            var index = newMarkers.indexOf(item)
            if(index !== -1){
                newMarkers[index].textOffsetY = action.payload.textOffsetY
            }
            return {...state, markers:[...newMarkers]}

        case settingTypes.SET_TEXT_OFFSET_Y_FOR_MARKER:
            var newMarkers = state.markers
            var item = newMarkers.find(m => m.name == action.payload.marker.name)
            var index = newMarkers.indexOf(item)
            if(index !== -1){
                newMarkers[index].textOffsetY = action.payload.textOffsetY
            }
            return {...state, markers:[...newMarkers]}
        case settingTypes.SET_MARKER_FONT_SIZE_FOR_MARKER:
            var newMarkers = state.markers
            var item = newMarkers.find(m => m.name == action.payload.marker.name)
            var index = newMarkers.indexOf(item)
            if(index !== -1){
                newMarkers[index].fontSize = action.payload.fontSize
            }
            return {...state, markers:[...newMarkers]}
        case settingTypes.SET_MARKER_SIZE_FOR_MARKER:
            var newMarkers = state.markers
            var item = newMarkers.find(m => m.name == action.payload.marker.name)
            var index = newMarkers.indexOf(item)
            if(index !== -1){
                newMarkers[index].size = action.payload.size
            }
            return {...state, markers:[...newMarkers]}
        case settingTypes.SET_MARKER_STROKE_WIDTH_FOR_MARKER:
            var newMarkers = state.markers
            var item = newMarkers.find(m => m.name == action.payload.marker.name)
            var index = newMarkers.indexOf(item)
            if(index !== -1){
                newMarkers[index].strokeWidth = action.payload.strokeWidth
            }
            return {...state, markers:[...newMarkers]}
        case settingTypes.SET_MARKER_FILL_COLOR_FOR_MARKER:
            var newMarkers = state.markers
            var item = newMarkers.find(m => m.name == action.payload.marker.name)
            var index = newMarkers.indexOf(item)
            if(index !== -1){
                newMarkers[index].fillColor = action.payload.fillColor
            }
            return {...state, markers:[...newMarkers]}
        case settingTypes.SET_MARKER_STROKE_COLOR_FOR_MARKER:
            var newMarkers = state.markers
            var item = newMarkers.find(m => m.name == action.payload.marker.name)
            var index = newMarkers.indexOf(item)
            if(index !== -1){
                newMarkers[index].strokeColor = action.payload.strokeColor
            }
            return {...state, markers:[...newMarkers]} 
            
        case settingTypes.SET_MARKER_TEXT_COLOR_FOR_MARKER:
            var newMarkers = state.markers
            var item = newMarkers.find(m => m.name == action.payload.marker.name)
            var index = newMarkers.indexOf(item)
            if(index !== -1){
                newMarkers[index].textColor = action.payload.textColor
            }
            return {...state, markers:[...newMarkers]}
        case settingTypes.ADD_MARKER:
            if(state.markers.filter(m => m.name == action.payload.name && m.coordinates == action.payload.coordinates).length == 0){
                return {...state, markers: [...state.markers, action.payload]}
            }
        case settingTypes.REMOVE_MARKER:
            return {...state, markers: state.markers.filter(m => m.name != action.payload.name && m.coordinates != action.payload.coordinates)}
        default:
            return state;
    }
};

export default loadingReducer;