const mongoose = require("mongoose");
module.exports = (redirectUrl) => {
  return async (req, res, next) => {
    const paramsId = ["id", "place_id", "review_id"].find(
      (param) => req.params[param]
    );
    if (!paramsId) {
      next();
    }

    const id = req.params[paramsId];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error_msg", "Invalid Id / Data tidak ditemukan");
      return res.redirect(redirectUrl);
    }
    next();
  };
};
