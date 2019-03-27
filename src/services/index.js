import axios from 'axios';
import Constants from '../Constants';

export const getOhlcForStock = () =>
	axios({
		method: 'GET',
		url: `${Constants.SOURCE_URL}/api/historical?interval=1`,
		validateStatus: status => status < 506,
	});
