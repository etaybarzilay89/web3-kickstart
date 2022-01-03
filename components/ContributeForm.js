import React, {useState} from 'react';
import {Button, Form, Input, Message} from 'semantic-ui-react';
import campaignInstance from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from '../routes';

const ContributeForm = (props) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const campaign = campaignInstance(props.address);

    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });

      Router.replaceRoute(`/campaigns/${props.address}`);
    } catch (err) {
      setErrorMessage(err.message)
    }

    setLoading(false);
    setValue('');

  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage}/>
      <Button primary loading={loading}>
         Contribute
      </Button>
    </Form>
  )
}

export default ContributeForm;