import React, { useEffect, useState,useContext } from 'react'
import './home.css'
import MiniDrawer from '../components/SideDrawer';
import {Tab , Tabs , AppBar} from '@material-ui/core'
import DoubtPage from './doubtPage';
import ResourcePage from './resourcePage';





const SubjectPage = (props) => {
  
  const subjectDetail =  props.location.state.detail;
  const { match, history } = props;
  const { params } = match;
  const { page } = params;
  const tabNameToIndex = {
    0: "doubts",
    1: "resources"
  };

  const indexToTabName = {
    doubts: 0,
    resources: 1
  };
  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push({pathname : `/${subjectDetail.subjectCode}/${tabNameToIndex[newValue]}`, state : {detail : subjectDetail}} );
    setSelectedTab(newValue);
  };





    return (
        <div >
            <MiniDrawer/>
            <div style ={{margin:70, display:'flex' , justifyContent:'center', alignContent:'center'}}>
              <div style={{margin:10 , fontSize:30}}>
              {subjectDetail.subjectCode}
              </div>
              <div style={{margin:10 , fontSize:30}}>
              {subjectDetail.subjectName}
              </div>
              
            </div>
            <div >
                <Tabs value={selectedTab} onChange={handleChange} centered TabIndicatorProps={{style: {background:'#5727A3'}}}>
                    <Tab label="Doubts" style = {{fontSize: 25}}/>
                    <Tab label="Resources" style = {{fontSize: 25}}  />
                </Tabs>
                { selectedTab === 0 && <DoubtPage/> }
                { selectedTab === 1 && <ResourcePage/> }
            </div>
         </div>
        
    )
}

export default SubjectPage;