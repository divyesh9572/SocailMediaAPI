const express = require("express");
const {
  register,
  login,
  Follow_Users,
  Log_Out,
  Update_password,
  Updata_Profile,
  delete_profile,
  Get_My_Profile,
  myprofile,
  get_all_users,
  Forgot_password,
  resetPassword,
} = require("../controllers/user_controllers");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(Log_Out);
router.route("/follow/:id").get(isAuthenticated, Follow_Users);
router.route("/update/password").put(isAuthenticated, Update_password);
router.route("/update/profile").put(isAuthenticated, Updata_Profile);
router.route("/delete/me").delete(isAuthenticated, delete_profile);
router.route("/me").get(isAuthenticated, Get_My_Profile);
router.route("/user/:id").get(isAuthenticated, myprofile);
router.route("/users").get(isAuthenticated, get_all_users);
router.route("/forgot/password").post( Forgot_password);
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;
