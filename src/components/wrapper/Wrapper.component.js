import React from 'react';

const Wrapper = ({id, className, swipe, getScroll, setScrollPosition, children}) => {
	return (
		<div
			id={id}
			className={className}
			onTouchMove={(e) => {
				swipe(e);
			}}
		>
			{children}
		</div>
	)
}

export default Wrapper;
