<script>
	import CountyData from './data/mncounties.json'
	import County from './County.svelte';
	import RegionalStats from './RegionalStats.svelte';

	const commaNumber = require('comma-number')

	import { elligible_voters_rural, elligible_voters_outstate, elligible_voters_suburban, elligible_voters_urban, total_votes_statewide_2016, r_votes_statewide_2016, d_votes_statewide_2016, proj_total_votes_statewide, proj_r_votes_statewide, proj_d_votes_statewide, total_votes_regional_2016_rural, total_votes_regional_2016_outstate, total_votes_regional_2016_suburban, total_votes_regional_2016_urban, r_votes_regional_2016_rural, r_votes_regional_2016_outstate, r_votes_regional_2016_suburban, r_votes_regional_2016_urban, d_votes_regional_2016_rural, d_votes_regional_2016_outstate, d_votes_regional_2016_suburban, d_votes_regional_2016_urban, proj_total_votes_regional_rural, proj_total_votes_regional_outstate, proj_total_votes_regional_suburban, proj_total_votes_regional_urban, proj_r_votes_regional_rural, proj_r_votes_regional_outstate, proj_r_votes_regional_suburban, proj_r_votes_regional_urban, proj_d_votes_regional_rural, proj_d_votes_regional_outstate, proj_d_votes_regional_suburban, proj_d_votes_regional_urban } from './stores.js';

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

	$ : {

		d_pct_2016 = Math.round(($d_votes_statewide_2016 / $total_votes_statewide_2016) * 1000) / 10;
		r_pct_2016 = Math.round(($r_votes_statewide_2016 / $total_votes_statewide_2016) * 1000) / 10;

		proj_r_pct = Math.round(($proj_r_votes_statewide / $proj_total_votes_statewide) * 1000) / 10;
		proj_d_pct = Math.round(($proj_d_votes_statewide / $proj_total_votes_statewide) * 1000) / 10;

		turnout_rural_2016 = Math.round(($total_votes_regional_2016_rural / $elligible_voters_rural) * 1000) / 10;
		turnout_rural_projected = Math.round(($proj_total_votes_regional_rural / $elligible_voters_rural) * 1000) / 10;

		turnout_outstate_2016 = Math.round(($total_votes_regional_2016_outstate / $elligible_voters_outstate) * 1000) / 10;
		turnout_outstate_projected = Math.round(($proj_total_votes_regional_outstate / $elligible_voters_outstate) * 1000) / 10;

		turnout_suburban_2016 = Math.round(($total_votes_regional_2016_suburban / $elligible_voters_suburban) * 1000) / 10;
		turnout_suburban_projected = Math.round(($proj_total_votes_regional_suburban / $elligible_voters_suburban) * 1000) / 10;

		turnout_urban_2016 = Math.round(($total_votes_regional_2016_urban / $elligible_voters_urban) * 1000) / 10;
		turnout_urban_projected = Math.round(($proj_total_votes_regional_urban / $elligible_voters_urban) * 1000) / 10;

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
	}

	let resetDials = function () {
		partisan_modifiers = {
			"rural": 0,
			"outstate city": 0,
			"suburban": 0,
			"urban": 0
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



	export let scrollY;
	export let y_from_top;


	$: {
		let happy = scrollY;
		if (document.querySelector('.project-wrapper')) {
			y_from_top = document.querySelector('.project-wrapper').getBoundingClientRect().top;
		} else {
			y_from_top = 8675309;
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
</script>

<div class="hero">
	<div class="gop">
		<!-- <div class="cand-mug"></div> -->
	</div>
	<div class="dem">
		<!-- <div class="cand-mug"></div> -->
	</div>
	<div class="minnesota desktop-show"></div>
	<div class="headline-wrapper">
		<div class="minnesota mobile show"></div>
		<img class="logo white" src="http://static.startribune.com/images/reverse-startribune-logo-white.svg" alt="star tribune logo">
		<h1>What would it take for <span class="republican party">Trump <div class="cand-mug"></div></span> to win Minnesota over <span class="democrat party">Biden <div class="cand-mug"></div></span>?</h1>
	</div>
</div>

<div class="subhead-wrapper">
	<h2>Geography is just one of many variables in a presidential race. But it’s a big one. Where voters turn out could determine whether President Donald Trump becomes the first Republican presidential candidate to win Minnesota in nearly half a century. Try changing voter turnout and the partisan mix in different regions based on the 2016 election — when Hillary Clinton won the state by less than 2 percent — to discover what it would take to flip Minnesota red.</h2>

	<p class="byline-special"><b>By Michael Corey, Political reporter here and here</b><br>Star Tribune • Sept. XX, 2020</p>
	<!-- sharing -->
</div>

<div class="scenario first">
	<h5>What we know from 2016</h5>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget convallis pulvinar, nisl dolor luctus nisl, at ornare odio massa non leo. Quisque eleifend dictum neque, eget sagittis orci suscipit vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, with the majority of her votes coming from Hennepin and Ramsey counties. Trump won rural counties, and his campagin said he will win the whole state of Minnesota by relying on those counties again. If the 2020 election looked the same as the previous presidential, election, Biden would win Minnesota with 46.9% of the vote.</p>
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
			<h4 class="cand-votes r" style="right: calc({r_pct_2016}% - 150px); transition: 0.5s all;">1,322,871 votes</h4>
			<h4 class="cand-votes d" style="left: calc({d_pct_2016}% - 150px); transition: 0.5s all;">1,366,653 votes</h4>
		</div>
	</div>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, with the majority of her votes coming from Hennepin and Ramsey counties. Trump won rural counties, and his campagin said he will win the whole state of Minnesota by relying on those counties again. If the 2020 election looked the same as the previous presidential, election, Biden would win Minnesota with 46.9% of the vote.</p>
</div>

<div class="scenario ahead">
	<h5>Looking ahead</h5>
	<p>To start, we are going to give Biden and Trump the same vote totals Clinton and Trump had in Minnesota in 2016.</p>
	<p>From there, lets look at some scenarios where Trump could come out ahead.</p>
</div>

<section id="year-comparison">
	<canvas id="my-canvas"></canvas>
	<div class="project-wrapper" id="project-wrapper">
		<div id="totals-2020" class="year-totals">
			<h2 class="desktop-show">Projected Minnesota results</h2>
			<h2 class="mobile-show">Projected Minn. results</h2>
			<div class="cand-totals">
				<div class:winner="{$proj_d_votes_statewide > $proj_r_votes_statewide}" class:loser="{$proj_r_votes_statewide > $proj_d_votes_statewide}" class="cand-info d" id="biden-nav">
					<div class="cand-mug"></div>
					<h4 class="cand-name desktop-show"><b>Joe Biden</b></h4>
					<h4 class="cand-name mobile-show"><b>Biden</b></h4>
				</div>

				<div class:winner="{$proj_r_votes_statewide > $proj_d_votes_statewide}" class:loser="{$proj_r_votes_statewide < $proj_d_votes_statewide}" class="cand-info r" id="trump-mav">
					<div class="cand-mug"></div>
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
			<div class="wrapper">
				<div class="rural">
					<h5>Rural</h5>
					<p class="first"><b>Voter turnout:</b> {turnout_modifiers["rural"]}</p>
					<p><b>Partisanship:</b> <span class:positive="{partisan_modifiers["rural"] > 0}" class:negative="{partisan_modifiers["rural"] < 0}">{partisan_modifiers["rural"]}</span></p>
				</div>
				<div class="regional">
					<h5>Regional</h5>
					<p class="first"><b>Voter turnout:</b> {turnout_modifiers["outstate city"]}</p>
					<p><b>Partisanship:</b> <span class:positive="{partisan_modifiers["outstate city"] > 0}" class:negative="{partisan_modifiers["outstate city"] < 0}">{partisan_modifiers["outstate city"]}</span></p>
				</div>
				<div class="suburban">
					<h5>Suburban</h5>
					<p class="first"><b>Voter turnout:</b> {turnout_modifiers["suburban"]}</p>
					<p><b>Partisanship:</b> <span class:positive="{partisan_modifiers["suburban"] > 0}" class:negative="{partisan_modifiers["suburban"] < 0}">{partisan_modifiers["suburban"]}</span></p>
				</div>
				<div class="urban">
					<h5>Urban</h5>
					<p class="first"><b>Voter turnout:</b> {turnout_modifiers["urban"]}</p>
					<p><b>Partisanship:</b> <span class:positive="{partisan_modifiers["urban"] > 0}" class:negative="{partisan_modifiers["urban"] < 0}">{partisan_modifiers["urban"]}</span></p>
				</div>
			</div>
			<button class="reset-button" type="button" on:click={resetDials}><img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">Reset dials</button>
		</div>
	</div>
</section>

<div class="scenario second">
	<h5>Rural revolt</h5>
	<div class="map mobile-show">
		<img src="https://static.startribune.com/svg/rural.svg" alt="map" class="map">
	</div>
	<p>Trump has campagined on winning Minnesota based on driving voter turnout in rural counties. Minnesota has high voter turnout already. Trump would have to increase voter turnout by more than </p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Use the sliders below to explor scenarios in the rural counties that could lead to a Trump victory.</p>
	<div class="inline-ex">

		<div class="inline-wrapper">
			<p class="explainer"><b>Turnout percentage in rural counties</b> would need to increase by at least 5 percent.</p>
			<label>
				<input type=range bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 class="density" id="rural-d">
				<div class="wrapper">
					<input type=number bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0>
				</div>
			</label>
			<p class="explainer"><b>Or partisan balance in rural counties</b> would need to lean 4 percent more Republican.</p>
			<label>
				<input type=range bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 class="partisan" id="rural-p">
				<div class="wrapper">
					<input type=number bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0 >
				</div>
			</label>
		</div>
		<div class="map desktop-show">
			<img src="https://static.startribune.com/svg/rural.svg" alt="map" class="map">
		</div>
	</div>
	<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
Reset dials</button>
	<!-- <button class="show" on:click={scenario2}>Play this scenario</button> -->
</div>


<div class="scenario third clear">
	<h5>Rochester rebels</h5>
	<div class="map mobile-show">
		<img src="https://static.startribune.com/svg/regional.svg" alt="map" class="map">
	</div>
	<p>Trump has campagined on winning Minnesota based on driving voter turnout in rural counties. Minnesota has high voter turnout already. Trump would have to increase voter turnout by more than </p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Use the sliders below to explor scenarios in the suburban counties that could lead to a Trump victory.</p>

	<div class="inline-ex">
		<div class="inline-wrapper">
			<p class="explainer"><b>Turnout percentage in regional city counties</b> would need to increase by at least 5 percent.</p>
			<label>
				<input type=range bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<input type=number bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
				</div>
			</label>
			<p class="explainer"><b>Or partisan balance in regional city counties</b> would need to lean 4 percent more Republican.</p>
			<label>
				<input type=range bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="partisan">
				<div class="wrapper">
					<input type=number bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
				</div>
			</label>
		</div>
		<div class="map">
			<img src="https://static.startribune.com/svg/regional.svg" alt="map" class="map">
		</div>
	</div>
	<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
	Reset dials</button>
</div>

<div class="scenario third clear">
	<h5>Suburban thing here</h5>
	<div class="map mobile-show">
		<img src="https://static.startribune.com/svg/suburbs.svg" alt="map" class="map">
	</div>
	<p>Trump has campagined on winning Minnesota based on driving voter turnout in rural counties. Minnesota has high voter turnout already. Trump would have to increase voter turnout by more than </p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Use the sliders below to explor scenarios in the suburban counties that could lead to a Trump victory.</p>

	<div class="inline-ex">
		<div class="inline-wrapper">
			<p class="explainer"><b>Turnout percentage in suburban counties</b> would need to increase by at least 5 percent.</p>
			<label>
				<input type=range bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<input type=number bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
				</div>
			</label>
			<p class="explainer"><b>Or partisan balance in suburban counties</b> would need to lean 4 percent more Republican.</p>
			<label>
				<input type=range bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 class="partisan">
				<div class="wrapper">
					<input type=number bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
				</div>
			</label>
		</div>
		<div class="map">
			<img src="https://static.startribune.com/svg/suburbs.svg" alt="map" class="map">
		</div>
	</div>
	<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
	Reset dials</button>
</div>


<div class="scenario fourth">
	<h5>Two counties, majority of votes</h5>
	<div class="map mobile-show">
		<img src="https://static.startribune.com/svg/urban.svg" alt="map" class="map">
	</div>
	<p>Hennepin and Ramsey counties, home of the Twin Cities, account for X percent of votes in Minnesota. As a result, higher turnout here does stuf here and stuff.</p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Use the sliders below to explor scenarios in the suburban counties that could lead to a Trump victory.</p>

	<div class="inline-ex">
		<div class="inline-wrapper">
			<p class="explainer"><b>Turnout percentage in urban counties</b> would need to increase by at least 5 percent.</p>
			<label>
				<input type=range bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<input type=number bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
				</div>
			</label>
			<p class="explainer"><b>Or partisan balance in urban counties</b> would need to lean 4 percent more Republican.</p>
			<label>
				<input type=range bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 class="partisan">
				<div class="wrapper">
					<input type=number bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
				</div>
			</label>
		</div>
		<div class="map">
			<img src="https://static.startribune.com/svg/urban.svg" alt="map" class="map">
		</div>
	</div>
	<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
Reset dials</button>

	<!-- <button class="show" on:click={scenario2}>Play this scenario</button> -->
</div>

<div class="scenario last">
	<h5>Your turn</h5>
	<p>Explore possible scenarios below using all the tools at once, wow! ncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.  Vivamus vulputate, mi eget.</p>
</div>


<!-- <div class="totals r" class:winner="{$proj_r_votes_statewide > $proj_d_votes_statewide}">Republican: {proj_r_pct}% {commaNumber($proj_r_votes_statewide)}</div>
<div class="totals d" class:winner="{$proj_d_votes_statewide > $proj_r_votes_statewide}">Democrat: {proj_d_pct}% {commaNumber($proj_d_votes_statewide)}</div>
<div>Total statewide projected votes: {commaNumber($proj_total_votes_statewide)}</div> -->
<div id="dashboard" class="dashboard-wrapper">
	<div id="rural-dashboard" class="dashboard">

		<h3>Rural<br></h3>
		<p class="summary">Trump won <span class="gop percent">{r_pct_rural_2016}%</span> of the rural counties votes in 2016.</p>
		<!-- <img src="https://static.startribune.com/svg/rural.svg" alt="map" class="map"> -->
		<label>Turnout percentage<br/>

			<input type=range bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 class="density" id="rural-d">
			<div class="wrapper">
				<input type=number bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0>
			</div>
		</label>

		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 class="partisan" id="rural-p">
			<div class="wrapper">
				<input type=number bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0 >
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

		<div class="expert">
			<h5>Expert mode</h5>
			<label>Change other party percentage<br/>
				<input type=range bind:value={other_party_modifiers["rural"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<input type=number bind:value={other_party_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0>
				</div>
			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=range bind:value={other_party_partisan_modifiers["rural"]} min=0 max=1 step=0.1 placeholder=0.5 class="partisan">
				<div class="wrapper">
					<input type=number bind:value={other_party_partisan_modifiers["rural"]} min=0 max=1 step=0.1>
				</div>
			</label>
		</div>
	</div>

	<div id="outcity-dashboard"  class="dashboard">
		<h3><!-- Greater  -->Minn. counties with regional centers</h3>
		<p class="summary">Trump won <span class="gop percent">{r_pct_outstate_2016}%</span> of the rural counties votes in 2016.</p>
		<!-- <img src="https://static.startribune.com/svg/regional.svg" alt="map" class="map"> -->
		<label>Turnout percentage<br/>
			<input type=range bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="density">
			<div class="wrapper">
				<input type=number bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0 >
			</div>
		</label>
		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="partisan">
			<div class="wrapper">
				<input type=number bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
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

		<div class="expert">
			<h5>Expert mode</h5>
			<label>Change other party percentage<br/>
				<input type=range bind:value={other_party_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<input type=number bind:value={other_party_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
				</div>

			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=range bind:value={other_party_partisan_modifiers["outstate city"]} min=0 max=1 step=0.1 placeholder=0.5 class="partisan">
				<div class="wrapper">
					<input type=number bind:value={other_party_partisan_modifiers["outstate city"]} min=0 max=1 step=0.1>
				</div>
			</label>
		</div>
	</div>

	<div id="suburban-dashboard"  class="dashboard">
		<h3>Suburban Twin Cities</h3>
		<p class="summary">Trump won <span class="gop percent">{r_pct_suburban_2016}%</span> of the suburban counties' votes in 2016.</p>
		<!-- <img src="https://static.startribune.com/svg/suburbs.svg" alt="map" class="map"> -->
		<label>Turnout percentage<br/>
			<input type=range bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 class="density">
			<div class="wrapper">
				<input type=number bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
			</div>
		</label>
		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 class="partisan">
			<div class="wrapper">
				<input type=number bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
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

		<div class="expert">
			<h5>Expert mode</h5>
			<label>Change other party percentage<br/>
				<input type=range bind:value={other_party_modifiers["suburban"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<input type=number bind:value={other_party_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
				</div>


			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=range bind:value={other_party_partisan_modifiers["suburban"]} min=0 max=1 step=0.1 placeholder=0.5 class="partisan">
				<div class="wrapper">
					<input type=number bind:value={other_party_partisan_modifiers["suburban"]} min=0 max=1 step=0.1>
				</div>
			</label>
		</div>
	</div>

	<div id="urban-dashboard"  class="dashboard">
		<h3>Hennepin and Ramsey counties</h3>
		<p class="summary">Clinton won <span class="dem percent">{d_pct_urban_2016}%</span> of the urban counties' votes in 2016.</p>
		<!-- <img src="https://static.startribune.com/svg/urban.svg" alt="map" class="map"> -->
		<label>Turnout percentage<br/>
			<input type=range bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 class="density">
			<div class="wrapper">
				<input type=number bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
			</div>
		</label>
		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 class="partisan">
			<div class="wrapper">
				<input type=number bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
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

		<div class="expert">
			<h5>Expert mode</h5>
			<label>Change other party percentage<br/>
				<input type=range bind:value={other_party_modifiers["urban"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<input type=number bind:value={other_party_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
				</div>


			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=range bind:value={other_party_partisan_modifiers["urban"]} min=0 max=1 step=0.1 placeholder=0.5 class="partisan">
				<div class="wrapper">
					<p class="less button">-</p>
					<input type=number bind:value={other_party_partisan_modifiers["urban"]} min=0 max=1 step=0.1>
					<p class="more button">+</p>
				</div>
			</label>
		</div>
	</div>
</div>

<!-- <p class="expert-mode" on:click={myFunction} id="expert">Are you a statistical pro? Bring out the expert mode</p> -->


<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
Reset dials</button>

<div class="table-wrapper sticky">
	<table class="county-projections no-marg">
		<thead>
			<tr>
				<th class="county">County</th>
				<th class="desktop-show type">Type</th>
				<th class="desktop-show votes-2016">2016 total votes</th>
				<!-- <th class="desktop-show">2016 3rd/other party votes</th> -->
				<th class="desktop-show votes-2020">Projected total votes</th>
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
	<p>Trump has campagined on winning Minnesota based on driving voter turnout in rural counties. Minnesota has high voter turnout already. Trump would have to increase voter turnout by more than </p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Use the sliders below to explor scenarios in the suburban counties that could lead to a Trump victory.</p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget.</p>
	<p>Use the sliders below to explor scenarios in the suburban counties that could lead to a Trump victory.</p>

	<div class="credits">
      <p class="subscribe">Our staff-produced coverage of the 2020 presidential election is available for free to non-subscribers as a public service. Please consider <a href="https://users.startribune.com/view/multi-start?om_mid=712452553&om_rid=1657715145" class="in-line"><span>subscribing to the Star Tribune</span></a> to help us continue this vital work.</p>

      <h5>Credits</h5>
      <p><b>Reporting</b> xxxxxxx</p>
      <p><b>Editing</b> xxxxxxx</p>
      <p><b>Design</b> xxxxxxxx</p>
      <p><b>Development</b> xxxxxxxx</p>
  </div>
</div>
