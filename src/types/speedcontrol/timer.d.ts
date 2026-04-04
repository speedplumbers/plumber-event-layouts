export interface Timer {
	time: string;
	state: "stopped" | "running" | "paused" | "finished";
	milliseconds: number;
	timestamp: number;
	teamFinishTimes: {
		[k: string]: {
			time: string;
			state: "forfeit" | "completed";
			milliseconds: number;
			timestamp: number;
		};
	};
}
