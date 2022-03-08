import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import Layout from './Layout'
import Matrix from './Matrix';

export default function Gpa1(props) {
    const [row, setrow] = useState(3);
    const [image, setimage] = useState([]);
    const [imageData, setimageData] = useState([]);
    const [imgurl, setimgurl] = useState([]);
    const handleProductPictures = (e) => {
        setimage([...image, e.target.files[0]]);
        setimgurl([...imgurl,URL.createObjectURL(e.target.files[0])]);
    };
    console.log(image)
    let dummy=[];
    function twod(row,imgurl){
        
        console.log(row);
        for(let i=0;i<row;i++)dummy.push([]);
        console.log(dummy)
        for(let i=0;i<row*row;i++){
            let x=i/row;
            let y=i%row;
            dummy[Math.floor(x)][y]=image[i];
        }
        
    }
    console.log(dummy)
    {imgurl.length>=row*row && twod(row,imgurl)}
    
    const showSuccess = () => (
        <div
        className='alert alert-danger'
        style={{ display: image.length>=row*row ? '' : 'none' }}
        >
        Maximum Images reached so upload the images.
        </div>
    );
    const showremain = () => (
        <div
        className='alert alert-info'
        style={{ display: image.length>=row*row ? 'none' : '' }}
        >
            {row*row - image.length+` images has to add`}
        </div>
    );
    const upload = ()=>(
        <div className="gpa_upload" style={{ display: imageData.length!==0 ? 'none' : '' }} >
        <Grid container spacing={2}>
            <Grid item xs={12}>
            {showSuccess()}
            {showremain()}
                </Grid>
        <Grid item xs={12}>
            <TextField
                autoComplete='off'
                onChange={(e)=> setrow(e.target.value)}
                name='name'
                value={row}
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Matrix number'
                autoFocus
                helperText="Example 3 x 3 matrix, More than 3 "
                type='number'
                max='3'
            />
            </Grid>
            <Grid item xs={12}>
            <input
                name="upload-photo"
                type="file" 
                required
                multiple
                accept=".png"
                onChange={handleProductPictures}
                disabled={image.length==row*row ? true : false}
                />
                <p className='help'>{row!=0 && row*row+` image to upload`}</p>
            </Grid>
            {/* <Grid item xs={12}>
                <button className='btn'
                    disabled={image.length==row*row ? false : true}
                >
                    upload    
                </button>    
            </Grid> */}
        </Grid>
    </div>
    )
    return (
        <>
            <Layout>
                <div className='Gpa'>
                    <div className='gpa_head'>
                        <h1 className='Gpa_title'>Graphical Password Authentication</h1>  
                        <p className='gpa_desc'>Upload Images for sequence authentication</p>
                    </div>
                    {upload()}
                    {image.length>0 && <Matrix row={row} handle={props.handleNext}  imagedata={image} data={dummy} />}
                </div>
            </Layout>
        </>
    )
}
