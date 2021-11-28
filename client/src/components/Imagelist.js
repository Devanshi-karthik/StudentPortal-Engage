import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './images.css'
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';



export default function MasonryImageList(props) {
  
  var w = window.innerWidth;
  var h = window.innerHeight;
  let col=0
  if (w>500 &&h>500){
     col=3
  }
  else{
     col=2
  }
  return (
    <Box sx={{ width: "100%", height: "auto", overflowY: 'scroll',paddingX:{xs:'0rem',sm:'2rem'} }}>
      <ImageList variant="masonry" cols={col} gap={10}>
        {props.imagedata.map((item) => (
            
            
              <Link
              to={'/postpage/'+ item._id}
              >
            <ImageListItem key={item.img}  sx={{
              overflow:'hidden',
              borderRadius: 10 ,
              marginX:1
            }}>
              <Container
               disableGutters={true}
            sx={
              {
                maxHeight: {xs:'auto',sm:'auto'},
                maxWidth:{xs:'auto',md:'auto'},
               
              }
            }
              > 
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                className='cover'
              />
              </Container>
              <ImageListItemBar
            title={item.title}
            subtitle={item.desc}
            sx={{
              overflow: 'hidden',
              width: "auto",
              textAlign:'center',
              margin: "auto",
              display:{xs:'none',sm:'flex'}

            }}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)',marginRight:10 }}
                aria-label={`info about ${item.title}`}
              >
                <FavoriteBorderIcon/>
              </IconButton>
            }
          />
            </ImageListItem>
            </Link>
        ))}
      </ImageList>
    </Box>
  );
}

