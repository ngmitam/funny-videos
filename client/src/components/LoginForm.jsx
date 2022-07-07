import { useState } from 'react';

import { TextField, Button, Grid } from '@mui/material';

import validator from 'validator';

export default function LoginForm({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (e) => {
    const email = e.target.value;

    if (validator.isEmail(email)) {
      setEmail(email);
      setEmailError('');
    } else {
      setEmailError('Invalid Email :)');
      setEmail('');
    }
  };

  const handleLogin = () => {
    if (!email) return setEmailError('Invalid Email :)');
    login(email, password);
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
        <TextField
          error={!!emailError}
          label='email'
          variant='standard'
          type={'email'}
          onChange={validateEmail}
          helperText={emailError}
        />
      </Grid>
      <Grid item>
        <TextField
          label='password'
          variant='standard'
          value={password}
          type={'password'}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button onClick={handleLogin} variant='contained'>
          Login / Register
        </Button>
      </Grid>
    </Grid>
  );
}
