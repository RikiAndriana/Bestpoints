const express = require("express");
const { placeSchema } = require("../schemas/place");
const wrapAsync = require("../utils/wrapAsync");
const ErrorHandler = require("../utils/errorHandler");
const isValidObjectId = require("../middlewares/isValidObjectId");
const isAuth = require("../middlewares/isAuth");
const { isAuthorPlace } = require("../middlewares/isAuthor");
const PlaceController = require("../controllers/places");

const router = express.Router();

const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ErrorHandler(msg, 400));
  } else {
    next();
  }
};

router.get("/", wrapAsync(PlaceController.index));
router.get("/create", isAuth, (req, res) => {
  res.render("places/create");
});
router.get("/:id", isValidObjectId("/places"), wrapAsync(PlaceController.show));
router.post("/", isAuth, validatePlace, wrapAsync(PlaceController.store));
router.get(
  "/:id/edit",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.edit)
);

router.put(
  "/:id",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  validatePlace,
  wrapAsync(PlaceController.update)
);

router.delete(
  "/:id",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.destroy)
);

module.exports = router;
