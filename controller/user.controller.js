const { create, getUserByEmail, getUserById, getUsers, getUserByemail, addVehicle, updateVehicle, getUserVehicles, deleteVehicleById, addParking, updateParkingDetails, deleteParkingById, getParkingDetails, addFloor, getAllFloors, updateFloorById, getFloorById, addSlots, deleteSlotsById, deleteFloorById, getBookingById, addBooking, getAllEmptySlotsForLater, getSlotsByFloor, getVehicleById, updateRequestStatus, getRequestById, addBookingRequest, updateBooking, getBookingByTime, getAllEmptySlotsForInstant, getAllParking, updateRequestBooking_id, getSlotById, updateSlotStatusById, checkout, updateSlotTypeById, addTransaction, getAllParkingTransaction, getUserActiveRequest, getFloorMapById, getRequestIdbyOrderId } = require("../service/user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const moment = require("moment-timezone");

const razorpay = new Razorpay({
  key_id: 'rzp_test_gEFzXsl80uOouW',
  key_secret: "BVzkyBKriCxFaTsFDrxLcFny",
});


module.exports = {

  //Authentication
  createUser: async (req, res) => {
    const body = req.body;

    getUserByemail(body.email, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (result) {
        return res.status(500).json({
          success: false,
          message: "Account already exists"
        });

      } else {
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }
          getUserByEmail(body.email, (err, results) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message
              });
            }
            if (!results) {
              return res.status(404).json({
                success: false,
                message: "Record not Found"
              });
            }
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "1d"
            });

            return res.status(200).json({
              success: true,
              message: "Signup successful",
              token: jsontoken,
              user_id: results.user_id
            });
          });


        });

      }
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByemail(body.email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error: " + err.message
        });
      }

      if (!results) {
        return res.status(406).json({
          success: false,
          message: "Invalid email or password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "24h"
        });

        return res.status(200).json({
          success: true,
          message: "login successful",
          token: jsontoken,
          user_id: results.user_id
        });
      } else {
        return res.status(406).json({
          success: false,
          message: "Invalid email or password"
        });
      }
    });
  },
  getUserInfo: (req, res) => {
    getUserByEmail(req.decoded.result.email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error: " + err.message
        });
      }
      if (!results) {
        return res.status(404).json({
          success: false,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.status(200).json({
        success: true,
        data: results
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.query.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error: " + err.message
        });
      }
      if (!results) {
        return res.status(404).json({
          success: false,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: true,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    if (req.decoded.result.role === 'admin') {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: true,
          data: results
        });
      });
    } else {
      return res.json({
        success: false,
        data: [],
        message: "you are not authorized to access this info"
      })
    }
  },
  updateUsers: (req, res) => {

    console.log(req.body)
    const body = req.body;
    updateUser({ ...body, email: req.decoded.result.email }, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: true,
        message: "updated successfully",
        results: results
      });
    });

  },

  //Vehicles
  addVehicle: (req, res) => {
    const user_id = req.decoded.result.user_id
    addVehicle({ ...req.body, user_id }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
        message: 'Vehicle added Successfully.'
      });
    });


  },
  updateVehicle: (req, res) => {

    updateVehicle(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To update Vehicle",
      });
      return res.status(200).json({
        success: true,
        data: results,
        message: 'Vehicle updated Successfully.'
      });
    }
    )
  },
  getUserVehicles: (req, res) => {
    getUserVehicles(req.decoded.result.user_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (results.length == 0) {
        return res.status(404).json({
          success: true,
          data: results,
          message: 'No vehicle Found'
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
        message: 'Records Found.'
      });
    });

  },
  deleteVehicleById: (req, res) => {
    deleteVehicleById(req.query.vehicle_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err
        });
      }
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To delete Vehicle",
      });

      return res.status(200).json({
        success: true,
        data: results,
        message: 'Blog Deleted Successfully'
      });

    });
  },
  getVehicle: (req, res) => {
    if (req.decoded.result.role === 'parking') {
      getVehicleById(req.query.vehicle_id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }
        if (results.length == 0) {
          return res.status(404).json({
            success: true,
            data: results,
            message: 'No vehicle Found'
          });
        }
        return res.status(200).json({
          success: true,
          data: results[0],
          message: 'Records Found.'
        });
      });
    }


  },


  //parking
  addParking: (req, res) => {
    const user_id = req.decoded.result.user_id
    console.log(req.body, req.file)
    if (req.file) {
      req.body.image_url = req.file.filename
    }
    else {
      req.body.image_url = ''
    }


    addParking({ ...req.body, parking_id: user_id }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
        message: 'Parking added Successfully.'
      });



    })


  },
  getParkingDetails: (req, res) => {
    getParkingDetails(req.query.parking_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (!results) {
        return res.json({
          success: false,
          data: [],
          message: 'No Records Found.'
        });
      }
      return res.json({
        success: true,
        data: results,
        message: 'Records Found.'
      });
    });

  },
  updateParkingDetails: (req, res) => {
    const parking_id = req.decoded.result.user_id
    if (req.file) {
      req.body.image_url = req.file.filename
    }
    updateParkingDetails({ ...req.body, parking_id }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      console.log('result', results)
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To update Parking Details",
      });
      return res.status(200).json({
        success: true,
        data: results,
        message: 'Parking updates Successfully.'
      });
    });


  },
  deleteParkingById: (req, res) => {
    let parking_id = req.decoded.result.user_id
    deleteParkingById(parking_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err
        });
      }
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To delete Parking",
      });

      return res.status(200).json({
        success: true,
        data: results,
        message: 'Parking Deleted Successfully'
      });

    });
  },
  getAllParking: (req, res) => {

    getAllParking((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (!results) {
        return res.json({
          success: false,
          data: [],
          message: 'No Records Found.'
        });
      }
      return res.json({
        success: true,
        data: results,
        message: 'Records Found.'
      });
    });

  },

  //floor
  addFloor: (req, res) => {
    const user_id = req.decoded.result.user_id
    addFloor({ ...req.body, parking_id: user_id }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To add slot",
      });
      return res.status(200).json({
        success: true,
        data: results,
        message: 'Floor added Successfully.'
      });
    });


  },
  getAllFloor: (req, res) => {
    getAllFloors(req.query.parking_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (!results) {
        return res.json({
          success: false,
          data: [],
          message: 'No Records Found.'
        });
      }
      return res.json({
        success: true,
        data: results,
        message: 'Records Found.'
      });
    });

  },
  getFloorMap: (req, res) => {
    if(!req.query.floor_no||!req.query.parking_id){
      return res.status(500).json({
        success:false,
        message:"Wrong formatted data"
      })
    }
    getFloorMapById(req.query.floor_no,req.query.parking_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (!results[0]) {
        return res.json({
          success: false,
          data: [],
          message: 'No Records Found.'
        });
      }
      getSlotsByFloor(results[0].floor_id,(err,slot)=>{
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }
        return res.json({
          success: true,
          data: {
            floor: results[0],
            slot
          },
          message: 'Records Found.'
        });
      });
      })

     

  },
  updateFloorById: (req, res) => {
    updateFloorById({ ...req.body }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      console.log('result', results)
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To update Parking Details",
      });
      return res.status(200).json({
        success: true,
        data: results,
        message: 'Parking updates Successfully.'
      });
    });


  },
  deleteFloorById: (req, res) => {
    let parking_id = req.decoded.result.user_id
    let floor_id = req.query.floor_id
    getFloorById(floor_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err
        });
      }
      if (results.length == 0) {
        return res.status(400).json({
          success: false,
          message: "No Slots Found",
          error: err
        });
      }
      if (parking_id === results[0].parking_id) deleteFloorById(floor_id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err
          });
        }
        if (results.affectedRows == 0) return res.status(400).json({
          success: false,
          message: "Failed To delete Floor",
        });

        return res.status(200).json({
          success: true,
          data: results,
          message: 'Floor Deleted Successfully'
        });

      });

    })

  },

  //slots
  addSlot: (req, res) => {
    const data = JSON.parse(req.body.slots)
    addSlots(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To add slot",
      });
      return res.status(200).json({
        success: true,
        data: results,
        message: 'Slot added Successfully.'
      });
    });
  },
  deleteSlot: (req, res) => {
    let parking_id = req.decoded.result.user_id
    let slot_id = req.query.slot_id
    deleteSlotsById(slot_id, parking_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err
        });
      }
      console.log(results)
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To delete Parking",
      });

      return res.status(200).json({
        success: true,
        data: results,
        message: 'Parking Deleted Successfully'
      });

    });
  },
  getAvailableSlots: (req, res) => {
    const instant = req.body.instant
    const parking_id = req.decoded.result.user_id;
    const booking_till = req.body.booking_till;
    const booking_from = req.body.booking_from;
    const booking_till_mills = new Date(booking_till).getTime();
    const booking_from_mills = new Date(booking_from).getTime();
    getAllEmptySlotsForLater(parking_id, booking_till_mills, booking_from_mills, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (results.length == 0) return res.status(400).json({
        success: false,
        message: "No slots found"
      });


      return res.status(200).json({
        success: true,
        message: "slots Available",
        data: instant ? results[0] : results[results.length - 1]
      });

      /**/
    })
  },
  getSlotsByFloor: (req, res) => {
    getSlotsByFloor(req.query.floor_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (!results) {
        return res.json({
          success: false,
          data: [],
          message: 'No Records Found.'
        });
      }
      return res.json({
        success: true,
        data: results,
        message: 'Records Found.'
      });
    });

  },
  getSlotById: (req, res) => {
    getSlotById(req.query.slot_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (!results || results.length === 0) {
        return res.json({
          success: false,
          data: [],
          message: 'No Records Found.'
        });
      }
      return res.json({
        success: true,
        data: results[0],
        message: 'Records Found.'
      });
    });

  },
  updateSlotStatus: (req, res) => {
    let parking_id = req.decoded.result.user_id
    updateSlotStatusById({ slot_id: req.query.slot_id, status: req.query.status, parking_id }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (results.affectedRows == 0) {
        return res.json({
          success: false,
          data: [],
          message: 'Failed to update Slot Status'
        });
      }
      return res.json({
        success: true,
        data: results[0],
        message: 'Slot Status Updated.'
      });
    });

  },
  updateSlotType: (req, res) => {
    let parking_id = req.decoded.result.user_id
    updateSlotTypeById({ slot_id: req.query.slot_id, status: req.query.type, parking_id }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (results.affectedRows == 0) {
        return res.json({
          success: false,
          data: [],
          message: 'Failed to update Slot Type'
        });
      }
      return res.json({
        success: true,
        data: results[0],
        message: 'Slot Type Updated.'
      });
    });

  },
  //booking
  InstantBooking: (req, res) => {
    const parking_id = req.decoded.result.user_id
    const body = req.body
    console.log(body)
    body.booking_till = new Date(parseInt(body.booking_till)).getTime();
    const date = new Date()
    body.booking_from = date.getTime()
    console.log(body)
    getAllEmptySlotsForInstant(parking_id, body.booking_till, body.booking_from, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (results.length == 0) return res.status(400).json({
        success: false,
        message: "No slots found"
      });
      const first_empty_slot = results[0].slot_id
      const booking_from = new Date().getTime()
      addBooking({ parking_id, slot_id: first_empty_slot, ...body, booking_from }, true, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }
        if (results[0].affectedRows == 0) return res.status(400).json({
          success: false,
          message: "Failed To Book Slot",
        });

        return res.status(200).json({
          success: true,
          data: results[0].insertId,
          slot_id: first_empty_slot,
          message: 'Slot Booked Successfully'
        });

      })

    }

    )

  },
  bookForLater: (req, res) => {
    const user_id = req.decoded.result.user_id
    const parking_id = req.parking_id
    const body = req.body
    body.booking_till = new Date(body.booking_till).getTime();
    body.booking_from = new Date(body.booking_from).getTime();
    getAllEmptySlotsForLater(parking_id, body.booking_till, body.booking_from, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      //reserve 5 slots

      if (results.length < 5) return res.status(400).json({
        success: false,
        message: "No slots found",
      });
      //select 5th available slot from last
      const first_empty_slot = results[results.length - 5].slot_id

      addBooking({ user_id, slot_id: first_empty_slot, ...body, booking_from: body.booking_from }, false, (err, bookingResults) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }
        if (bookingResults[0].affectedRows == 0) return res.status(400).json({
          success: false,
          message: "Failed To Book Slot",
        });


        getParkingDetails(req.body.parking_id, (err, parking) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }
          if (!parking) {
            return res.status(500).json({
              success: false,
              message: "Parking Details not found"
            });
          }
          rate = parseInt(parking.rate)
          penalty_rate = parseInt(parking.penalty_rate)
          const duration = (body.booking_till - body.booking_from) / (1000 * 60 * 60)
          const charge = rate * duration
          console.log(duration, charge)
          checkout({ status: 'booked', checkout: null, charge, penalty: 0, booking_id: bookingResults[0].insertId, slot_id: first_empty_slot }, async (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: err.message
              });
            }
            if (results[0].affectedRows == 0) return res.status(400).json({
              success: false,
              message: "Failed To Checout",
            });

            return res.status(200).json({
              success: true,
              data: first_empty_slot,
              booking_id: bookingResults[0].insertId,
              message: "Bill generated"
            })

          });

        })

      })

    }

    )

  },
  updateBooking: (req, res) => {
    getBookingById(req.query.booking_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (results.length == 0) return res.status(400).json({
        success: false,
        message: "No Bookings found"
      });
      let booking = results[0]
      console.log(booking.booking_id);
      getAllEmptySlotsForInstant(booking.parking_id, booking.booking_till, booking.booking_from, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }
        if (results.length == 0) return res.status(400).json({
          success: false,
          message: "No slots found"
        });
        const first_empty_slot = results[0].slot_id

        updateBooking({ ...booking, slot_id: first_empty_slot }, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }
          if (results.affectedRows == 0) return res.status(400).json({
            success: false,
            message: "Failed To Book Slot",
          });

          return res.status(200).json({
            success: true,
            data: first_empty_slot,
            message: 'Slot Booked Successfully'
          });

        })

      }

      )


    })

  },
  getUserBookings: (req, res) => {
    let booking_from = req.query.booking_from
    let user_id = req.decoded.result.user_id
    getBookingByTime({ booking_from, user_id }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (!results) {
        return res.json({
          success: false,
          data: [],
          message: 'No Records Found.'
        });
      }
      return res.json({
        success: true,
        data: results.map((booking,i)=>{
          return {
            ...booking,
            time:  `${moment(booking.booking_from).tz('Asia/Kolkata').format("hh:mm a")} - ${moment(booking.booking_till).tz('Asia/Kolkata').format("hh:mm a")}`,
            date: TimeDiff(booking.booking_till,booking.booking_from)
          }
        })
          
          

        ,
        message: 'Records Found.'
      });
    });

  },
  BookedSlotStatus: (req, res) => {
    let booking_id = req.query.booking_id
    getBookingById(booking_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (!results || results.length == 0) {
        return res.json({
          success: false,
          data: [],
          message: 'No Bookings Found.'
        });
      }
      getSlotById(results[0].slot_id, (err, slotResults) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message,
          });

        }
        if (!slotResults || slotResults.length == 0) {
          return res.status(400).json({
            success: false,
            data: [],
            message: 'No Slot Found.'
          });
        }
        console.log(slotResults)
        if (slotResults[0].status == 'free') {
          return res.status(200).json({
            success: true,
            data: true,
            slot_id: results[0].slot_id,
            message: 'Records Found.'
          });
        } else {
          return res.status(400).json({
            success: false,
            data: false,
            message: 'Slot occupied'
          });
        }
      })

    });

  },



  //Booking request

  sendRequest: (req, res) => {
    const user_id = req.decoded.result.user_id

    if (req.body.type == 0) {
      const date = new Date()
      req.body.booking_id = null
      req.body.booking_from = date.getTime()
      const booking_till = new Date(req.body.booking_till)
      req.body.booking_till = booking_till.getTime();
    }
    console.log(req.body)
    addBookingRequest({ ...req.body, user_id }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To Send Request",
      });
      return res.status(200).json({
        success: true,
        data: results.insertId,
        message: 'Request Sent Successfully.'
      });
    });
  },
  updateStatus: (req, res) => {
    const request_id = req.query.request_id
    const status = req.query.status
    updateRequestStatus(status, request_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To Update Status",
      });
      return res.status(200).json({
        success: true,
        data: results[0],
        message: 'Request Updated Successfully.'
      });
    });
  },
  allotSlot: (req, res) => {
    const request_id = req.query.request_id
    const booking_id = req.query.booking_id
    updateRequestBooking_id(booking_id, request_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (results.affectedRows == 0) return res.status(400).json({
        success: false,
        message: "Failed To Update Alot Slot",
      });
      console.log(results)
      return res.status(200).json({
        success: true,
        data: results,
        message: 'Slot Alloted Successfully.'
      });
    });
  },
  getRequestById: (req, res) => {

    const user_id = req.decoded.result.user_id
    const role = req.decoded.result.role

    getRequestById(req.query.request_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (results.length == 0) {
        return res.status(404).json({
          success: true,
          data: results,
          message: 'No Request Found'
        });
      }
      if (role === 'parking') {
        return res.status(200).json({
          success: true,
          data: results[0],
          message: 'Records Found.'
        });
      } else if (role === 'user' && user_id == results[0].user_id) {
        return res.status(200).json({
          success: true,
          data: {
            status: results[0].status,
            message:  results[0].message,
            booking_id: results[0].booking_id
          },
          message: "records found"
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Unauthorized Data'
        });
      }

    });
  },
  getUserActiveRequest: (req, res) => {

    const user_id = req.decoded.result.user_id

    getUserActiveRequest(user_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (results.length == 0) {
        return res.status(404).json({
          success: true,
          data: results,
          message: 'No Request Found'
        });
      }
      if (user_id == results[0].user_id) {
        return res.status(200).json({
          success: true,
          data: { ...results[0], booking_from: moment(results[0].booking_from, "x").tz('Asia/Kolkata').format("hh:mm a"), booking_till: moment(results[0].booking_till, "x").tz('Asia/Kolkata').format("hh:mm a") },
          message: 'Records Found.'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Unauthorized Data'
        });
      }

    });
  },

  //checkout
  checkout: (req, res) => {

    const booking_id = req.query.booking_id
    const date = new Date()
    //current time with 10 min allowance
    const current_time = date.getTime() + 10 * 60 * 60 * 1000
    let rate = 0
    let charge = 0
    let penalty_rate = 0
    let penalty = 0
    let duration = 0
    let extra = 0
    let slot_id = ''
    getParkingDetails(req.decoded.result.user_id, (err, parking) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (!parking) {
        return res.status(500).json({
          success: false,
          message: "Parking Details not found"
        });
      }
      rate = parseInt(parking.rate)
      penalty_rate = parseInt(parking.penalty_rate)
      getBookingById(booking_id, (err, booking) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }
        if (!booking) {
          return res.status(500).json({
            success: false,
            message: "Parking Details not found"
          });
        }
        slot_id = booking[0].slot_id
        duration = parseInt(booking[0].booking_till) - parseInt(booking[0].booking_from)
        duration = duration / (1000 * 60 * 60)
        charge = duration * rate
        console.log(booking[0].checkout, current_time)
        if (booking[0].checkout > current_time) {
          extra = (current_time - parseInt(booking[0].checkout)) - duration
          penalty = extra / (1000 * 60 * 60) * parseInt(penalty_rate)
        }
        checkout({ checkout: current_time, charge, penalty, booking_id, slot_id }, async (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }
          if (results.affectedRows == 0) return res.status(400).json({
            success: false,
            message: "Failed To Checout",
          });

          return res.status(200).json({
            success: true,
            data: results,
            message: "Bill generated"
          })

        });

      })

    })


  },
  payAtCheckout: (req, res) => {
    //razorpay constants
    const payment_capture = 1;
    const currency = "INR";
    const user_id = req.decoded.result.user_id
    getRequestById(req.query.request_id, (err, requests) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (!requests || requests.length === 0) {
        res.status(400).json({
          success: false,
          message: "No Request found",
        });
      }
      getBookingById(requests[0].booking_id, async (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }
        if (!results || results.length == 0) return res.status(400).json({
          success: false,
          message: "No booking info found",
        });
        if (!results[0].charge || !results[0].checkout) {
          return res.status(400).json({
            success: false,
            message: "checkout not done!",
          });
        }

        let charge = results[0].type == 0 ? parseInt(results[0].charge) : 0
        let penalty = parseInt(results[0].penalty) || 0
        if (charge == 0) {
          updateRequestStatus(603, req.query.request_id, (err, result) => {
            if (err) {
              console.log(err)
              return res.status(500).json({
                success: false,
                message: "failed to update request",
                error: err
              })

            }
            if (result.affectedRows == 0) {
              return res.status(500).json({
                success: false,
                message: "failed to update request",

              })
            }
            return res.status(200).json({
              success: true,
              message: "No Payment Required",
              skip: true

            })

          })
        } else {
          try {

            const options = {
              amount: (charge + penalty) * 100,
              currency,
              receipt: shortid.generate(),
              payment_capture,
            };
            console.log(charge)

            const response = await razorpay.orders.create(options);
            const date = new Date()
            const timestamp = date.getTime()

            addTransaction({ order_id: response.id, user_id, receipt_id: options.receipt, parking_id: results[0].parking_id, booking_id: results[0].booking_id, amount: response.amount, currency: response.currency, timestamp }, (err, TransactionResults) => {
              if (err) {
                console.log(err)
                return res.status(500).json({
                  success: false,
                  message: "failed to transaction request",
                  error: err
                })

              }
              updateRequestStatus(600, req.query.request_id, (err, result) => {
                if(err){
                  return res.status(500).json({
                    success: false,
                    message: "Failed to update request status"

                  })
                }
                res.status(200).json({
                  success: true,
                  message: "transaction request created",
                  id: response.id,
                  currency: response.currency,
                  amount: response.amount,
                  penalty: penalty * 100,
                  time: {
                    date: moment(results[0].booking_from, "x").tz('Asia/Kolkata').format("DD MMM"),
                    booking_from: moment(results[0].booking_from, "x").tz('Asia/Kolkata').format("hh:mm a"),
                    booking_till: moment(results[0].booking_till, "x").tz('Asia/Kolkata').format("hh:mm a"),
                  }
                });
              })


            })

          } catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: error.description
            })
          }

        }


      });

    })

  },
  payAtBooking: (req, res) => {
    //razorpay constants
    const payment_capture = 1;
    const currency = "INR";
    const user_id = req.decoded.result.user_id

    getBookingById(req.query.booking_id, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      if (!results || results.length == 0) return res.status(400).json({
        success: false,
        message: "No booking info found",
      });
      if (!results[0].charge) {
        return res.status(400).json({
          success: false,
          message: "Charges not Calculated!",
        });
      }
      let charge = parseInt(results[0].charge)

      try {
        console.log(charge)
        const options = {
          amount: (charge) * 100,
          currency,
          receipt: shortid.generate(),
          payment_capture,
        };
        const response = await razorpay.orders.create(options);
        const date = new Date()
        const timestamp = date.getTime()
        addTransaction({ order_id: response.id, user_id, receipt_id: options.receipt, parking_id: results[0].parking_id, booking_id: results[0].booking_id, amount: response.amount, currency: response.currency, timestamp }, (err, transactionResult) => {
          if (err) {
            console.log(err)
            return res.status(500).json({
              success: false,
              message: "failed to transaction request",
              error: err
            })

          }
          res.status(200).json({
            success: true,
            message: "transaction request created",
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            time: {
              date: moment(results[0].booking_from, "x").tz('Asia/Kolkata').format("DD MMM"),
              booking_from: moment(results[0].booking_from, "x").tz('Asia/Kolkata').format("hh:mm a"),
              booking_till: moment(results[0].booking_till, "x").tz('Asia/Kolkata').format("hh:mm a")
            }

          });

        })

      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: error.error.description
        })
      }

    });
  },



  //transactions
  parkingPayments: (req, res) => {
    const parking_id = req.decoded.result.user_id
    const timestamp =parseInt(req.query.time)
    getAllParkingTransaction(parking_id, timestamp, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (!results) {
        return res.json({
          success: false,
          data: [],
          message: 'No Payement Record Found.'
        });
      }
      
      return res.json({
        success: true,
        data: {
          history: results[0].map(x=>{
            return {
              ...x,
              date : TimeDiff(x.timestamp),
              time: moment(x.timestamp, "x").tz('Asia/Kolkata').format("hh:mm a")
            }
          }),
          total: results[1][0].total || '--'
        },
        message: 'Records Found.'
      });
    });

  },

  //testing
  test: (req,res)=>{
    getRequestIdbyOrderId(req.query.order_id, (err,result)=>{

      if(err){
        return res.json({
          err: err.message
        })
      }
      return res.json(result)
    })
  }

};

function TimeDiff(booking_from) {
  console.log(booking_from)
  const date1 = moment(booking_from,"x")
  const date2 = moment()
  let year = date1.diff(date2, 'year');
  let month = date1.diff(date2, 'months');
  let days = date1.diff(date2, 'days');
  console.log({days,month ,year})
  if (year < 1) {
    if (month < 1) {
      if (days > 1) {
        return days + ' days'
      }
      else if (days == 1) {
        return "Tommorow"
      } else if (days = 0) {
        return "Today"
      }

    } else {
      return month + ' month'
    }
  } else {

    return year + ' years'
  }
}