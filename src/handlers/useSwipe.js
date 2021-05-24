import {useEffect, useState} from "react";

export const useSwipe = (x) => {
	const [forward, setForward] = useState(false);
	const [back, setBack] = useState(false);
	const [cX, setX] = useState(() => x);
	const [initialX, setInitialX] = useState(null);
	const delta = window.outerWidth / 2;
	
	useEffect(() => {
		if (back || forward) {
			setInitialX(null);
			setBack(false);
			setForward(false);
			return;
		}
		if (initialX) {
			if ((cX - initialX > delta) && !forward) {
				setForward(true);
				setInitialX(null);
			}
			if ((initialX - cX > delta) && !back) {
				setBack(true);
				setInitialX(null);
			}
			return;
		}
		setInitialX(cX);
	}, [initialX, cX, back, forward, delta]);
	
	const setClientX = (x) => {
		setX(x);
	}
	
	return [
		{
			forward,
			back
		},
		setClientX
	]
}