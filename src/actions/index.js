import * as Types from '../constants/ActionTypes'
import callApi from '../utils/apiCaller'

export const actGetAllProductsRequest = () => {
    return async (dispatch) => {
        let res = await callApi('products','GET',null)
        let products = res.data
        dispatch(actGetAllProducts(products))
    }
}

export const actGetAllProducts = (products) => {
    return {
        type : Types.GET_ALL_PRODUCTS,
        products
    }
}

export const actFilterProductsByCategoryRequest = (category) => {
    return async (dispatch) => {
        let res = await callApi(`products?category=${category.toLowerCase().replace(/ /g,'')}`,'GET',null)
        let products = res.data
        dispatch(actFilterProductsByCategory(products))
    }
}

export const actFilterProductsByCategory = (products) => {
    return {
        type : Types.FILTER_PRODUCTS_BY_CATEGORY,
        products
    }
}

export const actFilterProducstBySubcategoryRequest = (category,subcategory) => {
    return async (dispatch) => {
        let res = await callApi(`products?category=${category.toLowerCase().replace(/ /g,'')}&subcategory=${subcategory.toLowerCase()}`)
        let products = res.data
        dispatch(actFilterProducstBySubcategory(products))
    }
}

export const actFilterProducstBySubcategory = (products) => {
    return {
        type : Types.FILTER_PRODUCTS_BY_SUBCATEGORY,
        products
    }
}

export const actFilterProductsByBrandRequest = (status) => {
    return async (dispatch) => {
        // let res = await callApi(`products?brand=${brand}`,'GET',null)
        // let products = res.data
        // dispatch(actFilterProductsByBrand(products))
        let { isSamsung,isApple,isHp,isMetra } = status
        if (!isSamsung && !isApple && !isHp && !isMetra) {
            let res = await callApi('products','GET',null)
            let products = res.data
            dispatch(actFilterProductsByBrand(products))
        }
        else {
            let res = await callApi(`products?brand=${isSamsung ? 'samsung' : ''}&brand=${isApple ? 'apple' : ''}&brand=${isHp ? 'hp' : ''}&brand=${isMetra ? 'metra' : ''}`,'GET',null)
            let products = res.data
            dispatch(actFilterProductsByBrand(products))
        }
    }
} 

export const actFilterProductsByBrand = (products) => {
    return {
        type : Types.FITLER_PRODUCTS_BY_BRAND,
        products,
    }
}

export const actSortProducts = (sortType) => {
    return {
        type : Types.SORT_PRODUCTS,
        sortType
    }
}

export const actSearchProductsRequest = (keyword) => {
    return async (dispatch) => {
        let res = await callApi(`products?name_like=${keyword}`,'GET',null)
        let products = res.data
        dispatch(actSearchProducts(products))
    }
}

export const actSearchProducts = (products) => {
    return {
        type : Types.SEARCH_PRODUCTS,
        products
    }
}

export const actFilterProductsByPriceRequest = (priceRange) => {
    return async (dispatch) => {
        if (priceRange === '4980') {
            let res = await callApi(`products?price_gte=${parseInt(priceRange)}`,'GET',null)
            let products = res.data
            dispatch(actFilterProductsByPrice(products))
        }
        let res = await callApi(`products?price_range=${priceRange}`,'GET',null)
        let products = res.data
        dispatch(actFilterProductsByPrice(products))
    }
}

export const actFilterProductsByPrice = (products) => {
    return {
        type : Types.FILTER_PRODUCTS_BY_PRICERANGE,
        products
    }
}

export const actFilterProductsByInputValueRequest = (priceStart,priceEnd) => {
    return async (dispatch) => {
        if (priceStart && priceEnd) {
            let res = await callApi(`products?price_gte=${priceStart}&price_lte=${priceEnd}`,'GET',null) 
            let products = res.data
            dispatch(actFilterProductsByInputValue(products))
        }
        else if (priceStart && !priceEnd) {
            let res = await callApi(`products?price_gte=${priceStart}`,'GET',null) 
            let products = res.data
            dispatch(actFilterProductsByInputValue(products))
        }
        else if (!priceStart && priceEnd) {
            let res = await callApi(`products?price_lte=${priceEnd}`,'GET',null) 
            let products = res.data
            dispatch(actFilterProductsByInputValue(products))
        }
        else {
            let res = await callApi(`products`,'GET',null) 
            let products = res.data
            dispatch(actFilterProductsByInputValue(products))
        }
    }
}

export const actFilterProductsByInputValue = (products) => {
    return {
        type : Types.FILTER_PRODUCTS_BY_INPUTVALUE,
        products
    }
}