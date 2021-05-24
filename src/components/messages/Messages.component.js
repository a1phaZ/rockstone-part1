import React, {Component} from 'react';
import MessagesList from "./Messages.List.component";

class Messages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			scroll: this.props.getScroll(this.props.id),
		}
		
		this.setMessage = this.setMessage.bind(this);
		this.scrollHandler = this.scrollHandler.bind(this);
	}
	
	setMessage = (message) => {
		this.setState({message});
	}
	
	scrollHandler = (e) => {
		this.setState({x: e.target.documentElement.scrollLeft, y: e.target.documentElement.scrollTop});
	}
	
	componentDidMount() {
		document.documentElement.scrollTop = this.state.scroll.y;
		document.documentElement.scrollLeft = this.state.scroll.x;
		
		window.addEventListener('scroll', this.scrollHandler);
	}
	
	componentWillUnmount() {
		this.props.setScrollPosition(this.props.id, this.state.x || 0, this.state.y || 0);
		window.removeEventListener('scroll', this.scrollHandler);
	}
	
	render() {
		const {setMessages, messages, className} = this.props;
		const {setMessage} = this;
		const {message} = this.state;
		
		return (
			<div
				className={className}
			>
				<form
					className={'row align-items-center'}
					onSubmit={e => {
						e.preventDefault();
						setMessages(message);
						setMessage('');
					}}
				>
					<div className={'col-8'}>
							<textarea
								value={message}
								className={'form-control'}
								onChange={(e) => {
									const {value} = e.currentTarget;
									this.setMessage(value);
								}}
							/>
					</div>
					<div className={'col-4'}>
						<button className={'btn btn-primary'}>Send</button>
					</div>
				
				</form>
				<MessagesList messages={messages}/>
			</div>
		)
	}
	
}

export default Messages;