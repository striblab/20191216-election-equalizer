import App from './App.svelte';
import './scss/style.scss';

const app = new App({
	target: document.getElementById('proj-container'),
	props: {
		'title': 'Star Tribune Minnesota election equalizer'
	}
});

window.app = app;

export default app;



