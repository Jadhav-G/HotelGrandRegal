const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient("mongodb+srv://grandregalservices:qjzn97xUZx2RVfw2@cluster0.ln8wjyr.mongodb.net/?appName=Cluster0", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = async function () {
  try {
    console.log("creating connection")
    await client.connect();
    console.log("connection done")
    const database = client.db("grandRegalDb");
    return {
      userReqeusts: {
        submitReview: async (name, contact, rating, review) => await submitReview(name, contact, rating, review, database),
        fetchShownReviews: async () => fetchShownReviews(database),
        getMenu: async () => await getUMenu(database),
        getRoomList: async () => await getRoomList(database),
        getBanquetList: async () => await getBanquetList(database),
        getTarrif: async () => await getTarrif(database),
        getBanquetMenu: async () => await getBanquetMenu(database),
        bookRoom: async (roomName, checkIn, checkOut, name, mobile, email, guest, services, message, cost) => await bookRoom(roomName, checkIn, checkOut, name, mobile, email, guest, services, message, cost, database),
        bookBanquet: async (name, fname, lname, mobile, email, date, time, duration, tarrif, plan, guestCount, additional, cost, shownCost) => await bookBanquet(name, fname, lname, mobile, email, date, time, duration, tarrif, plan, guestCount, additional, cost, shownCost, database),
        enquire: async (fname, lnmae, mobile, email, reason, message) => await enquire(fname, lnmae, mobile, email, reason, message, database),
        fetchGallery: async() => await fetchGallery(database),
      },
      adminRequests: {
        dashboard: {
          getDashboard: async () => await getEnumStats(database),
        },
        booking: {
          acceptRoomBooking: async (id) => await acceptRoomBooking(id, database),
          acceptBanquetBooking: async (id) => await acceptBanquetBooking(id, database),
          declineRoomBooking: async (id) => await declineRoomBooking(id, database),
          declineBanquetBooking: async (id) => await declineBanquetBooking(id, database),
          bookingData: async () => await bookingData(database)
        },
        content: {
          addMenu: async (thumbnail, name, desc, price, cat, subCat, shefSpecial, isVeg) => await addMenu(thumbnail, name, desc, price, cat, subCat, shefSpecial, isVeg, database),
          getMenu: async () => await getAMenu(database),
          editMenu: async (id, thumbnail, name, desc, price, cat, subCat, shefSpecial, isVeg) => await editMenu(id, thumbnail, name, desc, price, cat, subCat, shefSpecial, isVeg, database),
          deleteMenu: async (id) => await deleteMenu(id, database),
          getRoomData: async () => await getRoomData(database),
          setRoom: async (id, name, briefInfo, detailedInfo, price, gallery) => await setRoom(id, name, briefInfo, detailedInfo, price, gallery, database),
          addRoom: async (id, name, briefInfo, detailedInfo, price, gallery) => await addRoom(id, name, briefInfo, detailedInfo, price, gallery, database),
          deleteRoom: async (id) => await deleteRoom(id, database),
          getBanquetData: async () => await getBanquetData(database),
          setBanquet: async (id, detailedInfo, price, gallery, capacity) => await setBanquet(id, detailedInfo, price, gallery, capacity, database),
          addBanquet: async (detailedInfo, price, gallery, capacity) => await addBanquet(id, name, briefInfo, detailedInfo, price, gallery, capacity, database),
          deleteBanquet: async (id) => await deleteBanquet(id, database),
          addTarrif: async (name, isVeg, price, items) => await addTarrif(name, isVeg, price, items, database),
          getTarrif: async () => await getAdminTarrif(database),
          deleteTarrif: async (name, isVeg)=> await deleteTarrif(name, isVeg, database),
          insertIntoGallery: async (cat, imgs)=> await insertIntoGallery(cat, imgs, database),
          deleteImg: async(group, link) => await deleteImg(group, link, database),
        },
        feedback: {
          getFeebacks: async () => await getFeedbacks(database),
          deleteFeedback: async (feedbackId) => await deleteFeedback(feedbackId, database),
          setFeedback: async (feedbackId, command) => await setFeedback(feedbackId, command, database),
          replyFeedback: async (feedbackId, reply) => await replyFeedback(feedbackId, reply),
        },
        enquiry: {
          setEnquiry: async (id, status) => await setEnquiry(id, status, database),
          enquiryDetails: async () => await enquiryDetails(database),
          deleteEnquiry: async (id) => await deleteEnquiry(id, database)
        }
      }
    }
  } catch (e) {
    console.log("error found", e)
  }
}

async function fetchShownReviews(database) {
  try {
    const result = await database.collection("user_ratings")
      .find({ category: "shown" })
      .project({ name: 1, rating: 1, review: 1, _id: 0 })
      .toArray();
    return {
      status: true,
      content: result
    };
  } catch (err) {
    return {
      status: false,
      reason: "Error While Fetching Shown Reviews\n Detailed Error = " + err.message
    }
  }
}

async function getUMenu(database) {
  try {
    let finalContent = [
      {
        subCatList: null,
        itemList: []
      },
      {
        subCatList: null,
        itemList: []
      },
      {
        subCatList: null,
        itemList: []
      },
      {
        subCatList: null,
        itemList: []
      }
    ];
    let categories = ["starter", "main", "desert", "drink"];
    for (index = 0; index < 4; index++) {
      allMenu = await database.collection("dineMenu").find({ cat: categories[index] }).toArray();
      finalContent[index].subCatList = [...new Set(allMenu.map(item => item.subCat))];
      for (i = 0; i < finalContent[index].subCatList.length; i++) {
        finalContent[index].itemList.push(allMenu.filter((item) => item.subCat == finalContent[index].subCatList[i]));
      }
    }
    return {
      status: true,
      content: finalContent
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Fetching User Dine Menu\n Detailed Error = " + err.message
    }
  }
}

async function getRoomList(database) {
  try {
    let data = await database.collection("rooms").find({}).toArray();
    return {
      status: true,
      content: data
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Fetching User Room List\n Detailed Error = " + err.message
    }
  }
}

async function bookRoom(roomName, checkIn, checkOut, name, mobile, email, guest, services, message, cost, database) {
  let dataToInsert = {
    roomName: roomName,
    checkIn: new Date(checkIn.slice(0, 10)),
    checkOut: new Date(checkOut.slice(0, 10)),
    checkInT: checkIn.slice(10),
    checkOutT: checkOut.slice(10),
    name: name,
    mobile: mobile,
    finalCost: cost,
    status: 'pending'
  };
  if (email) dataToInsert.email = email;
  if (message) dataToInsert.msg = message;
  if (guest) {
    dataToInsert.guestName = guest.map((g) =>
      ({ name: g.fname + " " + g.lname, isChild: g.isChild })
    )
  }
  if (services) {
    dataToInsert.services = services.map(service =>
      service.label
    )
  }
  try {
    await database.collection("room_bookings").insertOne(dataToInsert);
    return {
      status: true,
      content: null
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Booking Room\n Detailed Error = " + err.message
    }
  }
}

async function bookBanquet(name, fname, lname, mobile, email, date, time, duration, tarrif, plan, guestCount, additional, cost, shownCost, database) {
  let dataToInsert = {
    name: name,
    fname: fname,
    lname: lname,
    mobile: mobile,
    email: email,
    date: new Date(date),
    time: time,
    duration: parseInt(duration),
    tarrif: tarrif,
    plan: plan,
    guestCount: parseInt(guestCount),
    cost: parseInt(cost),
    costShown: parseInt(shownCost),
    status: 'pending'
  };
  if (additional.length > 0) {
    dataToInsert.additional = additional.map((service) => service.label);
  }
  try {
    await database.collection("banquetBookings").insertOne(dataToInsert);
    return {
      status: true,
      content: null
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Booking Room\n Detailed Error = " + err.message
    }
  }
}

async function getBanquetList(database) {
  try {
    let data = await database.collection("banquets").find({}).toArray();
    return {
      status: true,
      content: data
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Fetching User BanquetList\n Detailed Error = " + err.message
    }
  }
}

async function getTarrif(database) {
  try {
    let data = await database.collection("tarrifs").find({}).toArray();
    return {
      status: true,
      content: data
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Fetching User Tarrif\n Detailed Error = " + err.message
    }
  }
}

async function getBanquetMenu(database) {
  try {
    let data = await database.collection("banquetMenu").find({}).toArray();
    return {
      status: true,
      content: data
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Fetching User banquet Menu\n Detailed Error = " + err.message
    }
  }
}

async function submitReview(name, contact, rating, review, database) {
  const ratingNum = parseInt(rating);
  const reviewDoc = {
    name: name,
    contact: contact,
    rating: ratingNum,
    review: review,
    category: "unread",
    date: new Date()
  };

  try {
    const status = await database.collection("user_ratings").insertOne(reviewDoc);
    return {
      status: true,
      content: null
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Submitting Review\n Detailed Error = " + err.message
    }
  }
}

function getDashboard() {
  let value = 0;
  return [
    [{ header: "Pending", value: 0 }, { header: "Accepted", value: value++ }, { header: "Active", value: value++ }],
    [{ header: "Pending", value: value++ }, { header: "Accepted", value: 0 }, { header: "Active", value: 0 }],
    [{ header: "Pending", value: 0 }, { header: "Accepted", value: value++ }, { header: "Active", value: value++ }],
    [{ header: "Pending", value: 0 }, { header: "Accepted", value: value++ }, { header: "Active", value: 0 }]
  ]
}

async function getFeedbacks(database) {
  try {
    let data = await database.collection("user_ratings").find({}).toArray();
    return {
      status: true,
      content: data
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Getting Admin Feedbacks\n Detailed Error = " + err.message
    }
  }
}

async function setFeedback(feedbackId, command, database) {
  try {
    const status = await database.collection("user_ratings").updateOne(
      { _id: new ObjectId(feedbackId) },
      { $set: { category: command } }
    )
    return status.modifiedCount == 1 ? {
      status: true,
      content: null,
    } : {
      status: false,
      reason: "Error While Setting Feedback\n Detailed Error = " + "The Feedback Not Found, May be deleted or not present"
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Setting Feedback\n Detailed Error = " + err.message
    }
  }
}

async function deleteFeedback(feedbackId, database) {
  try {
    const status = await database.collection("user_ratings").deleteOne(
      { _id: new ObjectId(feedbackId) }
    )
    return status.deletedCount == 1 ? {
      status: true,
      content: null,
    } : {
      status: false,
      reason: "Error While deleting Feedback\n Detailed Error = " + "The Feedback Not Found, May be deleted or not present"
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While deleting Feedback\n Detailed Error = " + err.message
    }
  }
}

async function addMenu(thumbnail, name, desc, price, cat, subCat, shefSpecial, isVeg, database) {
  const menu = {
    img: thumbnail,
    name: name,
    desc: desc,
    price: parseInt(price),
    cat: cat,
    subCat: subCat,
    shefSpecial: shefSpecial,
    isVeg: isVeg
  };

  try {
    await database.collection("dineMenu").insertOne(menu);
    return {
      status: true,
      content: null
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Adding Menu\n Detailed Error = " + err.message
    }
  }
}

async function getAMenu(database) {
  try {
    let ack = await database.collection('dineMenu').find({}).toArray();
    return {
      status: true,
      content: ack
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Getting Admin Menu\n Detailed Error = " + err.message
    }
  }
}

async function editMenu(id, thumbnail, name, desc, price, cat, subCat, shefSpecial, isVeg, database) {
  const newData = {
    img: thumbnail,
    name: name,
    desc: desc,
    price: parseInt(price),
    cat: cat,
    subCat: subCat,
    shefSpecial: shefSpecial,
    isVeg: isVeg
  };
  try {
    let opStatus = await database.collection('dineMenu').updateOne({ _id: new ObjectId(id) }, { $set: newData });
    return opStatus.modifiedCount == 1 ? { status: true, content: null } : { status: false, reason: "id not found" }
  } catch (err) {
    return { status: false, reason: "Internal Error = " + err.message }
  }
}

async function deleteMenu(id, database) {
  try {
    let opStatus = await database.collection('dineMenu').deleteOne({ _id: new ObjectId(id) });
    return opStatus.deletedCount == 1 ? { status: true, content: null } : { status: false, reason: "id not found" }
  } catch (err) {
    return { status: false, reason: "Internal Error = " + err.message }
  }
}

async function getRoomData(database) {
  try {
    let opStatus = await database.collection('rooms').find({}).toArray();
    let modifiedData = opStatus.map((data) => {
      return {
        id: new ObjectId(data._id),
        name: data.name,
        price: data.price,
        info: data.briefInfo,
        desc: data.detailedInfo,
        gallery: data.gallery,
        capacity: 2
      }
    })
    return {
      status: true,
      content: modifiedData
    };
  } catch (err) {
    return { status: false, reason: "Internal Error = " + err.message }
  }
}

async function setRoom(id, name, briefInfo, detailedInfo, price, gallery, database) {
  try {
    let ack = await database.collection('rooms').updateOne({ _id: new ObjectId(id) }, {
      $set: {
        name: name,
        briefInfo: briefInfo,
        detailedInfo: detailedInfo,
        price: price,
        gallery: gallery
      }
    })
    return ack.modifiedCount == 1 ? { status: true, content: null } : { status: false, reason: "ID Not Found" }
  } catch (err) {
    return { status: false, reason: "Internal Error" + err.message }
  }
}

async function addRoom(id, name, briefInfo, detailedInfo, price, gallery, database) {
  const roomData = {
    name: name,
    price: price,
    briefInfo: briefInfo,
    detailedInfo: detailedInfo,
    gallery: gallery,
    ammenities: [
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607231/area_dmz2kf.png", name: "144 sq.ft" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607258/image-removebg-preview_ahxg9n.png", name: "City View" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607259/bed-removebg-preview_u7nx3d.png", name: "Twin Beds" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/wifi_1_mldc92.png", name: "Free Wifi" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607259/city-removebg-preview_dmpp9t.png", name: "City Center" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607259/city-removebg-preview_dmpp9t.png", name: "Road Touch" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/study_room_bixqib.png", name: "Study Room" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/room_services_tml6cf.png", name: "Room Service" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604486/air-conditioner_2_ou6ycj.png", name: "Air Conditioning" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/house_keeping_ynjdkq.png", name: "House Keeping" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604486/air_purifer_yevxr2.png", name: "Air Purifier" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/laundry_services_qhzvts.png", name: "Laundry Service" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/mineral_water_sgpwu3.png", name: "Mineral Water" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604486/bathroom__wqhht8.png", name: "Bathroom" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608852/image-removebg-preview_3_pwbxso.png", name: "Telephone" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608718/image-removebg-preview_2_h26zqy.png", name: "Closet" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/coffee_machine_pve7cg.png", name: "Coffee Machine" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/Work_Desk_fg2ia1.png", name: "Work Desk" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/Seating_area_loxvh9.png", name: "Seating Area" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604487/Charging_points_bi34r4.png", name: "Charging Point" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608459/computer-icons-emergency-blankets-clip-art-portable-network-graphics-png-favpng-f9YxLbaTtQ0RwK4UmRHrkV7vK-removebg-preview_cgarxz.png", name: "Blankets" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608306/safe-30_vepuzu.png", name: "Safe" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604487/Cupboards_with_lock_xwmrs1.png", name: "Lockers" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608718/image_uuvk6y-removebg-preview_dl3rmy.png", name: "TV" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604490/Toiletries_htz64n.png", name: "Toiletries" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/Shaving_Mirror_wx5ygt.png", name: "Shaving Mirror" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604487/Western_toilet_gp5z5i.png", name: "Western Toilets" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604487/Towels_dpudbe.png", name: "Towels" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/Slippers_lhy20x.png", name: "Slippers" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604490/Toiletries_htz64n.png", name: "Dental Kit" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/Hot_and_Cold_Water_gem2ch.png", name: "Hot & Cold Water" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/Kettle_p2atwl.png", name: "Kettle" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604486/Celling_Fan_sulqjy.png", name: "Ceiling Fans" }
    ],
    rules: [
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744609101/pngtree-vector-business-man-icon-png-image_925673-removebg-preview_cdzbka.png", name: "Primary Guest Should Be 18 Years of Age" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608969/684833_ftmosf.png", name: "Aadhar is Requires as ID proof" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744609130/image-removebg-preview_5_s5s7q6.png", name: "Pets Not Allowed" },
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744609129/image-removebg-preview_4_b9onvs.png", name: "Outside Food Not allowed" }
    ],
    extraFeatures: [
      { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607259/bed-removebg-preview_u7nx3d.png", name: "Extra bed", rate: 0 }
    ],
    broker: "https://www.makemytrip.com/hotels/grand_regal-details-uran_islampur.html"
  };
  try {
    let ack = await database.collection('rooms').insertOne(roomData);
    return ack.acknowledged ? { status: true, content: null } : { status: false, reason: "ID Not Found" }
  } catch (err) {
    return { status: false, reason: "Internal Error" + err.message }
  }
}

async function deleteRoom(id, database) {
  try {
    let ack = await database.collection('rooms').deleteOne({ _id: new ObjectId(id) });
    return ack.deletedCount == 1 ? { status: true, content: null } : { status: false, reason: "Id Not Found" }
  } catch (err) {
    return { status: false, reason: "Internsl Err" + err }
  }
}

async function getBanquetData(database) {
  try {
    let opStatus = await database.collection('banquets').find({}).toArray();
    let modifiedData = opStatus.map((data, index) => {
      return {
        id: new ObjectId(data._id),
        name: index ? "Royal Conference Hall" : "Majestic Hall",
        price: data.price,
        desc: data.overview,
        gallery: data.gallery,
        capacity: data.minGuestCount
      }
    })
    return {
      status: true,
      content: modifiedData
    };
  } catch (err) {
    return { status: false, reason: "Internal Error = " + err.message }
  }
}

async function setBanquet(id, detailedInfo, price, gallery, capacity, database) {
  try {
    let ack = await database.collection('banquets').updateOne({ _id: new ObjectId(id) }, {
      $set: {
        overview: detailedInfo,
        price: parseInt(price),
        gallery: gallery,
        minGuestCount: parseInt(capacity)
      }
    })
    return ack.modifiedCount == 1 ? { status: true, content: null } : { status: false, reason: "ID Not Found" }
  } catch (err) {
    return { status: false, reason: "Internal Error" + err.message }
  }
}

async function addBanquet(detailedInfo, price, gallery, capacity, database) {
  const banquetData = {
    overview: detailedInfo,
    features: [
      { logo: "https://example.com/logos/ac.png", name: "Air Conditioning" },
      { logo: "https://example.com/logos/parking.png", name: "Ample Parking" },
      { logo: "https://example.com/logos/stage.png", name: "Decorated Stage" }
    ],
    price: parseInt(price),
    gallery: gallery,
    minGuestCount: parseInt(capacity),
    extraFeatures: [
      { logo: "https://example.com/logos/dj.png", name: "DJ Service", rate: 7000 },
      { logo: "https://example.com/logos/lighting.png", name: "Special Lighting", rate: 3000 },
      { logo: "https://example.com/logos/catering.png", name: "Catering", rate: 20000 }
    ]
  };
  try {
    let ack = await database.collection('banquets').insertOne(banquetData);
    return ack.acknowledged ? { status: true, content: null } : { status: false, reason: "ID Not Found" }
  } catch (err) {
    return { status: false, reason: "Internal Error" + err.message }
  }
}

async function deleteBanquet(id, database) {
  try {
    let ack = await database.collection('banquets').deleteOne({ _id: new ObjectId(id) });
    return ack.deletedCount == 1 ? { status: true, content: null } : { status: false, reason: "Id Not Found" }
  } catch (err) {
    return { status: false, reason: "Internsl Err" + err }
  }
}

async function enquire(fname, lname, mobile, email, reason, message, database) {
  try {
    let ack = await database.collection('enquiries').insertOne({ fname: fname, lname: lname, mobile: mobile, email: email, reason: reason, message: message, status: 'unread' })
    return ack.acknowledged ? { status: true, content: null } : { status: false, reason: "Opps Some Serious Issues in our system" }
  } catch (err) {
    return { status: false, content: "Internal Error" + err }
  }
}

async function enquiryDetails(database) {
  try {
    let ack = await database.collection('enquiries').find({}).toArray();
    return { status: true, content: ack }
  } catch (err) {
    return { status: false, reason: "Internal Err " + err.message }
  }
}

async function setEnquiry(id, status, database) {
  try {
    let ack = await database.collection('enquiries').updateOne({ _id: new ObjectId(id) }, { $set: { status: status } })
    return { status: true, content: ack }
  } catch (err) {
    return { status: false, reason: "Internal Err " + err.message }
  }
}

async function deleteEnquiry(id, database) {
  try {
    let ack = await database.collection('enquiries').deleteOne({ _id: new ObjectId(id) });
    return ack.deletedCount == 1 ? { status: true, content: ack } : { status: false, reason: "Id Not Found" }
  } catch (err) {
    return { status: false, reason: "Internal Err " + err.message }
  }
}

async function getEnumStats(db) {
  const enumConfigs = [
    { collection: 'room_bookings', field: 'status', enums: ['pending', 'accepted', 'declined'] },
    { collection: 'banquetBookings', field: 'status', enums: ['pending', 'accepted', 'declined'] },
    { collection: 'enquiries', field: 'status', enums: ['unread', 'replied', 'read'] },
    { collection: 'user_ratings', field: 'category', enums: ['unread', 'shown', 'hidden'] }
  ];

  const result = [];

  for (const { collection, field, enums } of enumConfigs) {
    const pipeline = [
      { $group: { _id: `$${field}`, count: { $sum: 1 } } }
    ];

    const counts = await db.collection(collection).aggregate(pipeline).toArray();

    const enumCount = Object.fromEntries(enums.map(value => [value, 0]));

    for (const { _id, count } of counts) {
      if (_id in enumCount) {
        enumCount[_id] = count;
      }
    }

    result.push(enumCount);
  }
  return { status: true, content: result };
}

async function acceptRoomBooking(id, database) {
  try {
    let ack = await database.collection('room_bookings').updateOne({ _id: new ObjectId(id) }, { $set: { status: 'accepted' } });
    console.log("here in accept Booking ", ack);
    return ack.modifiedCount == 1 ? { status: true, content: null } : { status: false, reason: "Id Not Found" }
  } catch (err) {
    return { status: false, reason: "Error " + err.message }
  }
}


async function acceptBanquetBooking(id, database) {
  try {
    let ack = await database.collection('banquetBookings').updateOne({ _id: new ObjectId(id) }, { $set: { status: 'accepted' } });
    console.log("here in accept Banquet Booking ", ack);
    return ack.modifiedCount == 1 ? { status: true, content: null } : { status: false, reason: "Id Not Found" }
  } catch (err) {
    return { status: false, reason: "Error " + err.message }
  }
}

async function declineRoomBooking(id, database) {
  try {
    let ack = await database.collection('room_bookings').updateOne({ _id: new ObjectId(id) }, { $set: { status: 'declined' } });
    console.log("here in decline  Booking ", ack);
    return ack.modifiedCount == 1 ? { status: true, content: null } : { status: false, reason: "Id Not Found" }
  } catch (err) {
    return { status: false, reason: "Error " + err.message }
  }
}


async function declineBanquetBooking(id, database) {
  try {
    let ack = await database.collection('banquetBookings').updateOne({ _id: new ObjectId(id) }, { $set: { status: 'declined' } });
    console.log("here in decline Banquet Booking ", ack);
    return ack.modifiedCount == 1 ? { status: true, content: null } : { status: false, reason: "Id Not Found" }
  } catch (err) {
    return { status: false, reason: "Error " + err.message }
  }
}

async function bookingData(database) {
  try {
    let ack1 = await database.collection('room_bookings').find({}).toArray();
    let ack2 = await database.collection('banquetBookings').find({}).toArray();
    console.log([[...ack1], [...ack2]])
    return { status: true, content: [[...ack1], [...ack2]] }
  } catch (err) {
    console.log(err);
    return { status: false, reason: "error " + err.message }
  }
}

async function addTarrif(name, isVeg, price, items, database) {
  try{
    let objToPush= {
      name: name, 
      price: parseInt(price),
      items: items.map((item)=>{
        return {logo:"#", name:item}
      })
    }
    let data = isVeg ?  await database.collection('tarrifs').updateOne({cat: 'veg'}, { $push: { details: objToPush } }) : await database.collection('tarrifs').updateOne({cat:'non veg'}, { $push: { details: objToPush } })
  }catch(err){
    return {
      status: false,
      reason: "Error While Fetching Admin Tarrif\n Detailed Error = " + err.message
    }
  }
}

async function getAdminTarrif(database) {
  try {
    let data = await database.collection("tarrifs").find({}).toArray();
    data[0].details = data[0].details.map((d) => {
      d.isVeg = true;
      return d;
    })
    data[1].details = data[1].details.map((d) => {
      d.isVeg = false;
      return d;
    })
    return {
      status: true,
      content: [...data[0].details, ...data[1].details]
    }
  } catch (err) {
    return {
      status: false,
      reason: "Error While Fetching Admin Tarrif\n Detailed Error = " + err.message
    }
  }
}

async function insertIntoGallery(category, imgs, database) {
    try{
      let ack = await database.collection('gallery').updateOne(
        { cat: category },
        { $addToSet: { imgs: { $each: imgs } } },
        { upsert: true }
      );
      console.log('Gallery = ', ack);
      if(ack.modifiedCount > 0 || ack.acknowledged)
        return {
          status: true,
          content: null
        }
      return {
        status: false,
        reason: 'internal err'
      }
    }catch(err){
      return {
        status: false,
        reason: 'internal err' + err.message
      }
    }
}

async function fetchGallery(database){
  try{
    let ack = await database.collection('gallery').find({}).toArray();
    let dataToSend = {};
    ack.forEach(cat => {
      dataToSend[cat.cat] = cat.imgs
    });
    return {
      status:true,
      content: dataToSend
    }
  }catch(err){
    return {
      status: false,
      reason: "Error While Fetching Admin Tarrif\n Detailed Error = " + err.message
    }
  }
}

async function deleteTarrif(name, isVeg, database){
  try{
    let ack = await database.collection('tarrifs').updateOne(
      { _id: isVeg ? new ObjectId("6805112b7d7c4a53e4b8b34b"): new ObjectId("6805112b7d7c4a53e4b8b34c") }, 
      {
        $pull: {
          details: { name: name } 
        }
      }
    )
    return ack.modifiedCount == 1 ? {status:true, content:null}:{status:false, reason:"Item Not Found"}
  }catch(err){
    return {status:false, reason:"Item Not Found" + err.message}
  }
}

async function deleteImg(group, link, database){
  try{
    let ack = await database.collection('gallery').updateOne({cat:group}, {
      $pull:{
        imgs: link
      }
    });
    return ack.modifiedCount == 1 ? {status:true, content:null}:{status:false, reason:"Item Not Found"}
  }catch(err){
    return {status:false, reason:"Item Not Found" + err.message}
  }
}