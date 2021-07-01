import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actGetAllProductsRequest, actSearchProductsRequest } from '../actions/index'
import '../scss/header.scss'

const Header = () => {
    const [inputValue, setInputValue] = useState('')
    // const debouncedValue = useDebounce(inputValue,500)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInputValue(e.target.value)
        dispatch(actSearchProductsRequest(e.target.value))
    }
 
    const handleClick = () => {
        if (inputValue) {
            dispatch(actSearchProductsRequest(inputValue))
        } else {
            dispatch(actGetAllProductsRequest())
        }
    }

    return (
        <div className="header d-flex p-3">
            <a href="/" className="logo mx-3">amazing</a>
            <form>
                <input 
                    type="text" 
                    placeholder="Search a product"
                    onChange={handleChange}
                    value={inputValue}
                />
                <span onClick={handleClick}>
                    <FontAwesomeIcon icon={faSearch} />
                </span>
            </form>
        </div>
    );
};
export default Header;
