import React, { useState, useCallback, useEffect, useRef } from "react";
import ImageMapper from 'react-img-mapper';
import Slider from '@mui/material/Slider';

const Mapper = props => {
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
            updateMapArea(5, [evt.nativeEvent.layerX, evt.nativeEvent.layerY, 10]),
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
 
    return (
            <>
                <div className="ranger">
                    <Slider
                        size="small"
                        defaultValue={0}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={400}
                        
                    />    
                </div>
                <div className="mapper">
                
                <ImageMapper 
                    src={props.src}
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
                <div className="gridlines">
                    </div>
            </div>
            </>
    );
    }

    export default Mapper;