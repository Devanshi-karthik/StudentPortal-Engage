import React, { useEffect, useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import MiniDrawer from '../components/SideDrawer';
import './postpage.css'
import BoxSx from '../components/Imagebox';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { getallposts } from '../Apicalls';
import MasonryImageList from '../components/Imagelist'
import { Postcontext } from '../contextApi/PostContext';
const useStyles = makeStyles({
    wall:{
        background:'#252525',
        height: 1000 ,
    },
  });

const Postpage=()=> {
    const classes = useStyles();
    const [postdata,setpostdata]=useState([])
    const  id  = useParams().id;
    const {posts,isFetching,error, dispatch}=useContext(Postcontext)
   
  const  getaposts2=async()=>{

    getallposts(dispatch)

   }
 
    const getpost=async()=>{
        try{
            const response=await axios.get(`http://localhost:3000/api/post/${id}`)
           
            setpostdata(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    
   

    useEffect(()=>{
         getpost()
         getaposts2()
    },[])
    return (
        <div className={classes.wall}>
           <MiniDrawer/>
           <Container sx={{
              
             display: 'flex' ,
             justifyContent:'center',
             marginTop:10,
           }}>
               <BoxSx data={postdata}/>
           </Container>
           {
                posts!=null?
                <Container disableGutters={true} maxWidth={false} sx={{
                    background:'#252525' ,
                     paddingTop:{xs:'5rem',md:'8rem'},
                     paddingLeft:{xs:'0.5rem',sm:'5rem'},
                    
                     
                }}>
                        <MasonryImageList imagedata={posts} />
                </Container>
           
           :null
            }
           
        </div>
        
    )
}

export default Postpage
