import { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import '../App.css';
import { useSelector } from "react-redux";

function ProductApi()
{
    let [product,SetProduct] = useState([]);
    let [category,Setcategory] = useState([]);   
    
    useEffect(()=>
    {
        let getData = (()=>
        {
            setTimeout(()=>
            {

                fetch("https://fakestoreapi.com/products")
                .then(async(res)=>
                {
                    let pro = await res.json();
                    SetProduct(pro);
                })
                .catch((err)=>
                {
                    console.log(err);
                })
            },500);
        })
        let getcategory = ()=>
        {
            setTimeout(()=>
            {
                fetch("https://fakestoreapi.com/products/categories")
                .then(async(res)=>
                {
                   Setcategory(await res.json());
                })
                .catch((err)=>
                {
                  console.log(err);
                })
            },100)
        }
        getcategory();
       getData(); 
    },[Setcategory]);
    let getProductCat = (cat)=>
    {
        setTimeout(()=>
        {

          fetch("https://fakestoreapi.com/products/category/"+cat)
          .then(async(res)=>
          {
              SetProduct(await res.json());
          })
          .catch((err)=>
          {
              console.log(err);
          })  
        },100);
    }
    
    let getpCatagory = (v) => {
        setTimeout(() => {
            var url = '';
            v == 'All' ? url = "https://fakestoreapi.com/products" : url = "https://fakestoreapi.com/products/category/" + v;
            fetch(url)
                .then(async (res) => {
                    let cato = await res.json();
                    SetProduct(cato);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 100)
    }

    return(
        <div>
            <div style={{display:'flex',justifyContent:"center"}}>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Link style={{color:"black",fontSize:"19px"}} onClick={()=>getpCatagory("All")}>All</Nav.Link>
                  {category.map((v,i)=>
                  {
                    return(
                      <Nav.Item>
                        <Nav.Link style={{fontSize:"19px",color:"black"}} onClick={(e)=>getProductCat(v)}>{v}</Nav.Link>
                    </Nav.Item>
                    )
                  })}
            </Nav>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap",justifyContent:"center", margin: "23px auto",backgroundColor:"white" }}>
        {product.map((v, i) => {
          return (
            <div key={i} className="productlist"  style={{position:"relative"}}>
              <div>
              <img src={v.image} alt="" height={"210px"} width={"220px"} className="image"  />
                    <div style={{overflow:"scroll",height: "60px"}}>
                    <h5 style={{color:"#0B5ED7",marginTop:"16px"}}  >{v.title}</h5>
                    </div>

                    <h4 style={{textAlign:"start",marginLeft:"35px"}} className="pricedetail"> <span className="oldprice" style={{fontSize:"14px"}}>₹ {Math.round(v.price * 83)}</span>  <span className="price"> ₹ {Math.round(v.price * 83) + 123}</span> </h4><br/>
                </div>
                <Nav.Item>
                    <Nav.Link style={{backgroundColor:"#607171",padding: "11px 28px",color: "white",marginBottom: "4px",fontSize: "16px",fontWeight: "bold"}} href={"/productlist/"+v.id}  className="btn" >Add to View   →</Nav.Link>
                </Nav.Item>
                </div>
          );
        })}
      </div>

        </div>
    )   
}

export default ProductApi;