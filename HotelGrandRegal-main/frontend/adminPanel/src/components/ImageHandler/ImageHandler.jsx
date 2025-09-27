import styles from './ImageHandler.module.css';
import { useState, useEffect } from 'react';

export default function ImageHandler({onChange, imgSet = []}) {
    const [imgs, setImgs] = useState([...imgSet]);
    const [index, setIndex] = useState(imgSet.length != 0 ? 0 : null);
    console.log(imgs[index]);
    console.log(index);
    useEffect(()=>{
        onChange(imgs);
    }, [imgs])
    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setImgs(oldImgs => {
            const newImgs = [...oldImgs, ...files];
            setIndex(newImgs.length - 1);
            return newImgs;
        });
    };
    const handleDelete = ()=>{
        setImgs(pre=>{
            let newList = [...pre.slice(0, index), ...pre.slice(index + 1)];
            setIndex((pre)=>{
                let newIndex = --pre;
                return newIndex<0 ? 0 : newIndex;
            });
            if(newList.length == 0) setIndex(null);
            return newList; 
        });
    }
    return (
        <div className={styles.container}>
            <div className={styles.lHolder}>
                <span onClick={handleDelete}>&#x1F5D1;</span>
                {
                    index !=null ? <img className={styles.largePreview} src={URL.createObjectURL(imgs[index])} alt="" /> :''
                }
            </div>
            <div className={styles.holder}>
                <div className={styles.previewHolder}>
                    {
                        imgs.map((img, i) => <img className={`${styles.imgPreview} ${index == i ? styles.selected: ''}`} src={URL.createObjectURL(img)} alt="" onClick={()=>{console.log(index); setIndex(i)}}/>)
                    }
                    <div className={styles.addImgBtn}>
                        <label htmlFor="addImg"><img src="https://static.vecteezy.com/system/resources/previews/047/300/155/non_2x/add-image-icon-symbol-design-illustration-vector.jpg" alt="" /></label>
                        <input id="addImg" type="file" accept='image/*' multiple name="" onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}