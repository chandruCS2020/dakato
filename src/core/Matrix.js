
import React, { useState } from "react";

export default function Matrix(props) {
    const [userinfo, setUserInfo] = useState({
        languages: [],
        response: [],
    });
    
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { languages } = userinfo;
        
        // Case 1 : The user checks the box
        if (checked) {
        setUserInfo({
            languages: [...languages, value],
            response: [...languages, value],
        });
        }
    
        // Case 2  : The user unchecks the box
        else {
        setUserInfo({
            languages: languages.filter((e) => e !== value),
            response: languages.filter((e) => e !== value),
        });
        }
    };
      console.log(userinfo)
      function handleImg(file){
        const src = URL.createObjectURL(file.files);
        return src;
      }
      console.log(props.handle)
    return (
        <>
        <div className="container-fluid top ">
            {props.data.map((items, index) => {
                return (
                <ul  className="matrixul" key={index}>
                    {items.map((subItems, sIndex) => {
                    return (
                        <li className="matrixli" key={sIndex}>

                        <input className="matrixcheck" type="checkbox" id={`myCheckbox`+index+sIndex} value={``+index+sIndex} onChange={handleChange}/>
                        <label className="matrixlabel" htmlFor={`myCheckbox`+index+sIndex}><img src={URL.createObjectURL(subItems)} /></label>
                        {/* {console.log(subItems.Files[0])} */}
                    </li>
                    );
                    })}
                </ul>
                );
            })}
            
            <div className='btns' style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                <button className='btn' onClick={props.handle}>
                    Continue    
                </button> 
            </div>
            </div>
        </>
    );
}
