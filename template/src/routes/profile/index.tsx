import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import * as style from './style.css';

export interface ProfileProps {
	user?: any;
}	

export interface ProfileState {
	time: number;
	count: number;
}

export default class Profile extends Component<ProfileProps, ProfileState> {
	timer: any;

	state = {
		time: Date.now(),
		count: 10
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// update the current time
	updateTime = () => {
		this.setState({ time: Date.now() });
	};

	increment = () => {
		this.setState({ count: this.state.count+1 });
	};

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }: ProfileProps, { time, count }:ProfileState) {
		return (
			<div class={style.profile}>
				<h1>Profile: {user}</h1>
				<p>This is the user profile for a user named { user }.</p>

				<div>Current time: {new Date(time).toLocaleString()}</div>

				<p>
					<Button raised ripple onClick={this.increment}>Click Me</Button>
					{' '}
					Clicked {count} times.
				</p>
			</div>
		);
	}
}
