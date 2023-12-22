const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"],
  },
  avatar: {
    public_id: String,
    url: String,
  },

  email: {
    type: String,
    required: [true, "please enter a email"],
    unique: [true, "Email already exits"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "password must be at 6 character"],
    select: false,
  },
  posts
    : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date
});


UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);

  }
  next();
})


UserSchema.methods.matchpassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = async function () {
  return await jwt.sign({ _id: this._id }, "meraindiamahan")
}

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  console.log(resetToken);
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;

}
module.exports = mongoose.model("User", UserSchema);
