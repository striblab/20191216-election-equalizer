import App from './App.svelte';
import './scss/style.scss';

const app = new App({
	target: document.body,
	props: {
		'title': 'Star Tribune Minnesota election equalizer'
	}
});

window.app = app;

export default app;

var controller = new ScrollMagic.Controller();

var scene = new ScrollMagic.Scene({triggerElement: "#year-comparison"})
	.setPin("#year-comparison", {pushFollowers: false})
	.setClassToggle("#year-comparison", "fixed")
	.addTo(controller);
var triggerHook = scene.triggerHook(0);

var scene = new ScrollMagic.Scene({ triggerElement: "div.scenario.third.clear"})
	  .on('enter', function() {
		resetDials();
	    console.log('passed')
	  })
	  .addTo(controller);
	var triggerHook = scene.triggerHook(0.5);

// var scene = new ScrollMagic.Scene({triggerElement: ".sticky"})
// 	.setPin(".sticky", {pushFollowers: false})
// 	.addTo(controller);
// var triggerHook = scene.triggerHook(0);



