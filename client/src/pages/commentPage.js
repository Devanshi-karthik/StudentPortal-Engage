
import React, { useEffect, useState } from "react";
import MiniDrawer from '../components/SideDrawer';
import InfoCard from "../components/infoCard";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import axios from "axios";
import { useLocation } from "react-router";
import CommentCard from "../components/commentCard";
import { Card, CardContent, Divider, Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles(({ spacing, palette }) => ({
   infobox :{
    paddingTop:100
   },
   box:{
    padding: '15px 0',
    height: 'auto', 
    borderRadius: 16,
    width: '100vw',
    display :'flex',
    justifyContent: 'center',
    flexGrow:1,
    alignItems:'center',
   },
  }));
  
function CommentPage  (props) {
    toast.configure();
    const styles = useStyles();
    var commentLoc=  props.location.query.detail.doubts;


    const newCommentParam ={
        user: localStorage.getItem('userId'),
        doubt: commentLoc.id,
        content: "",
        subject: commentLoc.subject
    }

    const [postNewComment, setPostNewComment] = useState(newCommentParam);
    const [getComments,setGetComments] = useState([]);
    const onInputchange = (e) =>{

        setPostNewComment({...postNewComment,[e.target.name]: e.target.value})
    }
    
    const createComment=async(newComment)=>{
        try{
           
         
            return await axios.post(`http://localhost:5000/api/doubtComments`, newComment).then((res)=>{
                toast.success('Posted Comment sucessfully!', {position : toast.POSITION.TOP_RIGHT});
            });
           
            
        }
        catch(error){
            console.log(error)
            toast.error('Please try again', {position : toast.POSITION.TOP_RIGHT})
        }
    }
    
    const getAllComments=async()=>{
        try{
           
            const response= await axios.get(`http://localhost:5000/api/doubts/${commentLoc.id}`);
            setGetComments(response.data.data.comments);
        
            
        }
        catch(error){
            console.log(error)
        }
    }
    
    useEffect( ()=> {
        getAllComments();
    },[])

    const postComment = async () => {
        
        let response= await createComment(postNewComment);
        if(response)
        {
            getAllComments();
        }
    
    }
    
    return (
        <div>
           <MiniDrawer/>
           <div className={styles.infobox}>
               <InfoCard key= {commentLoc.id} doubts={commentLoc}>

               </InfoCard>
           </div>
           <div>
                
                <Box sx ={{ paddingLeft:15, paddingTop:5 , paddingRight:15 , height: 'auto' , width:'auto', backgroundColor : 'grey'}}>
                <Card style ={{minHeight: 150 ,minWidth: 200, borderRadius: 3,}}>
                <CardContent>
                    <Typography style={{margin:10}}>
                        Post a comment!
                    </Typography>
                    <div style={{margin:10}} >
    
                    <TextField 
                        
                        required
                        id="outlined-required"
                        label="write a comment"
                        fullWidth
                        name = "content"
                        onChange={(e) => {
                            onInputchange(e);
                        }}
                    />
                    </div>
                    <Box style={{margin:10}}>
                    <Button variant="outlined" onClick ={() => postComment()} >Post comment</Button>
                    </Box>
                </CardContent>
    
            </Card>
            </Box>
                    
                </div>
            <div>
                <h3 style ={{ padding:15 , backgroundColor : 'grey'}} >comments: </h3>
                <Divider></Divider>
            </div>
           <div>
                {getComments.map((comment) => (
                    
                    <CommentCard  key = {comment.id} comments = {comment} >

                    </CommentCard>
                
                )
                )}
            </div>
           
           
           
        </div>
       
    )
}

export default CommentPage;