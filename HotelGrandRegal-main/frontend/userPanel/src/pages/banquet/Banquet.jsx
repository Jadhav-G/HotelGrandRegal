import SlideShow from "../../components/slideShowCont/SlideShowCont";
import BlogCard from "../../components/blogCard/BlogCard";

import { banquetData } from "../../utils/StaticDataFetcher";

import blog from './blog.module.css';
import tarrifBox from './tarrifBox.module.css';
import { useEffect, useState } from "react";

import menuStyle from './menuStyle.module.css';
import formStyle from './formStyle.module.css';
import billBox from './billBox.module.css';

import Popup from '../../components/popup/Popup';

import fetchData from '../../utils/fetcher';
import  {popup}  from "../../components/popup2/popup";

function TarrifBox({ tarrif }) {
    const [banquetMenu, setBanquetMenu] = useState(null);
    useEffect(() => {
        let fetchTarrif = async () => {
            let data = await fetchData('getBanquetMenu', 'GET');
            if (data.status) {
                setBanquetMenu(data.content);
            } else {
                alert("error" + data.reason);
            }
        }
        fetchTarrif();
    }, []);

    const [slided, setSlided] = useState(true);
    const [menuShown, setMenuShown] = useState(null);

    const Menu = ({ menu }) => {
        const [selectedCat, setSelectedCat] = useState(0);
        return (
            <div className={menuStyle.container}>
                <ul className={menuStyle.catHolder}>
                    {
                        menu.details.map((item, index) =>
                            <li className={selectedCat == index ? menuStyle.selected : ""} onClick={() => setSelectedCat(index)}>{item.cat}</li>
                        )
                    }
                </ul>
                <div className={menuStyle.menuBox}>
                    <img src={menu.details[selectedCat].thumb} alt="" />
                    <ul>
                        {
                            menu.details[selectedCat].items.map((item) =>
                                <li>
                                    {item}
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }

    const TarrifView = ({ plan, list, price }) => {
        return (
            <div style={{ height: "max-content", width: "max-content", display: "flex", alignItems: "center" }}>
                <div className={`${tarrifBox.menuHolder} ${menuShown == null ? " " : menuShown ? tarrifBox.show : tarrifBox.hide}`}>
                    <button className={tarrifBox.showBtn} onClick={() => setMenuShown(true)}>View Menu</button>
                    <div className={tarrifBox.menuBox}>
                        <button className={tarrifBox.hideBtn} onClick={() => setMenuShown(false)}>Hide Menu</button>
                        <div className={tarrifBox.content}>
                            {banquetMenu ? <Menu menu={slided ? banquetMenu[0] : banquetMenu[1]} /> : ''}
                        </div>
                    </div>
                </div>
                <div className={tarrifBox.tarrifView}>
                    <h3 className={tarrifBox.header}>
                        {plan}
                    </h3>
                    <h4 className={tarrifBox.price}>Rs{price} + GST</h4>
                    <div className={tarrifBox.inclutionBox}>
                        {
                            list.map((item) =>
                                <div className={tarrifBox.inclution}>
                                    <div></div>
                                    <label htmlFor="">{item.name}</label>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={tarrifBox.container}>
            <button className={tarrifBox.controller} onClick={() => { setSlided((pre) => !pre); setMenuShown(null) }}>
                <span style={{ color: slided ? "#0c0000" : "white" }}>Veg</span>
                <span style={{ color: slided ? "white" : "#0c0000" }}>Non Veg</span>
                <div className={`${tarrifBox.slider} ${slided ? tarrifBox.right : tarrifBox.left}`}></div>
            </button>
            <div className={tarrifBox.tarrifList}>
                {
                    slided ?
                        tarrif[0].details.map((plans) =>
                            <TarrifView plan={plans.name} list={plans.items} price={plans.price} />
                        ) :
                        tarrif[1].details.map((plans) =>
                            <TarrifView plan={plans.name} list={plans.items} price={plans.price} />
                        )
                }
            </div>
        </div>
    );
}

function BookingForm({ tarrifDetails, extra, banquetName, price }) {
    // console.log("tarrifdetails=" , tarrifDetails);
    const today = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [count, setCount] = useState(null);
    const [fname, setFname] = useState(null);
    const [lname, setLname] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [email, setEmail] = useState(null);
    const [cat, setCat] = useState('veg');
    const [plan, setPlan] = useState('silver');
    const [services, setServices] = useState([]);
    const [bill, setBill] = useState(null);

    const bookBanquet = async (total) => {
        let ack = await fetchData('bookBanquet', 'POST', { name: banquetName, fname: fname, lname: lname, mobile: mobile, email: email, date: date, time: time, duration: duration, tarrif: cat, plan: plan, guestCount: count, additional: services, userShownCost:total })
        if(ack.status)  alert("Booking Request Send - Note That This Doesn't mean that its confirmed We Will Process Your Request And Will let you know within hour");
        else alert("Booking Request Failed");
    }

    const InnerPopup = ({ component, onClose }) => {
        return (
            <div className={formStyle.innerPopup}>
                <div className={formStyle.innerPopupHolder}>
                    <button className={formStyle.closeButton} onClick={onClose}>
                        &times;
                    </button>
                    <div className={formStyle.compHolder}>
                        {component}
                    </div>
                </div>
            </div>
        );
    }

    const Header = ({ no, title }) => {
        return (
            <h4 className={formStyle.header}>{title}<hr /></h4>
        );
    }

    const handleFormSubmition = (e) => {
        let planCost = cat == 'veg' ? plan == 'silver' ? 500 : plan == 'gold' ? 600 : 700 : plan == 'silver' ? 600 : plan == 'gold' ? 700 : 800;
        let total = planCost * count / 100 * 118 + price / 100 * 118 ;
        for(let i =0; i< services.length; i++){
            total += (services[i].rate / 100 * 118)
        }
        const Bill = () => {
            return (
                <div className={billBox.container}>
                    <table className={billBox.table}>
                        <tbody>
                            <tr className={billBox.header1}>
                                <td colSpan={4}>
                                    Hall Cost
                                </td>
                            </tr>
                            <tr className={billBox.header2}>
                                <td colSpan={4}>{banquetName}</td>
                            </tr>
                            <tr className={billBox.values}>
                                <td>Rs {price}</td>
                                <td>x 1</td>
                                <td>+18% GST</td>
                                <td>Rs {price / 100 * 118}</td>
                            </tr>
                            <tr className={billBox.header1}>
                                <td colSpan={5}>
                                    Catering Cost
                                </td>
                            </tr>
                            <tr className={billBox.header2}>
                                <td colSpan={4}>{cat} {plan} Plan</td>
                            </tr>
                            <tr className={billBox.values}>
                                <td>Rs {planCost}</td>
                                <td>x 100 (guest)</td>
                                <td>+18% GST</td>
                                <td>Rs {planCost * count / 100 * 118}</td>
                            </tr>
                            <tr className={billBox.header1}>
                                <td colSpan={4}>
                                    Extra Services
                                </td>
                            </tr>
                            {
                                services.map((service) => (
                                    <>
                                        <tr className={billBox.header2}>
                                            <td colSpan={4}>{service.label}</td>
                                        </tr>
                                        <tr className={billBox.values}>
                                            <td>Rs {service.rate}</td>
                                            <td>x 1</td>
                                            <td>+18% GST</td>
                                            <td>Rs {service.rate /100*118}</td>
                                        </tr>
                                    </>
                                ))
                            }
                            <tr className={billBox.totalHeader}>
                                <td colSpan={4}>
                                    Total Cost
                                </td>
                            </tr>
                            <tr className={billBox.totalCost}>
                                <td colSpan={3}>Total</td>
                                <td>Rs {total}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button style={{boxShadow:"0px 0px 5px gray", cursor:"pointer", fontWeight:"bolder", padding:"5px 20px", borderRadius:"15px", translate:"-50%", marginLeft:"50%", border:"0px", marginTop:"20px"}} onClick={()=>bookBanquet(total)}>Confirm Booking</button>
                </div>
            )
        }
        e.preventDefault();
        console.log(date, time, duration, count, fname, lname, mobile, email, cat, plan, services);
        // setBill(<Bill />)
        popup(Bill, {});
    }
    return (
        <div className={formStyle.container}>
            {bill ? <InnerPopup component={bill} onClose={() => setBill(null)} /> : ""}
            <form className={formStyle.form} onSubmit={(e) => { handleFormSubmition(e) }}>
                <Header title={"Ceremony Dates"} />
                <div className={formStyle.dates}>
                    <div className={formStyle.date}>
                        <label htmlFor="">Date</label>
                        <input type="date" min={formatDate(today)} max={formatDate(threeMonthsLater)} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className={formStyle.time}>
                        <label htmlFor="">Time</label>
                        <input type="time" onChange={(e) => setTime(e.target.value)} />
                    </div>
                    <div className={formStyle.duration}>
                        <label htmlFor="">Duration</label>
                        <input type="number" min={1} max={4} onChange={(e) => setDuration(e.target.value)} />
                    </div>
                </div>
                <Header title={"Personal Info"} />
                <div className={formStyle.personal}>
                    <div className={formStyle.name}>
                        <select name="" id="">
                            <option value="mr">Mr</option>
                            <option value="ms">Ms</option>
                            <option value="mrs">Mrs</option>
                        </select>
                        <input type="text" required placeholder="First Name" onChange={(e) => setFname(e.target.value)} />
                        <input type="text" required placeholder="Last Name" onChange={(e) => setLname(e.target.value)} />
                    </div>
                    <div className={formStyle.contact}>
                        <input type="tel" required placeholder="Mobile No" onChange={(e) => setMobile(e.target.value)} />
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <Header title={"Select Tarrif"} />
                <div className={formStyle.tarrifBox}>
                    <div className={formStyle.vegBox}>
                        <h4>Select Catering Category</h4>
                        <span>
                            <input type="radio" name="a" id="veg" checked={cat == 'veg'} onChange={(e) => { e.target.checked ? setCat('veg') : setCat('nonveg') }} /><label htmlFor="veg" >Veg</label>
                            <input type="radio" name="a" id="nonveg" checked={cat == 'nonveg'} onChange={(e) => { e.target.checked ? setCat('nonveg') : setCat('veg') }} /><label htmlFor="nonveg" >Non Veg</label>
                        </span>
                    </div>
                    <div className={formStyle.planBox}>
                        <h4>Select Tarrif Plan</h4>
                        <select name="" id="" onChange={(e) => { setPlan(e.target.value) }}>
                            {
                                tarrifDetails[0].map((plan, index) =>
                                    <option value={plan.name}>{plan.name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <Header title={"Guest Info"} />
                <div className={formStyle.guest}>
                    <label htmlFor="">Guest Count</label>
                    <input type="number" min={100} max={250} onChange={(e) => setCount(e.target.value)} />
                </div>
                <Header title={"Additional Services"} />
                <div className={formStyle.extraBox}>
                    {
                        extra.map((item, index) =>
                            <span className={formStyle.extraItem}>
                                <input type="checkbox" name={item.label} id={item.label + index} onChange={(e) => { setServices((prev) => { let newState = [...prev]; e.target.checked ? newState.push({ label: e.target.name, rate: item.charges }) : ""; return newState }) }} />
                                <label htmlFor={item.label + index}><img src={item.logo} alt="" />{item.label}</label>
                            </span>
                        )
                    }
                </div>
                <button className={formStyle.nextBtn} type="submit">Next</button>
            </form>
        </div>
    )
}

export default function () {
    const [banquetList, setBanquetList] = useState(null);
    const [tarrif, setTarrif] = useState(null);
    useEffect(() => {
        let fetchList = async () => {
            let data = await fetchData('getBanquetList', 'GET');
            if (data.status) {
                setBanquetList(data.content);
            } else {
                alert("error" + data.reason);
            }
        }
        let fetchTarrif = async () => {
            let data = await fetchData('getTarrif', 'GET');
            console.log(data);
            if (data.status) {
                setTarrif(data.content);
            } else {
                alert("error" + data.reason);
            }
        }
        fetchList();
        fetchTarrif();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [banquetList]);

    const [popUp, setPopup] = useState(null);
    const [largeImg, setLargeImg] = useState(null);

    const GalleryBox = ({ imgs }) => {
        return (
            <div className={blog.galleryBox}>
                {
                    imgs.map((img) =>
                        <img src={img} alt="" />
                    )
                }
            </div>
        );
    }
    const Blog = ({ content, name }) => {
        return (
            <div className={blog.container}>
                <p className={blog.overview}>
                    {content.overview}
                </p>
                <div className={blog.featureBox}>
                    {
                        content.features.map((feature) =>
                            <div className={blog.feature}>
                                <img src={feature.logo} alt="" />
                                <span>{feature.name}</span>
                            </div>
                        )
                    }
                </div>
                <span className={blog.rate}>Rs <span>{content.price}</span> + Catering Charges</span>
                <div className={blog.buttons}>
                    <button className={blog.btn1} onClick={() => setPopup(<GalleryBox imgs={content.gallery} />)}>View Gallery</button>
                    <button className={blog.btn2} onClick={() => { setPopup(<BookingForm tarrifDetails={[[{ name: "silver" }, { name: "gold" }, { name: "platenium" }]]} extra={[{ label: "mike", logo: "", charges:1000 }, { label: "speaker", logo: "", charges:1000 }]} banquetName={name} price ={content.price}/>) }}>Book Now</button>
                </div>
            </div>
        );
    }
    return (
        <div>
            {popUp ? <Popup component={() => { return popUp }} onClose={() => { setPopup(null) }} /> : ""}
            <SlideShow gallery={banquetData.slideShow.gallery} content={banquetData.slideShow.body} />
            <h1 style={{ textAlign: "center", margin: "80px 80px 20px 80px", color: "white", textShadow: "0px 0px 5px black", fontSize: "clamp(20px, 5vw ,30px)" }}>Celebrate With<br /></h1>
            {banquetList ? <BlogCard img1={banquetList[0].gallery[0]} img2={banquetList[1].gallery[0]} blog1={<Blog content={banquetList[0]} name="Majestic Hall"/>} blog2={<Blog content={banquetList[1]} name="Royal Conference Hall"/>} /> : ''}
            <h1 style={{ textAlign: "center", margin: "80px 80px 20px 80px", color: "white", textShadow: "0px 0px 5px black", fontSize: "clamp(20px, 5vw ,30px)" }}>Our Catering Plans<br /></h1>
            {tarrif ? <TarrifBox tarrif={tarrif} /> : ''}
        </div>
    );
}