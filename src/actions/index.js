import * as Types from '../constants/ActionTypes'
import callApi from '../utils/apiCaller'

export const ShowLoading = () => {
    return {
        type: Types.SHOW_LOADING,
    }
}

export const HideLoading = () => {
    return {
        type: Types.HIDE_LOADING,
    }
}

export const getAllProducts = () => {
    return {
        type: Types.GET_ALL_PRODUCTS,
    }
}

export const getAllProductsSuccess = (products) => {
    return {
        type: Types.GET_ALL_PRODUCTS_SUCCESS,
        products,
    }
}

export const getAllProductsFailed = () => {
    return {
        type: Types.GET_ALL_PRODUCTS_SAGAS_FAILED,
    }
}

// export const actGetAllProducts = (products) => {
//     return {
//         type: Types.GET_ALL_PRODUCTS,
//         products,
//     }
// }

// export const actGetAllProductsRequest = () => {
//     return async (dispatch) => {
//         const res = await callApi('products', 'GET', null)
//         const products = res.data
//         dispatch(actGetAllProducts(products))
//     }
// }

export const actFilterProductsByCategory = (products) => {
    return {
        type: Types.FILTER_PRODUCTS_BY_CATEGORY,
        products,
    }
}

export const actFilterProductsByCategoryRequest = (category) => {
    return async (dispatch) => {
        dispatch(ShowLoading())
        const res = await callApi(`products?category=${category.toLowerCase().replace(/ /g, '')}`, 'GET', null)
        const products = res.data
        setTimeout(() => {
            dispatch(HideLoading())
        }, 500);
        dispatch(actFilterProductsByCategory(products))
    }
}

export const actFilterProducstBySubcategory = (products) => {
    return {
        type: Types.FILTER_PRODUCTS_BY_SUBCATEGORY,
        products,
    }
}

export const actFilterProducstBySubcategoryRequest = (category, subcategory) => {
    return async (dispatch) => {
        dispatch(ShowLoading())
        const res = await callApi(`products?category=${category.toLowerCase().replace(/ /g, '')}&subcategory=${subcategory.toLowerCase()}`)
        setTimeout(() => {
            dispatch(HideLoading())
        }, 500);
        const products = res.data
        dispatch(actFilterProducstBySubcategory(products))
    }
}

export const actFilterProductsByBrand = (products) => {
    return {
        type: Types.FITLER_PRODUCTS_BY_BRAND,
        products,
    }
}

export const actFilterProductsByBrandRequest = (status) => {
    return async (dispatch) => {
        const {
            isSamsung, 
            isApple, 
            isHp, 
            isMetra,
        } = status
        if (!isSamsung && !isApple && !isHp && !isMetra) {
            // const res = await callApi('products', 'GET', null)
            // const products = res.data
            // dispatch(actFilterProductsByBrand(products))
        } else {
            const res = await callApi(`products?brand=${isSamsung ? 'samsung' : ''}&brand=${isApple ? 'apple' : ''}&brand=${isHp ? 'hp' : ''}&brand=${isMetra ? 'metra' : ''}`, 'GET', null)
            const products = res.data
            dispatch(actFilterProductsByBrand(products))
        }
    }
} 

export const actSortProducts = (sortType) => {
    return {
        type: Types.SORT_PRODUCTS,
        sortType,
    }
}

export const searchProducts = (keyword) => {
    return {
        type: Types.SEARCH_PRODUCTS,
        keyword,
    }
}

export const searchProductsSuccess = (products) => {
    return {
        type: Types.SEARCH_PRODUCTS_SUCCESS,
        products,
    }
}

// export const actSearchProducts = (products) => {
//     return {
//         type: Types.SEARCH_PRODUCTS,
//         products,
//     }
// }

export const actSearchProductsRequest = (keyword) => {
    return async (dispatch) => {
        dispatch(ShowLoading())
        const res = await callApi(`products?name_like=${keyword}`, 'GET', null)
        const products = res.data
        // setTimeout(() => {
        //     dispatch(HideLoading())
        // }, 1000);
        // dispatch(HideLoading())
        dispatch(actSearchProducts(products))
    }
}

export const actFilterProductsByPrice = (products) => {
    return {
        type: Types.FILTER_PRODUCTS_BY_PRICERANGE,
        products,
    }
}

export const actFilterProductsByPriceRequest = (priceRange) => {
    return async (dispatch) => {
        if (priceRange === '4980') {
            const res = await callApi(`products?price_gte=${parseInt(priceRange, 10)}`, 'GET', null)
            const products = res.data
            dispatch(actFilterProductsByPrice(products))
        }
        const res = await callApi(`products?price_range=${priceRange}`, 'GET', null)
        const products = res.data
        dispatch(actFilterProductsByPrice(products))
    }
}

export const actFilterProductsByInputValue = (products) => {
    return {
        type: Types.FILTER_PRODUCTS_BY_INPUTVALUE,
        products,
    }
}

export const actFilterProductsByInputValueRequest = (priceStart, priceEnd) => {
    return async (dispatch) => {
        if (priceStart && priceEnd) {
            const res = await callApi(`products?price_gte=${priceStart}&price_lte=${priceEnd}`, 'GET', null) 
            const products = res.data
            dispatch(actFilterProductsByInputValue(products))
        } else if (priceStart && !priceEnd) {
            const res = await callApi(`products?price_gte=${priceStart}`, 'GET', null) 
            const products = res.data
            dispatch(actFilterProductsByInputValue(products))
        } else if (!priceStart && priceEnd) {
            const res = await callApi(`products?price_lte=${priceEnd}`, 'GET', null) 
            const products = res.data
            dispatch(actFilterProductsByInputValue(products))
        } else {
            const res = await callApi('products', 'GET', null) 
            const products = res.data
            dispatch(actFilterProductsByInputValue(products))
        }
    }
}
