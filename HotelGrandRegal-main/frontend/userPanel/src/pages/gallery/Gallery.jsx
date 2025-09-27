import fetchData from '../../utils/fetcher';
import styles from './Gallery.module.css';
import { useEffect, useState } from 'react';

export default function Gallery(){
    return(
        <div className={styles.container}>
            <GalleryHolder />
        </div>
    );
}

function GalleryHolder() {
    const [imgs, setGallery] = useState({});
    useEffect(()=>{
        let getImgs = async()=>{
            let responce = await fetchData('gallery', 'GET');
            if(responce.status){
                setGallery(responce.content);
            }
        }
        getImgs();
    }, []);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const allImages = Object.values(imgs).flat();
    const categoryOptions = ['all', ...Object.keys(imgs)];
  
    const displayedImages =
      selectedCategory === 'all'
        ? allImages
        : imgs[selectedCategory];
  
    return (
      <div className={styles.galleryContainer}>
        <h1 className={styles.title}>Gallery</h1>
        <div className={styles.selectContainer}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
          >
            {categoryOptions.map((category, idx) => (
              <option key={idx} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
  
        <div className={styles.masonry}>
          {displayedImages.map((src, idx) => (
            <div key={idx} className={styles.item}>
              <img src={src} alt={`img-${idx}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }