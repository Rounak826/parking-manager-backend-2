const db = require("../config/database");




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
  getUserById: (id, callBack) => {
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
  getAllParking: (callBack) => {
    db.query(
      `select * from parking`,
      [],
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
  getFloorMapById: (floor_no, parking_id, callBack) => {
    db.query(
      `select * from floors where floor_no=? and parking_id=?`,
      [floor_no, parking_id],
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
    const rows = data.map(x=>Object.values(JSON.parse(x)))
    db.query(
      `insert into slots(parking_id,floor_id,y,x,specially_abled_friendly,type) 
        values ?`,
        [rows]
        
      ,
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSlotById: (id, callBack) => {
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
  getAllEmptySlots: (parking_id, booking_till, booking_from, callBack) => {
    db.query(
      `select * from slots where type=1 and parking_id=? and  slot_id not in (select slot_id from bookings where parking_id<>? and checkout is NULL and (booking_from >= ? and booking_from <= (?+1*60*60*1000))  or booking_till >= (?-1*60*60*1000) and booking_till <= (?) or status<>'free' )  order by floor_id , y , x `,
      [
        parking_id,
        parking_id,
        booking_from,
        booking_till,
        booking_from,
        booking_till,
      ],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },
  getAllEmptySlotsForLater: (parking_id, booking_till, booking_from, callBack) => {
    db.query(
      `select * from slots where type= 1 and parking_id=? and slot_id not in (select slot_id from bookings where parking_id<>? and (booking_from >= ? and booking_from <= (?+1*60*60*1000))  or booking_till >= (?-1*60*60*1000) and booking_till <= (?) ) order by floor_id , y , x `,
      [
        parking_id,
        parking_id,
        booking_from,
        booking_till,
        booking_from,
        booking_till,
      ],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },
  getAllEmptySlotsForInstant: (parking_id, booking_till, booking_from, callBack) => {
    db.query(
      `select * from slots where type=1 and parking_id=? and  slot_id not in (select slot_id from bookings where parking_id<>? and checkout is NULL and (booking_from >= ? and booking_from <= (?+1*60*60*1000))  or booking_till >= (?-1*60*60*1000) and booking_till <= (?) or status<>'free' )  order by floor_id , y , x `,
      [
        parking_id,
        parking_id,
        booking_from,
        booking_till,
        booking_from,
        booking_till,
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
      `update slots set floor_id=?,row=?,col=?,status=?,occupied_till=?,user_id=?,specially_abled_friendly=? where floor_id=? and parking_id=? and slot_id=?`,
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
        data.slot_id

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateSlotTypeById: (data, callBack) => {
    db.query(
      `update slots set type=? where parking_id=? and slot_id=?`,
      [
        data.status,
        data.parking_id,
        data.slot_id

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateSlotStatusById: (data, callBack) => {
    db.query(
      `update slots set status=? where parking_id=? and slot_id=?`,
      [
        data.status,
        data.parking_id,
        data.slot_id

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteSlotsById: (slot_id, parking_id, callBack) => {
    db.query(
      `Delete from slots where slots_id=? and parking_id=?`,
      [slot_id, parking_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //booking
  addBooking: (data,instant, callBack) => {
    db.query(
      `insert into bookings(parking_id,slot_id,user_id,vehicle_id,booking_from,booking_till,type) 
        values(?,?,?,?,?,?,?);update slots set status=? where slot_id=?`,
      [
        data.parking_id,
        data.slot_id,
        data.user_id,
        data.vehicle_id,
        data.booking_from,
        data.booking_till,
        !instant,
        'booked',
        instant?data.slot_id:'-' 
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getBookingById: (id, callBack) => {
    db.query(
      `select bookings.*, slots.status from bookings INNER JOIN slots ON bookings.slot_id = slots.slot_id where booking_id=?`,
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
  getBookingByTime: (data, callBack) => {
    console.log({data})
    db.query(
      `select bookings.*, parking.name, parking.image_url, parking.map from bookings INNER JOIN parking ON bookings.parking_id = parking.parking_id where booking_from>? and bookings.type=1 and bookings.checkout is NULL and user_id=? `,
      [
        data.booking_from,
        data.user_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateBooking: (data, callBack) => {
    console.log(data.booking_id)
    db.query(
      `update bookings set slot_id=?,vehicle_id=?,booking_from=?,booking_till=?  where booking_id=?;update slots set status='booked' where slot_id=?`,
      [

        data.slot_id,
        data.vehicle_id,
        data.booking_from,
        data.booking_till,
        data.booking_id,
        data.slot_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  checkout:(data, callBack) => {
    console.log(data.booking_id)
    db.query(
      `update slots set status=? where slot_id=?;update bookings SET checkout=?,charge=?,penalty=? 
        where booking_id=?`,
      [
        data.status||'free',
        data.slot_id ,
        data.checkout,
        data.charge,
        data.penalty,
        data.booking_id,

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteBookingById:(booking_id,slot_id, callBack) => {
    db.query(
      `Delete from bookings where booking_id=?;update slots set status='free' where slot_id=?`,
      [
        booking_id,
        slot_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },


  //Booking Request
  getRequestById: (id, callBack) => {
    db.query(
      `select book_request.*, codes.message from book_request INNER JOIN codes on book_request.status = codes.code where request_id=?`,
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
  addBookingRequest: (data, callBack) => {
    db.query(
      `insert into book_request(user_id,vehicle_id,booking_from,booking_till,booking_id,type) 
        values(?,?,?,?,?,?)`,
      [
        data.user_id,
        data.vehicle_id,
        data.booking_from,
        data.booking_till,
        data.type==0?null:data.booking_id,
        data.type,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateRequestStatus: (status,request_id, callBack) => {
    db.query(
      `update book_request set status=? where request_id=?`,
      [

        status,
        request_id

      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateRequestBooking_id:(booking_id,request_id, callBack) => {
    db.query(
      `update book_request set booking_id=? , status=400 where request_id=?`,
      [

        booking_id,
        request_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserActiveRequest:(id, callBack) => {
    db.query(
      `select book_request.*, parking.name,parking.parking_id, floors.floor_no, slots.slot_id, codes.message from book_request INNER JOIN bookings on book_request.booking_id= bookings.booking_id INNER JOIN slots ON bookings.slot_id = slots.slot_id INNER JOIN parking on bookings.parking_id= parking.parking_id INNER JOIN floors ON slots.floor_id = floors.floor_id INNER JOIN codes on book_request.status= codes.code  where book_request.user_id=? and book_request.status IN (400,500,501,502,600,602) order by req_time desc`,
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
  getRequestIdbyOrderId:(order_id, callBack) => {
    db.query(
      `select book_request.* from transactions INNER JOIN book_request ON transactions.booking_id = book_request.booking_id where transactions.order_id = ?`,
      [
        order_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },
  //Transactions

  addTransaction:(data, callBack) => {
    console.log(data)
    db.query(
      `insert into transactions(order_id,receipt_id,user_id,parking_id,booking_id,amount,currency,timestamp) 
        values(?,?,?,?,?,?,?,?)`,
      [
        data.order_id,
        data.receipt_id,
        data.user_id,
        data.parking_id,
        data.booking_id,
        data.amount,
        data.currency,
        data.timestamp,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateTransaction:(data, callBack) => {
    db.query(
      `update transactions set method=?,payment_id=?, timestamp=? where order_id=?`,
      [
        data.method,
        data.payment_id,
        data.timestamp,
        data.order_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAllParkingTransaction:(parking_id,timestamp, callBack) => {
    db.query(
      `select  transactions.*, user.name, user.mobile, user.email from transactions inner join user on transactions.user_id = user.user_id where parking_id = ? and payment_id IS NOT NULL and timestamp>?;select sum(amount) as total from transactions where parking_id=? and timestamp>?`,
      [
        parking_id,
        timestamp,
        parking_id,
        timestamp
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAllEmptySlotsForInstantTest: (parking_id, booking_till, booking_from, callBack) => {
    db.query(
      `select * from slots where type=1 and slot_id not in (select slot_id from bookings where parking_id=? and (booking_from >= ? and booking_from <= (?+1*60*60*1000))  or booking_till >= (?-1*60*60*1000) and booking_till <= (?) or status<>'free' )  order by floor_id , y , x `,
      [

        parking_id,
        booking_from,
        booking_till,
        booking_from,
        booking_till,
      ],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );

  },


};




function checkAvaibilityFrom(booking_till, book_from, buffer = 0) {
  console.log('values:', { booking_till, book_from })
  if (!booking_till) return true

  let xbt = booking_till;
  let bf = book_from
  console.log((xbt - bf), (buffer * 60 * 60 * 1000));
  console.log((xbt - bf) >= (buffer * 60 * 60 * 1000));
  return (xbt - bf) >= (buffer * 60 * 60 * 1000);
}
function checkAvaibilityTill(booking_from, book_till, buffer = 0) {
  console.log('values:', { booking_from, book_till })
  if (!booking_from) return true
  let xbf = booking_from

  let bt = book_till
  console.log(xbf - bt, (buffer * 60 * 60 * 1000));
  console.log(xbf - bt >= (buffer * 60 * 60 * 1000));
  return (xbf - bt) >= (buffer * 60 * 60 * 1000);
}

