import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from '../Redux/Actions/CartAction';
import { FaInfoCircle } from "react-icons/fa";
import Form from 'react-bootstrap/Form';

function ProductList() {
    let productId = useParams();
    console.log(productId);
    let [productlist, SetProductlist] = useState({});
    let [rate, setrate] = useState();
    let [count1, Setcount1] = useState(0);
    let [Quanti, SetQuanti] = useState(1);
    let [cart, SetCart] = useState([]);
    let dispatch = useDispatch();


    let getValue = (e) => {
        let v = parseInt(e.target.value);
        console.log(v);
        SetQuanti(v);
    }

    let submitCartData = (e) => {

        e.preventDefault();
        let DataObj = {
            id: productId.id,
            productQuantity: e.target.productQuantity.value,
            name: productlist.title,
            price: productlist.price,
            image: productlist.image
        }
        
        let pos = cart.findIndex((v, i) => v.id === productId.id);
        console.log(pos);
        if (pos == -1) {
            let datacart = [...cart, DataObj];
            SetCart(datacart);
            localStorage.setItem('cart', JSON.stringify(datacart));
            dispatch(addtocart());
        }
        else {
            alert("product are already in cart");
        }

    }

    useEffect(() => {
        let getproduct = (() => {
            setTimeout(() => {
                fetch("https://fakestoreapi.com/products/" + productId.id)
                    .then(async (res) => {
                        let data = await res.json();
                        SetProductlist(data);
                        setrate(data.rating.rate);
                        Setcount1(data.rating.count);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }, 200)
        })

        let getCartProduct = (() => {
            let cartitem = JSON.parse(localStorage.getItem('cart'))
            if (cartitem == null) {
                SetCart([]);
            }
            else {
                SetCart(cartitem);
            }
        })

        getCartProduct();
        getproduct();
    }, [SetProductlist, SetCart])


    return (
        <div>
            <div className="d-flex">
                <div className="productparent">
                    <img src={productlist.image} alt="" width={400} height={425} style={{ borderRight: "2px solid black", paddingRight: "30px", objectFit: "contain" }} />
                </div>
                <div className="productname" style={{ textAlign: "start" }}>
                    <h4 className="title">{productlist.title}</h4>
                    <h5 style={{ textAlign: "start", margin: "33px 0" }}>{rate}  ||  {count1}<span style={{ fontSize: "18px", color: 'grey', marginLeft: "4px" }}>rating</span></h5>
                    <h3 className="price">₹{Math.round(productlist.price*83)+123}/- <span className="oldprice" style={{fontSize:"14px"}}>₹{Math.round(productlist.price*83)}/-</span></h3>
                    <p className="para">{productlist.description}</p>
                    <form method="post" onSubmit={(e) => submitCartData(e)}>
                        <h5>Add Quantity:</h5><Form.Control type="number" min="1" max="5" value={Quanti} name="productQuantity" onChange={(e) => getValue(e)} id="inputPassword5" aria-describedby="passwordHelpBlock" style={{width:"210px"}} />
                        <button className="btn2" style={{ fontSize: "17px" }} type="submit">Add To Cart</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductList;