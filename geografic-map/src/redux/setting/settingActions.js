import settingTypes from "./settingTypes";


const settingActions = {


    setMapFillColor: (payload) => async(dispatch) => {

        dispatch({
            type: settingTypes.SET_MAP_FILL_COLOR,
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

    setTextOffset: (payload) => async(dispatch) => {
        dispatch({
            type: settingTypes.SET_TEXT_OFFSET,
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
