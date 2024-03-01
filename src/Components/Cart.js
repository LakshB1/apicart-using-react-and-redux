import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from "react-redux";
import { deleterecord } from "../Redux/Actions/CartAction";

function Cart()
{
    let [cart1,SetCart1] = useState([]);
    let dispatch = useDispatch();
    let sum = 0;

    useEffect(()=>
    {
        let getCartDetail = ()=>
        {
            let cartData = JSON.parse(localStorage.getItem("cart"));
            if(cartData == null)
            {
                SetCart1([]);
            }
            else
            { 
                SetCart1(cartData);
            }
        }
        getCartDetail();
    },SetCart1);
    console.log(cart1);

    let deleteRecord = (pos)=>
    {
       console.log(pos);
       let localdata = JSON.parse(localStorage.getItem('cart'));
       localdata.splice(pos, 1);
       localStorage.setItem('cart', JSON.stringify(localdata));
       SetCart1(localdata);
       dispatch(deleterecord());
    }

    return(
        <div>
            <Container>
                <h2 className='mb-4' style={{textAlign:'start'}}>Cart Details:</h2>
                <Table  cellPadding={4} cellSpacing={5}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart1.map((v, i) => {
                            return (
                                <tr>
                                    <td>{++i}</td>
                                    <td><img src={v.image} height="110px" width="112px"></img></td>
                                    <td className="text"style={{color:"#0A58CA"}}>{v.name}</td>
                                    <td><input type="number" className="quantity" disabled value={v.productQuantity} /></td>
                                    <td>₹{Math.round(v.price*83)+123}/- </td>
                                    <td><button onClick={(e)=>deleteRecord(--i)} className="deletebtn">delete</button></td>
                                </tr>
                            )
                        })}
                        <tr>
                                <td>--</td>
                                <td colSpan={3}></td>
                                    {cart1.map((v, i) => {
                                    sum = sum + ((v.price*83+123) * v.productQuantity)
                                    console.log(sum);
                                })} 

                                <td colSpan={5}>
                                    <h3 style={{marginRight:"60px"}}><span style={{textAlign:"start"}}>Total Amount:</span> ₹{Math.round(sum)}</h3>
                                </td>
                            </tr>
                    </tbody>
                </Table>
            </Container>

            
        </div>
    )
}

export default Cart;