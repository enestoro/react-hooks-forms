import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import * as yup from 'yup';
import { useFormContext } from 'react-hook-form';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 40
  }
});

const countries = ['Germany', 'Great Britain', 'Italy', 'Poland'];

export const addressValidationSchema = {
  street: yup.string().required('Is required'),
  houseNo: yup.string().required('Is required'),
  zipCode: yup.string().required('Is required'),
  city: yup.string().required('Is required'),
  country: yup.string().required('Is required')
};

export const shippingAddressDataFormSchema = {
  shippingAddress: yup.object().shape(addressValidationSchema)
};

export default function AddressDataForm(props) {
  const classes = useStyles();
  useEffect(() => {
    register({ name: `${addressType}.country` });
  }, []);
  const addressType = props.addressType;
  const { register, errors, setValue, getValues } = useFormContext();
  const [country, setCountry] = React.useState('');
  const handleChange = event => {
    setCountry(event.target.value);
    setValue(`${addressType}.country`, event.target.value, true);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h6" align="left">
        {props.header}
      </Typography>
      <TextField
        name={`${addressType}.street`}
        error={!!errors[`${addressType}.street`]}
        inputRef={register}
        helperText={errors[`${addressType}.street`] ? errors[`${addressType}.street`].message : ''}
        label="Street"
      />
      <TextField
        name={`${addressType}.houseNo`}
        error={!!errors[`${addressType}.houseNo`]}
        inputRef={register}
        helperText={errors[`${addressType}.houseNo`] ? errors[`${addressType}.houseNo`].message : ''}
        label="House no"
      />
      <TextField
        name={`${addressType}.zipCode`}
        error={!!errors[`${addressType}.zipCode`]}
        inputRef={register}
        helperText={errors[`${addressType}.zipCode`] ? errors[`${addressType}.zipCode`].message : ''}
        label="Zip code"
      />
      <TextField
        name={`${addressType}.city`}
        error={!!errors[`${addressType}.city`]}
        inputRef={register}
        helperText={errors[`${addressType}.city`] ? errors[`${addressType}.city`].message : ''}
        label="City"
      />
      <TextField
        name={`${addressType}.country`}
        error={!!errors[`${addressType}.country`]}
        helperText={errors[`${addressType}.country`] ? errors[`${addressType}.country`].message : ''}
        select
        label="Country"
        value={country}
        onChange={handleChange}
      >
        {countries.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
