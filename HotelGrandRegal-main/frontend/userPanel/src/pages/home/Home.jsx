/*  Inbuild Module import  */
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

/* Data Fetcher Import */
import { homeData, global } from '../../utils/StaticDataFetcher';
import { getRatings } from '../../utils/DynamicDataFetcher';

import fetchData from '../../utils/fetcher';

import StarBox from "../../components/startbox/StarBox.jsx";

/* CSS Modules*/
import headCard from './headCard.module.css';
import showCase from './showCase.module.css';
import featureCard from './featureCard.module.css';
import facilityCard from './facilityCard.module.css';
import map from './map.module.css'
import reviewCard from './reviewCard.module.css';

/* Image Import */
import arrow from './assets/arrow.png';
import ul1 from './assets/ul1.png';

import '../../assets/styles/fonts.css';
import Frame from '../../components/frame/Frame';
import arrow1 from './assets/arrow1.svg';
import Animator from "../../components/animator/Animator";
import tick from './assets/check.png'
import full from './assets/full.png';
import half from './assets/half.png';
import empty from './assets/empty.png';

import apiURL from '../../utils/api.js';


function HeadCard({ img, slogan }) {
    var timer = null;
    const scrollDown = (e) => {
        clearTimeout(timer);
        if (e) e.preventDefault();
        window.scrollBy({
            top: window.innerHeight + 25,
            left: 0,
            behavior: "smooth"
        });
    }
    // timer = setTimeout(scrollDown, 5000);
    return (
        <div className={headCard.container}>
            <img src={img} alt="" className={headCard.headImg} />
            <div className={headCard.brandDetails}>
                <h2>Grand</h2>
                <h1>Regal</h1>
                <h4>{slogan}</h4>
                <a onClick={(e) => { scrollDown(e) }}>
                    <hr />
                    <img src={arrow} alt="" />
                </a>
            </div>
        </div>
    );
}

function ShowCase({ content, underline }) {
    const [isRotating, setIsRotating] = useState(false);
    const [imgAdr, setImgAdr] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setIsRotating(true);
            setTimeout(() => {
                setImgAdr(prev => {
                    const newIndex = (prev + 1) % content.length;
                    return newIndex;
                });
            }, 250);
            setTimeout(() => {
                setIsRotating(false);
            }, 1200);
        }, 5000);
        return () => clearInterval(timer);
    }, [content.length]);
    const Label = () => {
        return (
            <div className={showCase.label}>
                <h2 className={showCase.titlePt1}>OUR</h2>
                <h2 className={showCase.titlePt2}>Amminities</h2>
                <img src={underline} alt="" />
            </div>
        );
    }
    return (
        <div className={showCase.container}>
            <div className={`${showCase.frame} ${isRotating ? showCase.rotate3D : ""}`}>
                <img className={showCase.img} src={content[imgAdr].img} alt="" />
            </div>
            <div className={showCase.labelBox}>
                <Label />
            </div>
            <div className={showCase.island}>
                <h3>{content[imgAdr].title}</h3>
                <p>{content[imgAdr].body}</p>
            </div>
        </div>

    );
}

function FeatureCard({ content, isInvert = false, route }) {
    const navigate = useNavigate();
    const alignment = {
        "--grid": isInvert ? "auto auto 20px/ auto max-content 60px" : "auto auto 20px / 60px max-content auto",
        "--mob-grid": isInvert ? "100px auto auto/ 50px clamp(150px, 60vw, 400px) 50px" : "100px auto auto / 50px clamp(150px, 60vw, 400px) 50px",
        "--containt-area": isInvert ? "2/1/3/2" : "2/3/3/4",
        "--title-area": isInvert ? "2/3/3/4" : "2/1/3/2",
        "--angle": isInvert ? "180deg" : "0deg",
        "--mode": isInvert ? "vertical-rl" : "vertical-lr"
    }
    return (
        <div className={featureCard.container} style={alignment}>
            <h3 className={featureCard.title}>{content.title}</h3>
            <div className={featureCard.box}></div>
            <div className={featureCard.content}>
                <h3>{content.slogan}</h3>
                <p>{content.body}</p>
                <button className={featureCard.featureBtn} onClick={() => { navigate(route) }}>Know More <img src={arrow1} alt="" /></button>
                <div className={featureCard.div}>
                    <span>
                        <img src={content.features[0].img} alt="" />
                        <h6>{content.features[0].label}</h6>
                    </span>
                    <span>
                        <img src={content.features[1].img} alt="" />
                        <h6>{content.features[1].label}</h6>
                    </span>
                    <span>
                        <img src={content.features[2].img} alt="" />
                        <h6>{content.features[2].label}</h6>
                    </span>
                    <span>
                        <img src={content.features[3].img} alt="" />
                        <h6>{content.features[3].label}</h6>
                    </span>
                </div>
            </div>
            <div className={featureCard.frame}>
                <Frame img={content.img} isInvert={!isInvert} />
            </div>
        </div>
    );
}

function FacilitiesCard({ facilities }) {
    return (
        <div className={facilityCard.container}>
            <h2>Facilities</h2>
            <ul>
                {facilities.map((item, index) => (
                    <li key={index}>
                        <img src={tick} alt="tick icon" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
function Map(props) {
    return (
        <div className={map.container}>
            <iframe
                className={map.mapBox}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.539804686025!2d74.2528906742846!3d17.046228612545356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1c1d4e3a71047%3A0x2f476f0ce7761473!2sGrand%20Regal!5e0!3m2!1sen!2sin!4v1741021812475!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            <div className={map.holder}>
                <p className={map.address}>
                    88/7B/2A, NEAR EAGLE WAY BRIDGE, KOLHAPUR ROAD, ISLAMPUR, Sangli-415409, Maharashtra
                </p>
                <div className={map.nearby}>
                    <h4>Nearby Places</h4>
                    <ul>
                        {
                            props.nearbyP.map((place) =>
                                <li><img src={place.logo} alt="" />{place.label}</li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

function ReviewCard({ content }) {

    return (
        <div className={reviewCard.main}>
            <div className={reviewCard.ribbon}>
                <div className={reviewCard.container}>
                    <h2>Review Wall</h2>
                    <h4>Look What Our Customers Are Saying...</h4>
                    <div className={reviewCard.superHolder}>
                        <div className={reviewCard.childholder}>
                            {
                                content.map((review, index) => (
                                    <div className={reviewCard.reviewBox}>
                                        <img className={reviewCard.dp} src={index % 2 == 0 ? "https://res.cloudinary.com/de9mmhibr/image/upload/v1745333623/SmartSelect_20250422_202231_Chrome_sgnphv.png": "https://res.cloudinary.com/de9mmhibr/image/upload/v1745333623/SmartSelect_20250422_202238_Chrome_pkcbnk.png"} alt="" />
                                        <h6>{review.name}</h6>
                                        <p>{review.review}</p>
                                        <StarBox count={review.rating} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Header({ title }) {
    return (
        <div style={{ width: "max-content", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto", marginBottom: "60px" }}>
            <h1 style={{ width: "max-content", color: "white" }}>{title}</h1>
            <img style={{ position: "absolute", width: "130%", marginBottom: "-30px", rotate: "6deg", zIndex: "-1" }} src={ul1} alt="" />
        </div>
    );
}

export default function Home() {
    const [reviews, setReviews] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(()=>{
            fetchData('getReviews', 'GET').then(data=>{
                if(data.status) setReviews(data.content);
            });
        }, 2000)
    }, []);
    return (
        <div>
            <HeadCard img={homeData.headCard.img} slogan={homeData.headCard.slogan} />
            <Animator ComponentToRender={ShowCase} content={homeData.showCaseCard} underline={global.underline1} />
            <Header title="Our Facilities" />
            <Animator ComponentToRender={FeatureCard} direction="right" isInvert={true} content={homeData.featureCard[0]} route="/Dine" />
            <Animator ComponentToRender={FeatureCard} isInvert={false} content={homeData.featureCard[1]} route="/Rooms" />
            <Animator ComponentToRender={FeatureCard} direction="right" isInvert={true} content={homeData.featureCard[2]} route="/Banquet-hall" />
            <FacilitiesCard facilities={homeData.facilities} />
            <Map nearbyP={homeData.mapData} />
            {
                reviews ? <ReviewCard content={reviews} /> : <></>
            }
        </div>
    );
}   