import { Button, makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import instance from '../axios';
import requests from '../Requests'

const Banner = () => {
  const classes = useStyles();
  const truncate = (string, n) => string?.length > n ? `${string.substr(0, n-1)} ...` : string;
  const[movie,setMovies] = useState([]);

  useEffect(()=>{
    const fetchData = async () =>{
      const request = await instance.get(requests.fetchNetflixOriginals)
      const random = Math.floor(Math.random()* request.data.results.length -1)
      setMovies(request.data.results[random])
      return request
    }
    fetchData()
  }, [])

  return (
    <div className={classes.root} style={{
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
    }}>
       <div className={classes.content}>
          <div className={classes.title}>
            <Typography variant='h2' component='h1'>
                {movie?.title || movie?.name || movie?.original_name}
            </Typography>
          </div>
          <div className={classes.buttons}>
              <Button>Play</Button>
              <Button>My List</Button>
          </div>
          <Typography style={{ wordWrap: "break-word" }} variant='h6' className={classes.description}>
            {truncate(movie?.overview, 160)}
              
          </Typography>
          <div className={classes.fadeBottom}></div>
       </div>
    </div>
  )
}

const useStyles = makeStyles((theme) =>({
    root: {
        position: 'relative',
        height:"440px",
        objectFit:'contain',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color:"#fff",
    },
   
    buttons:{
        "& button":{
          cursor: 'pointer',
          color: '#fff',
          marginLeft:'1rem',
          fontWeight: 700,
          borderRadius: '5px',
          padding: theme.spacing(1, 4, 1, 4),
          marginRight: '1rem',
          backgroundColor: "rgba(51,51,51,0.5)",
        },
        "& button:hover":{
          color:"#000",
          backgroundColor: "#e6e6e6",
        },
    
    },
    fadeBottom:{
      position:'absolute',
      top:'30vh',
      bottom:0,
      left: 0,
      right: 0,
      zIndex: 99,
      backgroundImage: "linear-gradient(180deg, transparent, rgba(37,37,37,0.61), #111)",
    },
    description:{
      marginRight: '1rem',
      marginLeft:'1rem',
      maxWidth:"440px",
    },
    title:{
      marginLeft:'1rem',
      paddingTop:'6rem'
    }
  }));

export default Banner