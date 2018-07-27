//app should now do very little but orchestrate containers
//app -> matchlistcontainer -> matchList -> matchcontainer -> match -> teamcontainer -> team
//team container needs button that prompts user to send X eth with metamask

import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';

import MatchFactoryContract from '../build/contracts/MatchFactory.json';
import MatchList from './Components/MatchList.js';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import '.css/MatchListContainer.css';

const MatchListContainer = (props) => {
    return (
        <div>
            <MatchList 
                matchFactoryInstance = {props.matchFactoryInstance} 
                web3 = {props.web3}
            />
        </div>
    );
}

export default MatchListContainer