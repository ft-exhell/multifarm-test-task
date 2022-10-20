import { Grid } from '@mui/material';
import TvlChart from './components/TvlChart'

import './App.css'

const App = () => {
  return(
    <div id='root'>
      <Grid 
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{ height: '100vh' }}
      >
          <Grid item >
              <TvlChart
                  url='https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_asset_details/ETH_Convex_steth'
              />     
          </Grid>
      </Grid>
    </div>
  )
}

export default App;