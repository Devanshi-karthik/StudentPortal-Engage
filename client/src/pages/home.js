import React, { useEffect, useState,useContext } from 'react'
import './home.css'
import MiniDrawer from '../components/SideDrawer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { CardActionArea , Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import SubjectCard from '../components/subjectCard';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const useStyles = makeStyles(() => ({
 
    container:{
        padding: "55px",
       
        
    },

    
    
  }));

 
function Home() {
    const styles = useStyles();
    const [subjectData , setSubjectData] = useState([]);
    const [searchbarstate,setSearchbarState] = useState("");
    const [storeSub,setStoreSub]=useState([]);
    useEffect ( ()=>{
        
        setSubjectData(storeSub.filter((s)=> {
            return (s.subjectCode.toLowerCase().includes(searchbarstate.toLowerCase()) || s.subjectName.toLowerCase().includes(searchbarstate.toLowerCase()));
        }))
    },[searchbarstate])
    const getSubjects=async()=>{
        try{
            const response=await axios.get(`http://localhost:5000/api/subjects`)
          
            setSubjectData(response.data.data);
            setStoreSub(response.data.data);
            
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
         getSubjects()
    },[])
    return (
        <div >
          
            <MiniDrawer state= {setSearchbarState}/>
            <div style = {{ paddingTop: 100}} >
            <Grid spacing={5} className= {styles.container}  container >
            {subjectData.map((subject) => (
                <Grid item xs={12} sm={6} md={3} >
                     <SubjectCard key= {subject.subjectCode} subjects={subject} >

                     </SubjectCard>
                            
                      
                </Grid>
            ))
                }
            </Grid>
            
            </div>
        </div>
    )
}



export default Home
