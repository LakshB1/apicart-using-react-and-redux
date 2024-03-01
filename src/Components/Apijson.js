import { useState } from "react";

function Apijson()
{

    let [data,Setdata] = useState({});

    let getValue = (e)=>
    {
        let name = e.target.name;
        let value = e.target.value;
        
        let dataRecord = {...data,[name]:value};
        Setdata(dataRecord);
    }

    let SubmitData = (e)=>
    {
        e.preventDefault();
        fetch("http://localhost:3000/posts",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        .then(async(res)=>{
            let record = await res.json();
            Setdata(record);
        })  
        .catch((err)=>{
            alert("something went wrong");
        })
    }
    return(
        <div>
            <h2>API FETCH JSON SERVER</h2>
            <form method="post" onSubmit={(e)=>SubmitData(e)}>
                <table border={1}>
                    <tr>
                        <td>Enter Title name</td>
                        <td><input type="text" name="title" onChange={(e)=>getValue(e)} /></td>
                    </tr>
                    <tr>
                        <td>Enter Author name</td>
                        <td><input type="text" name="aouthor" onChange={(e)=>getValue(e)} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="submit" name="submit" /></td>
                    </tr>
                </table>
            </form>
        </div>
    )
}

export default Apijson;