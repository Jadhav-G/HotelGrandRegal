import { useEffect, useRef, useState } from 'react';
import style from './Content.module.css';
import dineMenu from './DineMenu.module.css';
import addMenu from './AddMenu.module.css';
import roomDetails from './RoomDetails.module.css';
import banquetDetails from './BanquetDetails.module.css';
import galleryStyle from './Gallery.module.css';
import tarrif from './Tarrif.module.css';
import fetchData from '../../../utils/fetcher';
import { Form, useNavigate } from 'react-router-dom';
import { popup } from '../../components/popup/popup';
import ImageHandler from '../../components/ImageHandler/ImageHandler';

let holder = 'https://res.cloudinary.com/de9mmhibr/image/upload/v1745314468/a-minimal-ui-style-circular-button-with-_DFHCW0z7Q_-W_g-dWduNuw_VvoknBqXSAq2DjSNNTwdtg_t7d1yk.jpg';
let urlToBuffer = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const urlParts = url.split('/');
    const rawName = urlParts[urlParts.length - 1].split('?')[0]; // ignore query params
    const fileName = rawName || `downloaded-${Date.now()}`;

    const contentType = blob.type || 'application/octet-stream';

    const file = new File([blob], fileName, {
        type: contentType,
        lastModified: Date.now()
    });
    return file;
}
function AddMenu({ onAdd, img = holder, label = null, des = null, rate = null, isShefSpecial = false, vegD = false, catg = 'starter', subCateg = 'Veg Soup', id = null }) {
    const [cat, setCat] = useState(catg);
    const [name, setName] = useState(label);
    const [desc, setDesc] = useState(des);
    const [price, setPrice] = useState(rate);
    const [shef, setShef] = useState(isShefSpecial);
    const [sCat, setSCat] = useState(subCateg);
    const [inputImg, setImg] = useState(img);
    const [veg, setVeg] = useState(vegD);
    const subCats = {
        "starter": ["Veg Soup", "Veg Starters", "Chinese Veg Starters", "Eastern Oven Tandoor", "Sizzling Sizzlers", "Chinese Veg Main", "Papad/ Salads/ Raita", "Nonveg Soup", "Non Veg Chinese Starters", "Salads"],
        "main": ["Veg Mains", "Dals", "Chinese Rice/ Noodles / Chopsuey", "Veg Biryani", "Non Veg Mains", "Chicken NonVeg Main", "NonVeg Rice/ Noodles", "Biryani", "Indian Breads", "Sandwiches - Plain / Grilled", "Pizza and Pasta"],
        "desert": ["Deserts"],
        "drink": ["Coolers", "Beverages", "Milk Shakers / Faluda"]
    }
    const handleSubmition = async (e) => {
        e.preventDefault();
        let textData = {
            name: name,
            desc: desc,
            price: price,
            cat: cat,
            subCat: sCat,
            shefSpecial: shef,
            isVeg: veg,
        }
        if (!inputImg) {
            alert("Please Add Image First");
            return;
        }
        let imgBfr = await urlToBuffer(inputImg);
        let formData = [{ key: "jsonData", value: JSON.stringify(textData) }, { key: "thumb", value: imgBfr }];
        if (!id) {
            alert("Adding Menu! PLease Wait");
            let ack = await fetchData('addMenu', 'POST', null, formData);
            if (ack.status) {
                alert("request Processed");
                onAdd();
            } else {
                console.log("Error Reason=", ack.reason)
                alert("Err= " + ack.reason);
            }
        } else {
            alert("Editing Menu! PLease Wait");
            textData.id = id;
            formData[0].value = JSON.stringify(textData);
            console.log(formData);
            let ack = await fetchData('editMenu', 'POST', null, formData);
            if (ack.status) {
                alert("request Processed");
                onAdd();
            } else {
                console.log("Error Reason=", ack.reason)
                alert("Err= " + ack.reason);
            }
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(URL.createObjectURL(file));
        }
    };
    return (
        <form className={addMenu.form} onSubmit={(e) => handleSubmition(e)}>
            <div className={addMenu.box1}>
                <label className={addMenu.thumbLabel} htmlFor="thumbnail"><div style={{ backgroundImage: `url(${inputImg})`, backgroundPosition: "center", backgroundSize: "contain" }}></div></label>
                <input className={addMenu.thumbInput} id='thumbnail' type="file" src="" alt="" onChange={(e) => handleImageChange(e)} />
                <input className={addMenu.input1} value={name} required type="text" placeholder='Dish Name' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={addMenu.box2}>
                <textarea className={addMenu.input1} value={desc} required rows={3} name="" id="" placeholder='Dish Description' onChange={(e) => setDesc(e.target.value)}></textarea>
                <input className={addMenu.input2} value={price} type="number" name="" id="" placeholder='price' onChange={(e) => setPrice(e.target.value)} />
                <select name="" id="" onChange={(e) => { setCat(e.target.value); setSCat(subCats[e.target.value][0]) }}>
                    <option value="starter">Starters</option>
                    <option value="main">Main Course</option>
                    <option value="desert">Deserts</option>
                    <option value="driAnk">Drinks</option>
                </select>
                <select name="" id="" onChange={(e) => setSCat(e.target.value)}>
                    {
                        subCats[cat].map((subCat) =>
                            <option value={subCat}>{subCat}</option>
                        )
                    }
                </select>
                <span className={addMenu.shefSpecial} v>
                    <input type="checkbox" name="" id="shefSpecial" checked={shef} onChange={(e) => setShef(e.target.checked)} />
                    <label htmlFor="shefSpecial">Is Shef Special ? </label>
                </span>
                <span className={addMenu.shefSpecial} v>
                    <input type="checkbox" name="" id="isVeg" checked={veg} onChange={(e) => setVeg(e.target.checked)} />
                    <label htmlFor="isVeg">Is Veg ? </label>
                </span>
                <button type="submit" className={addMenu.addBtn}>{label ? "Edit" : "Add"} Item</button>
            </div>
        </form>
    );
}

function DineMenu() {
    const navigate = useNavigate();
    const [overlay, setOverlay] = useState(false);
    const [menu, setMenu] = useState([]);
    const fetchMenu = async () => {
        let data = await fetchData('getMenu', 'GET');
        if (data.status) {
            setMenu(data.content);
        } else {
            alert("Server Error");
            navigate('/login')
        }
    };
    const handleEdit = (dish) => {
        setOverlay(<AddMenu onAdd={fetchMenu} img={dish.img} label={dish.name} des={dish.desc} rate={dish.price} isShefSpecial={dish.shefSpecial} vegD={dish.isVeg} catg={dish.cat} subCateg={dish.subCat} id={dish._id} />);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are You Sure To Delete This Menu ? ")) return;
        let responce = await fetchData('deleteMenu', 'POST', { id: id });
        if (responce.status) {
            alert("Data Modified Succesfully");
        } else {
            alert("Failed to Modify Data = " + responce.reason);
        }
    };
    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <div>
            <button style={{ position: "fixed", bottom: "40px", right: "80px", padding: "5px 20px", borderRadius: "50px", border: "0px", background: "#071f6e", color: "white", fontWeight: "bold", fontSize: "18px" }} onClick={() => setOverlay(<AddMenu onAdd={fetchMenu} />)}>Add Dish</button>
            {
                overlay ?
                    <div className={dineMenu.overlay}>
                        <div className={dineMenu.exitArea} onClick={() => setOverlay(false)}></div>
                        {overlay}
                    </div> : ''
            }
            <h2 className={dineMenu.header}>Manage Menu</h2>
            <div className={dineMenu.tableHolder}>
                <table className={dineMenu.menuTable}>
                    <tbody>
                        <tr>
                            <th>Sr</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Is Shef's Special</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                        {
                            menu.map((dish, index) =>
                                <tr className={dineMenu.listRow}>
                                    <td>{index + 1}</td>
                                    <td><img src={dish.img} alt="" /></td>
                                    <td>{dish.name}</td>
                                    <td>{dish.desc}</td>
                                    <td>{dish.price}</td>
                                    <td>{dish.cat}</td>
                                    <td>{dish.subCat}</td>
                                    <td><input type="checkbox" name="" id="" checked={dish.shefSpecial} /></td>
                                    <td style={{ cursor: "pointer" }} onClick={() => (handleDelete(dish._id))}>&#128465;</td>
                                    <td style={{ cursor: "pointer" }} onClick={() => (handleEdit(dish))}>&#9998;</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function RoomDetails() {
    const [data, setData] = useState([]);
    let refresh = async () => {
        let ack = await fetchData('roomDetails', 'GET');
        if (ack.status) {
            setData(ack.content)
        } else {
            alert(ack.reason);
        }
    }
    useEffect(() => {
        refresh();
    }, []);
    const RoomForm = ({ id = null, pimgs = [], pname = null, pinfo = null, pdesc = null, pprice = null, pcapacity = null }) => {
        console.log(id)
        const [imgs, setImgs] = useState(pimgs);
        const [name, setName] = useState(pname);
        const [info, setInfo] = useState(pinfo);
        const [desc, setDesc] = useState(pdesc);
        const [price, setPrice] = useState(pprice);
        const [capacity, setCapacity] = useState(pcapacity);
        const handleImgChange = (imgs) => {
            setImgs(imgs);
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (imgs.length < 4) {
                alert("Upload Atleast 4 images");
                return;
            } else {
                let ack = null;
                if (id) ack = await fetchData('setRoom', 'POST', null, [{ key: "jsonData", value: JSON.stringify({ id: id, name: name, info: info, desc: desc, price: price, capacity: capacity }) }, ...imgs.map(img => { return { key: "gallery", value: img } })]);
                else ack = await fetchData('addRoom', 'POST', null, [{ key: "jsonData", value: JSON.stringify({ id: id, name: name, info: info, desc: desc, price: price, capacity: capacity }) }, ...imgs.map(img => { return { key: "gallery", value: img } })]);
                if (ack.status) alert("Data Modified Successfully");
                else alert("Failed To MOdify Data" + ack.reason)
                refresh();
            }
        }
        return (
            <form action="" className={roomDetails.form} onSubmit={handleSubmit}>
                <div style={{ width: "300px" }} className={roomDetails.galleryBox}>
                    <ImageHandler onChange={handleImgChange} imgSet={pimgs} />
                </div>
                <div className={roomDetails.details}>
                    <div className={roomDetails.inputBox}>
                        <label htmlFor="roomName">Room Name</label>
                        <input required value={name} name='name' id='roomName' type="text" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={roomDetails.inputBox}>
                        <label htmlFor="roomInfo">Room Info</label>
                        <textarea required value={info} rows={3} name="shortDesc" id="roomInfo" onChange={(e) => setInfo(e.target.value)}></textarea>
                    </div>
                    <div className={roomDetails.inputBox}>
                        <label htmlFor="roomDesc">Room Description</label>
                        <textarea required value={desc} rows={5} name="longDesc" id="roomDesc" onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className={roomDetails.numHolder}>
                        <div className={roomDetails.inputBox}>
                            <label htmlFor="price">Room Price</label>
                            <input required value={price} type="number" name="price" id="price" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className={roomDetails.inputBox}>
                            <label htmlFor="capacity">Room Capacity</label>
                            <input required value={capacity} type="number" name="capacity" id="capacity" onChange={(e) => setCapacity(e.target.value)} />
                        </div>
                    </div>
                    <button type='submit' className={roomDetails.updateBtn}>Update Info</button>
                </div>
            </form>
        );
    }
    const RoomCard = ({ id, gallery, name, info, desc, price, capacity }) => {
        const handleDelete = async (id) => {
            if (window.confirm("Do You Really Want To Delete Room Record")) {
                let ack = await fetchData('deleteRoom', 'POST', { id: id })
                if (ack.status) alert("Operation Successful");
                else alert("Operation Failed" + ack.reason);
                refresh();
            }
        }
        async function getBuffers(gallery) {
            return await Promise.all(gallery.map(img => urlToBuffer(img)));
        }
        return (
            <div className={roomDetails.card}>
                <img src={gallery[0]} alt="" />
                <span className={roomDetails.cardName}>{name}</span>
                <p className={roomDetails.cardDetails}>{info}</p>
                <span className={roomDetails.cardPrice}>Rs {price} / night</span>
                <div className={roomDetails.cardActions}>
                    <button onClick={async () => popup(RoomForm, { id: id, pimgs: await getBuffers(gallery), pname: name, pinfo: info, pdesc: desc, pprice: price, pcapacity: capacity })}>Edit</button>
                    <button onClick={() => { handleDelete(id) }}>Delete</button>
                </div>
            </div>
        );
    }
    return (
        <div className={roomDetails.container}>
            <h2 className={dineMenu.header}>Manage Rooms</h2>
            <div className={roomDetails.cardHolder}>
                {
                    data.map((roomInfo) =>
                        <RoomCard id={roomInfo.id} gallery={roomInfo.gallery} name={roomInfo.name} info={roomInfo.info} desc={roomInfo.desc} price={roomInfo.price} capacity={roomInfo.capacity} />
                    )
                }
                <span style={{ height: "300px", aspectRatio: "0.9 / 1.6", fontSize: "100px", fontWeight: "bold", background: "white", textAlign: "center", boxShadow: "0px 0px 5px gray", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => popup(RoomForm, {})}>+</span>
            </div>
        </div>
    );
}

function BanquetDetails() {
    const [data, setData] = useState([]);
    let refresh = async () => {
        let ack = await fetchData('banquetDetails', 'GET');
        if (ack.status) {
            setData(ack.content)
        } else {
            alert(ack.reason);
        }
    }
    useEffect(() => {
        refresh();
    }, []);
    const BanquetForm = ({ id = null, pimgs = [], pname = null, pdesc = null, pprice = null, pcapacity = null }) => {
        console.log(id)
        const [imgs, setImgs] = useState(pimgs);
        const [name, setName] = useState(pname);
        const [desc, setDesc] = useState(pdesc);
        const [price, setPrice] = useState(pprice);
        const [capacity, setCapacity] = useState(pcapacity);
        const handleImgChange = (imgs) => {
            setImgs(imgs);
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (imgs.length < 4) {
                alert("Upload Atleast 4 images");
                return;
            } else {
                let ack = null;
                if (id) ack = await fetchData('setBanquet', 'POST', null, [{ key: "jsonData", value: JSON.stringify({ id: id, name: name, desc: desc, price: price, capacity: capacity }) }, ...imgs.map(img => { return { key: "gallery", value: img } })]);
                else ack = await fetchData('addBanquet', 'POST', null, [{ key: "jsonData", value: JSON.stringify({ id: id, name: name, desc: desc, price: price, capacity: capacity }) }, ...imgs.map(img => { return { key: "gallery", value: img } })]);
                if (ack.status) alert("Data Modified Successfully");
                else alert("Failed To MOdify Data" + ack.reason)
                refresh();
            }
        }
        return (
            <form action="" className={banquetDetails.form} onSubmit={handleSubmit}>
                <div style={{ width: "300px" }} className={banquetDetails.galleryBox}>
                    <ImageHandler onChange={handleImgChange} imgSet={pimgs} />
                </div>
                <div className={banquetDetails.details}>
                    <div className={banquetDetails.inputBox}>
                        <label htmlFor="roomName">Banquet Name</label>
                        <input required value={name} name='name' id='roomName' type="text" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={banquetDetails.inputBox}>
                        <label htmlFor="roomDesc">Banquet Description</label>
                        <textarea required value={desc} rows={5} name="longDesc" id="roomDesc" onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className={banquetDetails.numHolder}>
                        <div className={banquetDetails.inputBox}>
                            <label htmlFor="price">Banquet Price</label>
                            <input required value={price} type="number" name="price" id="price" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className={banquetDetails.inputBox}>
                            <label htmlFor="capacity">Banquet Requirenment</label>
                            <input required value={capacity} type="number" name="capacity" id="capacity" onChange={(e) => setCapacity(e.target.value)} />
                        </div>
                    </div>
                    <button type='submit' className={banquetDetails.updateBtn}>Update Info</button>
                </div>
            </form>
        );
    }
    const BanquetCard = ({ id, gallery, name, desc, price, capacity }) => {
        const handleDelete = async (id) => {
            if (window.confirm("Do You Really Want To Delete Room Record")) {
                let ack = await fetchData('deleteRoom', 'POST', { id: id })
                if (ack.status) alert("Operation Successful");
                else alert("Operation Failed" + ack.reason);
                refresh();
            }
        }
        async function getBuffers(gallery) {
            return await Promise.all(gallery.map(img => urlToBuffer(img)));
        }
        return (
            <div className={banquetDetails.card}>
                <img src={gallery[0]} alt="" />
                <span className={banquetDetails.cardName}>{name}</span>
                <p className={banquetDetails.cardDetails}>{desc}</p>
                <span className={banquetDetails.cardPrice}>Rs {price} + Catering Charges</span>
                <div className={banquetDetails.cardActions}>
                    <button onClick={async () => popup(BanquetForm, { id: id, pimgs: await getBuffers(gallery), pname: name, pdesc: desc, pprice: price, pcapacity: capacity })}>Edit</button>
                    <button onClick={() => { handleDelete(id) }}>Delete</button>
                </div>
            </div>
        );
    }
    return (
        <div className={banquetDetails.container}>
            <h2 className={dineMenu.header}>Manage Banquet</h2>
            <div className={banquetDetails.cardHolder}>
                {
                    data.map((roomInfo) =>
                        <BanquetCard id={roomInfo.id} gallery={roomInfo.gallery} name={roomInfo.name} info={roomInfo.info} desc={roomInfo.desc} price={roomInfo.price} capacity={roomInfo.capacity} />
                    )
                }
                {data.length < 2 ? <span style={{ height: "300px", aspectRatio: "0.9 / 1.6", fontSize: "100px", fontWeight: "bold", background: "white", textAlign: "center", boxShadow: "0px 0px 5px gray", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => popup(RoomForm, {})}>+</span> : ''}
            </div>
        </div>
    );
}

function BanquetTarrif() {
    const [tarrifs, setTarrifs] = useState([]);
    useEffect(() => {
        let fetchRecords = async () => {
            const responce = await fetchData('getTarrif', 'GET');
            if (responce.status) {
                setTarrifs(responce.content);
            } else {
                alert("Server Error");
            }
        }
        fetchRecords();
    }, []);
    const TarrifForm = ({ pName = null, pIsVeg = true, pPrice = null, pItems = [] }) => {
        console.log("Edit Called")
        const [items, setItems] = useState(pItems);
        const [name, setName] = useState(pName);
        const [isVeg, setIsVeg] = useState(pIsVeg);
        const [price, setPrice] = useState(pPrice);
        const [item, setItem] = useState();
        const handleAdd = () => {
            if (item) {
                setItems((pre) => [...pre, item]);
                setItem(null);
            }
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            let dataToSend = {
                name: name,
                isVeg: isVeg,
                price: price,
                items: items
            }
            await fetchData('deleteTarrif', 'POST', { isVeg: isVeg, name: name })
            let responce = await fetchData('addTarrif', 'POST', dataToSend);
            if (responce.status) {
                alert("Data Addted");
            } else {
                alert("Server Error");
            }
        }
        return (
            <form className={tarrif.form} action="" onSubmit={handleSubmit}>
                <div className={tarrif.holder}>
                    <div className={tarrif.section}>
                        <h2>Basic Details</h2>
                        <hr className={tarrif.hr} />
                        <div className={tarrif.inputBox}>
                            <label htmlFor="name">Tarrif Name</label>
                            <input type="text" name="name" id="name" required placeholder='for ex - gold' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={tarrif.inputBox}>
                            <label htmlFor="cat">Category</label>
                            <select name="cat" id="cat" onChange={(e) => setIsVeg(e.target.value == 'veg')}>
                                <option value="veg">Veg</option>
                                <option value="nonveg">Non Veg</option>
                            </select>
                        </div>
                        <div className={tarrif.inputBox}>
                            <label htmlFor="cost">Cost Per Plate</label>
                            <input type="number" name="cost" id="cost" required placeholder='for ex -600' value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className={tarrif.section}>
                        <h2>Tarrif Involve</h2>
                        <hr className={tarrif.hr} />
                        <ul className={tarrif.includes}>
                            {
                                items.length > 0 ? items.map((item) =>
                                    <li>{item}</li>
                                ) : <div>Please Add Items...</div>
                            }
                        </ul>
                        <div className={tarrif.addSection}>
                            <input id='cost' value={item} type="text" placeholder='1 Desert' onChange={(e) => setItem(e.target.value)} />
                            <button type='button' onClick={handleAdd}>+ Add Item</button>
                        </div>
                    </div>
                </div>
                <button className={tarrif.submit} type="submit">Add Tarrif</button>
            </form>
        );
    }
    return (
        <div className={roomDetails.container}>
            <h2 className={dineMenu.header}>Manage Rooms</h2>
            <div className={roomDetails.cardHolder}>
                {
                    tarrifs.map((tarrif) =>
                        <div style={{ boxShadow: "0px 0px 3px gray", borderRadius: "15px" }}>
                            <div style={{ background: tarrif.isVeg ? "green" : "red", padding: "20px 60px", color: "white", borderRadius: "15px 15px 0px 0px" }}>
                                <h1 style={{ textAlign: "center" }}>{tarrif.name}</h1>
                                <h3 style={{ textAlign: "center" }}>Rs {tarrif.price}</h3>
                            </div>
                            <div>
                                <ul style={{ display: "flex", flexDirection: "column", listStyle: "none", alignItems: "center", justifyContent: "center" }}>
                                    {
                                        tarrif.items.map((item) =>
                                            <li>{item.name}</li>
                                        )
                                    }
                                </ul>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", margin: "20px" }}>
                                    <button style={{ background: "green", padding: "5px 30px", border: "0px", borderRadius: "20px", color: "white", fontWeight: "bold" }} onClick={() => popup(TarrifForm, { pName: tarrif.name, pIsVeg: tarrif.isVeg, pPrice: tarrif.price, pItems: tarrif.items.map((item) => item.name) })}>Edit</button>
                                    <button style={{ background: "red", padding: "5px 30px", border: "0px", borderRadius: "20px", color: "white", fontWeight: "bold" }} onClick={async () => { alert("Tarrif Plan Will be deleted as flash you can continue further operations"); let responce = await fetchData('deleteTarrif', 'POST', { isVeg: tarrif.isVeg, name: tarrif.name }); if (responce.status) alert("Tarrif Deleted Successfully") }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                <span style={{ height: "300px", aspectRatio: "0.9 / 1.6", fontSize: "100px", fontWeight: "bold", background: "white", textAlign: "center", boxShadow: "0px 0px 5px gray", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => popup(TarrifForm, {})}>+</span>
            </div>
        </div>
    );
}

function BanquetMenu() {

}

function Gallery() {
    const [gallery, setGallery] = useState({});
    let fetchGallery = async () => {
        let ack = await fetchData('gallery', 'GET');
        if (ack.status)
            setGallery(ack.content);
    }
    useEffect(() => {
        fetchGallery();
    }, []);
    const AddForm = () => {
        const categories = ["Rooms", "Dine", "Banquet", "Food", "Environment"];
        const [imgs, setImgs] = useState([]);
        const [cat, setCat] = useState([categories[0]]);
        const handleImgChange = (inputImgs) => {
            setImgs(inputImgs);
        }
        const handleAdd = async (e) => {
            e.preventDefault();
            console.log("here", imgs);
            if (imgs.length < 1) {
                alert("Please Add Atleast One Image");
                return;
            }
            let response = await fetchData('insertGallery/' + cat, 'POST', null, imgs.map((img) => { return { key: 'gallery', value: img } }))
            if (response.status) {
                alert("Images Added Successfully");
                fetchGallery();
            } else {
                alert("Internal Error" + response.reason);
            }
        }
        return (
            <form className={galleryStyle.form} onSubmit={handleAdd}>
                <div className={galleryStyle.catHolder}>
                    <label htmlFor="cat">Category</label>
                    <select className={galleryStyle.catList} name="" id="cat" onChange={(e) => setCat(e.target.value)}>
                        {
                            categories.map((c) =>
                                <option value={c}>{c}</option>
                            )
                        }
                    </select>
                </div>
                <hr />
                <div className={galleryStyle.handlerBox}>
                    <ImageHandler onChange={handleImgChange} />
                </div>
                <button className={galleryStyle.addImgs} type="submit">Add Images</button>
            </form>
        );
    }

    return (
        <div className={galleryStyle.container}>
            <div>
                {

                    Object.entries(gallery).map(([key, value]) => {
                        return <div style={{ padding: "20px" }}>
                            <span>{key}</span>
                            <hr />
                            <div style={{ display: "flex", width: "95vw", overflowX: "auto", gap: "20px", margin: "10px auto", cursor:"pointer" }}>
                                {
                                    value.map((img) =>
                                        <div className={galleryStyle.wrapper}>
                                            <div className={galleryStyle.overlay} onClick={async () => {
                                                    if (window.confirm("Do You Want To Delete This Image")) {
                                                        await fetchData("deleteImg", "POST", { cat: key, img });
                                                        fetchGallery();
                                                    }
                                                }}>Delete Image?</div>
                                            <img
                                                className={galleryStyle.showcaseImg}
                                                style={{
                                                    height: "200px",
                                                    width: "auto",
                                                    cursor: "pointer",
                                                }}
                                                src={img}
                                                alt=""
                                            />
                                        </div>

                                    )
                                }
                            </div>
                        </div>;
                    })
                }
            </div>
            <button className={galleryStyle.addBtn} onClick={() => popup(AddForm, {})}>Add Images</button>
        </div>
    );
}

export default function Content() {
    const [contentManager, setContentManager] = useState(<Gallery />);
    const handleChange = (selectedValue) => {
        switch (selectedValue) {
            case 'dineMenu':
                setContentManager(<DineMenu />);
                break;
            case 'roomDetails':
                setContentManager(<RoomDetails />);
                break;
            case 'banquetDetails':
                setContentManager(<BanquetDetails />);
                break;
            case 'banquetTarrif':
                setContentManager(<BanquetTarrif />);
                break;
            case 'banquetMenu':
                setContentManager(<BanquetMenu />);
                break;
            case 'gallery':
                setContentManager(<Gallery />);
                break;
            default:
                alert("Bad Request");
        }
    }
    return (
        <div>
            <div className={style.holder}>
                <h1 className={style.h1}>Content Management</h1>
                <select className={style.select} name="" id="" onChange={(e) => { handleChange(e.target.value) }}>
                    <option value="dineMenu">Dine Menu Management</option>
                    <option value="roomDetails">Room Details Management</option>
                    <option value="banquetDetails">Banquet Details Management</option>
                    <option value="banquetTarrif">Banquet Tarrif Management</option>
                    {/* <option value="banquetMenu">Banquet Menu Management</option> */}
                    <option selected value="gallery">Gallery Management</option>
                </select>
            </div>
            <hr />
            <div>
                {contentManager}
            </div>
        </div>
    );
}