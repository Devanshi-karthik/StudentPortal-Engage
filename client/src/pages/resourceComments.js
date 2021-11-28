import React, { useEffect, useState } from "react";
import MiniDrawer from '../components/SideDrawer';
import ResourceCard from "../components/resourceCard";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import axios from "axios";
import { useLocation } from "react-router";
import CommentCard from "../components/commentCard";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ResourceComment =(props)=>{
    toast.configure();
    var commentLoc=  props.location.query.detail.resources;


    const newCommentParam ={
        user: localStorage.getItem('userId'),
        resource: commentLoc.id,
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
           
         
            return await axios.post(`http://localhost:5000/api/resourceComments`, newComment).then((res)=>{
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
           
            const response= await axios.get(`http://localhost:5000/api/resources/${commentLoc.id}`);
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
           <div style={{paddingTop:100}}>
               <ResourceCard key= {commentLoc.id} resources={commentLoc}>

               </ResourceCard>
           </div>
           <div>
              <Box>
              <TextField
                    style={{ width: '100%', borderRadius: '5px' }}
                    placeholder="write some comments"
                    label="Resource "
                    name="content"
                    onChange={(e) => {
                        onInputchange(e);
                    }}
                />
                <br />
                <Button onClick ={() => postComment()}>submit comment</Button>
               
              </Box>
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

export default ResourceComment;