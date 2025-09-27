import { useState } from 'react';
import style from './BlogCard.module.css';

export default function BlogCard({img1, img2, blog1, blog2}){
    const [position, setPosition] = useState(false);
    const [content, setContent] = useState(blog2);
    const [blog, setBlog] = useState(img2);
    return (
        <div className={style.super}>
            <button className={style.controller} onClick={()=>{setPosition((pre)=>(!pre)); setTimeout(()=>{setContent(position? blog2: blog1); setBlog(position? img2: img1)}, 200)}}>
                <span style={{color: position ? "#0c0000" : "white"}}>Majestic Hall</span>
                <span style={{color: position ? "white" : "#0c0000"}}>Royal Conference Hall</span>
                <div className={`${style.slider} ${position ? style.right : style.left}`}></div>
            </button>
            <div className={`${style.container} ${position ? style.moveRight : style.moveLeft}`}>
                <img className={style.thumbnail} src={blog} alt="" />
                <div className={style.blogBox1}>
                    {position ? blog1 : ""}
                </div>
                <div className={style.blogBox2}>
                    {content}
                </div>
                <div className={style.isLand}>
            </div>
        </div> 
        </div>
    );
}