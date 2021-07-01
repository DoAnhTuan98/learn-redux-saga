import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { 
    actFilterProductsByCategoryRequest,
    actFilterProducstBySubcategoryRequest, 
    actGetAllProductsRequest,
} from '../actions/index'

const CategoryItem = (props) => {
    const dispatch = useDispatch()
    const [isSubCategory, setIsSubCategory] = useState(false)

    const {
        category,
        getActiveCategory,
        activeCategory,
        activeSubCategory,
        getActiveSubCategory,
    } = props

    const handleClickParentCategory = (category) => {
        setIsSubCategory(!isSubCategory)
        getActiveCategory(category.category)
    }

    const handleClickSubCategory = (subCategory) => {
        getActiveSubCategory(subCategory)
    }

    const handleFilterCategory = async (category) => {
        if (category === activeCategory) {
            dispatch(actGetAllProductsRequest())
            getActiveSubCategory('')
        } else {
            dispatch(actFilterProductsByCategoryRequest(category))
        }
    }

    const handleFilterSubCategory = (category, subCategory) => {
        // dispatch(actFilterProducstBySubcategoryRequest(category,subCategory))
        if (subCategory === activeSubCategory) {
            dispatch(actFilterProductsByCategoryRequest(category))
        } else {
            dispatch(actFilterProducstBySubcategoryRequest(category, subCategory))
        }
    }

    const showSubCategory = (subCategories, category) => { // render subCategory
        const result = subCategories.map((subCategory, index) => {
            return (
                <li className="nav-item" key={index}>
                    <a 
                        className={activeSubCategory === subCategory ? 'nav-link active' : 'nav-link'}
                        aria-current="page"
                        href="#" 
                        // eslint-disable-next-line max-len
                        onClick={() => { handleClickSubCategory(subCategory); handleFilterSubCategory(category, subCategory) }}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                        {subCategory}
                    </a>
                </li>
            )
        })
        return result
    }

    return (
        <li className="nav-item category-item">
            <a 
                className={category.category === activeCategory ? 'nav-link active' : 'nav-link'}
                aria-current="page" 
                href="#"
            >
                <span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
                <span  
                    onClick={() => { 
                        handleClickParentCategory(category); 
                        handleFilterCategory(category.category) 
                    }}
                >
                    {category.category === 'Cameras Camcoreders' ? 'Cameras & Camcoreders' : category.category}
                </span>
            </a>
            <ul 
                className={
                    isSubCategory && category.category === activeCategory 
                    ? 'nav flex-column ml-3 category-item-sub' 
                    : 'nav flex-column ml-3 category-item-sub d-none'
                }
            >
                {showSubCategory(category.subCategory, category.category)}
            </ul>
        </li>
    );
};

export default CategoryItem;
