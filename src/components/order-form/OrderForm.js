import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import React from 'react';
import PersonalDataForm, { personalDataFormSchema } from '../personal-data/PersonalDataForm';
import AddressDataForm, {
  addressValidationSchema
} from '../address-data/AddressDataForm';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useForm, { FormContext } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles({
  card: {
    marginLeft: 400,
    marginRight: 400,
    marginTop: 60,
    display: 'flex',
    flexDirection: 'column'
  },
  checkbox: {
    display: 'flex'
  },
  buttonsPanel: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const schema = yup.object().shape({
  ...personalDataFormSchema,
  shippingAddress: yup.object().shape(addressValidationSchema),
  shippingBillingAddressDiffer: yup.boolean(),
  billingAddress: yup.object().when('shippingBillingAddressDiffer', {
    is: true,
    then: yup.object().shape(addressValidationSchema)
  })
});

export default function OrderForm() {
  const classes = useStyles();
  let deliveryAddressForm;
  const [checked, setChecked] = React.useState(false);
  const handleChange = event => {
    setChecked(event.target.checked);
    methods.setValue('shippingBillingAddressDiffer', event.target.checked);
  };
  const methods = useForm({
    validationSchema: schema,
    mode: 'onBlur'
  });
  const onSubmit = data => {
    alert(JSON.stringify(data));
  };

  if (checked) {
    deliveryAddressForm = <AddressDataForm header="Delivery Address" addressType="billingAddress" />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <FormContext {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <PersonalDataForm />
            <AddressDataForm header="Shipping Address" addressType="shippingAddress" />
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox checked={checked} onChange={handleChange} inputRef={methods.register} name="shippingBillingAddressDiffer" />
              }
              label="Billing and shipping address are not the same"
            />
            {deliveryAddressForm}
            <CardActions className={classes.buttonsPanel}>
              <Button type="submit" size="small" variant="contained" color="primary" disabled={!methods.formState.isValid}>
                Order
              </Button>
            </CardActions>
          </form>
        </FormContext>
      </CardContent>
    </Card>
  );
}
