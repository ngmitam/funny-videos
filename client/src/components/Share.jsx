import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { Grid, TextField, Button } from '@mui/material';

import { useIsAuthenticated } from '../utils/authHooks';

import VideoClient from '../rest_client/videoClient';

const YoutubeURLRegEx =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const Form = () => {
  const [videoURL, setVideoURL] = useState('');
  const [videoURLError, setVideoURLError] = useState('');
  const navigate = useNavigate();

  const validateURL = (e) => {
    const url = e.target.value;
    if (YoutubeURLRegEx.test(url)) {
      setVideoURLError('');
      setVideoURL(url);
    } else {
      setVideoURLError('Invalid Youtube URL');
      setVideoURL('');
    }
  };

  const handleShare = async () => {
    if (!videoURL) return;

    const videoClient = new VideoClient();
    const res = await videoClient.share(videoURL);
    if (!res?.body?.data) return;
    // dispatch(shareAction({ videoURL: videoURL, user: userEmail }));
    return navigate('/', { replace: true });
  };

  return (
    <form>
      <Grid
        container
        direction='column'
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0px',
        }}
      >
        <Grid
          item
          sx={{
            marginBottom: '10px',
          }}
        >
          <TextField
            error={!!videoURLError}
            label='Youtube URL'
            variant='standard'
            onChange={validateURL}
            helperText={videoURLError}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleShare} variant='contained' color='primary'>
            Share
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const Share = () => {
  const authenticated = useIsAuthenticated();

  return !authenticated ? <Navigate to='/' /> : <Form />;
};
export default Share;
