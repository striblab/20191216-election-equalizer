import App from './App.svelte';
import './scss/style.scss';
import ConfettiGenerator from "confetti-js";

const app = new App({
	target: document.body,
	props: {
		'title': 'Star Tribune Minnesota election equalizer'
	}
});

window.app = app;

export default app;

var controller = new ScrollMagic.Controller();

var tableHeight = document.getElementById("table").offsetHeight;



var scene = new ScrollMagic.Scene({triggerElement: "#year-comparison"})
	.setPin("#year-comparison", {pushFollowers: false})
	.setClassToggle("#year-comparison", "fixed")
	.addTo(controller);
var triggerHook = scene.triggerHook(0);

if (window.innerWidth > 900) {
	var scene = new ScrollMagic.Scene({triggerElement: ".sticky", duration: tableHeight, offset: -200})
		.setPin(".sticky", {pushFollowers: false})
		.addTo(controller);
	var triggerHook = scene.triggerHook(0);

} else {
	var scene = new ScrollMagic.Scene({triggerElement: ".sticky", duration: tableHeight, offset: -170})
		.setPin(".sticky", {pushFollowers: false})
		.addTo(controller);
	var triggerHook = scene.triggerHook(0);
}

var biden = document.getElementById("biden-nav");
var trump = document.getElementById("trump-nav");

if (proj_d_votes_statewide > proj_r_votes_statewide) {
	console.log('biden winner')
	var confettiSettings = { colors: '[ [40, 116, 166], [52, 152, 219], [174, 214, 241] ]', "height":"200", target: 'my-canvas', respawn: false};
	var confetti = new ConfettiGenerator(confettiSettings);
	confetti.render();
	setTimeout(function(){ confetti.clear() }, 2000);
} else {
	var confettiSettings = { colors: '[ [176, 58, 46], [231, 76, 60], [203, 67, 53] ]', "height":"200", target: 'my-canvas', respawn: false };
	var confetti = new ConfettiGenerator(confettiSettings);
	confetti.render();
	setTimeout(function(){ confetti.clear() }, 2000);
}


