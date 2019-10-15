const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Routes
app.use(routes);


// Drop MongoDB if it exists
mongoose.connection.dropDatabase();
// Connect to Mongo DB 
// If deployed, use the deployed database. Otherwise use the local database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
