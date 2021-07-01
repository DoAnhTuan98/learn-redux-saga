import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actSortProducts } from '../actions/index'

const SortProduct = ({ products }) => {
    const [price, setPrice] = useState('featured')

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { target } = e
        const { value } = target
        setPrice(value)
        dispatch(actSortProducts(value))
    }

    return (
        <div className="product-wrap-head d-flex justify-content-between py-3">
            <div className="results">{products.length} results</div>
            <div className="sort-by-price d-flex">
                <div className="text px-3">sort by</div>
                <select 
                    name="price"
                    onChange={handleChange}
                    value={price}
                >
                    <option value="featured">Featured</option>
                    <option value="asc">Price asc.</option>
                    <option value="desc">Price desc</option>
                </select>
            </div>
        </div>
    );
};

export default SortProduct;
