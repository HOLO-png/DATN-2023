import { Card, Grid, Typography, CardContent, CardActions } from '@mui/material'
import React from 'react'

function Login() {
  return (
    <div className='w-full h-screen flex justify-center align-middle bg-gray-main'>
      <div className='w-4/5 m-9 bg-gray-light rounded-2xl p-7'>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h1' className='text-7xl text-green-main font-sans font-normal antialiased tracking-wide text-center'>
              Welcome back
            </Typography>
            <Typography variant='h6' className='font-light italic text-base font-sans font-medium tracking-wide m-2 antialiased text-center text-green-sub'>
              Enjoy the facilities we bring 😊
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Typography className='text-base text-gray-text  font-medium tracking-wide antialiased'>
            Recent logins
          </Typography>
          <Grid item xs={12}>
            
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Login