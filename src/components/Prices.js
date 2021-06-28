import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { 
    actFilterProductsByPriceRequest,
    actGetAllProductsRequest,
    actFilterProductsByInputValueRequest 
} from '../actions/index'

const Prices = (props) => {

    const [priceRange] = useState([
        '1 - 80',
        '80 - 160',
        '160 - 240',
        '240 - 1820',
        '1820 - 3400',
        '3400 - 4980',
        '4980'
    ])
    const [inputValue,setInputValue] = useState({
        priceStart : '',
        priceEnd  : ''
    })

    const [activePriceRange,setActivePriceRange] = useState('')

    const dispatch = useDispatch()


    const handleClick = (price) => {
        if (price === activePriceRange) {
            setActivePriceRange('')
            dispatch(actGetAllProductsRequest())
        }
        else {
            setActivePriceRange(price)
            dispatch(actFilterProductsByPriceRequest(price))
            setInputValue({
                priceStart : '',
                priceEnd  : ''
            })
        }
    }

    const handleChange = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        setInputValue({
            ...inputValue,
            [name] : value
        })
    }

    const handleClickGo = () => {
        let { priceStart,priceEnd } = inputValue
        // let priceRange = `${priceStart} - ${priceEnd}`
        // if ( priceStart && priceEnd ) {
        //     dispatch(actFilterProductsByInputValueRequest(parseInt(priceStart),parseInt(priceEnd)))
        // } 
        // else if ( priceStart && !priceEnd ) {
        //     dispatch(actFilterProductsByInputValueRequest(priceStart))
        // }
        dispatch(actFilterProductsByInputValueRequest(parseInt(priceStart),parseInt(priceEnd)))
        setActivePriceRange('')
    }

    const renderPriceRange = (priceRanges) => {
        let result = priceRanges.map((priceRange,index) => {
            return (
                <li 
                    className={activePriceRange === priceRange ? "nav-item active" : "nav-item"} 
                    onClick={() => handleClick(priceRange)}
                    key={index}
                >
                    {priceRange === '4980' ? `$ >= ${priceRange}` : `$${priceRange}`}
                </li>
            )
        })
        return result
    }

    return (
        <section className="price-wrap">
            <div className="prices">
                <div className="head-title">Price</div>
                <div className="content">
                    <ul className="nav flex-column">
                        {renderPriceRange(priceRange)}
                    </ul>
                </div>
                <Form style={{marginTop:"20px"}}>
                    <div className="d-flex">
                        <Col>
                            <FormGroup className="d-flex">
                                <Label for="exampleEmail">$</Label>
                                <Input 
                                    type="number" 
                                    min="1" 
                                    name="priceStart"
                                    value={inputValue.priceStart}
                                    onChange={handleChange}
                                    style={{width: "50px",padding:"0"}}
                                />
                            </FormGroup>
                        </Col>
                        <span style={{marginRight:"10px"}}>to</span>
                        <Col>
                            <FormGroup className="d-flex">
                                <Label for="examplePassword">$</Label>
                                <Input 
                                    type="number" 
                                    min="1"
                                    name="priceEnd" 
                                    value={inputValue.priceEnd}
                                    onChange={handleChange}
                                    style={{width: "50px",padding:"0"}}
                                />
                            </FormGroup>
                        </Col>
                        <Button 
                            onClick={handleClickGo}
                            style={{borderRadius:"50%",width:"30px",height:"30px",padding:"0"}}
                        >
                            go
                        </Button>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default Prices;