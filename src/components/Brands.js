import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { 
    actFilterProductsByBrandRequest, 
} from '../actions/index'

const Brands = () => {
    const [status, setStatus] = useState({
        isSamsung: false,
        isMetra: false,
        isHp: false,
        isApple: false,
    })

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { target } = e
        const { name } = target
        const value = target.type === 'checkbox' ? target.checked : target.value
        setStatus({
            ...status,
            [name]: value,
        })  
        // if (value) {
        //     dispatch(actFilterProductsByBrandRequest(brand))
        // }
        // else {
        //     dispatch(actGetAllProductsRequest())
        // }
    }

    useEffect(() => {
        dispatch(actFilterProductsByBrandRequest(status))
    }, [dispatch, status])

    return (
        <section className="brand-wrap">
            <div className="brands">
                <div className="head-title">Brand</div>
                <div className="content">
                    <form>
                        {/* {showBrand(brands)} */}
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox"
                                name="isSamsung"
                                value={status.isSamsung}
                                onChange={handleChange}
                                id="samsung"
                                checked={status.isSamsung === true}
                            />
                            <label className="form-check-label" htmlFor="samsung">
                                SamSung
                            </label>
                        </div>
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox"
                                name="isApple"
                                value={status.isApple}
                                onChange={handleChange}
                                id="apple"
                                checked={status.isApple === true}
                            />
                            <label className="form-check-label" htmlFor="apple">
                                Apple
                            </label>
                        </div>
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox"
                                name="isMetra"
                                value={status.isMetra}
                                onChange={handleChange}
                                id="metra"
                                checked={status.isMetra === true}
                            />
                            <label className="form-check-label" htmlFor="metra">
                                Metra
                            </label>
                        </div>
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox"
                                name="isHp"
                                value={status.isHp}
                                onChange={handleChange}
                                id="hp"
                                checked={status.isHp === true}
                            />
                            <label className="form-check-label" htmlFor="hp">
                                Hp
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Brands;
