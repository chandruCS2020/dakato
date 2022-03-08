import React, { useState, useCallback, useEffect, useRef } from "react";
import ImageMapper from 'react-img-mapper';
import Slider from '@mui/material/Slider';
import Layout from "./Layout";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { Box, LinearProgress } from "@mui/material";
import { useHistory } from "react-router-dom";

const Signinmap = props => {
        const [query, setQuery] = useState(1);
        const location = useLocation();
        const history = useHistory();
        const [coordinates, setcoordinates] = useState([]);
    const [mapAreas, setMapAreas] = useState({
        name: "my-map",
        areas: [
        { id: 5, shape: "circle", coords: [-10, -10, 10], preFillColor: "#000080" }
        ]
    });
    const handleUpdateMapArea = useCallback(
        (evt) =>
        (
            updateMapArea(5, [evt.nativeEvent.layerX, evt.nativeEvent.layerY]),
        setcoordinates([...coordinates,[evt.nativeEvent.layerX, evt.nativeEvent.layerY]]),
        []
        )
    );
    useEffect(() => {
        setQuery(Math.random());
    }, [mapAreas]);

    const updateMapArea = (id, coords) => {
        console.log(id, coords);
        const areas = mapAreas.areas.map((item) =>
        item.id === id ? { ...item, coords } : item
        );
        setMapAreas({
        name: mapAreas.name,
        areas
        });
    };
    console.log(coordinates)
    const [values, setValues] = useState({
        email: '',
        error: '',
        loading:'',
        success: false,
    });
    const { email, success, error ,loading} = values;
    const clickSubmit = (event) => {
        event.preventDefault(); // so that browser does not reload
        setValues({ ...values, error: false ,loading:true});
        const data1 = {
            "id":JSON.parse(localStorage.getItem('userid')),
            "points":coordinates
        }
        fetch(`https://api-dakato.herokuapp.com/login`, {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1),
            }).then((data) => {
                
        if (data.status!==200) {
            setValues({ ...values, error: "something went wrong", loading:false,success: false });
        } else {
            setValues({
            ...values,
            email: '',
            error: '',
            loading:false,
            success: true,
            });
            data.text().then((text)=>{
                localStorage.setItem("jwt",text);
            })
        }
        });
    };
    
    const redirectUser = () => {
        if (isAuthenticated()) {
        return <Redirect to='/' />;
        }
    };
    
    function images(){
        return(
            <div style={{ display: 'flex' ,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                {loading && <>
                    <Box sx={{ width: '100%',maxWidth:'400px',margin:'50px auto 20px auto' }}>
                        <LinearProgress />
                    </Box>
                </>}
                <div className="mapper">
                    
                    <ImageMapper 
                        src={'https://api-dakato.herokuapp.com/image/'+JSON.parse(localStorage.getItem('userid'))}
                        onImageClick={handleUpdateMapArea}
                        width={400}
                        map={mapAreas}
                        
                    /> 
                    {coordinates.map((person,i) => {
                            return (
                                <span key={i} className="delts " style={{
                                    backgroundColor:'#000080',
                                    position:'absolute',
                                    top:`${person[1]-10}px`,
                                    left:`${person[0]-10}px`,
                                    height:'20px',
                                    width:'20px',
                                    borderRadius:'50%',
                                    zIndex:'100'
                                }}></span>
                            )
                        })}
                </div> 
                
            </div>
        );
    }
    return (
            <>
             {redirectUser()}
                <Layout>
                <div className='Gpa'>
                    <div className='gpa_head'>
                        <h1 className='Gpa_title'>Graphical Password Authentication</h1>  
                        <p className='gpa_desc'>Upload Images for sequence authentication</p>
                    </div>
                    {images()}
                    <div className='btns' style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                    <button className='btn' onClick={clickSubmit}
                    >
                    Login
                </button> 
                </div>
                </div>
                
                </Layout>
            </>
    );
    }

    export default Signinmap;