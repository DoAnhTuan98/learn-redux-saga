import * as Types from '../constants/ActionTypes'
import callApi from '../utils/apiCaller'

let inititalState = []

const products = (state=inititalState,actions) => {
    switch (actions.type) {
        case Types.GET_ALL_PRODUCTS :
            state = actions.products
            return [...state]
        case Types.FILTER_PRODUCTS_BY_CATEGORY : 
            state = actions.products
            return [...state]
        case Types.FILTER_PRODUCTS_BY_SUBCATEGORY :
            state = actions.products
            return [...state]
        case Types.FITLER_PRODUCTS_BY_BRAND : 
            state = actions.products
            return [...state]
        case Types.SORT_PRODUCTS : 
            let newState = [...state]
            let sortType = actions.sortType
            if (sortType === 'asc') {
                newState.sort((a,b) => a.price - b.price)
                return [...newState]
            }
            else if (sortType === 'desc') {
                newState.sort((a,b) => b.price - a.price)
                return [...newState]
            }
            return [...state]
        case Types.SEARCH_PRODUCTS : 
            state = actions.products
            return [...state]
        case Types.FILTER_PRODUCTS_BY_PRICERANGE : 
            state = actions.products
            return [...state]
        case Types.FILTER_PRODUCTS_BY_INPUTVALUE:
            state = actions.products
            return [...state]
        default : 
            return [...state]
    }
}

export default products