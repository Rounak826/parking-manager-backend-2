const db = require("../config/database");
const moment = require('moment')




module.exports = {
  //authentication
  getUserByemail: (email, callBack) => {
    console.log(email);
    db.query(
      `select * from user where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results[0])
        return callBack(null, results[0]);
      }
    );
  },
  create: (data, callBack) => {
    db.query(
      `insert into user(name,email,password,mobile,mobile_2,address) 
                values(?,?,?,?,?,?)`,
      [
        data.name,
        data.email,
        data.password,
        data.mobile,
        data.mobile_2,
        data.address,

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByEmail: (email, callBack) => {
    db.query(
      `select * from user where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserById: (data, callBack) => {
    db.query(
      `select id,firstName,lastName,gender,email,number from user where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    db.query(
      `select * EXCEPT(password) from user`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //vehicle
  addVehicle: (data, callBack) => {
    db.query(
      `insert into vehicles(model,type,plate_no,color,user_id) 
      values(?,?,?,?,?)`,
      [
        data.model,
        data.type,
        data.plate_no,
        data.color,
        data.user_id,

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0] && results[0].rowAffected);
      }
    );
  },
  updateVehicle: (data, callBack) => {
    db.query(
      `update vehicles set model=?,type=?,plate_no=?,color=? where vehicle_id=?`,
      [
        data.model,
        data.type,
        data.plate_no,
        data.color,
        data.vehicle_id,

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteVehicleById: (id, callBack) => {
    db.query(
      `Delete from vehicles where vehicle_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserVehicles: (id, callBack) => {
    db.query(
      `select * from vehicles where user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getVehicleById: (id, callBack) => {
    db.query(
      `select * from vehicles where vehicle_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },

  //parking
  addParking: (data, callBack) => {
    db.query(
      `insert into parking(parking_id,name,email,mobile,mobile2,address,map,image_url,rate,penalty_rate,capacity,facilities,upi_id) 
      values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.parking_id,
        data.name,
        data.email,
        data.mobile,
        data.mobile2,
        data.address,
        data.map,
        data.image_url,
        data.rate,
        data.penalty_rate,
        data.capacity,
        data.facilities,
        data.upi_id

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0] && results[0].rowAffected);
      }
    );
  },
  getParkingDetails: (id, callBack) => {
    db.query(
      `select * from parking where parking_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );

  },
  updateParkingDetails: (data, callBack) => {
    db.query(
      `update parking set name=?,email=?,mobile=?,mobile2=?,address=?,map=?,image_url=?,rate=?,penalty_rate=?,capacity=?,facilities=?,upi_id=? where parking_id=?`,
      [
        data.name,
        data.email,
        data.mobile,
        data.mobile2,
        data.address,
        data.map,
        data.image_url,
        data.rate,
        data.penalty_rate,
        data.capacity,
        data.facilities,
        data.upi_id,
        data.parking_id

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteParkingById: (id, callBack) => {
    db.query(
      `Delete from parking where parking_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //floor
  addFloor: (data, callBack) => {
    db.query(
      `insert into floors(parking_id,floor_no,grid_row,grid_column) 
        values(?,?,?,?)`,
      [
        data.parking_id,
        data.floor_no,
        data.grid_row,
        data.grid_column,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAllFloors: (id, callBack) => {
    db.query(
      `select * from floors where parking_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },
  getFloorById: (id, callBack) => {
    db.query(
      `select * from floors where floor_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },
  updateFloorById: (data, callBack) => {
    db.query(
      `update floors set floor_no=?,grid_row=?,grid_column=? where floor_id=?`,
      [

        data.floor_no,
        data.grid_row,
        data.grid_column,
        data.floor_id

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteFloorById: (id, callBack) => {
    db.query(
      `Delete from floors where floor_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //slots
  addSlots: (data, callBack) => {
    db.query(
      `insert into slots(parking_id,floor_id,y,x,specially_abled_friendly,type) 
        values(?,?,?,?,?,?)`,
      [
        data.parking_id,
        data.floor_id,
        data.y,
        data.x,
        data.specially_abled_friendly,
        data.type
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSlotById: (id,callBack)=>{
    db.query(
      `select * from slots where slot_id=?`,
      [
        id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },
  getAllSlots: (query, callBack) => {
    db.query(
      `select * from slots where parking_id=?`,
      [
        query.parking_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },
  getAllEmptySlots : (parking_id,booking_till,booking_from, callBack) => {
    db.query(
      `select s.slot_id, b.booking_from,b.booking_till, b.user_id from slots s LEFT JOIN bookings b ON s.slot_id = b.slot_id where s.status=0 order by s.slot_id`,
      [
        booking_till,
        parking_id
      ],
      
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log('\ncheck prev booking\n')
        let filteredResult1 = results.filter((x)=>checkAvaibilityFrom(x.booking_till,booking_from,1))
        console.log('\ncheck upcoming booking\n')
        let filteredResult2 = filteredResult1.filter((x)=>checkAvaibilityTill(x.booking_from,booking_till,1))
        return callBack(null, filteredResult2);
      }
    );

  },
  getAllEmptySlots2 : (parking_id,booking_till,booking_from,instant, callBack) => {
    db.query(
      `select * from slots where slot_id not in (select slot_id from bookings where parking_id=? and (booking_from >= ? and booking_from <= (?+1*60*60*1000))  or booking_till >= (?-1*60*60*1000) and booking_till <= (?) ) order by floor_id ?, y ?, x ? `,
      [

        parking_id,
        booking_from,
        booking_till,
        booking_from,
        booking_till,
        instant?'':'DESC',
        instant?'':'DESC',
        instant?'':'DESC'
      ],
      
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },
  getSlotsByFloor: (id, callBack) => {
    db.query(
      `select * from slots where floor_id = ?`,
      [
        id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },
  updateSlotById: (data, callBack) => {
    db.query(
      `update slots set floor_id=?,row=?,col=?,status=?,occupied_till=?,user_id=?,specially_abled_friendly=? where floor_id=? and parking_id=?,`,
      [

        data.floor_id,
        data.row,
        data.col,
        data.status,
        data.occupied_till,
        data.user_id,
        data.specially_abled_friendly,
        data.floor_id,
        data.parking_id,

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteSlotsById: (slot_id,parking_id, callBack) => {
    db.query(
      `Delete from slots where slots_id=? and parking_id=?`,
      [slot_id,parking_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //booking
  addBooking: (data, callBack) => {
    db.query(
      `insert into bookings(parking_id,slot_id,user_id,vehicle_id,booking_from,booking_till) 
        values(?,?,?,?,?,?)`,
      [
        data.parking_id,
        data.slot_id,
        data.user_id,
        data.vehicle_id,
        data.booking_from,
        data.booking_till
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getBookingById: (id,callBack)=>{
    db.query(
      `select * from bookings where booking_id=?`,
      [
        id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },
  getBookingByTime: (parking_id,data,callBack)=>{
    db.query(
      `select * from bookings where booking_from>? and parking_id=? `,
      [
        data.booking_till,
        parking_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
function checkAvaibilityFrom(booking_till, book_from, buffer = 0) {
  console.log('values:',{booking_till, book_from})
  if (!booking_till) return true

  let xbt = booking_till;
  let bf = book_from
  console.log((xbt-bf), (buffer * 60 * 60 * 1000));
  console.log((xbt-bf)>= (buffer * 60 * 60 * 1000));
  return (xbt-bf) >= (buffer * 60 * 60 * 1000);
}
function checkAvaibilityTill(booking_from, book_till, buffer = 0) {
  console.log('values:',{booking_from, book_till})
  if (!booking_from) return true
  let xbf = booking_from

  let bt = book_till
  console.log(xbf - bt, (buffer * 60 * 60 * 1000));
  console.log(xbf - bt >= (buffer * 60 * 60 * 1000));
  return (xbf - bt) >= (buffer * 60 * 60 * 1000);
}
