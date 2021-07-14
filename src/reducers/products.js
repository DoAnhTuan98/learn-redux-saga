import * as Types from '../constants/ActionTypes'
// import callApi from '../utils/apiCaller'

const inititalState = []

const products = (state = inititalState, actions) => {
    switch (actions.type) {
        // case Types.GET_ALL_PRODUCTS:
        //     state = actions.products
        //     return [...state]
        case Types.GET_ALL_PRODUCTS_SUCCESS:
            state = actions.products
            return [...state]
        // case Types.GET_ALL_PRODUCTS_SAGAS:
        //     return [...state]
        case Types.FILTER_PRODUCTS_BY_CATEGORY: 
            state = actions.products
            return [...state]
        case Types.FILTER_PRODUCTS_BY_SUBCATEGORY:
            state = actions.products
            return [...state]
        case Types.FITLER_PRODUCTS_BY_BRAND: 
            state = actions.products
            return [...state]
        case Types.SORT_PRODUCTS: 
            const newState = [...state]
            const { sortType } = actions
            if (sortType === 'asc') {
                newState.sort((a, b) => a.price - b.price)
                return [...newState]
            } if (sortType === 'desc') {
                newState.sort((a, b) => b.price - a.price)
                return [...newState]
            }
            return [...state]
        case Types.SEARCH_PRODUCTS_SUCCESS: 
            state = actions.products
            return [...state]
        case Types.FILTER_PRODUCTS_BY_PRICERANGE: 
            state = actions.products
            return [...state]
        case Types.FILTER_PRODUCTS_BY_INPUTVALUE:
            state = actions.products
            return [...state]
        default: 
            return [...state]
    }
}

export default products
