import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x46728D24FC5e93Fa8479e636Ff60b71DE7764e6d'
)

export default instance;