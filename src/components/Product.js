import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    let { product } = props 

    return (
        <div className="col-md-3 product-item">
            <div className="product-item-img-wrap">
                <img className="img-fluid" src={product.src} alt="product"></img>
            </div>
            <div className="product-item-content">
                <div className="product-item-content__name">{product.name}</div>
                <div className="price-and-rate-wrap d-flex justify-content-between">
                    <div className="product-item__rate text-warning">
                        <span>
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                    </div>
                    <div className="product-item__price">${product.price}</div>
                </div>
            </div>
        </div>
    );
};

export default Product;
