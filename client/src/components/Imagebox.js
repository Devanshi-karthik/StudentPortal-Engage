import * as React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { Chip, Container, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './images.css'
import MasonryImageList from './Imagelist';
export default function BoxSx(props) {


  return (
    <Box
      sx={{
        width: {sm:800,xs:'100%'},
        display:'flex',
        flexDirection:{xs:'column',sm:'row'},
        flexWrap:'true',
        overflow:'hidden',
        height: 'auto',
        borderRadius: 10,
        border:5,
        borderColor :'#5727A3',
        
        backgroundColor: '#252525',
        '&:hover': {
          backgroundColor: '#252525',
          
        },
      }}
    >
      
      <Container
      disableGutters={true}
      sx={{
         maxHeight: {xs:'auto',sm:'auto'},
                maxWidth:{xs:'auto',md:'auto'},
            overflow:'hidden',
      }}
      >
        <Paper
       elevation={5} 
       sx={{
        backgroundColor: '#5727A3',
      }}
      >
        <img src={props.data.img} className='cover'/>
        </Paper>
      </Container>
      

      <Container
      sx={{
        display:'flex',
        flexWrap:'true',
        flexDirection:'column',
      }}
      >
        <Paper
        elevation={3} 
        sx={{
          backgroundColor: '#5727A3',
          marginY:2,
          maxWidth:'fit-content',
          paddingX:2

        }}
        >
        <Typography variant="h3" sx={{color:'white'}}>
            {props.data.title}
        </Typography>
          </Paper>
        <Typography variant="body1" sx={{color:'white'}}>
            {props.data.desc}
        </Typography>
        <Box sx={{  display: 'flex',
          justifyContent: 'space-around', }}>
        <Chip icon={<AddIcon/>} label="Follow" sx={{
          backgroundColor: '#5727A3',
          color:'white'
        }} />
         <Chip icon={<FavoriteBorderIcon/>} label="Like" sx={{
          backgroundColor: '#5727A3',
          color:'white'
        }} />
          </Box>
       
        
      </Container>
      
      </Box>

  );
}