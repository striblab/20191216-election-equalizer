<script>
	import CountyData from './data/mncounties.json'
	import County from './County.svelte';
	import RegionalStats from './RegionalStats.svelte';
	import { onMount } from 'svelte';
	import ConfettiGenerator from "confetti-js";

	const commaNumber = require('comma-number')

	import { eligible_voters_rural, eligible_voters_outstate, eligible_voters_suburban, eligible_voters_urban, total_votes_statewide_2016, r_votes_statewide_2016, d_votes_statewide_2016, proj_total_votes_statewide, proj_r_votes_statewide, proj_d_votes_statewide, total_votes_regional_2016_rural, total_votes_regional_2016_outstate, total_votes_regional_2016_suburban, total_votes_regional_2016_urban, r_votes_regional_2016_rural, r_votes_regional_2016_outstate, r_votes_regional_2016_suburban, r_votes_regional_2016_urban, d_votes_regional_2016_rural, d_votes_regional_2016_outstate, d_votes_regional_2016_suburban, d_votes_regional_2016_urban, proj_total_votes_regional_rural, proj_total_votes_regional_outstate, proj_total_votes_regional_suburban, proj_total_votes_regional_urban, proj_r_votes_regional_rural, proj_r_votes_regional_outstate, proj_r_votes_regional_suburban, proj_r_votes_regional_urban, proj_d_votes_regional_rural, proj_d_votes_regional_outstate, proj_d_votes_regional_suburban, proj_d_votes_regional_urban, excessive_turnout_rural, excessive_turnout_outstate, excessive_turnout_suburban, excessive_turnout_urban } from './stores.js';

	export let county_list = CountyData.sort( function( a, b ) {
	    return a.county < b.county ? -1 : a.county > b.county ? 1 : 0;
	});

	export let turnout_modifiers = {
		"rural": 0,
		"outstate city": 0,
		"suburban": 0,
		"urban": 0
	}

	export let partisan_modifiers = {
		"rural": 0,
		"outstate city": 0,
		"suburban": 0,
		"urban": 0
	}

	export let other_party_modifiers = {
		"rural": 0,
		"outstate city": 0,
		"suburban": 0,
		"urban": 0
	}

	export let other_party_partisan_modifiers = {
		"rural": 0.5,
		"outstate city": 0.5,
		"suburban": 0.5,
		"urban": 0.5
	}

	let proj_r_pct = 0;
	let proj_d_pct = 0;
	let d_pct_2016 = 0;
	let r_pct_2016 = 0;
	let total_votes_rural_2016 = 0;
	let turnout_rural_2016 = 0;
	let turnout_rural_projected = 0;

	let total_votes_outstate_2016 = 0;
	let turnout_outstate_2016 = 0;
	let turnout_outstate_projected = 0;

	let total_votes_suburban_2016 = 0;
	let turnout_suburban_2016 = 0;
	let turnout_suburban_projected = 0;

	let total_votes_urban_2016 = 0;
	let turnout_urban_2016 = 0;
	let turnout_urban_projected = 0;

	let d_pct_rural_2016 = 0;
	let d_pct_rural_projected = 0;
	let r_pct_rural_2016 = 0;
	let r_pct_rural_projected = 0;

	let d_pct_outstate_2016 = 0;
	let d_pct_outstate_projected = 0;
	let r_pct_outstate_2016 = 0;
	let r_pct_outstate_projected = 0;

	let d_pct_suburban_2016 = 0;
	let d_pct_suburban_projected = 0;
	let r_pct_suburban_2016 = 0;
	let r_pct_suburban_projected = 0;

	let d_pct_urban_2016 = 0;
	let d_pct_urban_projected = 0;
	let r_pct_urban_2016 = 0;
	let r_pct_urban_projected = 0;

	let bool_excessive_rural = false;
	let bool_excessive_outstate = false;
	let bool_excessive_suburban = false;
	let bool_excessive_urban = false;

	let confettiDem;
	let confettiGop;
	let last_winner = 'd';

	const check_length = function (array) {
		if (array.length > 0) {
			return true
		}
		return false
	}

	$ : {

		d_pct_2016 = Math.round(($d_votes_statewide_2016 / $total_votes_statewide_2016) * 1000) / 10;
		r_pct_2016 = Math.round(($r_votes_statewide_2016 / $total_votes_statewide_2016) * 1000) / 10;

		proj_r_pct = Math.round(($proj_r_votes_statewide / $proj_total_votes_statewide) * 1000) / 10;
		proj_d_pct = Math.round(($proj_d_votes_statewide / $proj_total_votes_statewide) * 1000) / 10;

		turnout_rural_2016 = Math.round(($total_votes_regional_2016_rural / $eligible_voters_rural) * 1000) / 10;
		turnout_rural_projected = Math.round(($proj_total_votes_regional_rural / $eligible_voters_rural) * 1000) / 10;

		turnout_outstate_2016 = Math.round(($total_votes_regional_2016_outstate / $eligible_voters_outstate) * 1000) / 10;
		turnout_outstate_projected = Math.round(($proj_total_votes_regional_outstate / $eligible_voters_outstate) * 1000) / 10;

		turnout_suburban_2016 = Math.round(($total_votes_regional_2016_suburban / $eligible_voters_suburban) * 1000) / 10;
		turnout_suburban_projected = Math.round(($proj_total_votes_regional_suburban / $eligible_voters_suburban) * 1000) / 10;

		turnout_urban_2016 = Math.round(($total_votes_regional_2016_urban / $eligible_voters_urban) * 1000) / 10;
		turnout_urban_projected = Math.round(($proj_total_votes_regional_urban / $eligible_voters_urban) * 1000) / 10;

		d_pct_rural_2016 = Math.round(($d_votes_regional_2016_rural / $total_votes_regional_2016_rural) * 1000) / 10;
		d_pct_rural_projected = Math.round(($proj_d_votes_regional_rural / $proj_total_votes_regional_rural) * 1000) / 10;
		r_pct_rural_2016 = Math.round(($r_votes_regional_2016_rural / $total_votes_regional_2016_rural) * 1000) / 10;
		r_pct_rural_projected = Math.round(($proj_r_votes_regional_rural / $proj_total_votes_regional_rural) * 1000) / 10;

		d_pct_outstate_2016 = Math.round(($d_votes_regional_2016_outstate / $total_votes_regional_2016_outstate) * 1000) / 10;
		d_pct_outstate_projected = Math.round(($proj_d_votes_regional_outstate / $proj_total_votes_regional_outstate) * 1000) / 10;
		r_pct_outstate_2016 = Math.round(($r_votes_regional_2016_outstate / $total_votes_regional_2016_outstate) * 1000) / 10;
		r_pct_outstate_projected = Math.round(($proj_r_votes_regional_outstate / $proj_total_votes_regional_outstate) * 1000) / 10;

		d_pct_suburban_2016 = Math.round(($d_votes_regional_2016_suburban / $total_votes_regional_2016_suburban) * 1000) / 10;
		d_pct_suburban_projected = Math.round(($proj_d_votes_regional_suburban / $proj_total_votes_regional_suburban) * 1000) / 10;
		r_pct_suburban_2016 = Math.round(($r_votes_regional_2016_suburban / $total_votes_regional_2016_suburban) * 1000) / 10;
		r_pct_suburban_projected = Math.round(($proj_r_votes_regional_suburban / $proj_total_votes_regional_suburban) * 1000) / 10;

		d_pct_urban_2016 = Math.round(($d_votes_regional_2016_urban / $total_votes_regional_2016_urban) * 1000) / 10;
		d_pct_urban_projected = Math.round(($proj_d_votes_regional_urban / $proj_total_votes_regional_urban) * 1000) / 10;
		r_pct_urban_2016 = Math.round(($r_votes_regional_2016_urban / $total_votes_regional_2016_urban) * 1000) / 10;
		r_pct_urban_projected = Math.round(($proj_r_votes_regional_urban / $proj_total_votes_regional_urban) * 1000) / 10;

		bool_excessive_rural = check_length($excessive_turnout_rural);
		bool_excessive_outstate = check_length($excessive_turnout_outstate);
		bool_excessive_suburban = check_length($excessive_turnout_suburban);
		bool_excessive_urban = check_length($excessive_turnout_urban);

		if ($proj_d_votes_statewide > $proj_r_votes_statewide && last_winner == 'r') {
			last_winner = 'd';
			console.log('new biden winner');
			buildConfetti('d');
			// confettiDem.clear()
			confettiDem.render();
			setTimeout(function() {
				confettiDem.clear()
			}, 4000);


		} else if ($proj_r_votes_statewide > $proj_d_votes_statewide && last_winner == 'd') {
			last_winner = 'r';
			console.log('new trump winner');
			buildConfetti('r');
			confettiGop.render();
			setTimeout(function() {
				confettiGop.clear()
			}, 4000);

		}
	}

	const turnout_display = function (modifier) {
		if (modifier == 0) {
			return 'Same as 2016'
		} else {
			return `<b>${100 + modifier}%</b> of 2016`
		}
	}

	const partisan_display = function (modifier) {
		if (modifier == 0) {
			return 'Same as 2016'
		} else if (modifier > 0) {
			return `<b>${modifier}</b> points more GOP`
		} else if (modifier < 0) {
			return `<b>${Math.abs(modifier)}</b> points more Dem`
		}
	}

	let resetDials = function () {
		partisan_modifiers = {
			"rural": 0,
			"outstate city": 0,
			"suburban": 0,
			"urban": 0,
		}

		turnout_modifiers = {
			"rural": 0,
			"outstate city": 0,
			"suburban": 0,
			"urban": 0
		}

		other_party_modifiers = {
			"rural": 0,
			"outstate city": 0,
			"suburban": 0,
			"urban": 0
		}

		other_party_partisan_modifiers = {  // What share of new other votes go to Rs
			"rural": 0.5,
			"outstate city": 0.5,
			"suburban": 0.5,
			"urban": 0.5
		}
	}

	let myFunction = function () {
	  var element = document.getElementById("project-wrapper");
	  element.classList.toggle("expanded");
	}

	let scenario2 = function () {
	  var ruralP = document.getElementById("rural-p");
	  var ruralD = document.getElementById("rural-d");
	  ruralD.value = "10";
	}

	const buildConfetti = function (party) {
		var biden = document.getElementById("biden-nav");
		var trump = document.getElementById("trump-nav");
		var sadBiden = document.getElementById("sadBiden");
		var sadTrump = document.getElementById("sadTrump");
		var confettiSettings = {
				// colors: [[40,116,166], [52,152,219], [174,214,241]],
				"height": "200",
				// target: 'canvas-dem',
				respawn: false,
				clock: 25
		};

		if (party == 'd') {
			// Build Dem
			confettiSettings.colors = [[40,116,166], [52,152,219], [174,214,241]];
			confettiSettings.target = 'canvas-dem';
			confettiDem = new ConfettiGenerator(confettiSettings);
			sadTrump.classList.add('show');
			sadBiden.classList.remove('show');
		} else if (party == 'r') {
			// Build GOP
			confettiSettings.colors = [[176,58,46], [231,76,60], [203,67,53]];
			confettiSettings.target = 'canvas-gop';
			confettiGop = new ConfettiGenerator(confettiSettings);
			sadBiden.classList.add('show');
			sadTrump.classList.remove('show');
		}
	}

	onMount(async () => {

		var controller = new ScrollMagic.Controller();

		var tableHeight = document.getElementById("table").offsetHeight;

		var scene = new ScrollMagic.Scene({triggerElement: "#year-comparison"})
			.setPin("#year-comparison", {pushFollowers: false})
			.setClassToggle("#year-comparison", "fixed")
			.addTo(controller);
		var triggerHook = scene.triggerHook(0);

		if (window.innerWidth > 900) {
			var scene = new ScrollMagic.Scene({triggerElement: ".sticky", duration: tableHeight, offset: -185})
				.setPin(".sticky", {pushFollowers: false})
				.addTo(controller);
			var triggerHook = scene.triggerHook(0);

		} else {
			var scene = new ScrollMagic.Scene({triggerElement: ".sticky", duration: tableHeight, offset: -170})
				.setPin(".sticky", {pushFollowers: false})
				.addTo(controller);
			var triggerHook = scene.triggerHook(0);
		}

	});
</script>
<!--
<div class="hero">
	<div class="gop">
	</div>
	<div class="dem">
	</div>
	<div class="minnesota desktop-show"></div>
	<div class="headline-wrapper">
		<div class="minnesota mobile show"></div>
		<img class="logo white" src="http://static.startribune.com/images/reverse-startribune-logo-white.svg" alt="star tribune logo">
		<h1>What would it take for <span class="republican party">Trump <div class="mug-wrapper"><div class="cand-mug happy"></div><div class="cand-mug sad"></div></div></span> to win Minnesota over <span class="democrat party">Biden <div class="mug-wrapper"><div class="cand-mug sad"></div><div class="cand-mug happy"></div></div></span>?</h1>
	</div>
</div>

<div class="subhead-wrapper">
	<h2>Geography is just one of many variables in a presidential race — but it’s a big one. Where voters turn out could determine whether President Donald Trump becomes the first Republican presidential candidate to win Minnesota in nearly half a century. Use the interactive sliders below to see how changes in turnout and the partisan mix in different regions could flip Minnesota.</h2>

	<p class="byline-special"><b>Michael Corey, Anna Boone, Jessie Van Berkel and Torey Van Oot</b><br>Star Tribune • Sept. 21, 2020</p>
</div> -->

<div class="scenario first">
	<h5>What we know from 2016</h5>
	<p>On its face, Clinton’s victory was not surprising. Minnesotans have delivered the state’s 10 electoral votes to the Democratic nominee in every presidential election since 1972.</p>

	<p>But the 44,765-vote margin was the closest since 1984, when Democratic nominee Walter Mondale, a Minnesota native, eked out a 3,700-vote win over Republican Ronald Reagan.</p>
	<div class="results-2016">
		<h2>2016 results</h2>
		<div class="cand-totals">
			<div class="cand-info d winner">
				<div class="cand-mug"></div>
				<h4 class="cand-name"><b>Hillary Clinton</b></h4>
				<!-- <h4 class="cand-name old"><b>2016: Hillary Clinton</b> {commaNumber($d_votes_statewide_2016)}</h4> -->
			</div>

			<div class="cand-info r" >
				<div class="cand-mug"></div>
				<h4 class="cand-name"><b>Donald Trump</b></h4>
				<!-- <h4 class="cand-name old"><b>2016: Donald Trump</b> {commaNumber($r_votes_statewide_2016)}</h4> -->
			</div>

			<div class="trump bar" style="width: {r_pct_2016}%;">
				<h3>{r_pct_2016}%</h3>
			</div>
			<div class="biden bar winner" style="width: {d_pct_2016}%;">
				<h3>{d_pct_2016}%</h3>
			</div>
			<h4 class="cand-votes r" style="right: calc({r_pct_2016}% - 150px); transition: 0.5s all;">{commaNumber($r_votes_statewide_2016)}</h4>
			<h4 class="cand-votes d" style="left: calc({d_pct_2016}% - 150px); transition: 0.5s all;">{commaNumber($d_votes_statewide_2016)}</h4>
		</div>
	</div>
	<p>So what happened? Trump credits his decision to visit Minnesota ahead of Election Day, often arguing one more speech would have tipped him to victory. Clinton did not campaign in person or invest significant resources in the state.</p>
	<p>But as the pros like to say, it all came down to turnout.</p>
	<p>Trump’s strong performance brought him within 1.5 percentage points of a win. But his raw vote total — 1,322,951 — was barely more than Mitt Romney got when he lost the state to President Barack Obama by 7 percentage points in 2012. President George W. Bush actually received more votes in the state in 2004, despite losing to Democrat John Kerry by more than 3 percentage points. Clinton, meanwhile, got about 200,000 fewer votes than Obama both times he was on the ballot, and underperformed Kerry by more than 100,000 votes.</p>
	<p>Those statistics suggest depressed turnout among Minnesota Democrats, who either stayed home, voted third party or flipped to Trump, which contributed to the closeness of the race.</p>
	<p>The results also showcase a growing urban-rural divide. Trump won 78 of the state’s 87 counties, carrying the expansive Seventh Congressional District that hugs the state’s western border by 30 points and southern Minnesota's First Congressional District with 52%. Clinton won big in the Twin Cities. </p>
	<p>Support for presidential hopefuls not named Clinton or Trump also played a role in the 2016 split. Combined, third-party and write-in candidates captured about 8% of the vote. In some counties, it was even higher.</p>
</div>

<div class="scenario ahead">
	<h5>Looking ahead</h5>
	<p>So what does Trump need to do this time to turn things around? Let’s start by giving Biden and Trump the same vote totals Clinton and Trump received in Minnesota in 2016. Then we’ll split the state up by grouping counties into four regions: urban (Hennepin and Ramsey counties), suburban (six other counties surrounding the Twin Cities), regional centers (five counties with mid-sized cities) and rural (the 74 remaining counties).</p>
	<p>We’ll use those (imperfect) regions to game out some scenarios where Trump could come out ahead.</p>
</div>

<section id="year-comparison">
	<canvas class="my-canvas" id="canvas-dem"></canvas>
	<canvas class="my-canvas" id="canvas-gop"></canvas>
	<div class="project-wrapper" id="project-wrapper">
		<div id="totals-2020" class="year-totals">
			<h2 class="desktop-show">Current scenario: Projected Minnesota results</h2>
			<h2 class="mobile-show">Projected Minn. results</h2>
			<div class="cand-totals">
				<div class:winner="{$proj_d_votes_statewide > $proj_r_votes_statewide}" class:loser="{$proj_r_votes_statewide > $proj_d_votes_statewide}" class="cand-info d" id="biden-nav">
					<div class="cand-mug-wrapper">
						<div class="cand-mug happy"></div>
						<div class="cand-mug sad" id="sadBiden"></div>
					</div>
					<h4 class="cand-name desktop-show"><b>Joe Biden</b></h4>
					<h4 class="cand-name mobile-show"><b>Biden</b></h4>
				</div>

				<div class:winner="{$proj_r_votes_statewide > $proj_d_votes_statewide}" class:loser="{$proj_r_votes_statewide < $proj_d_votes_statewide}" class="cand-info r" id="trump-nav">
					<div class="cand-mug-wrapper">
						<div class="cand-mug happy"></div>
						<div class="cand-mug sad" id="sadTrump"></div>
					</div>
					<h4 class="cand-name desktop-show"><b>Donald Trump</b></h4>
					<h4 class="cand-name mobile-show"><b>Trump</b></h4>
				</div>

				<div class:winner="{$proj_r_votes_statewide > $proj_d_votes_statewide}" class="trump bar" style="width: {proj_r_pct}%;">
					<h3>{proj_r_pct}%</h3>
				</div>
				<div class:winner="{$proj_d_votes_statewide > $proj_r_votes_statewide}" class="biden bar" style="width: {proj_d_pct}%;">
					<h3>{proj_d_pct}%</h3>
				</div>
				<h4 class="cand-votes r" style="right: calc({proj_r_pct}% - 150px); transition: 0.5s all;">{commaNumber($proj_r_votes_statewide)} votes</h4>
				<h4 class="cand-votes d" style="left: calc({proj_d_pct}% - 150px); transition: 0.5s all;">{commaNumber($proj_d_votes_statewide)} votes</h4>
			</div>
		</div>
		<h3 class="applied" on:click={myFunction}><span>See applied county modifiers <i class="strib-icon strib-nav-forward"></i></span></h3>
		<div class="modifiers">
			<div class="region-wrapper">
				<div class="rural">
					<h5>Small town/rural</h5>
					<span class="first">Total votes: {@html turnout_display(turnout_modifiers["rural"])} {#if $excessive_turnout_rural.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
					<p>Partisanship: <span class:positive="{partisan_modifiers["rural"] > 0}" class:negative="{partisan_modifiers["rural"] < 0}">{Math.abs(partisan_modifiers["rural"])}</span></p>
				</div>
				<div class="regional">
					<h5>Regional</h5>
					<span class="first">Total votes: {@html turnout_display(turnout_modifiers["outstate city"])} {#if $excessive_turnout_outstate.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
					<p>Partisanship: <span class:positive="{partisan_modifiers["outstate city"] > 0}" class:negative="{partisan_modifiers["outstate city"] < 0}">{Math.abs(partisan_modifiers["outstate city"])}</span></p>
				</div>
				<div class="suburban">
					<h5>Suburban</h5>
					<span class="first">Total votes: {@html turnout_display(turnout_modifiers["suburban"])} {#if $excessive_turnout_suburban.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
					<p>Partisanship: <span class:positive="{partisan_modifiers["suburban"] > 0}" class:negative="{partisan_modifiers["suburban"] < 0}">{Math.abs(partisan_modifiers["suburban"])}</span></p>
				</div>
				<div class="urban">
					<h5>Urban</h5>
					<span class="first">Total votes: {@html turnout_display(turnout_modifiers["urban"])} {#if $excessive_turnout_urban.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
					<p>Partisanship: <span class:positive="{partisan_modifiers["urban"] > 0}" class:negative="{partisan_modifiers["urban"] < 0}">{Math.abs(partisan_modifiers["urban"])}</span></p>
				</div>
			</div>
			<button class="reset-button" type="button" on:click={resetDials}><img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">Reset dials</button>
		</div>
	</div>
</section>

<div class="scenario second">
	<h5>RELYING ON RURAL SUPPORT</h5>
	<div class="map mobile-show">
		<img src="https://static.startribune.com/svg/rural.svg?cache=trash" alt="map" class="map">
	</div>
	<p>Trump’s campaign in 2020 has focused on driving up voter turnout in rural areas of Minnesota and across the Midwest. Rural Minnesota had the lowest turnout of our four regions in 2016. However, the number of additional votes that can come from the state’s sparsely populated counties is relatively limited. Try changing rural turnout with the sliders, then watch the scoreboard change at the top of the page. Even if you increase the number of rural votes by 10 percentage points over 2016, it’s not enough for Trump to win. And that would require some rural counties to have more than 80% of voters turn out — an unlikely number, even for high-turnout Minnesota.</p>

	<div class="inline-ex middle">
		<div class="inline-wrapper">
			<p class="explainer">Total votes in <b>small town/rural counties</b></p>
			<label>
				<input type=range bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 class="density" id="rural-d">
				<div class="wrapper">
					<span class="turnout">{@html turnout_display(turnout_modifiers["rural"])} {#if $excessive_turnout_rural.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
					<!-- <input type=number bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0> -->
				</div>
			</label>
			<p class="explainer">Partisan balance in <b>small town/rural counties</b></p>
			<label>
				<input type=range bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 class="partisan" id="rural-p">
				<div class="wrapper">
					<span class="partisan" class:positive="{partisan_modifiers["rural"] > 0}" class:negative="{partisan_modifiers["rural"] < 0}">{@html partisan_display(partisan_modifiers["rural"])}</span>
				</div>
			</label>
		</div>
		<div class="map desktop-show">
			<img src="https://static.startribune.com/svg/rural.svg?cache=trash" alt="map" class="map">
		</div>
	</div>
	<button class="reset-button middle" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
	Reset dials</button>

	<p>To make a significant difference in 2020 Trump would not just need to turn out more people in those areas, he would likely also have to shift voters – such as independents – his way. Parts of Greater Minnesota, including the Iron Range, have trended more deeply red in recent elections. The president has focused on northern Minnesota and emphasized how the region has benefited from his tariffs on imported steel. Trump visited Bemidji Sept. 18, and Vice President Mike Pence, Donald Trump Jr. and Ivanka Trump have all made recent campaign stops in Duluth.</p>
	<p>In farm country, the Trump campaign has championed the trade deal with Mexico and Canada that took effect in July. However, trade tensions with China have hurt farmers during Trump’s term, and an economic downturn amid the COVID-19 pandemic is creating an additional challenge. In rural areas where there have been fewer coronavirus cases, campaigning Republicans have emphasized frustrations over Democratic Gov. Tim Walz’s pandemic regulations.</p>
	<p>So if Trump could bump up rural turnout and turn these regions even more red (try moving the partisan slider to the right), that could be enough to tip the balance -- if nothing changes in the other regions.</p>
</div>

<div class="scenario fourth">
	<h5>TWO COUNTIES, A LOAD OF VOTES</h5>
	<div class="map mobile-show">
		<img src="https://static.startribune.com/svg/urban.svg?cache=trash" alt="map" class="map">
	</div>
	<p>Hennepin and Ramsey counties, which include Minneapolis, St. Paul and many surrounding suburban cities, are home to nearly a third of Minnesota’s residents. Voter turnout in these counties, which historically have overwhelmingly favored Democrats, can have a significant impact on statewide elections.</p>
	<p>Hillary Clinton carried both counties with 64.4% of the vote four years ago. Democratic officials are trying to fire up voters in the heart of the metro. They are not only trying to get their base to show up but also attempting to draw new voters, including young people and voters in the Twin Cities’ immigrant communities. Young voters appear poised to turn out at a higher rate than they did four years ago, with young voter registration up 12% compared to 2016, <a href="https://www.startribune.com/x/572444352/" target="_blank">a nonpartisan poll shows</a>.</p>
	<p>The Fifth Congressional District, which includes Minneapolis, delivered more than 270,000 votes for the Democratic nominee in 2016 — 9% of all presidential votes cast statewide. Minnesota DFL Party Chairman Ken Martin said his party cannot have a drop in turnout in the urban core. “Those are the vote engines,” he said of Ramsey and Hennepin counties.</p>

	<div class="inline-ex">
		<div class="inline-wrapper">
			<p class="explainer">Total votes in <b>urban counties</b></p>
			<label>
				<input type=range bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<span class="turnout">{@html turnout_display(turnout_modifiers["urban"])} {#if $excessive_turnout_urban.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
					<!-- <input type=number bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0> -->
				</div>
			</label>
			<p class="explainer">Partisan balance in <b>urban counties</b></p>
			<label>
				<input type=range bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 class="partisan">
				<div class="wrapper">
					<span class="partisan" class:positive="{partisan_modifiers["urban"] > 0}" class:negative="{partisan_modifiers["urban"] < 0}">{@html partisan_display(partisan_modifiers["urban"])}</span>
				</div>
			</label>
		</div>
		<div class="map">
			<img src="https://static.startribune.com/svg/urban.svg?cache=trash" alt="map" class="map">
		</div>
	</div>
	<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
Reset dials</button>

</div>


<div class="scenario third clear">
	<h5>WILL THE SUBURBS SHIFT?</h5>
	<div class="map mobile-show">
		<img src="https://static.startribune.com/svg/suburbs.svg?cache=trash" alt="map" class="map">
	</div>
	<p>Over the past three presidential elections, Republicans have carried three of the five metro counties that surround Hennepin and Ramsey. However, the suburban communities around the Twin Cities trended deeper blue in 2018, with Democratic U.S. Reps. Angie Craig and Dean Phillips flipping districts that include wide swaths of the south and west suburbs. In that midterm election, Sen. Amy Klobuchar carried all five of the counties – which could bode well for Biden’s chances in those areas.</p>
	<p>Past polls have shown Trump struggling with suburban swing voters, particularly women. However, Republicans are hoping to make inroads among moderates in the suburbs and are painting Biden as part of the “radical left.” The GOP has emphasized public safety and their support for police as they try to win over those areas, saying that Democrats have failed to prevent lawlessness during the civil unrest that followed the killing of George Floyd by Minneapolis police.</p>

	<div class="inline-ex">
		<div class="inline-wrapper">
			<p class="explainer">Total votes in <b>suburban counties</b></p>
			<label>
				<input type=range bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<span class="turnout">{@html turnout_display(turnout_modifiers["suburban"])} {#if $excessive_turnout_suburban.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
				</div>
			</label>
			<p class="explainer">Partisan balance in <b>suburban counties</b></p>
			<label>
				<input type=range bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 class="partisan">
				<div class="wrapper">
					<span class="partisan" class:positive="{partisan_modifiers["suburban"] > 0}" class:negative="{partisan_modifiers["suburban"] < 0}">{@html partisan_display(partisan_modifiers["suburban"])}</span>
				</div>
			</label>
		</div>
		<div class="map">
			<img src="https://static.startribune.com/svg/suburbs.svg?cache=trash" alt="map" class="map">
		</div>
	</div>
	<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
	Reset dials</button>
</div>

<div class="scenario third clear">
	<h5>Could urban centers outside the Twin Cities tip the scales? </h5>
	<div class="map mobile-show">
		<img src="https://static.startribune.com/svg/regional.svg?cache=trash" alt="map" class="map">
	</div>
	<p>While much of Greater Minnesota tends to vote Republican, several significant regional population centers could boost either party. Population growth in the Rochester area, home to the Mayo Clinic, has created fresh opportunities for the DFL, especially among college-educated voters and growing communities of color. Though Clinton narrowly defeated Trump in Olmsted County in 2016, Democrats have gained ground in the region since 2014.</p>
	<p>St. Louis County, home to Duluth, remains a Democratic stronghold, even as GOP support grows elsewhere on the Iron Range. Clinton won that county by 11 percentage points in 2016. Trump is making a play to peel more votes, though, with multiple campaign events in and around Duluth.</p>
	<p>In Central Minnesota, the greater St. Cloud area leans GOP. The president won both Stearns and Sherburne counties by wide margins in 2016. He also edged out Clinton in Blue Earth County, which includes Mankato, by about 1,000 votes. The margin there was 47% to 43% in 2016. To turn the tide, the Trump campaign must color these areas even redder this November.</p>
	<p>The campaign has taken steps to do just that. In addition to the Duluth visits, Republicans have been knocking on doors and opening offices in St. Cloud and across Southern Minnesota.</p>

	<div class="inline-ex">
		<div class="inline-wrapper">
			<p class="explainer">Total votes in <b>regional city counties</b></p>
			<label>
				<input type=range bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<span class="turnout">{@html turnout_display(turnout_modifiers["outstate city"])} {#if $excessive_turnout_outstate.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
				</div>
			</label>
			<p class="explainer">Partisan balance in <b>regional city counties</b></p>
			<label>
				<input type=range bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="partisan">
				<div class="wrapper">
					<span class="partisan" class:positive="{partisan_modifiers["outstate city"] > 0}" class:negative="{partisan_modifiers["outstate city"] < 0}">{@html partisan_display(partisan_modifiers["outstate city"])}</span>
				</div>
			</label>
		</div>
		<div class="map">
			<img src="https://static.startribune.com/svg/regional.svg?cache=trash" alt="map" class="map">
		</div>
	</div>
	<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
	Reset dials</button>
</div>

<div class="scenario last">
	<h5>Your turn</h5>
	<p>Some, all or none of these scenarios could play out in November, so it’s time for some predictions of your own. Try out some of your own assumptions and see what happens.</p>
</div>

<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
Reset dials</button>

<div id="dashboard" class="dashboard-wrapper">
	<div id="rural-dashboard" class="dashboard">

		<h3>Small town/rural<br></h3>
		<p class="summary">Trump won <span class="gop percent">{r_pct_rural_2016}%</span> of the small town/rural county votes in 2016.</p>
		<label>Total votes<br/>
			<input type=range bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 class="density" id="rural-d">
			<div class="wrapper">
				<span class="turnout" class:warning="{bool_excessive_rural}">{@html turnout_display(turnout_modifiers["rural"])} {#if $excessive_turnout_rural.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
			</div>
		</label>

		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 class="partisan" id="rural-p">
			<div class="wrapper">
				<span class="partisan" class:positive="{partisan_modifiers["rural"] > 0}" class:negative="{partisan_modifiers["rural"] < 0}">{@html partisan_display(partisan_modifiers["rural"])}</span>
			</div>
		</label>

		<RegionalStats
		  region='rural'
		  d_votes_2016={$d_votes_regional_2016_rural}
		  d_pct_2016={d_pct_rural_2016}
		  d_votes_proj={$proj_d_votes_regional_rural}
		  d_pct_proj={d_pct_rural_projected}
		  r_votes_2016={$r_votes_regional_2016_rural}
		  r_pct_2016={r_pct_rural_2016}
		  r_votes_proj={$proj_r_votes_regional_rural}
		  r_pct_proj={r_pct_rural_projected}
		  total_votes_2016={$total_votes_regional_2016_rural}
		  total_votes_proj={$proj_total_votes_regional_rural}
		  turnout_pct_2016={turnout_rural_2016}
		  turnout_pct_proj={turnout_rural_projected}
		/>
	</div>

	<div id="outcity-dashboard"  class="dashboard">
		<h3><!-- Greater  -->Minn. counties with regional centers</h3>
		<p class="summary">Trump won <span class="gop percent">{r_pct_outstate_2016}%</span> of the regional center votes in 2016.</p>
		<label>Total votes<br/>
			<input type=range bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="density">
			<div class="wrapper">
				<span class="turnout">{@html turnout_display(turnout_modifiers["outstate city"])} {#if $excessive_turnout_outstate.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
			</div>
		</label>
		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="partisan">
			<div class="wrapper">
				<span class="partisan" class:positive="{partisan_modifiers["outstate city"] > 0}" class:negative="{partisan_modifiers["outstate city"] < 0}">{@html partisan_display(partisan_modifiers["outstate city"])}</span>
			</div>
		</label>

		<RegionalStats
			type='outstate'
			d_votes_2016={$d_votes_regional_2016_outstate}
			d_pct_2016={d_pct_outstate_2016}
			d_votes_proj={$proj_d_votes_regional_outstate}
			d_pct_proj={d_pct_outstate_projected}
			r_votes_2016={$r_votes_regional_2016_outstate}
			r_pct_2016={r_pct_outstate_2016}
			r_votes_proj={$proj_r_votes_regional_outstate}
			r_pct_proj={r_pct_outstate_projected}
			total_votes_2016={$total_votes_regional_2016_outstate}
			total_votes_proj={$proj_total_votes_regional_outstate}
			turnout_pct_2016={turnout_outstate_2016}
			turnout_pct_proj={turnout_outstate_projected}
		/>
	</div>

	<div id="suburban-dashboard"  class="dashboard">
		<h3>Suburban Twin Cities</h3>
		<p class="summary">Trump won <span class="gop percent">{r_pct_suburban_2016}%</span> of the suburban county votes in 2016.</p>
		<label>Total votes<br/>
			<input type=range bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 class="density">
			<div class="wrapper">
				<span class="turnout">{@html turnout_display(turnout_modifiers["suburban"])} {#if $excessive_turnout_suburban.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
			</div>
		</label>
		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 class="partisan">
			<div class="wrapper">
				<span class="partisan" class:positive="{partisan_modifiers["suburban"] > 0}" class:negative="{partisan_modifiers["suburban"] < 0}">{@html partisan_display(partisan_modifiers["suburban"])}</span>
			</div>
		</label>

		<RegionalStats
		  region='suburban'
		  d_votes_2016={$d_votes_regional_2016_suburban}
		  d_pct_2016={d_pct_suburban_2016}
		  d_votes_proj={$proj_d_votes_regional_suburban}
		  d_pct_proj={d_pct_suburban_projected}
		  r_votes_2016={$r_votes_regional_2016_suburban}
		  r_pct_2016={r_pct_suburban_2016}
		  r_votes_proj={$proj_r_votes_regional_suburban}
		  r_pct_proj={r_pct_suburban_projected}
		  total_votes_2016={$total_votes_regional_2016_suburban}
		  total_votes_proj={$proj_total_votes_regional_suburban}
		  turnout_pct_2016={turnout_suburban_2016}
		  turnout_pct_proj={turnout_suburban_projected}
		/>
	</div>

	<div id="urban-dashboard"  class="dashboard">
		<h3>Hennepin and Ramsey counties</h3>
		<p class="summary">Clinton won <span class="dem percent">{d_pct_urban_2016}%</span> of the urban county votes in 2016.</p>
		<label>Total votes<br/>
			<input type=range bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 class="density">
			<div class="wrapper">
				<span class="turnout">{@html turnout_display(turnout_modifiers["urban"])} {#if $excessive_turnout_urban.length > 0} <span><img src="https://static.startribune.com/svg/warning.svg" class="warning" alt="warning"></span> <span class="tooltip">A county in this region now has voter turnout higher than 81%. While it would be great if that many people showed up for their civic duty, experts say it's unlikely.</span>{/if}</span>
			</div>
		</label>
		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 class="partisan">
			<div class="wrapper">
				<span class="partisan" class:positive="{partisan_modifiers["urban"] > 0}" class:negative="{partisan_modifiers["urban"] < 0}">{@html partisan_display(partisan_modifiers["urban"])}</span>
			</div>
		</label>

		<RegionalStats
		  region='urban'
		  d_votes_2016={$d_votes_regional_2016_urban}
		  d_pct_2016={d_pct_urban_2016}
		  d_votes_proj={$proj_d_votes_regional_urban}
		  d_pct_proj={d_pct_urban_projected}
		  r_votes_2016={$r_votes_regional_2016_urban}
		  r_pct_2016={r_pct_urban_2016}
		  r_votes_proj={$proj_r_votes_regional_urban}
		  r_pct_proj={r_pct_urban_projected}
		  total_votes_2016={$total_votes_regional_2016_urban}
		  total_votes_proj={$proj_total_votes_regional_urban}
		  turnout_pct_2016={turnout_urban_2016}
		  turnout_pct_proj={turnout_urban_projected}
		/>
	</div>
</div>

<div class="table-wrapper sticky">
	<table class="county-projections no-marg">
		<thead>
			<tr>
				<th class="county">County</th>
				<th class="desktop-show votes-2016">2016 total votes <span class="turnout">(turnout)</span></th>
				<th class="desktop-show votes-2020">Projected total votes <span class="turnout">(turnout)</span></th>
				<th class="desktop-show r-2016">2016 %R</th>
				<th class="desktop-show d-2016">2016 %D</th>
				<th class="r-2020">Projected %R</th>
				<th class="d-2020">Projected %D</th>
			</tr>
		</thead>
	</table>
</div>

<table class="county-projections" cellspacing="0" cellpadding="0" id="table">
	{#each county_list as county_data, list_index}
		<County name={county_data.county} {county_data} bind:turnout_modifier={turnout_modifiers[county_data.classification]} bind:partisan_modifier={partisan_modifiers[county_data.classification]} bind:other_party_modifier={other_party_modifiers[county_data.classification]} bind:other_party_partisan_modifier={other_party_partisan_modifiers[county_data.classification]}/>
	{/each}
</table>

<div class="scenario">
	<h5>Methodology</h5>
	<p>Calculations start with each county's 2016 certified presidential vote totals from the Minnesota Secretary of State. The sliders apply percentage-point modifiers to total votes and partisan split. Turnout is calculated by dividing total 2016 votes in each county by the Citizen Voting Age Population in the U.S. Census Bureau's 2012-2016 5-Year American Community Survey as a proxy for eligible voters. County regional classifications are based on reports from the Minnesota State Demographic Center.</p>

	<p>Special thanks to David Schultz and Eric Ostermeier for consulting on the methodology and assumptions.</p>

	<div class="credits">
      <!-- <p class="subscribe">Our staff-produced coverage of the 2020 presidential election is available for free to non-subscribers as a public service. Please consider <a href="https://users.startribune.com/view/multi-start?om_mid=712452553&om_rid=1657715145" class="in-line"><span>subscribing to the Star Tribune</span></a> to help us continue this vital work.</p> -->

      <h5>Credits</h5>
			<p><b>Reporting</b> Torey Van Oot and Jessie Van Berkel</p>
			<p><b>Design</b> Anna Boone and Michael Corey</p>
      <p><b>Development</b> Michael Corey and Anna Boone</p>
      <p><b>Data</b> Jeff Hargarten</p>
      <p><b>Editing</b> Matt DeLong, Eric Wieffering and Catherine Preus</p>
  </div>
</div>
