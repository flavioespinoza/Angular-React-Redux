"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";

import { drawOnCanvas, renderSVG } from "./EdgeCoordinateV3";
import GenericChartComponent from "../GenericChartComponent";
import { getMouseCanvas } from "../GenericComponent";

import { isNotDefined } from "../utils";

class MouseCoordinateX extends Component {
	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
		this.drawOnCanvas = this.drawOnCanvas.bind(this);
	}
	drawOnCanvas(ctx, moreProps) {
		const props = helper(this.props, moreProps);
		if (isNotDefined(props)) return null;

		drawOnCanvas(ctx, props);
	}
	renderSVG(moreProps) {
		const props = helper(this.props, moreProps);
		if (isNotDefined(props)) return null;

		return renderSVG(props);
	}
	render() {
		return <GenericChartComponent
			svgDraw={this.renderSVG}
			clip={false}
			canvasDraw={this.drawOnCanvas}
			canvasToDraw={getMouseCanvas}
			drawOn={["mousemove", "pan", "drag"]}
		/>;
	}
}

MouseCoordinateX.propTypes = {
	displayFormat: PropTypes.func.isRequired,
	yAxisPad: PropTypes.number,
	rectWidth: PropTypes.number,
	rectHeight: PropTypes.number,
	orient: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	at: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	fill: PropTypes.string,
	opacity: PropTypes.number,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	textFill: PropTypes.string,
	snapX: PropTypes.bool
};

function customX(props, moreProps) {
	const { xScale, xAccessor, currentItem, mouseXY } = moreProps;
	const { snapX } = props;
	const x = snapX
		? xScale(xAccessor(currentItem))
		: mouseXY[0];

	const { displayXAccessor } = moreProps;
	const { displayFormat } = props;
	const coordinate = snapX
		? displayFormat(displayXAccessor(currentItem))
		: displayFormat(xScale.invert(x));
	return { x, coordinate };
}

MouseCoordinateX.defaultProps = {
	yAxisPad: 0,
	rectWidth: 80,
	rectHeight: 20,
	orient: "bottom",
	at: "bottom",
	fill: "#b5b5b5",
	opacity: 1,
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
	fontSize: 11,
	textFill: "#1b1b1b",
	snapX: true,
	customX: customX,
};

function helper(props, moreProps) {
	const { show, currentItem } = moreProps;
	const { chartConfig: { height } } = moreProps;

	if (isNotDefined(currentItem)) return null;

	const { customX } = props;

	const { orient, at, rectWidth, rectHeight } = props;
	const { fill, opacity, fontFamily, fontSize, textFill } = props;

	// console.log(x)
	const edgeAt = (at === "bottom")
		? height
		: 0;

	const {
		x,
		coordinate
	 } = customX(props, moreProps);

	const type = "vertical";
	const y1 = 0, y2 = height;
	const hideLine = true;

	const coordinateProps = {
		coordinate,
		show,
		type,
		orient,
		edgeAt,
		hideLine,
		fill, opacity, fontFamily, fontSize, textFill,
		rectWidth,
		rectHeight,
		arrowWidth: 0,
		x1: x,
		x2: x,
		y1,
		y2
	};
	return coordinateProps;
}

export default MouseCoordinateX;
