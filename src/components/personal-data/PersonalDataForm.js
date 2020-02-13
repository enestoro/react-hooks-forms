import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 40
  }
});

export const personalDataFormSchema = {
  firstName: yup.string().required('Is required'),
  surname: yup.string().required('Is required'),
  email: yup
    .string()
    .required('Is required')
    .email('Invalid format'),
  repeatEmail: yup
    .string()
    .required('Is required')
    .email('Invalid format')
    .oneOf([yup.ref('email'), null], 'Emails are not the same')
};

export default function PersonalDataForm() {
  const classes = useStyles();
  const { register, errors } = useFormContext();

  return (
    <div className={classes.container}>
      <Typography variant="h6" align="left">
        Personal Data
      </Typography>
      <TextField
        name="firstName"
        label="First name"
        error={!!errors.firstName}
        inputRef={register}
        helperText={errors.firstName ? errors.firstName.message : ''}
      />
      <TextField
        name="surname"
        error={!!errors.surname}
        inputRef={register}
        helperText={errors.surname ? errors.surname.message : ''}
        label="Surname"
      />
      <TextField
        name="email"
        error={!!errors.email}
        inputRef={register}
        helperText={errors.email ? errors.email.message : ''}
        label="Email"
      />
      <TextField
        name="repeatEmail"
        error={!!errors.repeatEmail}
        inputRef={register}
        helperText={errors.repeatEmail ? errors.repeatEmail.message : ''}
        label="Repeat your email"
      />
    </div>
  );
}
