import React, { useState, useCallback, useEffect, useRef } from "react";
import ImageMapper from 'react-img-mapper';
import Slider from '@mui/material/Slider';
import Layout from "./Layout";

const Signinmap = props => {
        const [query, setQuery] = useState(1);
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
    const clickSubmit = (e)=>{
        e.preventDefault();
        console.log("firstnv vbvnbmbmbnbbjbnjdvvdb");
    }
    useEffect(() => {
        location.reload();
    }, [])
    
    function images(){
        return(
            <div style={{ display: 'flex' ,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
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
                    Register    
                </button> 
                </div>
                </div>
                
                </Layout>
            </>
    );
    }

    export default Signinmap;