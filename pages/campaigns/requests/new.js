import React, {useState} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import web3 from "../../../ethereum/web3";
import campaignInstance from '../../../ethereum/campaign';
import {Link, Router} from '../../../routes'
import Layout from '../../../components/Layout';

const RequestNew = (props) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const campaign = campaignInstance(props.address);
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({ from: accounts[0] })

      Router.pushRoute(`/campaigns/${props.address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  }

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage}/>
        <Button primary loading={loading}>Create!</Button>
      </Form>
    </Layout>
  )
}

RequestNew.getInitialProps = (props) => {
  const { address } = props.query;

  return { address };
}
export default RequestNew;