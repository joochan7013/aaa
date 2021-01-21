/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Joochan Kim Student ID: 159616184 Date: 2021-01-21
* Heroku Link: _______________________________________________________________
*
********************************************************************************/ 


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB("mongodb+srv://jkim551:Jeju2020!@cluster0.6i7q5.mongodb.net/sample_restaurants?retryWrites=true&w=majority");

const app = express();
app.use (cors());
app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({ message: "API LISTENING" });
  });

//API ROUTE

//GET
app.get("/api/restaurants", (req,res) =>{
    
    db.getAllRestaurants(req.query.page, req.query.perPage,req.query.borough)
 
     .then((restaurants) => {
         res.status(200).json(restaurants);
     })
     .catch((err) => {
        res.status(400).json(err);
     });
});

app.get("/api/restaurants/:id", (req, res) => {
    
    db.getRestaurantById(req.params.id)
 
   .then((restaurants) => {
     res.status(200).json(restaurants);
     })
    .catch((err) => {
     res.status(404).json(err);
    });
   
 });

 //PUT
 app.put("/api/restaurants/:id", (req, res) => {
  
    db.updateRestaurantById(req.body, req.params.id)
          .then(() => {
              res.status(200).json(`RESTAURANT ${req.body._id} UPDATED`);
          })
          .catch((err) => {
              res.status(404).json(err);
          });
  });

  //POST
  app.post("/api/restaurants", (req, res) => {

    db.addNewRestaurant(req.body)
    
    .then(()=>{
      res.status(201).json('NEW RESTAURANT ADDED')
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  });

  //DELETE
  app.delete("/api/restaurants/:id", (req,res)=>{
    db.deleteRestaurantById(req.params.id)
        .then(()=>{
            res.status(204).json(`RESTAURANT ${req.params.id} DELETED`);
        })
        .catch((err)=>{
            res.status(404).json(err);
        });
}); 

  db.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`SERVER LISTENING ON: ${HTTP_PORT}`);
    });
    }).catch((err)=>{
    console.log(err);
    });