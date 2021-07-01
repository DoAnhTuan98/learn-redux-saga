import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { actGetAllProductsRequest } from '../actions/index';
import '../scss/main.scss';
import Brands from './Brands';
import CategoryItem from './CategoryItem';
import Pagination from './Pagination';
import Prices from './Prices';
import Product from './Product';
import SortProduct from './SortProduct';
import Types from './Types';

const Main = () => {
    const products = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const [categories] = useState([
        {
            category: 'Audio',
            subCategory: [
                'Auxiliary Input Cables',
                'Docks, Radio & Boom...',
                'Headphones',
                'Home Audio',
                'Ipod and MP3 Players',
            ],
        },
        {
            category: 'Cameras Camcorders',
            subCategory: [
                'Binoculars',
                'Camcorders',
                'Digital Cameras',
                'Memory Cards',
                'Microscopes',
            ],
        },
        {
            category: 'Cell Phones',
            subCategory: [
                'Mobile Broadband',
                'Prepaid Phones',
                'Refurbished Phones',
                'Samsung Galaxy',
                'Iphone',
            ],
        },
        {
            category: 'Computers',
            subCategory: [
                'Laptops',
                'Monitors',
                'Tablets',
                'USB Flash Drivers',
                'Ipad',
            ],
        },
    ])

    const [types] = useState([
        'Trend cases',
        'Ult protection',
        'Ink cartridges',
    ])

    const [activeCategory, setActiveCategory] = useState('')
    const [activeSubCategory, setActiveSubCategory] = useState('')
    const [activePrice, setActivePrice] = useState('')
    const [page, setPage] = useState(1)
    const [perPage] = useState(16)
    const [numberButton] = useState(5)

    useEffect(() => {
        dispatch(actGetAllProductsRequest())
    }, [dispatch])

    // handle pagination
    const numberPage = Math.ceil(products.length / perPage)
    const indexOfFirstProduct = (page - 1) * perPage
    const indexOfLastProduct = indexOfFirstProduct + perPage
    const productsSliced = products.slice(indexOfFirstProduct, indexOfLastProduct)

    const getPage = (page) => {
        setPage(page)
    }

    const renderProduct = (products) => {
        const result = products.map((product) => <Product key={product.id} product={product} />)
        return result
    }

    const getActiveCategory = (category) => {
        if (category === activeCategory) {
            setActiveCategory('')
        } else {
            setActiveCategory(category)
        }
    }

    const getActiveSubCategory = (category) => {
        if (category === activeSubCategory) {
            setActiveSubCategory('')
        } else {
            setActiveSubCategory(category)
        }
    }

    const getActivePrice = (price) => {
        setActivePrice(price)
    }

    const showCategory = (categories) => {
        const result = categories.map((category, index) => {
            return (
                <CategoryItem 
                    // eslint-disable-next-line react/no-array-index-key
                    key={index} 
                    category={category} 
                    getActiveCategory={getActiveCategory} 
                    activeCategory={activeCategory}
                    getActiveSubCategory={getActiveSubCategory}
                    activeSubCategory={activeSubCategory}
                />
            ) 
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
                <Button onClick={handleClickClear}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    Clear all filters
                </Button>                                                                       
                <section className="category">
                    <div className="head-title">Show results for</div>
                    <ul className="nav flex-column">
                        { showCategory(categories) }
                    </ul>
                </section>
                <Types types={types} />
                <Brands />
                <Prices 
                    activePrice={activePrice} 
                    getActivePrice={getActivePrice} 
                    products={products}
                />
            </div>

            {/* products  */}
            <div className="col-md-10 products-wrap">
                <SortProduct 
                    products={products}
                    activeCategory={activeCategory}
                    activeSubCategory={activeSubCategory}
                />
                <div className="row justify-content-evenly">
                    {renderProduct(productsSliced)}
                </div>
                <Pagination 
                    numberPage={numberPage} 
                    page={page} 
                    numberButton={numberButton}
                    getPage={getPage}
                />
            </div>
        </div>
    );
};

export default Main
