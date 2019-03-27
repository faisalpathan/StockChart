import { getOhlcForStock } from '../services';

const remapStockData = stockData => {
	const remappedStockData = [];
	for (let i = 0; i < stockData.length; i++) {
		const formattedData = stockData[i].split(',');
		const eachParsedStockData = {
			date: new Date(parseInt(formattedData[0])),
			open: parseFloat(formattedData[1]),
			high: parseFloat(formattedData[2]),
			low: parseFloat(formattedData[3]),
			close: parseFloat(formattedData[4]),
			volume: parseFloat(formattedData[5]),
		};
		remappedStockData.push(eachParsedStockData);
	}
	return remappedStockData;
};

export const getStockData = async () => {
	try {
		const ohlcStockData = await getOhlcForStock();
		return remapStockData(ohlcStockData.data);
	} catch (error) {
		throw error;
	}
};
