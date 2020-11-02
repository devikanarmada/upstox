import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart

class OhlcChart extends Component {
	constructor(props) {
		super(props);
		this.formattedOhlcData = [];
		this.formattedVolumeData = [];
		this.state = {
			data: null,

		};
	}

	componentDidMount() {
		fetch("http://kaboom.rksv.net/api/historical?interval=1")
			.then(response => response.json())
			.then(data => this.setState({ data }));
	}

	formatData() {
		this.state.data && this.state.data.forEach(item => {

			const itemArr = item.split(',')
			let timestamp = Number(itemArr[0]);
			let date_not_formatted = new Date(timestamp);

			let formatted_string = date_not_formatted.getFullYear() + "-";

			if (date_not_formatted.getMonth() < 9) {
				formatted_string += "0";
			}
			formatted_string += (date_not_formatted.getMonth() + 1);
			formatted_string += "-";

			if (date_not_formatted.getDate() < 10) {
				formatted_string += "0";
			}
			formatted_string += date_not_formatted.getDate();

			this.formattedOhlcData = this.formattedOhlcData.concat({ x: new Date(formatted_string), y: [Number(itemArr[1]), Number(itemArr[2]), Number(itemArr[3]), Number(itemArr[4])] })
			this.formattedVolumeData = this.formattedVolumeData.concat({ x: new Date(formatted_string), y: Number(itemArr[5]) })

		})
	}
	render() {
		this.formatData();
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			exportFileName: "StockChart",
			title: {
				text: "OHLC Chart"
			},
			axisX: {
				interval: 1,
				intervalType: "month",
				valueFormatString: "MMM"
			},
			axisY: {
				includeZero: false,
				prefix: "$",
				title: "Price (in USD)"
			},
			axisY2: {
				title: "Volume",
			},
			data: [{
				type: "ohlc",
				yValueFormatString: "$###0.00",
				xValueFormatString: "MMM YYYY",
				dataPoints: this.formattedOhlcData
			},
			{
				type: "line",
				axisYType: "secondary",
				markerSize: 6,
				name: "Volume",
				showInLegend: true,
				dataPoints: this.formattedVolumeData
			}]
		}

		return (
			<div>
				<h1>React OHLC Chart</h1>
				<CanvasJSChart options={options}
				/>

			</div>
		);
	}
}

export default OhlcChart;