"use strict";require("dotenv").config();var express=require("express"),app=express(),cors=require("cors"),Person=require("./models/person");if(app.use(cors()),app.use(express.static("build")),app.use(express.json()),"development"===process.env.NODE_ENV){var morgan=require("morgan");morgan.token("type",function(e,n){return JSON.stringify(n.body)}),app.use(morgan("type"))}app.get("/",function(e,n){n.send("Hello world")}),app.get("/api/persons",function(e,n){var r;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Person.find({}));case 2:r=e.sent,n.json(r);case 4:case"end":return e.stop()}})}),app.get("/api/persons/:id",function(e,n,r){Person.findById(e.params.id).then(function(e){e?n.json(e):n.status(404).end()}).catch(function(e){r(e)})}),app.get("/info",function(e,n){Note.find({}).then(function(e){return n.send("Phonebook has info for ".concat(e.length," people.\n ").concat((new Date).toString()))})}),app.post("/api/persons",function(e,n){var r=e.body;if(void 0===r.name)return n.status(400).json({error:"name is missing"});new Person({name:r.name,number:r.number,date:new Date}).save().then(function(e){n.json(e)})}),app.put("/api/persons/:id",function(e,n,r){var t=e.body,o={name:t.name,number:t.number};Person.findByIdAndUpdate(e.params.id,o,{new:!0}).then(function(e){return n.json(e)})}),app.delete("/api/persons/:id",function(e,n,r){Person.findByIdAndDelete(e.params.id).then(function(e){return n.status(204).end()}).catch(function(e){return r(e)})});var errorHandler=function(e,n,r,t){if("CastError"===e.name)return r.status(400).send({error:"malformatted id"});t(e)};app.use(errorHandler);var PORT=process.env.PORT||3001;app.listen(PORT,function(){console.log("App is listening on port ".concat(PORT))});