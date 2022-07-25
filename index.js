require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const {createUser,login,getUsers,updateUsers,getUserInfo, addVehicle, updateVehicle, getUserVehicles, deleteVehicleById, addParking, updateParkingDetails, deleteParkingById, getParkingDetails, addFloor, getAllFloor, updateFloorById, deleteFloorById, addSlot, getAvailableSlots, deleteSlot, InstantBooking, bookForLater, getSlotsByFloor, getVehicle, sendRequest, getRequestById, getUserBookings, getAllParking, allotSlot, getSlotById, BookedSlotStatus, updateSlotStatus, updateBooking, checkout,updateSlotType, parkingPayments, payAtCheckout, payAtBooking, getUserActiveRequest, getFloorMap, test, updateStatus} = require("./controller/user.controller");
//https://smart-parking-management-sys.herokuapp.com/
const multer = require('multer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({ extended: true})); 
const db = require("./config/database");
const { checkToken } = require("./auth/token_validation");
//file upload
const fs = require('fs');
const { updateTransaction, getRequestIdbyOrderId, updateRequestStatus } = require("./service/user.service");
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
app.get("/getFloorMap", getFloorMap);
app.post("/updateFloorById",checkToken, updateFloorById);
app.get("/deleteFloorById",checkToken, deleteFloorById);

//slots
app.post("/addSlot",checkToken, addSlot);
app.post("/getAvailableSlot",checkToken, getAvailableSlots);
app.get("/getSlotsByFloor",checkToken, getSlotsByFloor);
app.get("/deleteSlotById",checkToken, deleteSlot);
app.get("/getSlotById",checkToken, getSlotById);
app.get("/updateSlotStatus",checkToken, updateSlotStatus);
app.get("/updateSlotType",checkToken, updateSlotType);
//bookings
app.post("/instantBooking",checkToken, InstantBooking);
app.post("/bookForLater",checkToken, bookForLater);
app.get("/userBookings",checkToken, getUserBookings);
app.get("/updateBooking",checkToken, updateBooking);
//Booking Request
app.post("/sendRequest",checkToken, sendRequest);
app.get("/updateRequestStatus",checkToken,updateStatus)
app.get("/allotSlot",checkToken,allotSlot)
app.get("/getRequestById",checkToken,getRequestById)
app.get("/getUserActiveRequest",checkToken,getUserActiveRequest)
app.get("/BookedSlotStatus", checkToken, BookedSlotStatus)

//checkout
app.get("/checkout", checkToken, checkout)
app.get("/payAtCheckout", checkToken, payAtCheckout)
app.get("/payAtBooking", checkToken, payAtBooking)
app.post('/verification', (req, res) => {
	// do a validation
	const secret = 'STR@12345'

	
  const transaction = req.body.payload.payment.entity
	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
    const date = new Date()
    const timestamp = date.getTime()
    updateTransaction({payment_id:transaction.id,method:transaction.method, order_id: transaction.order_id,timestamp }, (err,updateTransaction)=>{
      console.log({err,updateTransaction})
      if(!err){
        getRequestIdbyOrderId(transaction.order_id, (err,request)=>{
            console.log({err,request})
            updateRequestStatus(601,request[0].request_id, (err,results)=>{
              console.log({err,results})
            })

        })
      }
    })

		
	} else {
		// reject it
    console.log('request is illegit')
	}
	res.json({ status: 'ok' })
})
app.get("/parkingPayments", checkToken, parkingPayments)
//testing
app.get("/test", checkToken, test)
const port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
