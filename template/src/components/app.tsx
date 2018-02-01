import { h, Component } from 'preact';
import Router from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from './header';

export interface AppProps { }

const getHome = () => import('../routes/home').then(x => x.default);
const getProfile = () => import('../routes/profile').then(x => x.default);

export default class App extends Component<AppProps, {}> {

	currentUrl: string;

	/** Fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<AsyncRoute path="/" getComponent={getHome} />
					<AsyncRoute path="/profile" user="me" getComponent={getProfile} />
					<AsyncRoute path="/profile/:user" getComponent={getProfile} />
				</Router>
			</div>
		);
	}
}
