import { 
    fork, 
    take, 
    put, 
    delay,
    takeLatest, 
} from 'redux-saga/effects'
import * as Types from '../constants/ActionTypes'
import callApi from '../utils/apiCaller'
import { 
    getAllProductsSuccess, 
    getAllProductsFailed, 
    ShowLoading, 
    HideLoading, 
    searchProductsSuccess,
} from '../actions'

function* watchGetProducts() {
    while (true) {
        yield take(Types.GET_ALL_PRODUCTS)
        yield put(ShowLoading())
        const res = yield callApi('products', 'GET', null)
        const products = res.data
        if (products.length) {
            yield put(getAllProductsSuccess(products))
        } else {
            yield put(getAllProductsFailed)
        }
        yield delay(1000)
        yield put(HideLoading())
    }
}

function* watchSearchProducts({ keyword }) {
    yield delay(500)
    const res = yield callApi(`products?name_like=${keyword}`, 'GET', null)
    yield put(searchProductsSuccess(res.data))
}

function* rootSaga() {
    yield fork(watchGetProducts)
    yield takeLatest(Types.SEARCH_PRODUCTS, watchSearchProducts)
}

export default rootSaga;
