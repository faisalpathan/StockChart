import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';

class OHLCChart extends PureComponent {
	getStartAndEndExtents = (data, xAccessor) => {
		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		return [start, end];
	};

	handleChartGraphComponent = () => {
		return (
			<Chart id={1} yExtents={[d => [d.high, d.low]]}>
				<XAxis axisAt="bottom" orient="bottom" />
				<YAxis axisAt="right" orient="right" ticks={5} />
				<MouseCoordinateY at="right" orient="right" displayFormat={format('.2f')} />
				<CandlestickSeries />
				<OHLCTooltip forChart={1} origin={[-40, 0]} />
			</Chart>
		);
	};

	handleHoverActionComponent = () => {
		return (
			<Chart id={2} height={150} yExtents={d => d.volume} origin={(_, h) => [0, h - 150]}>
				<MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat('%Y-%m-%d')} />
			</Chart>
		);
	};

	render() {
		const { type, data: initialData, width, ratio } = this.props;
		const { chartCanvasContainerStyle } = styles;
		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
		const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);
		const xExtents = this.getStartAndEndExtents(data, xAccessor);

		return (
			<ChartCanvas
				height={400}
				ratio={ratio}
				width={width}
				margin={chartCanvasContainerStyle}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				{this.handleChartGraphComponent()}
				{this.handleHoverActionComponent()}
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

const styles = {
	chartCanvasContainerStyle: {
		left: 70,
		right: 70,
		top: 10,
		bottom: 30,
	},
};

OHLCChart.propTypes = {
	data: PropTypes.array,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
};

OHLCChart.defaultProps = {
	type: 'svg',
	data: [],
};
OHLCChart = fitWidth(OHLCChart);

export default OHLCChart;
