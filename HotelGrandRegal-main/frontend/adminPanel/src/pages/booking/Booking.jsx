import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Booking.module.css';
import expand from './Expand.module.css';
import fetchData from '../../../utils/fetcher';
import { popup } from '../../components/popup/popup';

export default function Booking() {
    let formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }
    console.log("booking here")
    const [data, setData] = useState([[], []]);
    const [selectedCategory, setSelected] = useState("0");
    const navigate = useNavigate();
    const refresh = async () => {
        let responce = await fetchData('bookingData', 'GET');
        console.log("Booking data Fetched = ", responce);
        if (responce.status) {
            setData(responce.content);
        }
        else {
            alert("Failed To Fetch Live Data with Error = " + responce.reason)
            navigate('/login')
        }
    }
    const handleAccept = async (reviewId, email, type) => {
        console.log("Function Called", reviewId)
        let responce = await fetchData('acceptBooking', 'POST', { id: reviewId, email: email, type: type })
        if (responce.status) {
            alert("Request Accepted Successfully");
            refresh();
        } else {
            alert("Opps! operation Failed with error - " + responce.reason)
        }
    }
    const handleDecline = async (reviewId, email, type) => {
        console.log("Function Called")
        let responce = await fetchData('declineBooking', 'POST', { id: reviewId, email: email, type: type })
        if (responce.status) {
            alert("Request Declined Successfully");
            refresh();
        } else {
            alert("Opps! operation Failed with error - " + responce.reason)
        }
    }
    const handleExpand = (data) => {
        let RoomBooking = () => {
            // a = { "name": "Rushikesh Phalle", "mobile": "8421086416", "finalCost": 6272, "status": "declined", "email": "rushikeshgphalle@gmail.com", "guestName": [], "services": [] }
            console.log(data);
            return (
                <div className={expand.container}>
                    <h1>{data.roomName}</h1>
                    <hr />
                    <div className={expand.superHolder}>
                        <h2>User Details</h2>
                        <div className={expand.holder}>
                            <div className={expand.infoCase}>
                                <h3>Name</h3>
                                <span>{data.name}</span>
                            </div>
                            <div className={expand.infoCase}>
                                <h3>Mobile</h3>
                                <span>{data.mobile}</span>
                            </div>
                        </div>
                        <h2>Guest Details</h2>
                        <div className={expand.holder}>
                            {
                                data.guestName.length > 0 ? <div>
                                    <table className={expand.table}>
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <th>Adult/ Child</th>
                                            </tr>
                                            {
                                                data.guestName.map((guest) => 
                                                    <tr>
                                                        <td>{guest.name}</td>
                                                        <td>{guest.isChild ? 'Child' : 'Adult'}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div> : <div>No Other Guest Added</div>
                            }
                        </div>
                        <h2>Booking Dates</h2>
                        <div className={expand.holder}>
                            <div className={expand.infoCase}>
                                <h3>Check In</h3>
                                <span>{formatDate(data.checkIn)} {data.checkInT}</span>
                            </div>
                            <div className={expand.infoCase}>
                                <h3>Check Out</h3>
                                <span>{formatDate(data.checkOut)} {data.checkOutT}</span>
                            </div>
                        </div>
                        <h2>Extra Request</h2>
                        <div className={expand.holder} style={{display:"block"}}>
                            {
                                data.msg || data.services.length > 0 ? <>
                                    {data.msg ? <textarea style={{width:"100%"}}readOnly value={data.msg} name="" id=""></textarea> : ''}
                                    <div>
                                        {
                                            data.services.map((service) =>
                                                <span>{service}</span>
                                            )
                                        }
                                    </div></> : <div>Nothing Included</div>
                            }
                        </div>
                    </div>
                    <hr />
                    <h3>Bill Amount = Rs {data.finalCost} </h3>
                </div>
            );
        }
        popup(RoomBooking, {});
    }

    const getRows = () => {
        console.log("data ", data);
        let rowData = data[parseInt(selectedCategory)].map((bookingRecord, index) =>
            <tr className={style.tr}>
                <td>{index + 1}</td>
                <td className={style.name}>{bookingRecord.fname} {bookingRecord.lname}</td>
                <td className={style.contact}>{bookingRecord.mobile}</td>
                <td className={style.contact}>{bookingRecord.email}</td>
                <td className={style.review}>{bookingRecord.checkIn ? formatDate(bookingRecord.checkIn) : formatDate(bookingRecord.date)}</td>
                <td className={style.review}>{bookingRecord.time || formatDate(bookingRecord.checkOut)}</td>
                <td className={style.review}>{bookingRecord.status}</td>
                <td>
                    <div className={style.action}>
                        <button onClick={() => handleAccept(bookingRecord._id, bookingRecord.email, selectedCategory)}>Accept</button>
                        <button onClick={() => handleDecline(bookingRecord._id, bookingRecord.email, selectedCategory)}>Decline</button>
                        <button onClick={() => handleExpand(bookingRecord)}>Expand</button>
                    </div>
                </td>
            </tr>
        )
        return rowData.length > 0 ? rowData : <tr><td colSpan={8}>No Record Found</td></tr>
    }
    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 6000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className={style.container}>
            <div>
                <div className={style.header}>
                    <h1>Booking Requests</h1>
                    <select name="" id="" onChange={(e) => { setSelected(e.target.value) }}>
                        <option value="0">Rooms</option>
                        <option value="1">Banquet</option>
                    </select>
                </div>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Mobile No</th>
                            <th>Email</th>
                            <th>{selectedCategory == '0' ? 'Check In' : 'Check In'}</th>
                            <th>{selectedCategory == '0' ? 'Check Out' : 'Time'}</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            getRows()
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}