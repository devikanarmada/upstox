import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import { connect } from "react-redux";
import { storeOhlcData } from '../../redux/actions'
var CanvasJSChart = CanvasJSReact.CanvasJSChart

class LiveOhlcChart extends Component {
	constructor(props) {
		super(props);
		this.formattedData = [];
		this.state = {
			data: null,

		};
	}

	componentDidMount() {
		fetch("http://kaboom.rksv.net/api/historical?interval=1")
			.then(response => response.json())
			.then(data => this.setState({ data }, () => {
				if (data.length > 0) {
					this.props.storeOhlcData(data)
				}
			}));

	}

	formatData() {
		this.props.liveData && this.props.liveData.forEach(item => {

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

			this.formattedData = this.formattedData.concat({ x: new Date(formatted_string), y: [Number(itemArr[1]), Number(itemArr[2]), Number(itemArr[3]), Number(itemArr[4])] })

		})
	}
	render() {
		this.formatData();
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			zoomType: "xy",
			theme: "light2",
			exportFileName: "StockChart",
			title: {
				text: "Live OHLC Chart"
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
			data: [{
				type: "ohlc",
				yValueFormatString: "$###0.00",
				xValueFormatString: "MMM YYYY",
				dataPoints: this.formattedData
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
const mapDispatchToProps = dispatch => ({
	storeOhlcData: data => dispatch(storeOhlcData(data))
})
const mapStateToProps = state => ({
	liveData: state.ohlc && state.ohlc.ohlcData,
});
export default connect(mapStateToProps, mapDispatchToProps)(LiveOhlcChart);
