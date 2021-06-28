import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actSortProducts } from '../actions/index'

const SortProduct = ({products}) => {
    const [price,setPrice] = useState('featured')

    const dispatch = useDispatch()

    const handleChange = (e) => {
        let target = e.target
        let value = target.value
        setPrice(value)
        dispatch(actSortProducts(value))
        // if (value === 'featured') {
        //     let category = activeCategory ? `category=${activeCategory.toLowerCase().replace(/ /g,'')}` : ''
        //     let subCategory = activeSubCategory ? `&subcategory=${activeSubCategory.toLowerCase()}` : ''
        //     callApi(`products?${category}${subCategory}`,'GET',null).then(res => {
        //         let products = res.data
        //         getProductsFiltered(products)
        //     })
        // }

        // if (!activeCategory && !activeSubCategory) {
        //     let newProducts = [...products]
        //     if (value === 'asc') {
        //         newProducts.sort((a,b) => {
        //             return a.price - b.price
        //         })
        //         getProductsFiltered(newProducts)
        //     }
        //     if (value === "desc") {
        //         newProducts.sort((a,b) => {
        //             return b.price - a.price
        //         })
        //         getProductsFiltered(newProducts)
        //     }
        //     else {
        //         getProductsFiltered(products)
        //     }
        // }

        // else {
        //     let category = activeCategory ? `category=${activeCategory.toLowerCase().replace(/ /g,'')}` : ''
        //     let subCategory = activeSubCategory ? `&subcategory=${activeSubCategory.toLowerCase()}` : ''
        //     console.log(category,subCategory)
        //     callApi(`products?${category}${subCategory}&_sort=price&_order=${value}`,'GET',null).then(res => {
        //         let products = res.data
        //         if (value === 'asc') {
        //             products.sort((a,b) => {
        //                 return a.price - b.price
        //             })
        //         }
        //         else {
        //             products.sort((a,b) => {
        //                 return b.price - a.price
        //             })
        //         }
        //         getProductsFiltered(products)
        //     })
        // }
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