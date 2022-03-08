import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
export default function Map(props) {
    const [userinfo, setUserInfo] = useState({
        languages: [],
        response: [],
    });
    const [values, setValues] = useState({
        email: '',
        error: '',
        loading:'',
        success: false,
    });
    const { email, success, error,loading } = values;
    const [row, setrow] = useState(100)
    const handlechangegrid = (e)=>{
        setrow(e.target.value);
    }
    console.log(row)
    const [seq, setseq] = useState(-1);
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { languages } = userinfo;
        setseq(seq+1);
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
    console.log(userinfo.languages)
    const clickSubmit = (event) => {
        event.preventDefault(); // so that browser does not reload
        setValues({ ...values, error: false,loading:true });
        const form = new FormData();
        form.append("img",props.image[0]);
        form.append("accuracy",row);
        form.append("points",JSON.stringify(userinfo.languages));
        const send =async()=>{
            try{
                const res = await axios.post("https://api-dakato.herokuapp.com/set-password",form,
                                                    {
                                                        withCredentials:true,
                                                        headers:{
                                                            'Content-Type': 'multipart/form-data'
                                                        }
                                                    }
                                                );
                                                console.log(res)
                if(res.status===200){
                    setValues({
                        ...values,
                        email: '',
                        error: '',
                        loading:false,
                        success: true,
                        });
                }else if(res.status!==200) {
                    setValues({ ...values, error: "something went wrong", success: false ,loading:false});
                }
            }catch(err){
                console.log(err);
                setValues({ ...values, error: "something went wrong", success: false,loading:false });
            }
        }
        send();
        
    };
    
    console.log(userinfo)
    const showError = () => (
        <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none',width:'400px' }}
        >
        {error}
        </div>
    );
    
    const showSuccess = () => (
        <div
        className='alert alert-info'
        style={{ display: success ? '' : 'none' ,width:'400px'}}
        >
        New account is created. Please <Link to='/signin'>Signin</Link>.
        </div>
    );
    
    function grid(row,seq){
        var grids=[];
        for(let i=0;i<(Math.round(400/row * 400/row));i++){
            grids.push(<div style={{height:`${row}px`,width:`${row}px`}} className="divspan">

                <input className="checks" type="checkbox" id={i} value={i+1} onChange={handleChange} hidden/>
                <label className="labels" htmlFor={i}>{userinfo.languages[seq]===i+1 ? seq+1 : ''}</label>
            </div>);
        }
        return grids;
    }
    console.log(seq)
    console.log(userinfo.languages[seq])
    return (
        <>
            {loading && <>
                    <Box sx={{ width: '100%',maxWidth:'400px',margin:'50px auto 20px auto' }}>
                        <LinearProgress />
                    </Box>
                </>}
            {showError()}
            {showSuccess()}
            
            <div className="ranger">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Height * width</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={row}
                    label="Age"
                    onChange={handlechangegrid}
                    >
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={80}>80</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <br />
                
            <div className='Mappers'>
                <img src={props.src} alt='' />
                <div className='grids'>
                    {grid(row,seq)}    
                </div>    
                <div className='btns' style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                    <button className='btn' disabled={userinfo.languages.length===3 ? false : true} onClick={clickSubmit}
                    >
                    Register    
                </button> 
                    </div>
            </div>
        </>
    )
}
