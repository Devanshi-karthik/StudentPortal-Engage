import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardActionArea , Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import  './subject.css';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({   
   box:{
        boxShadow: '15px 15px 20px rgba(130, 130, 130, 0.5)'

   },

    contentCard:{
        textAlign: 'center',
        height:'300px',
        position: 'relative',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f0f0f0',
        
    },

    text:{
        textDecoration:'none'
    },

    

    dabba:{
        backgroundColor:'white',
        height:'99%',
        width:'99%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '10px',
        paddingTop: '30px',
        
    },

    year:{
        backgroundColor: '#a6a6a6',
        color: 'white',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        padding: '20px'
    },

    branch:{
        backgroundColor: '#a6a6a6',
        color: 'white',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '15px',
        padding: '20px'

    },
    
    contents:{
        display: 'flex',
        marginTop:'auto',
        marginBottom: '20px',
        alignItems: 'center',
        gap: '15px'
    }
    
    
    
  }));

function SubjectCard (props) {
    var subjectLoc=props.subjects;
    const styles = useStyles();
    return (
        <div>
            
            <Box className={styles.box} >
                            <Link className={styles.text} to ={{pathname : `/${subjectLoc.subjectCode}/doubts` , state : {detail : subjectLoc}}} >
                                <Card  >
                                    <CardActionArea >
                                    <CardContent className = {styles.contentCard}>
                                    <div className={styles.dabba}>
                                    <Typography style={{fontWeight: '700'}}  variant="h4"  gutterBottom>
                                        {subjectLoc.subjectCode}
                                        </Typography> 
                                        <Typography style = {{fontSize:'28px',}}style = {{fontSize:'28px'}}   variant="body1" component="p">
                                        {subjectLoc.subjectName}
                                        </Typography>
                                        <div className = {styles.contents}>
                                        <Typography style = {{fontSize:'28px'}} className = {styles.year}>
                                            { subjectLoc.subjectYear} 
                                        </Typography>
                                         <Typography style = {{fontSize:'28px'}} className = {styles.branch}>
                                            {subjectLoc.subjectDept}
                                        </Typography>
                                        </div>
                                        
                                    </div>
                                        
                                        
                                        <div>
                                        </div>
                                    </CardContent>
                                    </CardActionArea>
                                    
                                </Card>
                            </Link>
                </Box>
        </div>
    )
}
export default SubjectCard;