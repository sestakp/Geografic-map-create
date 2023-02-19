import settingTypes from "./settingTypes";


const settingActions = {


    setMapFillColor: (payload) => async(dispatch) => {

        dispatch({
            type: settingTypes.SET_MAP_FILL_COLOR,
            payload: payload
        })
    },

    setMarkerTextColor: (payload) => async(dispatch) => {

        dispatch({
            type: settingTypes.SET_MARKER_TEXT_COLOR,
            payload: payload
        })
    },

    setMarkerFontSize: (payload) => async(dispatch) => {

        dispatch({
            type: settingTypes.SET_MARKER_FONT_SIZE,
            payload: payload
        })
    },

    setMapStrokeColor: (payload) => async(dispatch) => {

        dispatch({
            type: settingTypes.SET_MAP_STROKE_COLOR,
            payload: payload
        })
    },

    setMarkerFillColor: (payload) => async(dispatch) => {

        dispatch({
            type: settingTypes.SET_MARKER_FILL_COLOR,
            payload: payload
        })
    },

    setMarkerStrokeColor: (payload) => async(dispatch) => {

        dispatch({
            type: settingTypes.SET_MARKER_STROKE_COLOR,
            payload: payload
        })
    },

    setMarkerStrokeWidth: (payload) => async(dispatch) => {

        dispatch({
            type: settingTypes.SET_MARKER_STROKE_WIDTH,
            payload: payload
        })
    },

    setMarkerSize: (payload) => async(dispatch) => {

        dispatch({
            type: settingTypes.SET_MARKER_SIZE,
            payload: payload
        })
    },

    setTextOffsetY: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_TEXT_OFFSET_Y,
            payload: payload
        })
    },

    setTextOffsetX: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_TEXT_OFFSET_X,
            payload: payload
        })
    },

    setTextOffsetYForMarker: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_TEXT_OFFSET_Y_FOR_MARKER,
            payload: payload
        })
    },

    setTextOffsetXForMarker: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_TEXT_OFFSET_X_FOR_MARKER,
            payload: payload
        })
    },

    setMarkerFontSizeForMarker: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_MARKER_FONT_SIZE_FOR_MARKER,
            payload: payload
        })
    },

    setMarkerSizeForMarker: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_MARKER_SIZE_FOR_MARKER,
            payload: payload
        })
    },

    setMarkerStrokeWidthForMarker: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_MARKER_STROKE_WIDTH_FOR_MARKER,
            payload: payload
        })
    },

    setMarkerFillColorForMarker: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_MARKER_FILL_COLOR_FOR_MARKER,
            payload: payload
        })
    },

    setMarkerStrokeColorForMarker: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_MARKER_STROKE_COLOR_FOR_MARKER,
            payload: payload
        })
    },

    setMarkerTextColorForMarker: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_MARKER_TEXT_COLOR_FOR_MARKER,
            payload: payload
        })
    },

    addMarker: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.ADD_MARKER,
            payload: payload
        })
    },

    removeMarker: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.REMOVE_MARKER,
            payload: payload
        })
    },
}

export default settingActions
