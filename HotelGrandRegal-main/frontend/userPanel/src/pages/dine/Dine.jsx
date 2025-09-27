import { useEffect, useState } from "react";
import style from "./Dine.module.css"
import SlideShow from "../../components/slideShowCont/SlideShowCont";

import { getShefSpecialItems, getMenu } from "../../utils/DynamicDataFetcher";
import { dineData } from "../../utils/StaticDataFetcher";
import fetchData from '../../utils/fetcher';

import img1 from '../../assets/demoImages/1.jpeg';
import img2 from '../../assets/demoImages/2.jpeg';
import img3 from '../../assets/demoImages/3.jpeg';
import img4 from '../../assets/demoImages/4.jpeg';
import img5 from '../../assets/demoImages/5.jpeg';
import ul2 from './assets/ul2.png';

import blog from './blog.module.css';
import shefSpecial from './shefSpecial.module.css';

function MenuCard(props){
    const MenuItemCard = (props)=>{
        return(
          <div className={style.menuCardItem}>
            <img src={props.img} className = {style.dishImg}/>
            <h4 className = {style.dishName}>{props.name}</h4>
            <p className = {style.dishDesc}>{props.description}</p>
            <span className = {style.dishPrice}>&#8377; {props.price} /-</span>
          </div>
        );
    }

    const SubCategoryCard = (props)=>{
        return (
          <div className={style.menuCardCat}>
            <h2 className={style.menuCardCatName}>{props.name}</h2>
            <div className={style.menuList}>{props.filteredItemList.map((item)=>(
                <MenuItemCard img = {item.img}  name = {item.name} description = {item.description} price = {item.price} isVeg = {item.isVeg}/>
            ))}</div>
          </div>
        );
    }

    let MenuCardStruct = [];
    console.log(props.cardData.itemList);
    props.cardData.itemList.forEach((itemArray, index) => {
        if(props.subCat == "All" || props.cardData.subCatList[index] == props.subCat){
            MenuCardStruct.push(<SubCategoryCard name={props.cardData.subCatList[index]} filteredItemList = {itemArray.filter((item)=>(
              !props.isVeg || item.isVeg
            ))}/>);
        }
    });

      return <div id={style.menuCard}>{MenuCardStruct}</div>;

}

function Options(props){
    const ele = props.subCatList.map((value)=>
        <option value={value}>{value}</option>
    );
    return (<>{ele}</>)
}

function Blog(){
    return (
        <div className={blog.container}>
            <div className={blog.content}>
                <h2>Hi Foodies</h2>
                <pre>       Welcome to a world of flavors! At our hotel, we believe that every meal should be an experience—one that excites your taste buds and leaves you craving for more. From sizzling appetizers to decadent desserts, our chefs craft each dish with passion and the finest ingredients. Whether you're in the mood for a hearty breakfast, a leisurely lunch, or a gourmet dinner, we have something special waiting for you. So sit back, savor every bite, and let us take you on a delightful culinary journey!</pre>
                <button>Explore Now</button>
            </div>
            <div className={blog.imgs}>
                <div className={blog.line1}>
                   <img className={blog.images} src={dineData.blog.imgs[0]} alt="" />
                   <img className={blog.images} src={dineData.blog.imgs[1]} alt="" />
                   <img className={blog.images} src={dineData.blog.imgs[2]} alt="" />
                   <img className={blog.images} src={dineData.blog.imgs[3]} alt="" /> 
                </div>
                <div className={blog.line2}>
                    <img className={blog.images} src={dineData.blog.imgs[4]} alt="" />
                    <img className={blog.images} src={dineData.blog.imgs[5]} alt="" />
                    <img className={blog.images} src={dineData.blog.imgs[6]} alt="" />
                    <img className={blog.images} src={dineData.blog.imgs[7]} alt="" /> 
                </div>
            </div>
        </div>
    );
}

function Blog2(){
    const Card =({img, title, body})=>{
        return (
            <div className={blog.featureCard}>
                <img src={img} alt="" />
                <h4>{title}</h4>
                <p className={blog.p}>{body}</p>
            </div>
        );
    };
    return (
        <div className={blog.featureBox}>
            <h2>Our Features</h2>
            <p className={blog.p1}>Our features are designed with excellence, ensuring seamless experiences, unmatched quality, and absolute satisfaction</p>
            <div className={blog.cardHolder}>
                <Card img = {img1} title = "Exquisite Cuisine" body=" Indulge in a diverse menu crafted by expert chefs using the finest ingredients."/>
                <Card img = {img1} title = "Elegant Ambiance" body="Enjoy a cozy and luxurious dining atmosphere perfect for every occasion."/>
                <Card img = {img1} title = "Exceptional Service" body="Experience warm hospitality with prompt and attentive staff"/>
                <Card img = {img1} title = "Fresh Ingredients" body="We prioritize quality by sourcing fresh, locally grown produce"/>
            </div>
        </div>
    );
}

function ShefSpecial({content}){
    const Header = ({title})=>{
        return(
            <div className={shefSpecial.header}>
                <h1>{title}</h1>
                <img src={ul2} alt="" />
            </div>
        )
    }
    return(
        <div className={shefSpecial.container}>
            <Header title = "Chef's Special"/>
            <div className={shefSpecial.dishList}>
                {content.map((dish)=>
                    <div className={shefSpecial.dishBox}>
                        <div className={shefSpecial.dishImg}>
                            <img src={dish.img} alt="" />
                        </div>
                        <h2>{dish.name}</h2>
                        <p>{dish.desc}</p>
                        <img className={shefSpecial.logo} src="https://res.cloudinary.com/de9mmhibr/image/upload/v1745315013/image-removebg-preview_8_ycmght.png" alt="" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Dine(){
    // const menu = getMenu();
    const [cat, setCat] = useState('1');
    const [subCat, setSubCat] = useState('All');
    const [isVeg, setIsVeg] = useState(false);
    const [menu, setMenu] = useState(null);
    const [shefSpecialMemu, setShefSpecialMenu] = useState([]);
    const selectCat = (e, category)=>{
        e.preventDefault();
        setCat(category);
    }
    useEffect(()=>{
        setSubCat('All');
    }, [cat]);
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchMenu = async()=>{
            let data = await fetchData('getUMenu', "GET");
            if(data.status){
                setMenu(data.content);
                data.content.forEach((cat)=>{
                    cat.itemList.forEach((subCats)=>{
                        setShefSpecialMenu((pre)=>[...pre, ...subCats.filter((item)=>item.shefSpecial)])
                    })
                    console.log(cat)
                })
            }else{
                alert("Internal Error  =", data.reason);
            }
        }
        fetchMenu();
    }, []);

    return (
        <>
            <SlideShow
                      gallery={dineData.slideShow.gallery}
                      content={dineData.slideShow.body}
                    />
            <div className={blog.super}>
                <Blog />
                <hr style={{width:"10%", margin:"auto"}}/>
                <br />
                <br />
                <Blog2 />
            </div>
            {
                shefSpecialMemu ? <ShefSpecial content = {shefSpecialMemu}/> : ''
            }
            {
                menu ? <div id={style.menuBox}>
                <h3>MENU</h3>
                <ul>
                    <li className = {cat == '1' ? style.selected : ""}><a href="#" onClick={(event)=>{selectCat(event, '1')}}>Starters</a></li>
                    <li className = {cat == '2' ? style.selected : ""}><a href="#" onClick={(event)=>{selectCat(event, '2')}}>Main Course</a></li>
                    <li className = {cat == '3' ? style.selected : ""}><a href="#" onClick={(event)=>{selectCat(event, '3')}}>Desert</a></li>
                    <li className = {cat == '4' ? style.selected : ""}><a href="#" onClick={(event)=>{selectCat(event, '4')}}>Drinks</a></li>
                    <li id={style.lastItem}>
                        <select id={style.subCatList} value={subCat} onChange={(e)=>{setSubCat(e.target.value)}}>
                            <option value="All">All</option>
                            <Options subCatList = {menu[parseInt(cat)-1].subCatList}/>
                        </select>
                    </li>
                    <li><input id={style.vegBtn} type="checkbox" onChange={e=>{setIsVeg(e.target.checked)}} /><label htmlFor={style.vegBtn}>Veg Only</label></li>
                </ul>
                <hr id={style.menuLine}/>
                <MenuCard cardData = {menu[parseInt(cat) -1]} isVeg = {isVeg} subCat = {subCat}/>
            </div> : ''
            }
        </>
    );
}