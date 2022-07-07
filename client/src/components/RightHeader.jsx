import { Typography, Button, Grid } from '@mui/material';

export default function RightHeader({ userEmail, share, logout }) {
  const handleLogout = () => {
    logout();
  };

  const handleShare = () => {
    share();
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: 'right',
        alignItems: 'center',
      }}
    >
      <Grid item>
        <Typography>Welcome {userEmail}</Typography>
      </Grid>
      <Grid item>
        <Button onClick={handleShare} variant='contained'>
          Share a movie
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={handleLogout} variant='contained'>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}
