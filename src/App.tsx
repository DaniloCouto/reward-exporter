import React, { useState, useLayoutEffect } from 'react';
import { APP_CLIENT_ID, REDIRECT_URL, SCOPE_CHANNEL_REWARDS } from './utils/constants'
import { getLocalStorage, setLocalStorage } from './utils/localstore';
import RewardExport from './components/RewardExport';
import { getAttributeOnHash } from './utils/hashUtils';
import { Grid } from '@mui/material';


const App = () => {
    const [token, setToken ] = useState<string>('')
    const twitchOauth2 = encodeURI(`response_type=token&client_id=${APP_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPE_CHANNEL_REWARDS}`)

    useLayoutEffect(() => {
        const fragment = window.location.hash
        console.log('fragment', fragment)
        const localToken = getLocalStorage('TOKEN')
        
        if(fragment){
            const access_token = getAttributeOnHash(fragment, 'access_token' )
            if(access_token){
                setToken(access_token)
                setLocalStorage('TOKEN', access_token)
                return
            }
        }
        if(localToken){
            setToken(localToken)
        }
    }, [])

    console.log('token',token)
    
    if(!token){
        return (
          <Grid container justifyContent="center" alignContent="center" sx={{height: '100%'}}>
            <Grid item>
              <a href={`https://id.twitch.tv/oauth2/authorize?${twitchOauth2}`}>Connect with Twitch</a>
            </Grid>
          </Grid>
        )
    }

    return (
      <Grid container justifyContent="center" alignContent="center" sx={{height: '100%'}}>
        <Grid item>
          <RewardExport token={token} />
        </Grid>
      </Grid>
    )
    
}

export default App;