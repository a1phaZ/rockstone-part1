import {useEffect, useState} from "react";

export const useTime = () => {
	const locale = 'ru';
	const timeout = 1000;
	const [now, setDate] = useState(new Date());
	
	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, timeout);
		return () => {
			clearInterval(timer);
		}
	}, []);
	
	const time = now.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' });
	
	return {
		time
	}
}