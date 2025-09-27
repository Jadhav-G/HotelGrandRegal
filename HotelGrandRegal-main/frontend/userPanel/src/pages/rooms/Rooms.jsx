import SlideShow from "../../components/slideShowCont/SlideShowCont";
import Popup from "../../components/popup/Popup";

import { roomData } from '../../utils/StaticDataFetcher';
import brokerLogo from './assets/broker.png';
import selfLogo from './assets/broker.png';
import fetchData from '../../utils/fetcher';

import roomCatelog from './roomCatelog.module.css';
import roomInfo from './roomInfo.module.css';
import book from './book.module.css'
import { useEffect, useState } from "react";

function RoomCatelog({ content, onView }) {
  console.log("this is content=  ", content[0]);
  const Features = ({ ammenities }) => {
    console.log("amminiies =", ammenities)
    return (
      <div className={roomCatelog.featureBox}>
        {
          ammenities.slice(0, 5).map((feature) =>
            <div className={roomCatelog.feature}>
              <img src={feature.logo} alt="" />
              <h4>{feature.name}</h4>
            </div>
          )
        }
      </div>
    );
  }
  return (
    <div className={roomCatelog.container}>
      {
        content.map((roomInfoData, index) =>
          <div className={roomCatelog.roomBox} onClick={() => { onView(roomInfoData._id, index) }}>
            <img className={roomCatelog.thumbnail} src={roomInfoData.gallery[0]} alt="" />
            <h2 className={roomCatelog.name}>{roomInfoData.name}</h2>
            <p className={roomCatelog.desc}>{roomInfoData.briefInfo}</p>
            <Features ammenities={roomInfoData.ammenities} />
            <div className={roomCatelog.priceBox}>
              <span className={roomCatelog.price}>
                &#8377;&nbsp;<span>{roomInfoData.price}</span>&nbsp;/&nbsp;night
              </span>
              <hr />
            </div>
          </div>
        )
      }
    </div>
  );
}

function RoomInfo({ info, onExit }) {
  const [bookPopUp, setPopup] = useState(false);
  const Header = ({ title }) => {
    return (
      <span className={roomInfo.header}>
        <h3>{title}</h3>
        <hr />
      </span>
    )
  }
  return (
    <div className={roomInfo.container}>
      <button className={roomInfo.exit} onClick={onExit}>
        &times;
      </button>
      {bookPopUp ? <Popup component={() => { return bookPopUp }} onClose={() => { setPopup(null) }} /> : ""}
      <div className={roomInfo.tContainer}>
        <img src={info.thumbnail} alt="" />
        <h1>{info.name}</h1>
      </div>
      <Header title="Overview" />
      <p className={roomInfo.desc}>{info.overview}</p>
      <Header title="Gallery" />
      <div className={roomInfo.galleryBox}>
        {
          info.gallery.map((img) =>
            <img src={img} />
          )
        }
      </div>
      <Header title="Amenities" />
      <div className={roomInfo.aminityBox}>
        {
          info.ammenities.map((aminity) =>
            <span>
              <img className={roomInfo.whiteImage} src={aminity.logo} alt="" />
              {aminity.name}
            </span>
          )
        }
      </div>
      <Header title="Rules" />
      <div className={roomInfo.holder}>
        <div className={roomInfo.ruleBox}>
          {
            info.rules.map((rule) =>
              <span>
                <img className={roomInfo.whiteImage} src={rule.logo} alt="" />
                {rule.name}
              </span>
            )
          }
        </div>
        <button onClick={() => { setPopup(<BookRoomStep1 brokerLink={roomInfo.broker} onBookRequest={() => { setPopup(<BookRoomStep2 limitData={{ name: info.name, price: info.price, adult: 2, child: 0, extra: info.extraFeatures }} />) }} />) }}>Book Now</button>
      </div>
    </div>
  );
}

function BookRoomStep1({ brokerLink, onBookRequest }) {
  return (
    <div className={book.container}>
      <h3>Book Room With</h3>
      <div className={book.holder}>
        <a target='_blank' href={brokerLink || "https://www.makemytrip.com/hotels/grand_regal-details-uran_islampur.html"}>
          <span>
            <img src={brokerLogo} alt="" />
            <ul>
              <li>Instant Booking</li>
              <li>May charge Brokerage</li>
            </ul>
          </span>
        </a>
        <span onClick={onBookRequest}>
          <img src={selfLogo} alt="" />
          <ul>
            <li>Manual Interaction</li>
            <li>No Brockerage</li>
          </ul>
        </span>
      </div>

    </div>
  )
}

function BookRoomStep2({ limitData }) {
  let currentDate = new Date();
  let tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  let checkInValue = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  let checkOutValue = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
  // const limitData = getLimits(id);
  const [popUp, setPopup] = useState(null);
  const [checkIn, setCheckIn] = useState(checkInValue);
  const [checkOut, setCheckOut] = useState(checkOutValue);
  const [checkInT, setCheckInT] = useState("20:00");
  const [checkOutT, setCheckOutT] = useState("11:00");
  const [fname, setfname] = useState(null);
  const [lname, setlname] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);
  const [guests, setGuests] = useState([]);
  const [services, setServices] = useState([]);
  const [msg, setMsg] = useState(null);
  const [verification, setVerification] = useState(null);

  const handleAddGuest = () => {
    const NewGuest = ({ onAddRequest }) => {
      const [err, setErr] = useState(false);
      const [guestDetails, setGuestDetails] = useState({ fname: null, lname: null, isChild: false });
      const handleClick = () => {
        setErr(false);
        if (guestDetails.fname && guestDetails.lname)
          setTimeout(() => onAddRequest(guestDetails), 0);
        else
          setErr(true);
      }
      return (
        <div className={book.guestAddBox}>
          <input type="text" placeholder="First Name" onChange={(e) => { setGuestDetails((preName) => { preName.fname = e.target.value; return preName }) }} />
          <input type="text" placeholder="Last Name" onChange={(e) => { setGuestDetails((preName) => { preName.lname = e.target.value; return preName }) }} />
          <span>
            <input type="checkbox" name="" id="isChild" onChange={(e) => { setGuestDetails((preName) => { preName.isChild = e.target.checked; return preName }) }} />
            <label htmlFor="isChild"> Age Smaller than 12 ?</label>
          </span>
          {err ? <span>Please Fill All Madentory Details</span> : ""}
          <button onClick={handleClick}>Add Guest</button>
        </div>
      )
    };
    const handleNewGuest = (data = {}) => {
      setGuests(preGuests => {
        setPopup(null);
        return [...preGuests, data]
      })
    }
    setPopup(<NewGuest onAddRequest={handleNewGuest} />);
  }

  const handleNext = () => {
    let formJSON = {
      roomName: limitData.name,
      checkIn: checkIn + " " + checkInT,
      checkOut: checkOut + " " + checkOutT,
      fName: fname,
      lName: lname,
      mobile: mobile,
      email: email,
      guest: guests,
      services: services,
      msg: msg
    }
    if (!(formJSON.fName && formJSON.lName)) {
      setVerification("Please Enter Your First/ Last Name");
      return;
    }
    if (!/^[6789]\d{9}$/.test(formJSON.mobile)) {
      setVerification("Please Enter Valid Mobile Number");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formJSON.email)) {
      setVerification("Please Enter Valid Email Id");
      return;
    }
    console.log("Services=", typeof (checkIn));
    setPopup(<FinalReview roomName={formJSON.roomName} formData={formJSON} rate={limitData.price} nightCount={1 + (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000} services={formJSON.services} />);
  }

  const handleCnfrmBook = async (data, finalAmount) => {
    setPopup(<h3 style={{ width: "260px", padding: "0px 30px", textAlign: "center", paddingBottom: "20px" }}>Sending Booking Request... <br />Please Wait</h3>)
    /*send Booking request */
    data.cost = finalAmount;
    const bookingConfirmation = await fetchData('bookRoom', 'POST', data);
    let popupContent = !bookingConfirmation.status ?
      <div style={{ width: "280px", padding: "0px 20px", paddingBottom: "20px", marginTop: "-15px" }}>
        <h3>Booking Request Failed !</h3>
        <p style={{ textAlign: "center", color: "red" }}>Reason : {bookingConfirmation.reason}</p>
      </div> :
      <div style={{ width: "260px", padding: "10px 20px", marginTop: "-20px" }}>
        <h3>Booking Request Sent !</h3>
        <p style={{ textAlign: "center", color: "red" }}>Note : Your Booking is not confirmed yet, Our end will confirm booking and will let you now within hour</p>
      </div>
    setTimeout(() => {
      setPopup(popupContent);
    }, 1000);
  }

  const InnerPopup = ({ component, onClose }) => {
    return (
      <div className={book.innerPopup}>
        <div className={book.innerPopupHolder}>
          <button className={book.closeButton} onClick={onClose}>
            &times;
          </button>
          <div className={book.compHolder}>
            {component}
          </div>
        </div>
      </div>
    );
  }

  const Header = ({ no, title }) => {
    return (
      <h4 className={book.header}>{title}<hr /></h4>
    );
  }

  const FinalReview = (props) => {
    let cost = props.rate * props.nightCount;
    props.services.forEach(service => {
      cost += (service.rate * props.nightCount)
    });
    return (
      <div className={book.billHolder}>
        <h2>Bill Preview</h2>
        <hr />
        <table className={book.billTable}>
          <tbody>
            <tr>
              <td className={book.billHeader} colSpan={3}>Base Cost</td>
            </tr>
            <tr className={book.billValueHeader}>
              <td>{props.roomName}</td>
              <td>{props.rate}x {props.nightCount} night(s)</td>
              <td>&#8377;{props.rate * props.nightCount}</td>
            </tr>
            <tr>
              <td className={book.billHeader} colSpan={3}>Extra Services Charge</td>
            </tr>
            {
              props.services.map((service) =>
                <tr className={book.billValueHeader}>
                  <td>{service.label}</td>
                  <td>{service.rate}x {props.nightCount} night(s)</td>
                  <td>&#8377;{service.rate * props.nightCount}</td>
                </tr>
              )
            }
            <tr>
              <td className={book.billHeader} colSpan={3}>Total Cost</td>
            </tr>
            <tr className={book.billValueHeader}>
              <td colSpan={2}>Cost Without Tax</td>
              <td>&#8377;{cost}</td>
            </tr>
          </tbody>
        </table>
        <table className={book.finalAmountTable}>
          <tbody>
            <tr>
              <td className={book.billHeader} colSpan={3}>Total Cost (with tax)</td>
            </tr>
            <tr className={`${book.billValueHeader} ${book.finalAmount}`}>
              <td>Total</td>
              <td>12% GST</td>
              <td>&#8377;{Math.floor(cost / 100 * 112)}</td>
            </tr>
          </tbody>
        </table>
        <button className={book.cnfrmBtn} onClick={() => { handleCnfrmBook(props.formData, cost / 100 * 112) }}>Book Request</button>
      </div>
    );
  }

  return (
    <div className={book.container2}>
      {popUp ? <InnerPopup component={popUp} onClose={() => setPopup(null)} /> : ""}
      <div className={book.section}>
        <Header no="1" title="Visit Dates" />
        <div className={book.inputBox1}>
          <label htmlFor="">Check In</label>
          <input type="date" value={checkIn} min={checkIn} onChange={(e) => { setCheckIn(e.target.value) }} />
          <input type="time" value={checkInT} onChange={(e) => { setCheckInT(e.target.value) }} />
        </div>
        <div className={book.inputBox1}>
          <label htmlFor="">Check Out</label>
          <input type="date" value={checkOut} min={checkOut} onChange={(e) => { setCheckOut(e.target.value) }} />
          <input type="time" value={checkOutT} onChange={(e) => { setCheckOutT(e.target.value) }} />
        </div>
      </div>
      <div className={book.section}>
        <Header no="2" title="Basic Details" />
        <div className={book.name}>
          <select name="" id="">
            <option value="mr">Mr</option>
            <option value="ms">Ms</option>
            <option value="mrs">Mrs</option>
          </select>
          <input type="text" name="" id="" placeholder="First Name" onChange={(e) => { setfname(e.target.value) }} />
          <input type="text" name="" id="" placeholder="Last Name" onChange={(e) => { setlname(e.target.value) }} />
        </div>
        <div className={book.contact}>
          <input type="tel" name="" id="" placeholder="Mobile Number" onChange={(e) => { setMobile(e.target.value) }} />
          <input type="email" name="" id="" placeholder="Email (Optional)" onChange={(e) => { setEmail(e.target.value) }} />
        </div>
      </div>
      <div className={book.section}>
        <Header no="3" title="Guest Details" />
        <div className={book.guestListBox}>
          <table className={book.guestList}>
            {
              guests.length > 0 ? guests.map((guest, index) =>
                <tr className={book.guestRow}>
                  <td>{index + 1}</td>
                  <td>{guest.fname}</td>
                  <td>{guest.lname}</td>
                  <td>{guest.isChild ? "Child" : "Adult"}</td>
                  <td className={book.bin} onClick={() => { setGuests((preGuests) => ([...preGuests.slice(0, index), ...preGuests.slice(index + 1)])) }}>&#128465;</td>
                </tr>
              ) : <tr><td style={{ fontStyle: "italic" }}>No Guest Added</td></tr>
            }
          </table>
          {guests.length < (limitData.adult + limitData.child) ? <button className={book.addGuestBtn} onClick={handleAddGuest}>Add Guest</button> : ""}
        </div>
      </div>
      <div className={book.section}>
        <Header no="4" title="Aditional Services" />
        <div className={book.extraBox}>
          {
            limitData.extra.map((item, index) =>
              <span className={book.extraItem}>
                <input type="checkbox" name={item.name} id={item.name + index} onChange={(e) => { setServices((prev) => { let newState = [...prev]; e.target.checked ? newState.push({ label: e.target.name, rate: item.rate }) : ""; return newState }) }} />
                <label htmlFor={item.name + index}><img src={item.logo} alt="" />{item.name}</label>
              </span>
            )
          }
        </div>
        <label className={book.specificationLabel} htmlFor="specification">Please Specify how we can make your experience awesome</label>
        <textarea className={book.textarea} name="" id="specification" rows={5} onChange={(e) => { setMsg(e.target.value) }}></textarea>
      </div>
      {
        verification ? <span style={{ color: "red" }}>{verification}</span> : ""
      }
      <button className={book.nextBtn} onClick={handleNext}>Next</button>
    </div>
  );
}

export default function Rooms() {
  const [roomInfo, setRoomInfo] = useState(null);
  const [roomList, setRoomList] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [roomInfo]);
  useEffect(() => {
    console.log("here to fetch data");
    const getData = async () => {
      let data = await fetchData('getRoomList', 'GET');
      if (data.status) {
        setRoomList(data.content);
      } else {
        alert("something Went Wrong = ", data.reason.message);
        console.log("fetchedData", data.reason)
      }
    }
    getData();
  }, []);

  const handleViewRoom = async (roomId, roomIndex) => {
    // // let fetchedInfo = await fetchData('getRoomInfo', 'POST', {id: roomId});
    // if(!fetchData.status){
    //   alert("Something Went Wrong! Please Try Refreshing the page");
    //   return;
    // }
    let roomInfoData = {
      index: roomIndex,
      _id: roomId,
      thumbnail: roomList[roomIndex].gallery[0],
      name: roomList[roomIndex].name,
      overview: roomList[roomIndex].detailedInfo,
      gallery: roomList[roomIndex].gallery,
      ammenities: roomList[roomIndex].ammenities,
      rules: roomList[roomIndex].rules,
      price: roomList[roomIndex].price,
      broker: roomList[roomIndex].broker,
      extraFeatures: roomList[roomIndex].extraFeatures
    };

    setRoomInfo(roomInfoData);
  };

  return (
    roomInfo ?
      <RoomInfo info={roomInfo} onExit={() => { setRoomInfo(null) }} /> :
      <div>
        <SlideShow gallery={roomData.slideShow.gallery} content={roomData.slideShow.body} />
        <h1 style={{ textAlign: "center", margin: "80px 80px -40px 80px", color: "white", textShadow: "0px 0px 5px black", fontSize: "clamp(20px, 5vw ,30px)" }}>We Have comfortable Rooms<br />< hr style={{ width: "clamp(150px, 40%, 300px)", margin: "10px auto" }} /></h1>
        {roomList ? <RoomCatelog content={roomList} onView={handleViewRoom} /> : ''}
      </div>
  );
}
