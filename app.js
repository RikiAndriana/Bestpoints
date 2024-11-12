const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

//model
const Place = require("./models/place");

//connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/places", async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
});

app.get("/places/create", (req, res) => {
  res.render("places/create");
});

app.post("/places", async (req, res) => {
  const place = new Place(req.body.place);
  await place.save();
  res.redirect("/places");
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.render("places/show", { place });
});

app.put("/places/:id", async (req, res) => {
  await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
  res.redirect(`/places/${req.params.id}`);
});

app.delete("/places/:id", async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  res.redirect("/places");
});

app.get("/places/:id/edit", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.render("places/edit", { place });
});

// app.get("/seed/place", async (req, res) => {
//   const place = new Place({
//     title: "Empire State Building",
//     price: "$99999999",
//     description: "A great building",
//     location: "New York, NY",
//   });
//   await place.save();
//   res.send(place);
// });
