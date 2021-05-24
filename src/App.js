import React, {useCallback, useEffect, useReducer} from 'react';
// import './App.css';
import Messages from "./components/messages/Messages.component";
import Time from "./components/time/Time.component";
import {useSwipe} from "./handlers/useSwipe";
import Wrapper from "./components/wrapper/Wrapper.component";

const initialState = {
	messages: [],
	panel: 'messages',
	time: new Date().getTime(),
	scrolls: []
}

function reducer(state, action) {
	switch (action.type) {
		case 'setMessages':
			return {
				...state,
				messages: [...state.messages, action.payload.message]
			}
		case 'setPanel': {
			return {
				...state,
				panel: action.payload.panel
			}
		}
		case 'setScroll': {
			return {
				...state,
				scrolls: {
				  ...state.scrolls,
				  [action.payload.id]: {
				    x: action.payload.x,
				    y: action.payload.y
				  }
				}
			}
		}
		default:
			return state;
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [{forward, back}, setX] = useSwipe(null);
	const {panel} = state;
	
	const swipePanel = useCallback((m) => {
		if (m !== 'time') {
			dispatch({type: 'setPanel', payload: {panel: 'time'}});
		}
		if (m !== 'messages') {
			dispatch({type: 'setPanel', payload: {panel: 'messages'}});
		}
	}, []);
	
	useEffect(() => {
		if (!forward && !back) return;
		if (forward) swipePanel('time');
		if (back) swipePanel('messages');
	}, [forward, back, swipePanel]);
	
	const setMessages = (message) => {
		dispatch({type: 'setMessages', payload: {message}});
	}
	
	const swipe = (e) => {
		setX(e.changedTouches[0].clientX);
	}
	
	const setScrollPosition = useCallback((id, x, y) => {
		dispatch({type: 'setScroll', payload: {id, x, y}})
	}, []);
	
	const getScroll = (id) => {
		if (!state.scrolls[id]) {
			return {x: 0, y: 0}
		}
		return {...state.scrolls[id]};
	}
	
	return (
		<div className="App container pt-3">
			<Wrapper
				id={state.panel}
				className={`${state.panel}-panel`}
				swipe={swipe}
			>
				{
					panel === 'messages' &&
					<Messages
						id={'messages'}
						className={'messages-panel'}
						messages={state.messages}
						setMessages={setMessages}
						getScroll={getScroll}
						setScrollPosition={setScrollPosition}
					/>
				}
				{
					panel === 'time' &&
					<Time />
				}
			</Wrapper>
		</div>
	);
}

export default App;
