# BuyProduct
---
- According to the user story, have created a main page where the user can select any of the two products (Product1 or Product2) and then select the size and color for the same. At last the user can even apply a coupon code and the interface will check if the coupon is valid or not and according to that the cost of the product will be displayed.

- The logic for the three coupons is :
- a. FIRST50:
- i. Only valid for first purchase of the user
- ii. The price of the item gets discounted by 50%
- iii. Coupon can only be availed once by one user
- b. PATRON50:
- i. Only Valid if user has made more than 4 purchases previously
- ii. The price of the item gets discounted by 50%
- iii. Coupon can only be availed once by one user
- c. REPEAT80:
- i. Only valid if user makes a repeat purchase (same product, same size,
- same colour)
- ii. The price of the item gets discounted by 80%
- iii. Coupon can be availed any number of items by the user


- Have created the complete backend of the project considering we place order for one product at a time.
- Created two APIs one inserting new products in database and one for placing an order.
- Have hosted the server locally at PORT - 3000
- Insert Product API - api/buy_product/add_product
- Request body : {
    "name": "Product2",
    "size": "XXL",
    "color": "White",
    "cost": 1000
}
- Place Order API - api/buy_product/place_order
- Request body: {
    "email": "viraj@gmail.com",
    "product_name": "Product1",
    "size": "XXL",
    "color": "WHITE",
    "coupon": "FIRST50"
}
- Have handled all the validations and tested the APIs completely.
- Have used personal mongoose cluster for hosting the database.

## Tech Implemented:

- **BackEnd:**
  - nodejs
  - mongoose, express, express-validator, ksuid
  - language used: javascript
  - The backend is hosted on port - 5000 and have added all kinds of server validations.
  - There are three APIs : 
  1. To seed the two products in database : api/buy_product/add_product
    - Request body : {
    "name": "Product2",
    "size": "XXL",
    "color": "White",
    "cost": 1000
}
  2. To get cost of the order : api/buy_product/get_cost
    - Request body : {
    "email": "virajchheda10@gmail.com",
    "product_name": "Product1",
    "size": "S",
    "color": "Red",
    "coupon": ""
}
  3. To place final order : api/buy_product/place_order
   - Request body : {
    "cost": 60,
    "product_id": "pr_2egLLMMweC838sdvhwleCKSpvPY",
    "email": "viraj@gmail.com"
}

- **FrontEnd:**
  - reactjs
  - language used: javascript
  - Have added client side validations and created a basic UI to interact with the backend.



## Installation Info:

- Clone the project and install it locally by using:
  
```bash
git clone https://github.com/Virajchheda18/BuyProduct
```

Now in terminal (Do this for both backend and frontend folder):

```bash
npm install
```

To start a webapp locally (Do this for both backend and frontend folder):

```bash
npm start
```
