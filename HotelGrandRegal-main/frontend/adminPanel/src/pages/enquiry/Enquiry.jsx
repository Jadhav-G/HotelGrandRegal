import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import style from './Enquiry.module.css';
import fetchData from '../../../utils/fetcher';

export default function Enquiry() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelected] = useState('all');
    const navigate = useNavigate();
    const refresh = async()=>{
        let responce = await fetchData('enquiryData', 'GET');
        console.log("enquiryData data Fetched = ", responce);
        if (responce.status){
            setData(responce.content);
        }   
        else{
            alert("Failed To Fetch Live Data with Error = " + responce.reason);
            navigate('/login');
        }
    }
    const handleReply = async(mail)=>{
        let answer = prompt("Plese Write Your Reply Here");
        if(!answer || answer == '') return;
        let responce = await fetchData('replyEnquiry', 'POST', { mailId: mail, reply: answer })
        if(responce.status){
            alert("Replied " + mail + " Successfully");
            refresh();
        }else{
            alert("Opps! operation Failed with error - " + responce.reason)
        }
    }
    const handleDelete = async(id)=>{
        let responce = await fetchData('deleteEnquiry', 'POST', { id: id })
        if(responce.status){
            alert("Data Modified Successfully");
            refresh();
        }else{
            alert("Opps! operation Failed with error - " + responce.reason)
        }
    }

    const getRows = ()=>{
        console.log("here", data);
        let rowData = data.filter((allReview) => (allReview.category == selectedCategory || selectedCategory == 'all')).map((enquiry, index) =>
            <tr className={style.tr}>
                <td>{index+1}</td>
                <td className={style.name}>{enquiry.fname} {enquiry.lname}</td>
                <td className={style.contact}>{enquiry.mobile}</td>
                <td>{enquiry.reason}</td>
                <td className={style.review}>{enquiry.message}</td>
                <td>
                    <div className={style.action}>
                        <button onClick={()=>handleDelete(enquiry._id)}>Delete</button>
                        <button onClick={()=>handleReply(enquiry.email)}>Reply</button>
                    </div>
                </td>
            </tr>
        )
        return rowData.length >0 ? rowData : <tr><td colSpan={8}>No Record Found</td></tr>
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
                    <h1>Customer Enquiries</h1>
                    <select name="" id="" onChange={(e) => { setSelected(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="unread">Unread</option>
                        <option value="replied">Replied</option>
                        <option value="read">Read</option>
                    </select>
                </div>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Mobile No</th>
                            <th>Reason</th>
                            <th>Message</th>
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