const { create, getUserByEmail, getUserById, getUsers, getUserByemail, addVehicle, updateVehicle, getUserVehicles, deleteVehicleById, addParking, updateParkingDetails, deleteParkingById, getParkingDetails, addFloor, getAllFloors, updateFloorById, getFloorById, addSlots, deleteSlotsById, deleteFloorById, updateSlotById, getAllSlots, getAllEmptySlots, getBookingById, addBooking, getAllEmptySlots2 } = require("../service/user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const db = require("../config/database");
const fs = require('fs')


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
      return res.json({
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

  //parking
  addParking: (req, res) => {
    const user_id = req.decoded.result.user_id
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
    });


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
    const user_id = req.decoded.result.user_id
    addSlots({ ...req.body, parking_id: user_id }, (err, results) => {
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
    const parking_id = req.decoded.result.user_id;
    const booking_till = req.body.booking_till;
    const booking_from =  req.body.booking_from;
    const booking_till_mills = new Date(booking_till).getTime();
    const booking_from_mills = new Date(booking_from).getTime();
    getAllEmptySlots2(parking_id, booking_till_mills,booking_from_mills, (err, results) => {
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
        data: results
      });

      /**/
    })
  },

  //booking
  InstantBooking: (req, res) => {
    const parking_id = req.decoded.result.user_id
    const body = req.body
    body.booking_till = new Date(body.booking_till).getTime();
    getAllEmptySlots(parking_id, body.booking_till, (err, results) => {
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
      addBooking({ parking_id, slot_id: first_empty_slot,...body,booking_from},(err, results) => {
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

  },
  bookForLater: (req, res) => {
    const user_id = req.decoded.result.user_id
    const parking_id = req.parking_id
    const body = req.body
    body.booking_till = new Date(body.booking_till).getTime();
    body.booking_from = new Date(body.booking_from).getTime();
    getAllEmptySlots(parking_id, body.booking_till,body.booking_from, (err, results) => {
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
      
      addBooking({ user_id, slot_id: first_empty_slot,...body,booking_from},(err, results) => {
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

  },








};

