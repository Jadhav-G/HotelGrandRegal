/*room 1 */
import r1Img1 from './assets/room1/img1.jpeg';
import r1Img2 from './assets/room1/img2.jpeg';
import r1Img3 from './assets/room1/img3.jpeg';
import r1Img4 from './assets/room1/img4.jpeg';

/*room 2 */
import r2Img1 from './assets/room2/img1.jpeg';
import r2Img2 from './assets/room2/img2.jpeg';
import r2Img3 from './assets/room2/img3.jpeg';
import r2Img4 from './assets/room2/img4.jpeg';
import r2Img5 from './assets/room2/img5.jpeg';
import r2Img6 from './assets/room2/img6.jpeg';

/*room  */
import r3Img1 from './assets/room3/img1.jpeg';
import r3Img2 from './assets/room3/img2.jpeg';
import r3Img3 from './assets/room3/img3.jpeg';
import r3Img4 from './assets/room3/img4.jpeg';
import r3Img5 from './assets/room3/img5.jpeg';
import r3Img6 from './assets/room3/img6.jpeg';

export function getRatings(){
    const reatingData = [
        {
            dp:"",
            name:"John Doe",
            body:"seuybsyuc dvuyyuvb sdgvyudcvd hgvdyudfyu vfvfyvfuyv dfgvdf",
            rating : 4.5
        },
        {
            dp:"",
            name:"John Doe",
            body:"seuybsyuc dvuyyuvb sdgvyudcvd hgvdyudfyu vfvfyvfuyv dfgvdf",
            rating : 4.5
        },
        {
            dp:"",
            name:"John Doe",
            body:"seuybsyuc dvuyyuvb sdgvyudcvd hgvdyudfyu vfvfyvfuyv dfgvdf",
            rating : 4.5
        },
        {
            dp:"",
            name:"John Doe",
            body:"seuybsyuc dvuyyuvb sdgvyudcvd hgvdyudfyu vfvfyvfuyv dfgvdf",
            rating : 4.5
        },
        {
            dp:"",
            name:"John Doe",
            body:"seuybsyuc dvuyyuvb sdgvyudcvd hgvdyudfyu vfvfyvfuyv dfgvdf",
            rating : 4.5
        },
        {
            dp:"",
            name:"John Doe",
            body:"seuybsyuc dvuyyuvb sdgvyudcvd hgvdyudfyu vfvfyvfuyv dfgvdf",
            rating : 4.5
        }
    ]
    
    return reatingData;
}

export function getShefSpecialItems(){
    const items = [
        {
            img: "#",
            name : "Paneer Shorma",
            desc: "This is fake description you need to specify about dish",
        },
        {
            img: "#",
            name : "Paneer Shorma",
            desc: "This is fake description you need to specify about dish",
        },
        {
            img: "#",
            name : "Paneer Shorma",
            desc: "This is fake description you need to specify about dish",
        },
        {
            img: "#",
            name : "Paneer Shorma",
            desc: "This is fake description you need to specify about dish",
        },
        {
            img: "#",
            name : "Paneer Shorma",
            desc: "This is fake description you need to specify about dish",
        }
    ]

    return items;
}

export function getRoomList(){
    const roomList = [
        {
            id: 0,
            img: r1Img1,
            name: "Deluxe Twin Bed Room",
            desc:"this is fake description you need to add as per need and whatever you want and this content should have some ",
            price: 2800,
            aminities : [
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
            ]
        },
        {
            id: 1,
            img: r2Img3,
            name: "Super Deluxe Room",
            desc:"this is fake description you need to add as per need and whatever you want and this content should have some ",
            price: 3500,
            aminities : [
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
            ]
        },
        {
            id: 2,
            img: r3Img1,
            name: "Deluxe Room",
            desc:"this is fake description you need to add as per need and whatever you want and this content should have some ",
            price: 4500,
            aminities : [
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
                {
                    logo: "#",
                    label: "free Wifi"
                },
            ]
        }
    ];
    return roomList;
}

export function getRoomData(roomId){
    
    const info = {
        overview: "this is fake description you need to add as per need and whatever you want and this content should have some files this is fake description you need to add as per need and whatever you want and this content should have some this is fake description you need to add as per need and whatever you want and this content should have some ",
        gallery: [r2Img1, r2Img2, r2Img3, r2Img4, r2Img5, r2Img6],
        rules : [
            {
                logo:"",
                label : "Pets Not Allowed"
            },
            {
                logo:"",
                label : "Unmaried Couples Not Allowed"
            },
        ],
        broker : "https://makemytrip.com"
    }
    return info;
}

export function bookRoom(){
    return {
        status : false,
        error: "Technical Error, Please Try Again Later"
    }
}

export function getLimits(id){
    const limits = {
        name: "Premium Room",
        price: 5320,
        adult: 2,
        child: 0,
        extra: [
            {
                logo: "",
                label: "Extra Bed",
                charges: 250
            },
            {
                logo: "",
                label: "Extra Bed",
                charges: 250
            },
            {
                logo: "",
                label: "Extra Bed",
                charges: 250
            },
            {
                logo: "",
                label: "Extra Bed",
                charges: 250
            },
            {
                logo: "",
                label: "Extra Bed",
                charges: 250
            },
            {
                logo: "",
                label: "Extra Bed",
                charges: 250
            },
            {
                logo: "",
                label: "Extra Bed",
                charges: 250
            },
            {
                logo: "",
                label: "Extra Bed",
                charges: 250
            },
        ]
    }

    return limits;
}

export function getMenu(){
    const menu = [
        {
          subCatList: ["Cold", "subCat2", "subCat3"],
          itemList: [
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": false,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": false,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ],
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ],
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ]
          ]
        },
        {
          subCatList: ["Punjabi", "subCat2", "subCat3"],
          itemList: [
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ],
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ],
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ]
          ]
        },
        {
          subCatList: ["Punjabi", "subCat2", "subCat3"],
          itemList: [
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ],
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ],
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ]
          ]
        },
        {
          subCatList: ["Punjabi", "subCat2", "subCat3"],
          itemList: [
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ],
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ],
            [
              {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            },
                            {
                                "name": "Pavbhaji",
                                "isVeg": true,
                                "price": 100,
                                "quantity": 1,
                                "img": "./files/temp.jpeg",
                                "description": "Crispy roasted papad topped with masala."
                            }
            ]
          ]
        }
      ]
    return menu;
}

export function getTarrif(){
    const tarrif = {
        veg : [
            {
                name: "Silver",
                list: [
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                ]
            },
            {
                name: "Gold",
                list: [
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                ]
            },
            {
                name: "Platenium",
                list: [
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                ]
            }
        ],
        nonveg : [
            {
                name: "Silver",
                list: [
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "10 veg"
                    },
                    {
                        logo: "",
                        label: "100 veg"
                    },
                    {
                        logo: "",
                        label: "100 veg"
                    },
                    {
                        logo: "",
                        label: "1000 veg"
                    },
                    {
                        logo: "",
                        label: "1000 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                ]
            },
            {
                name: "Gold",
                list: [
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                ]
            },
            {
                name: "Platenium",
                list: [
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                    {
                        logo: "",
                        label: "1 veg"
                    },
                ]
            }
        ]
    }
    return tarrif;
}


export function getBanquetMenu(){
    const data = [
        {
            cat : "hi",
            thubnail : "",
            items: ["Paneer Shorma", "kaju kari", "buttur masala", "shahi panner", "Paneer Shorma", "kaju kari", "buttur masala", "shahi panner", "Paneer Shorma", "kaju kari", "buttur masala", "shahi panner", "Paneer Shorma", "kaju kari", "buttur masala", "shahi panner", "Paneer Shorma", "kaju kari", "buttur masala", "shahi panner", "Paneer Shorma", "kaju kari", "buttur masala", "shahi panner", "Paneer Shorma", "kaju kari", "buttur masala", "shahi panner"]
        },
        {
            cat : "hello",
            thubnail : "",
            items: ["A", "b", "c", "d"]
        },
        {
            cat : "how",
            thubnail : "",
            items: ["A", "b", "c", "d"]
        }
    ];
    return data;
}