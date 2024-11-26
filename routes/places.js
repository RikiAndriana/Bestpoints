const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require("../middlewares/isValidObjectId");
const isAuth = require("../middlewares/isAuth");
const { isAuthorPlace } = require("../middlewares/isAuthor");
const PlaceController = require("../controllers/places");
const { validatePlace } = require("../middlewares/validatorServer");
const upload = require("../config/multer");

const router = express.Router();

router
  .route("/")
  .get(wrapAsync(PlaceController.index))
  .post(
    isAuth,
    upload.array("image", 5),
    validatePlace,
    wrapAsync(PlaceController.store)
  );

router.get("/create", isAuth, (req, res) => {
  res.render("places/create");
});
router.get("/:id", isValidObjectId("/places"), wrapAsync(PlaceController.show));
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
  upload.array("image", 5),
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

router.delete(
  "/:id/images",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/place"),
  wrapAsync(PlaceController.destroyImage)
);

module.exports = router;
