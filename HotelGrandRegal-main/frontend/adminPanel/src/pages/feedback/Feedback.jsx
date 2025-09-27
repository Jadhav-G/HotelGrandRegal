import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import style from './Feedback.module.css';
const apiURL = 'http://localhost:3000/api';
import StarBox from '../../components/startbox/StarBox';
import fetchData from '../../../utils/fetcher';

export default function Feedback() {
    const [data, setData] = useState([{ name: "Rushikesh Phalle", contact: "8421086416", category: "shown", rating: 4.5, review: "hey there this is review and adding some more text here" }, { name: "Rushikesh Phalle", contact: "8421086416", category: "hidden", rating: 4.0, review: "hey there this is review and adding some more text here" }]);
    const [selectedCategory, setSelected] = useState('all');
    const navigate = useNavigate();
    const refresh = async()=>{
        let responce = await fetchData('feedbackData', 'GET');
        console.log("Feedback data Fetched = ", responce);
        if (responce.status){
            setData(responce.content.content);
        }   
        else{
            alert("Failed To Fetch Live Data with Error = " + responce.reason)
            navigate('/login')
        }
    }
    const handleShow = async(reviewId)=>{
        console.log("Function Called")
        let responce = await fetchData('setFeedback', 'POST', { id: reviewId, command: 'shown' })
        if(responce.status){
            alert("Data Modified Successfully");
            refresh();
        }else{
            alert("Opps! operation Failed with error - " + responce.reason)
        }
    }
    const handleHide = async(reviewId)=>{
        console.log("Function Called")
        let responce = await fetchData('setFeedback', 'POST', { id: reviewId, command: 'hidden' })
        if(responce.status){
            alert("Data Modified Successfully");
            refresh();
        }else{
            alert("Opps! operation Failed with error - " + responce.reason)
        }
    }
    const handleDelete = async(reviewId)=>{
        let responce = await fetchData('deleteFeedback', 'POST', { id: reviewId })
        if(responce.status){
            alert("Data Modified Successfully");
            refresh();
        }else{
            alert("Opps! operation Failed with error - " + responce.reason)
        }
    }
    const handleReply = (reviewId)=>{
        
    }

    const getRows = ()=>{
        console.log("here", data);
        let rowData = data.filter((allReview) => (allReview.category == selectedCategory || selectedCategory == 'all')).map((review, index) =>
            <tr className={style.tr}>
                <td>{index+1}</td>
                <td className={style.name}>{review.name}</td>
                <td className={style.contact}>{review.contact}</td>
                <td><StarBox count = {review.rating} /></td>
                <td className={style.review}>{review.review}</td>
                <td>
                    <div className={style.action}>
                        <button onClick={()=>{review.category == 'shown' ? handleHide(review._id) : handleShow(review._id)}}>{review.category == 'shown' ? 'Hide' : 'Show'}</button>
                        <button onClick={()=>handleDelete(review._id)}>Delete</button>
                        <button onClick={()=>handleReply(id)}>Reply</button>
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
                    <h1>Customer Feedback</h1>
                    <select name="" id="" onChange={(e) => { setSelected(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="unread">Unread</option>
                        <option value="shown">Shown</option>
                        <option value="hidden">Hidden</option>
                    </select>
                </div>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Mobile No</th>
                            <th>Ratings</th>
                            <th>Review</th>
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