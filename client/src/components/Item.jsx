import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { Grid, Skeleton, Typography } from '@mui/material';

/**
 * get the video metadata from the youtube api
 * @param {string} videoURL
 * @returns
 */
const getMetadata = async (videoURL) => {
  const requestUrl = `https://youtube.com/oembed?url=${videoURL}&format=json`;
  const result = await axios.get(requestUrl);
  return result.data;
};

const ItemRight = ({ videoMetadata, user }) => {
  return (
    <Grid item container alignItems='left' direction='column'>
      <Grid
        item
        sx={{
          color: 'red',
        }}
      >
        {videoMetadata?.title ? (
          <Typography>{videoMetadata?.title}</Typography>
        ) : (
          <Skeleton />
        )}
      </Grid>
      <Grid item>
        <Typography>Shared by: {user}</Typography>
      </Grid>
    </Grid>
  );
};

const Item = ({ videoURL, user }) => {
  const [videoMetadata, setVideoMetadata] = useState();

  useEffect(() => {
    getMetadata(videoURL).then((data) => {
      setVideoMetadata(data);
    });
  }, [videoURL]);

  // get the video id from the url
  const url = new URL(videoURL);
  let videoId = '';
  switch (url.hostname) {
    case 'youtu.be': // youtu.be/<id>
      videoId = url.pathname.substring(1);
      break;
    case 'www.youtube.com': // www.youtube.com/watch?v=<id>
    case 'm.youtube.com': // m.youtube.com/watch?v=<id>
      videoId = url.searchParams.get('v');
      break;
    default:
      videoId = ''; // Or whatever default you want
  }

  const opts = {
    height: '195',
    width: '320',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        margin: '20px 0',
      }}
    >
      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'center', lg: 'flex-end' },
          alignItems: { xs: 'center', md: 'center', lg: 'flex-end' },
          paddingRight: { xs: '0px', md: '0px', lg: '20px' },
        }}
      >
        <YouTube videoId={videoId} opts={opts} />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'center', lg: 'flex-start' },
          alignItems: { xs: 'center', md: 'center', lg: 'flex-start' },
          paddingLeft: { xs: '0px', md: '0px', lg: '20px' },
        }}
      >
        <ItemRight videoMetadata={videoMetadata} user={user} />
      </Grid>
    </Grid>
  );
};

export default Item;
