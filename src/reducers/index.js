import { combineReducers } from 'redux'
import products from './products'
import isloading from './isLoading'

const appReducers = combineReducers({
    products,
    isloading,
})

export default appReducers
