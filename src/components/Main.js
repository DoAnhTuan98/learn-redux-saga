import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap';
import Product from './Product'
import CategoryItem from './CategoryItem'
import Types from './Types'
import Brands from './Brands'
import Prices from './Prices'
import SortProduct from './SortProduct'
import Pagination from './Pagination'
import { useSelector,useDispatch } from 'react-redux'
import { actGetAllProductsRequest } from '../actions/index'
import '../scss/main.scss'


const Main = (props) => {
    const products = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const [ categories ] = useState([
        {
            category : "Audio",
            subCategory : [
                "Auxiliary Input Cables",
                "Docks, Radio & Boom...",
                "Headphones",
                "Home Audio",
                "Ipod and MP3 Players"
            ]
        },
        {
            category : "Cameras Camcorders",
            subCategory : [
                "Binoculars",
                "Camcorders",
                "Digital Cameras",
                "Memory Cards",
                "Microscopes"
            ]
        },
        {
            category : "Cell Phones",
            subCategory : [ 
                "Mobile Broadband",
                "Prepaid Phones",
                "Refurbished Phones",
                "Samsung Galaxy",
                "Iphone"
            ]
        },
        {
            category : "Computers",
            subCategory : [
                "Laptops",
                "Monitors",
                "Tablets",
                "USB Flash Drivers",
                "Ipad"
            ]
        },
    ])

    const [types] = useState([
        "Trend cases",
        "Ult protection",
        "Ink cartridges"
    ])

    const [ activeCategory, setActiveCategory ] = useState('')
    const [ activeSubCategory, setActiveSubCategory ] = useState('')
    const [ activePrice,setActivePrice ] = useState('')
    const [ page, setPage ] = useState(1)
    const [ perPage ] = useState(16)
    const [ numberButton ] = useState(5)

    useEffect(() => {
        dispatch(actGetAllProductsRequest())
    },[dispatch])

    // handle pagination
    let numberPage = Math.ceil(products.length / perPage)
    let indexOfFirstProduct = (page - 1) * perPage
    let indexOfLastProduct = indexOfFirstProduct + perPage
    let productsSliced = products.slice(indexOfFirstProduct,indexOfLastProduct)

    const getPage = (page) => {
        setPage(page)
    }

    const renderProduct = (products) => {
        let result = products.map(product => {
            return <Product key={product.id} product={product}/>
        })
        return result
    }

    const getActiveCategory = (category) => {
        if (category === activeCategory) {
            setActiveCategory('')
        }
        else {
            setActiveCategory(category)
        }
    }

    const getActiveSubCategory = (category) => {
        if (category === activeSubCategory) {
            setActiveSubCategory('')
        }
        else {
            setActiveSubCategory(category)
        }
    }

    const getActivePrice = (price) => {
        setActivePrice(price)
    }

    const showCategory = (categories) => {
        let result = categories.map((category,index) => {
            return <CategoryItem 
                        key = { index } 
                        category = { category } 
                        getActiveCategory = { getActiveCategory } 
                        activeCategory = { activeCategory }
                        getActiveSubCategory = { getActiveSubCategory }
                        activeSubCategory = { activeSubCategory }
                    /> 
        })
        return result
    }

    const handleClickClear = async () => {
        dispatch(actGetAllProductsRequest())
        setActiveCategory('')
        setActiveSubCategory('')
        setActivePrice('')
    }

    return (
        <div className="content-wrap row">
            <div className="col-md-2 sidebar">
                <Button onClick={ handleClickClear }>
                    <FontAwesomeIcon icon = { faTrashAlt } />
                    Clear all filters
                </Button>                                                                       
                <section className="category">
                    <div className="head-title">Show results for</div>
                    <ul className="nav flex-column">
                        { showCategory(categories) }
                    </ul>
                </section>
                <Types types = { types } />
                <Brands />
                <Prices activePrice = { activePrice } getActivePrice = { getActivePrice } products = { products }/>
            </div>

            {/* products  */}
            <div className="col-md-10 products-wrap">
                <SortProduct 
                    products = { products }
                    activeCategory = { activeCategory }
                    activeSubCategory = { activeSubCategory }
                />
                <div className="row justify-content-evenly">
                    {renderProduct(productsSliced)}
                </div>
                <Pagination 
                    numberPage = { numberPage } 
                    page = { page } 
                    numberButton ={ numberButton }
                    getPage = { getPage }
                />
            </div>
        </div>
    );
};

export default Main;