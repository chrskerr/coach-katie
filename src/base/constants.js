
const intensityOptions = [
	{ label: "Recovery", value: "1" },
	{ label: "Low", value: "2" },
	{ label: "Moderate", value: "3" },
	{ label: "High", value: "4" },
	{ label: "Very High", value: "5" },
];

const workoutTypes = [
	{ label: "Long Aerobic", value: "long-aerobic", system: "2 aerobic" },
	{ label: "Short Aerobic", value: "short-aerobic", system: "2 aerobic" },
	{ label: "Recovery", value: "recovery", system: "1 recovery" },
	{ label: "Intervals", value: "intervals", system: "4 atp" },
	{ label: "Strength", value: "strength", system: "4 atp" },
	{ label: "Tempo Run", value: "tempo", system: "3 anaerobic" },
	{ label: "Speed Play", value: "speed-play", system: "3 anaerobic" },
	{ label: "Hills", value: "hills", system: "3 anaerobic" },
];

export default {
	intensityOptions,
	workoutTypes,
};
