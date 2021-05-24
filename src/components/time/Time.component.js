import React from 'react';
import {useTime} from "../../handlers/useTime";
import './styles.css';

const Time = () => {
	const {time} = useTime();
	return (
			<p>{time}</p>
	)
}

export default Time;