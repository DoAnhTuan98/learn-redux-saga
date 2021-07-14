import * as Types from '../constants/ActionTypes'

const inititalState = false

const isloading = (state = inititalState, actions) => {
    switch (actions.type) {
        case Types.SHOW_LOADING:
            state = true
            return state
        case Types.HIDE_LOADING:
            state = false
            return state
        default:
            return state
    }
}

export default isloading
