import { useEffect, useState } from 'react';
import style from './Dashboard.module.css';
// import apiURL from '../../src/utils/api';
const apiURL = import.meta.env.VITE_SERVER_URL;
import { useNavigate } from 'react-router-dom';

function convertToHeaderValueFormat(enumStatsArray) {
    return enumStatsArray.map(enumObj =>
        Object.entries(enumObj).map(([key, value]) => ({
            header: capitalizeFirstLetter(key),
            value: value
        }))
    );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function Dashboard() {
    const navigate = useNavigate()
    const [data, setData] = useState([
        [{ header: "Pending", value: 0 }, { header: "Accepted", value: 0 }, { header: "Active", value: 0 }],
        [{ header: "Pending", value: 0 }, { header: "Accepted", value: 0 }, { header: "Active", value: 0 }],
        [{ header: "Unread", value: 0 }, { header: "Accepted", value: 0 }, { header: "Hidden", value: 0 }],
        [{ header: "Unread", value: 0 }, { header: "Replied", value: 0 }, { header: "Not Replied", value: 0 }]
    ]);
    useEffect(() => {
        const fetchData = () => fetch(apiURL + 'dashboard', {
            method: 'GET',
            credentials: 'include'
        }).
            then(response => response.json()).
            then(data => {
                if (data.status) {
                    setData(convertToHeaderValueFormat(data.content));
                }
                else
                    navigate('/login')
            }).
            catch(error => {
                console.error('Error:', error);
            });
        fetchData();
        const interval = setInterval(fetchData, 6000);
        return () => clearInterval(interval);
    }, []);

    const DashCard = ({ title, content }) => {
        return (
            <div className={`${style.dashcard} ${content[0].value != 0 ? style.animateDash : ''}`}>
                <h2>{title}</h2>
                <div className={style.contentHolder}>
                    {
                        content.map((item) =>
                            <div className={style.content}>
                                <span>{item.value}</span>
                                <h3>{item.header}</h3>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
    return (
        <div className={style.container}>
            <h1 className={style.header}>
                Live Status
            </h1>
            <hr />
            <div className={style.dashPoints}>
                <DashCard title="Room Bookings" content={data[0]} />
                <DashCard title="Banquet Bookings" content={data[1]} />
                <DashCard title="Enquiries" content={data[2]} />
                <DashCard title="Feedbacks" content={data[3]} />
            </div>
        </div>
    );
};