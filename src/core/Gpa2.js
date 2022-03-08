import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Layout from './Layout'
import Map from './Map';
import Mapper from './Mapper';

export default function Gpa2() {
    const [row, setrow] = useState(1);
    const [image, setimage] = useState([]);
    const [imageData, setimageData] = useState([]);
    const [{alt, src}, setImg] = useState({
        src: '',
        alt: 'Upload an Image'
    });
    const history = useHistory();
    const handleProductPictures = (e) => {
        setimage([...image, e.target.files[0]]);
        if(e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });    
        }  
    };
    const handlec = (e) => {
        setimageData(["vbdnb"]);
    };
    console.log(imageData)
    const showSuccess = () => (
        <div
        className='alert alert-info'
        style={{ display: image.length>=1 ? '' : 'none' }}
        >
        Maximum Images reached so upload the images.
        </div>
    );
    const showremain = () => (
        <div
        className='alert alert-info'
        style={{ display: image.length>=1? 'none' : '' }}
        >
            {row*row - image.length+` images has to add`}
        </div>
    );
    
    function upload() {
        return (
            <div className="gpa_upload" style={{ display: image.length !== 0 ? 'none' : '' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {showSuccess()}
                        {showremain()}
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            name="upload-photo"
                            type="file"
                            accept=".png"
                            required
                            onChange={handleProductPictures}
                            // disabled={image.length == row * row ? true : false}
                             />
                        <p className='help'>{row != 0 && row * row + ` image to upload`}</p>
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
    function images(src){
        return(
            <div style={{ display: image.length>0?'flex':"none" ,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Map src={src} image={image}/> 
                
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
                    {upload()}
                    {images(src)}
                    
                </div>
            </Layout>
        </>
    )
}
