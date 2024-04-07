const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const buyProductRoutes = require('./routes/buy-product-routes');
const HttpError = require('./utils/http-error');

//Declaring server port
const PORT = 5000;

app.use(bodyParser.json());

app.use(cors())

//Placing a base route url
app.use("/api/buy_product", buyProductRoutes);

// This is a middle-ware function which will be called when the route is not found 
app.use((req,res,next) => {
    const error = new HttpError('Route not found',404);
    next(error);
})

app.use((error,req,res,next) => {

    // If the response is already given
    if(res.headerSent){
        return next(error);
    }
    
    res.status(error.code || 500)
    res.json({message:error.message || "Internal Server Server"});
})

//Connecting mongoDB and starting server after successful connection
mongoose
    .connect("mongodb+srv://mongotut:Viral%40123@cluster0.0zuwj3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(PORT,() => {
            console.log(`Server is listening on ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    })
