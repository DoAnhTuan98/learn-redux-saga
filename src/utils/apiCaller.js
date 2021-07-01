import axios from 'axios'
import * as Config from '../constants/config'

// eslint-disable-next-line consistent-return
export default async function callApi(endpoint, method = 'GET', body) {
    try {
        return axios({
            method,
            url: `${Config.API_URL}/${endpoint}`,
            data: body,
        })
    } catch (error) {
        console.log(error)
    }
}
