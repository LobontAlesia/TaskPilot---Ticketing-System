import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register, updateProgrammingLanguages } from '../../actions/auth';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from '../../utils/formStyles';

const CMultiSelect = ({ options, value, onChange, ...props }) => {
  const classes = useStyles();

  const [selectedOptions, setSelectedOptions] = useState(value || []);

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Select
      multiple
      value={selectedOptions}
      onChange={handleChange}
      className={classes.select}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );

};


const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    programmingLanguages: [], // Use an array for multi-select
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    document.title = 'TaskPilot | Sign Up';
  }, []);

  const { name, email, password, password2, programmingLanguages } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'error'));
    } else {
      // Dispatch register action with programming languages
      dispatch(register({ name, email, password, programmingLanguages }));
    }
  };
  
  const onProgrammingLanguagesChange = (selectedOptions) => {
    // Update local state
    setFormData({ ...formData, programmingLanguages: selectedOptions });
  };

  const onSaveProgrammingLanguages = () => {
    // Dispatch updateProgrammingLanguages action
    dispatch(updateProgrammingLanguages(programmingLanguages));
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }


  return (
    <Container component='main' maxWidth='xs' className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h4'>
          TaskPilot
        </Typography>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                fullWidth
                label='Your Name'
                autoFocus
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password2'
                label='Confirm Password'
                type='password'
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
          <CMultiSelect
            clearSearchOnSelect
            options={[
              'JavaScript',
              'Node.js',
              'Python',
              'Ruby',
              'Java',
              'PHP',
              'Laravel',
              'C#',
              'C/C++',
            ]}
            value={programmingLanguages}
            onChange={onProgrammingLanguagesChange}
          />
        </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
};

export default Register;