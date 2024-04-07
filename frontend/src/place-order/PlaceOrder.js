import React,{ useState } from 'react';
import axios from 'axios';
import {Card, TextField, InputLabel, Select, MenuItem, FormControl, Button} from '@mui/material';

import './PlaceOrder.css';


// Function to load main page
const PlaceOrder = () => {

    // Initiated order state to get order cost
    const [order, setOrder] = useState({
        email: '',
        product_name: '',
        size:'',
        color: '',
        coupon: ''
    });

    // Initiated error state to load frontend validations
    const [error, setError] = useState({
        email: '',
        product_name: '',
        size:'',
        color: ''
    });

    // Initiated product state to place final order
    const [product, setProduct] = useState({
        id: '',
        cost: 0
    })

    // Initiated enable state to enable and disable buttons
    const [enable, setEnable] = useState(false);

    // Function to set the order state variables to load the cost
    const orderChangeHandler = (event) => {

        const { name } = event.target;

        setOrder({
            ...order,
            [name]: event.target.value
        });

        setError({
            ...error,
            [name]: ''
        });

        setEnable(true);
    };

    // Function set error state to load error
    const errorHandler = (event) => {

        const { name } = event.target

        if(!order[name].trim()) {
            setError({
                ...error,
                [name]: `Please enter ${name}`
            });

            setEnable(false);
        }
    }

    // Function to call API for getting order cost
    const getCost = async () => {

        try {
            
            let response = await axios.post("http://localhost:5000/api/buy_product/get_cost", order);
            
            setProduct({
                id: response.data.product_id,
                cost: response.data.cost 
            });

        } catch(error) {
            
            // Throwing server side validations
            alert(error.response.data.message);
            setEnable(false);
            setProduct({
                id: '',
                cost: 0
            });
        }
    }

    // Function to call API to place final order
    const placeOrder = async () => {

        try {
            
            let response = await axios.post("http://localhost:5000/api/buy_product/place_order", {
                product_id: product.id,
                cost: product.cost,
                email: order.email,
                coupon: order.coupon
            });

            alert(`Your order has been placed, order id is ${response.data.order_id} and cost is ${response.data.cost}`);

            setOrder({
                email: '',
                product_name: '',
                size:'',
                color: '',
                coupon: ''
            });

            setProduct({
                id: '',
                cost: 0 
            });

            setEnable(false);
        } catch(error) {

            // Throwing server side validations
            alert(error.response.data.message);
            setEnable(false);
            setProduct({
                id: '',
                cost: 0
            });
        }
    }

    return (
        <React.Fragment>
            <div className="container">
                <Card variant="outlined" className='main-card'>
                    <h1 className='heading'>Buy Product</h1>
                    
                    <div className='tag'>
                        <TextField 
                            id="outlined-basic"
                            label="Email" 
                            variant="outlined"
                            style={{ width: "100%" }}
                            name="email"
                            value={order.email}
                            onChange= {orderChangeHandler}
                            onBlur= {errorHandler}
                        />
                        {error.email && <div className='error'>{error.email}</div>}
                    </div>

                    <div className='tag'>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Product</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="product_name"
                        value={order.product_name}
                        label="Product"
                        onChange={orderChangeHandler}
                        onBlur= {errorHandler}
                    >
                        <MenuItem value={"Product1"}>Product 1</MenuItem>
                        <MenuItem value={"Product2"}>Product 2</MenuItem>
                    </Select>
                    </FormControl>
                    {error.product_name && <div className='error'>{error.product_name}</div>}
                    </div>

                    <div className='tag'>
                    <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="size"
                        value={order.size}
                        label="Size"
                        onChange={orderChangeHandler}
                        onBlur= {errorHandler}
                    >
                        <MenuItem value={"S"}>Small</MenuItem>
                        <MenuItem value={"M"}>Medium</MenuItem>
                        <MenuItem value={"L"}>Large</MenuItem>
                        <MenuItem value={"XL"}>Extra Large</MenuItem>
                        <MenuItem value={"XXL"}>XXL</MenuItem>
                    </Select>
                    </FormControl>
                    {error.size && <div className='error'>{error.size}</div>}
                    </div>

                    <div className='tag'>
                    <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="color"
                        value={order.color}
                        label="Color"
                        onChange={orderChangeHandler}
                        onBlur= {errorHandler}
                    >
                        <MenuItem value={"Red"}>Red</MenuItem>
                        <MenuItem value={"Blue"}>Blue</MenuItem>
                        <MenuItem value={"White"}>White</MenuItem>
                        <MenuItem value={"Black"}>Black</MenuItem>
                    </Select>
                    </FormControl>
                    {error.color && <div className='error'>{error.color}</div>}
                    </div>

                    <div className='tag'>
                    <TextField 
                        id="outlined-basic"
                        label="Coupon"
                        style={{ width: "100%" }}
                        variant="outlined" 
                        name="coupon"
                        value={order.coupon}
                        onChange={orderChangeHandler}
                    />
                    </div>
                    <br />

                    <div className='cost-button'>
                    <Button 
                        variant="contained"
                        style = {{ width: "40%" }}
                        className = "button"
                        color="success" 
                        onClick={getCost}
                        disabled={!enable}
                    >
                        Get Cost
                    </Button>
                    <span className='tag'>{product.cost}</span>
                    </div>
                    <br />

                    <div className='order-button'>
                    <Button 
                        variant="contained"
                        style = {{ width: "50%" }}
                        onClick={placeOrder} 
                        disabled={!product.id}
                    >
                        Place Order
                    </Button>
                    </div>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default PlaceOrder;