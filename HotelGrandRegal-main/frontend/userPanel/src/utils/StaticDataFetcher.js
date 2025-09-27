/* imports for global */
import underline1 from './assets/ul1.png'

/* imports for headcard */
import headCardImg from './assets/hotel.jpeg';

/* imports for showCaseCard */
import img1 from './assets/homeSlideshow/room.jpg';
import img2 from './assets/homeSlideshow/dine.jpg';
import img3 from './assets/homeSlideshow/open.jpg';
import img4 from './assets/homeSlideshow/banquet.jpg';
import img5 from './assets/homeSlideshow/lawn.jpg';
import img6 from './assets/homeSlideshow/dish.jpg';

/*Feature Imports */
import f1 from './assets/features/tasty.jpeg';
import f2 from './assets/features/fine.jpeg';
import SlideShow from '../components/slideshow/SlideShow';

/*dine slideshow */
import dImg1 from './assets/dineShow/img1.jpg';
import dImg2 from './assets/dineShow/img2.jpg';
import dImg3 from './assets/dineShow/img3.png';
import dImg4 from './assets/dineShow/img4.png';

/*Food blog */
import fImg1 from './assets/food/img1.png';
import fImg6 from './assets/food/img6.png';
import fImg5 from './assets/food/img5.png';
import fImg4 from './assets/food/img4.png';
import fImg7 from './assets/food/img7.png';
import fImg3 from './assets/food/img3.png';
import fImg2 from './assets/food/img2.png';

/*Imports for room slideshow */
import rImg1 from './assets/roomShow/img1.jpeg';
import rImg2 from './assets/roomShow/img2.jpeg';
import rImg3 from './assets/roomShow/img3.jpeg';
import rImg4 from './assets/roomShow/img4.jpeg';

export const global = {
    underline1 : underline1,
}

"06080d, 2px solid #0c0f17;"

export const homeData = {
    headCard: {
        img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/407561909.jpg?k=bfd64d35567eaeb4381ca7c43de205762b9bdcf3b975acf24429f820d66f0d6a&o=&hp=1",
        slogan : "Commitment to Luxury, services and Taste"
    },
    showCaseCard: [
        {
            img: img1,
            title: "Luxurious Rooms",
            body: "Step into a world of elegance and comfort, where every detail is designed for your relaxation. From plush bedding to breathtaking views, experience a stay where luxury isn’t just a feature—it’s a way of life."
        },
        {
            img: img2,
            title: "Elegant Restaurant",
            body: "Savor exquisite flavors in a setting of timeless elegance. From gourmet delights to a warm ambiance, our restaurant offers a dining experience that indulges your senses."
        },
        {
            img: img3,
            title: "Open Sky Dining",
            body: "Dine under the stars and indulge in a culinary experience like no other. With the sky as your ceiling and flavors that delight, every meal becomes a magical moment."
        },
        {
            img: img4,
            title: "Regal Banquet",
            body: "Celebrate life's special moments in grandeur. Our regal banquet hall offers a majestic setting, impeccable service, and exquisite décor to make every occasion unforgettable."
        },
        {
            img: img5,
            title: "Grand Party Lawn",
            body: "Celebrate under the open sky, where elegance meets nature. Our grand lawn is the perfect setting for unforgettable moments, from lavish weddings to vibrant gatherings"
        },
        {
            img: img6,
            title: "Delicious Taste",
            body: "Savor the perfect blend of flavors, crafted with passion and served with warmth. Every bite is a journey of taste and indulgence."
        }
    ],
    featureCard: [
        {
            img: img2,
            title : "Dine",
            slogan: "Exquisite Dining, Unmatched Flavor.",
            body:"Indulge in a dining experience where luxury meets flavor. With impeccable hygiene, a refined ambiance, and culinary excellence, every meal is a celebration of taste and elegance.",
            features : [
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313235/WhatsApp_Image_2025-04-22_at_2.40.42_PM_pehqib.jpg",
                    label:"Delicious Tasty Food"
                },
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313235/WhatsApp_Image_2025-04-22_at_2.40.42_PM_1_dnqt3z.jpg",
                    label:"Luxurious Ambiance"
                },
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313235/WhatsApp_Image_2025-04-22_at_2.40.43_PM_dif4in.jpg",
                    label:"Hygienic and Fresh"
                },
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313235/WhatsApp_Image_2025-04-22_at_2.40.43_PM_1_ftq07w.jpg",
                    label:"Exceptional Service"
                }
            ]
        },
        {
            img: img1,
            title : "Rooms",
            slogan: "Stay in Comfort, Live in Luxury.",
            body:"Experience a perfect blend of elegance and relaxation with our thoughtfully designed rooms. From plush bedding to modern amenities, every stay is crafted for ultimate comfort and luxury",
            features : [
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313236/WhatsApp_Image_2025-04-22_at_2.40.43_PM_6_nn56ym.jpg",
                    label:"Spacious Elegant"
                },
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313236/WhatsApp_Image_2025-04-22_at_2.40.43_PM_3_nzfaoe.jpg",
                    label:"Modern Amenities"
                },
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313235/WhatsApp_Image_2025-04-22_at_2.40.43_PM_4_o3mjkl.jpg",
                    label:"Cozy and Comfortable"
                },
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313235/WhatsApp_Image_2025-04-22_at_2.40.43_PM_5_nvr4sl.jpg",
                    label:"Breathtaking Views"
                }
            ]
        },
        {
            img: img4,
            title : "Banquet",
            slogan: "Celebrate Grand, Cherish Forever",
            body:"From elegant weddings to corporate gatherings, our banquet hall is designed to turn every occasion into a grand celebration. With exquisite décor and seamless service, your events become unforgettable.",
            features : [
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313235/WhatsApp_Image_2025-04-22_at_2.40.43_PM_2_g7xbbl.jpg",
                    label:"Spacious and Grand"
                },
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313236/WhatsApp_Image_2025-04-22_at_2.40.43_PM_7_a4yk7n.jpg",
                    label:"Elegant Décor"
                },
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313242/WhatsApp_Image_2025-04-22_at_2.40.43_PM_8_dt7hpj.jpg",
                    label:"Premium Catering"
                },
                {
                    img: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745313242/WhatsApp_Image_2025-04-22_at_2.40.43_PM_9_so2rpd.jpg",
                    label:"Seamless Arrangements"
                }
            ]
        }
    ],
    facilities:[
        "Luxurious Rooms – Elegantly designed for ultimate comfort and relaxation.",
        " Exquisite Dining – A fine culinary experience with delicious, hygienic, and fresh flavors.",
        "Grand Banquet Halls – Perfect for weddings, corporate events, and celebrations.",
        " Modern Amenities – High-speed WiFi, smart TVs, and premium facilities for a seamless stay.",
        "Prime Location – Conveniently situated with easy access to major attractions.",
        "Exceptional Hospitality – Personalized service to make every guest feel at home."
    ],
    mapData:[
        {
            logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745251560/image-removebg-preview_7_f9pcgz.png",
            label: "Takari Railway Station"
        },
        {
            logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745251560/image-removebg-preview_7_f9pcgz.png",
            label: "Bhavani Nagar Railway Station"
        },
        {
            logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745251560/image-removebg-preview_7_f9pcgz.png",
            label: "Kirloskarvadi Railway Station"
        },
        {
            logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1745251560/image-removebg-preview_6_tvyyum.png",
            label: "Kolhapur Airport"
        },
    ]
}

export const dineData = {
    slideShow : {
        gallery: [
            dImg1,
            dImg2,
            dImg3,
            dImg4
        ],
        body: [
            "Dine Under the Open Sky.",
            "Elegance in Every Bite.",
            "Dine under the stars",
            "Enjoy Delicious and tasty food.",
        ]
    },
    blog: {
        imgs : [fImg1, fImg2, fImg3, fImg4, fImg5, fImg6, fImg7, dImg4]
    }
}

export const roomData = {
    slideShow: {
        gallery : [
            rImg1, rImg2, rImg3, rImg4
        ],
        body: [
            "Elegantly furnished for a cozy stay.",
            "Spacious rooms for ultimate comfort",
            "Spotless rooms,  hygienic washrooms",
            "Soft beds, pure relaxation",
        ]
    }
}


export const banquetData = {
    slideShow : {
        gallery : [
            "https://res.cloudinary.com/de9mmhibr/image/upload/v1744559098/banquet1img9_v301p8.jpg", "https://res.cloudinary.com/de9mmhibr/image/upload/v1744559099/banquet1img1_rdmilv.jpg", "https://res.cloudinary.com/de9mmhibr/image/upload/v1744559098/banquet2img4_f5wrrf.jpg", "https://res.cloudinary.com/de9mmhibr/image/upload/v1744559097/banquet2img10_pkp4fa.jpg"
        ],
        body: [
            "Where Moments Turn Into Milestones",
            "Every Seat Holds a Story",
            "Where Comfort Meets Celebration",
            "Color, Cheer, and Celebration",
        ]
    }
}

