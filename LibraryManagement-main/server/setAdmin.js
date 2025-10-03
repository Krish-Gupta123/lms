// seedAdmin.js
const mongoose = require("mongoose");
const User = require("./models/user");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdmin() {
  const adminExists = await User.findOne({ email: "admin@library.com" });
  if (adminExists) {
    console.log("⚠️ Admin already exists");
    return mongoose.disconnect();
  }

  const admin = new User({
    name: "Default Librarian",
    email: "admin@library.com",
    dob: new Date("1990-01-01"),
    phone: "1234567890",
    isAdmin: true,
    photoUrl: "https://i.pravatar.cc/300",
  });

  admin.setPassword("admin123"); // ✅ password hash ho jaayega

  await admin.save();
  console.log("✅ Librarian created: admin@library.com / admin123");
  mongoose.disconnect();
}

createAdmin();
