import settingTypes from './settingTypes';

const INITIAL_STATE = {
    mapFillColor: "#d5d3d3",
    mapStrokeColor: "#000",
    markerFillColor: "#FF0000",
    markerStrokeColor: "#FFF",
    markerStrokeWidth: 1,
    markerSize: 3,
    textOffset: -6,
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
        case settingTypes.SET_MARKER_STROKE_COLOR:
            return {...state, markerStrokeColor: action.payload}
        case settingTypes.SET_MARKER_STROKE_WIDTH:
            return {...state, markerStrokeWidth: action.payload}
        case settingTypes.SET_MARKER_SIZE:
            return {...state, markerSize: action.payload}
        case settingTypes.SET_TEXT_OFFSET:
            return {...state, textOffset: action.payload}
        case settingTypes.ADD_MARKER:
            return {...state, markers: [...state.markers, action.payload]}
        case settingTypes.REMOVE_MARKER:
            return {...state, markers: state.markers.filter(m => m != action.payload)}
        default:
            return state;
    }
};

export default loadingReducer;