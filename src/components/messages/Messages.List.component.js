import React, {useEffect, useState} from 'react';
import './styles.css';

const MessagesList = ({messages}) => {
	const [length, setLength] = useState(() => messages.length);
	const [className, setClassName] = useState('');
	
	useEffect(() => {
		const mLength = messages.length;
		if (length < mLength) {
			setLength(mLength);
			setClassName('scale-up-hor-left');
		}
	}, [messages, length]);
	
	const list = messages.map((message, key) => {
		const animClassName = (key === messages.length - 1) ? className : null;
		return (
			<p
				key={key}
				className={animClassName}
			>
				{message}
			</p>
		);
	});
	return (
		<div className={'messages-list'}>
			{list}
		</div>
	)
}

export default MessagesList;
