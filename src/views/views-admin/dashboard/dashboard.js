
// deps
import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSubscription } from "@apollo/react-hooks";
import { ResponsiveBump } from "@nivo/bump";
import { ResponsiveStream } from "@nivo/stream";
import { parseISO } from "date-fns";
import _ from "lodash";

// app
import { Pane, Heading } from "evergreen-ui";
import { Queries, constants, Loading } from "../index";

//
// Adultletics Admin / Views / Dashboard / Dashboard
//


export default function Dashboard () {
	const { data, loading } = useSubscription( Queries.weeks.subscribeAll );    
	const weeks = [ ..._.get( data, "weeks", []) ].sort(( a, b ) => parseISO( a.week_start ) - parseISO( b.week_start ));

	if ( loading ) return <Loading />;

	return (
		<Pane className="v-dashboard">
			<Pane display="flex" marginBottom={ 48 }>
				<Heading size={ 800 } color="#1070CA">Dashboard</Heading>
			</Pane>
			<Pane height={ 450 } elevation={ 1 } background="white" padding={ 24 } marginBottom={ 24 }>
				<Heading size={ 300 }>{ _.upperCase( "Workout popularity over time" ) }</Heading>
				<WorkoutPopularityChart weeks={ weeks } />
			</Pane>
			<Pane height={ 300 } elevation={ 1 } background="white" padding={ 24 } marginBottom={ 24 }>
				<Heading size={ 300 }>{ _.upperCase( "Workout types over time" ) }</Heading>
				<WorkoutTypeChart weeks={ weeks } />
			</Pane>
			<Pane height={ 300 } elevation={ 1 } background="white" padding={ 24 } marginBottom={ 24 }>
				<Heading size={ 300 }>{ _.upperCase( "Energy systems over time" ) }</Heading>
				<EnergySystemsChart weeks={ weeks } />
			</Pane>
		</Pane>
	);
}



const WorkoutTypeChart = memo( function WorkoutPopularityChart ( props ) {
	const { weeks } = props;
	const { workoutTypes } = constants;
	const typeList = [];

	const lastTenWeekWeightedCounts = _.compact( _.map( _.rangeRight( 0, 10 ), i => {
		const end = _.size( weeks ) - i;
		if ( end < 0 ) return false;

		const start = end - 10 < 0 ? 0 : end - 10;
		const loopData = _.slice( weeks, start, end );

		return _.reduce( loopData, ( total, curr, i ) => {
			return _.reduce( _.get( curr, "days", []), ( total, curr ) => {
				const type = _.get( _.find( workoutTypes, [ "value", _.get( curr, "workout.workout.type" ) ]), "label" );
				if ( !type ) return total;
				if ( !typeList.includes( type )) typeList.push( type );
				const value = _.get( total, [ "data", type ], 0 ) + ( 1 - (( 10 - i ) / 11 ));
				return { ...total, data: { ...total.data, [ type ]: value }};
			}, { ...total });
		}, { label: i, data: {}});
	}));
    
	const lastTenWeekRanks = _.map( lastTenWeekWeightedCounts, week => {
		const weekAsSortedArrayPairs = _.toPairs( _.get( week, "data" )).sort(( a, b ) => b[ 1 ] - a[ 1 ]);
		return { ...week, data: _.reduce( weekAsSortedArrayPairs, ( total, curr, i ) => ({ ...total, [ curr[ 0 ] ]: i + 1 }), {}) };
	});
    
	const graphData = _.map( typeList, type => ({
		id: type,
		data: _.map( lastTenWeekRanks, week => ({ "x": _.get( week, "label" ), "y": _.get( week, [ "data", type ], _.size( typeList )) })),
	}));

	if ( _.isEmpty( graphData )) return null;

	return (
		<ResponsiveBump
			data={ graphData }
			margin={{ top: 40, right: 150, bottom: 60, left: 60 }}
			colors={{ scheme: "category10" }}
			lineWidth={ 2 }
			activeLineWidth={ 4 }
			inactiveLineWidth={ 2 }
			inactiveOpacity={ 0.6 }
			pointSize={ 5 }
			activePointSize={ 10 }
			inactivePointSize={ 0 }
			pointColor={{ theme: "background" }}
			pointBorderWidth={ 3 }
			activePointBorderWidth={ 3 }
			pointBorderColor={{ from: "serie.color" }}
			axisTop={ null }
			axisRight={ null }
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Weeks ago",
				legendPosition: "middle",
				legendOffset: 32,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Rank",
				legendPosition: "middle",
				legendOffset: -40,
			}}
			endLabelPadding={ 8 }
		/>
	);
}, _.isEqual );
WorkoutTypeChart.propTypes = {
	weeks: PropTypes.array,
};



const WorkoutPopularityChart = memo( function WorkoutPopularityChart ( props ) {
	const { weeks } = props;
	const workoutList = [];

	const lastTenWeekWeightedCounts = _.compact( _.map( _.rangeRight( 0, 10 ), i => {
		const end = _.size( weeks ) - i;
		if ( end <= 0 ) return false;

		const start = end - 10 < 0 ? 0 : end - 10;
		const loopData = _.slice( weeks, start, end );

		return _.reduce( loopData, ( total, curr, i ) => {
			return _.reduce( _.get( curr, "days", []), ( total, curr ) => {
				const title = _.get( curr, "workout.workout.title" );
				const type = _.get( curr, "workout.workout.type" );
				if ( !title || type === "recovery" ) return total;
				if ( !workoutList.includes( title )) workoutList.push( title );
				const value = _.get( total, [ "data", title ], 0 ) + ( 1 - (( 10 - i ) / 11 ));
				return { ...total, data: { ...total.data, [ title ]: value }};
			}, { ...total });
		}, { label: i, data: {}});
	}));
    
	const lastTenWeekRanks = _.map( lastTenWeekWeightedCounts, week => {
		const weekAsSortedArrayPairs = _.toPairs( _.get( week, "data" )).sort(( a, b ) => b[ 1 ] - a[ 1 ]);
		return { ...week, data: _.reduce( weekAsSortedArrayPairs, ( total, curr, i ) => ({ ...total, [ curr[ 0 ] ]: i + 1 }), {}) };
	});
    
	const graphData = _.filter( _.map( workoutList, workout => ({
		id: workout,
		data: _.map( lastTenWeekRanks, week => ({ "x": _.get( week, "label" ), "y": _.get( week, [ "data", workout ], _.size( workoutList )) })),
	})), ({ data }) => _.get( _.last( data ), "x" ) <= 12 );

	if ( _.isEmpty( graphData )) return null;

	return (
		<ResponsiveBump
			data={ graphData }
			margin={{ top: 40, right: 150, bottom: 60, left: 60 }}
			colors={{ scheme: "category10" }}
			lineWidth={ 2 }
			activeLineWidth={ 4 }
			inactiveLineWidth={ 2 }
			inactiveOpacity={ 0.6 }
			pointSize={ 5 }
			activePointSize={ 10 }
			inactivePointSize={ 0 }
			pointColor={{ theme: "background" }}
			pointBorderWidth={ 3 }
			activePointBorderWidth={ 3 }
			pointBorderColor={{ from: "serie.color" }}
			axisTop={ null }
			axisRight={ null }
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Weeks ago",
				legendPosition: "middle",
				legendOffset: 32,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Rank",
				legendPosition: "middle",
				legendOffset: -40,
			}}
			endLabelPadding={ 8 }
		/>
	);
}, _.isEqual );
WorkoutPopularityChart.propTypes = {
	weeks: PropTypes.array,
};



const EnergySystemsChart = memo( function EnergySystemsChart ( props ) {
	const { weeks } = props;
	const { workoutTypes } = constants;
    
	const keys = _.uniq( _.map( workoutTypes, "system" )).sort();
	const keysObject = _.reduce( keys, ( total, curr ) => ({ ...total, [ curr ]: 0 }), {});

	const graphData = _.map( weeks, ({ days }) => {
		return _.reduce( days, ( total, curr ) => {
			const type = _.get( curr, "workout.workout.type" );
			if ( !type ) return total;

			const workoutTypesObject = _.find( workoutTypes, [ "value", type ]);
			const system = _.get( workoutTypesObject, "system", "missing" );
			return { ...total, [ system ]: total[ system ] ? total[ system ] + 1 : 1 };
		}, { ...keysObject });
	});
    
	if ( _.isEmpty( graphData )) return null;

	return <ResponsiveStream
		data={ graphData }
		keys={ keys }
		margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
		axisTop={ null }
		axisRight={ null }
		axisBottom={ null }
		axisLeft={ null }
		offsetType="none"
		order="none"
		// curve="natural"
		colors={{ scheme: "category10" }}
		fillOpacity={ 0.85 }
		legends={[
			{
				anchor: "bottom-right",
				direction: "column",
				translateX: 100,
				itemWidth: 80,
				itemHeight: 20,
				itemTextColor: "#999999",
				symbolSize: 12,
				symbolShape: "circle",
				effects: [
					{
						on: "hover",
						style: {
							itemTextColor: "#000000",
						},
					},
				],
			},
		]}
	/>;
}, _.isEqual );
EnergySystemsChart.propTypes = {
	weeks: PropTypes.array,
};
