require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const {createUser,login,getUsers,updateUsers,getUserInfo, addVehicle, updateVehicle, getUserVehicles, deleteVehicleById, addParking, updateParkingDetails, deleteParkingById, getParkingDetails, addFloor, getAllFloor, updateFloorById, deleteFloorById, addSlot, getAvailableSlots, deleteSlot, InstantBooking, bookForLater, getSlotsByFloor, getVehicle, sendRequest, updateRequestStatus, getRequestById, getUserBookings, getAllParking, allotSlot, getSlotById, BookedSlotStatus, updateSlotStatus, updateBooking, checkout, pay} = require("./controller/user.controller");
//https://smart-parking-management-sys.herokuapp.com/
const multer = require('multer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({ extended: true})); 
const db = require("./config/database");
const { checkToken } = require("./auth/token_validation");
//file upload
const fs = require('fs')
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
      cb(null,'storage')
  },
  filename: (req,file,cb)=>{
    if(file){ 
      cb(null,Date.now()+'-'+file.originalname )
    } else false
   
  }

})

const upload = multer({storage: storage}).single('file')
app.use(cors())
app.use(express.static('storage'));
app.get("/", async (req, res) => {
  return  res.status(400).json({ error: 'Something went wrong' });
})

app.get("/createDatabase",async (req,res)=>{
  let sql = "CREATE DATABASE dental_traveller"
  db.query(sql,(err,result)=>{
    if(err){
      throw err
    }
    res.send("db created");
  })
})

app.get("/deleteClinicImage",checkToken,(req,res)=>{
  if (req.decoded.result.role === 'admin'||req.decoded.result.role === 'doctor') {
  fs.unlink('./storage/'+req.query.filename, (err) => {
    if (err) {
      console.error(err)
      return res.status(400).json({
        success: false,
        message:"Image deleted successfully",
        error:err
      })
    }
    db.query(
      `delete from clinic_gallery  where  url like ? `,
      [
        '%' + req.query.filename + '%'
      ],
      (error, results, fields) => {
        if (error) {
          return res.status(500).json({
            success: false,
            data: error
          });
        }
        return res.status(200).json({
          success: true,
          data: results
        });
      }
    );
  })
}else {
  return res.json({
    success: false,
    data: [],
    message: "you are not authorized to access this info"
  })
}
})

//authentication
app.post("/signup", createUser);
app.post("/login", login);
app.get("/userInfo",checkToken,getUserInfo)
app.post("/updateUser",checkToken,updateUsers);
app.post("/getAllUsers",checkToken, getUsers);

//vehicles
app.post("/addVehicle",checkToken, addVehicle);
app.post("/updateVehicle",checkToken, updateVehicle);
app.get("/getUserVehicles",checkToken, getUserVehicles);
app.get("/deleteVehicleById",checkToken, deleteVehicleById);
app.get("/getVehicle",checkToken, getVehicle);

//parking
app.post("/addParking",checkToken,upload, addParking);
app.post("/updateParkingDetails",checkToken,upload,updateParkingDetails);
app.get("/deleteParkingById",checkToken, deleteParkingById);
app.get("/getParkingDetails",checkToken, getParkingDetails);
app.get("/getAllParkings",checkToken, getAllParking);

//floor
app.post("/addFloor",checkToken, addFloor);
app.get("/getAllFloor", getAllFloor);
app.post("/updateFloorById",checkToken, updateFloorById);
app.get("/deleteFloorById",checkToken, deleteFloorById);

//slots
app.post("/addSlot",checkToken, addSlot);
app.post("/getAvailableSlot",checkToken, getAvailableSlots);
app.get("/getSlotsByFloor",checkToken, getSlotsByFloor);
app.get("/deleteSlotById",checkToken, deleteSlot);
app.get("/getSlotById",checkToken, getSlotById);
app.get("/updateSlotStatus",checkToken, updateSlotStatus);

//bookings
app.post("/instantBooking",checkToken, InstantBooking);
app.post("/bookForLater",checkToken, bookForLater);
app.get("/userBookings",checkToken, getUserBookings);
app.get("/updateBooking",checkToken, updateBooking);
//Booking Request
app.post("/sendRequest",checkToken, sendRequest);
app.get("/updateRequestStatus",checkToken,updateRequestStatus)
app.get("/allotSlot",checkToken,allotSlot)
app.get("/getRequestById",checkToken,getRequestById)
app.get("/BookedSlotStatus", checkToken, BookedSlotStatus)

//checkout
app.get("/checkout", checkToken, checkout)
app.get("/pay", checkToken, pay)
const port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
