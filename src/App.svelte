<script>
	import CountyData from './data/mncounties.json'
	import County from './County.svelte';
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
	  var element = document.getElementById("dashboard");
	  element.classList.toggle("expanded");
	}

	let scenario2 = function () {
	  var ruralP = document.getElementById("rural-p");
	  var ruralD = document.getElementById("rural-d");
	  ruralD.value = "10";
	}
</script>

<div class="hero">
	<img class="logo black" src="http://static.startribune.com/images/icons/startribune-logo-black.svg" alt="star tribune logo">
	<h1>What would it take for <span class="republican party">Trump <div class="cand-mug"></div></span> to win Minnesota over <span class="democrat party">Biden <div class="cand-mug"></div></span>?</h1>

	<h2>Geography is just one of many variables in a presidential race. But it’s a big one. Where voters turn out could determine whether President Donald Trump becomes the first Republican presidential candidate to win Minnesota in nearly half a century. Try changing voter turnout and the partisan mix in different regions based on the 2016 election -- when Hillary Clinton won the state by less than 2 percent -- to discover what it would take to flip Minnesota red.</h2>

	<p class="byline-special"><b>By Michael Corey, Political reporter here and here</b><br>Star Tribune • Sept. XX, 2020</p>
	<!-- sharing -->
</div>

<div class="scenario first">
	<h5>What we know from 2016</h5>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget convallis pulvinar, nisl dolor luctus nisl, at ornare odio massa non leo. Quisque eleifend dictum neque, eget sagittis orci suscipit vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
	<p>Democratic candidate Hillary Clinton won Minnesota in 2016, carrying more lorem ipsum here and more stuff here. Rhoncus turpis. Fusce id arcu quis ex egestas tincidunt non et mi. Etiam sit amet accumsan risus. Vivamus vulputate, mi eget. If the 2020 election looked the same as the previous presidential, election, Biden would win Minnesota with 46.9% of the vote.</p>
	<p>Lets look at some scenarios where Trump could come out ahead.</p>
</div>

<section id="year-comparison">
	<div class="project-wrapper" >
		<div id="totals-2020" class="year-totals">
			<h2>What would it take for Trump to win Minnesota?</h2>
			<div class="cand-totals">
				<div class:winner="{$proj_d_votes_statewide > $proj_r_votes_statewide}" class="cand-info d">
					<div class="cand-mug"></div>
					<h4 class="cand-name"><b>Joe Biden</b></h4>
					<h4 class="cand-name old"><b>2016: Hillary Clinton</b> {commaNumber($d_votes_statewide_2016)}</h4>
				</div>

				<div class:winner="{$proj_r_votes_statewide > $proj_d_votes_statewide}" class="cand-info r" >
					<div class="cand-mug"></div>
					<h4 class="cand-name"><b>Donald Trump</b></h4>
					<h4 class="cand-name old"><b>2016: Donald Trump</b> {commaNumber($r_votes_statewide_2016)}</h4>
				</div>

				<div class:winner="{$proj_r_votes_statewide > $proj_d_votes_statewide}" class="trump bar" style="width: {proj_r_pct}%;">
					<h3>{proj_r_pct}%</h3>
				</div>
				<div class:winner="{$proj_d_votes_statewide > $proj_r_votes_statewide}" class="biden bar" style="width: {proj_d_pct}%;">
					<h3>{proj_d_pct}%</h3>
				</div>
				<h4 class="cand-votes r" style="right: calc({proj_r_pct}% - 150px)">{commaNumber($proj_r_votes_statewide)} votes</h4>
				<h4 class="cand-votes d" style="left: calc({proj_d_pct}% - 150px);">{commaNumber($proj_d_votes_statewide)} votes</h4>
				<div class="trump bar old" style="width: {r_pct_2016}%;"></div>
				<div class="biden bar old" style="width: {d_pct_2016}%;"></div>

			</div>
		</div>
	</div>
</section>

<div class="scenario second">
	<h5>Rural revolt</h5>
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
					<p class="less button">-</p>
					<input type=number bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0>
					<p class="more button">+</p>
				</div>
			</label>
			<p class="explainer"><b>Or partisan balance in rural counties</b> would need to lean 4 percent more Republican.</p>
			<label>
				<input type=range bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 class="partisan" id="rural-p">
				<div class="wrapper">
					<p class="less button">-</p>
					<input type=number bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0 >
					<p class="more button">+</p>
				</div>
			</label>
		</div>
		<div class="map">
			<img src="https://static.startribune.com/svg/rural.svg" alt="map" class="map">
		</div>
	</div>
	<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
Reset dials</button>
	<!-- <button class="show" on:click={scenario2}>Play this scenario</button> -->
</div>


<div class="scenario third clear">
	<h5>Suburban thing here</h5>
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
					<p class="less button">-</p>
					<input type=number bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
					<p class="more button">+</p>
				</div>
			</label>
			<p class="explainer"><b>Or partisan balance in suburban counties</b> would need to lean 4 percent more Republican.</p>
			<label>
				<input type=range bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 class="partisan">
				<div class="wrapper">
					<p class="less button">-</p>
					<input type=number bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
					<p class="more button">+</p>
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

	<!-- <button class="show" on:click={scenario2}>Play this scenario</button> -->
</div>


<div class="scenario fourth">
	<h5>Two counties, majority of votes</h5>
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
					<p class="less button">-</p>
					<input type=number bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
					<p class="more button">+</p>
				</div>
			</label>
			<p class="explainer"><b>Or partisan balance in urban counties</b> would need to lean 4 percent more Republican.</p>
			<label>
				<input type=range bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 class="partisan">
				<div class="wrapper">
					<p class="less button">-</p>
					<input type=number bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
					<p class="more button">+</p>
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
		<div class="regional-stats rural">
			<div class="sixteen">
				<h4>2016<br/>(actual)</h4>
				<div class="pct">{ turnout_rural_2016 }%</div>
				<div class="votes">{ commaNumber($total_votes_regional_2016_rural) }</div>
			</div>
			<div class="twenty">
				<h4>2020<br/>(projected)</h4>
				<div class="pct">{ turnout_rural_projected }%</div>
				<div class="votes">{ commaNumber($proj_total_votes_regional_rural) }</div>
			</div>
		</div>
		<img src="https://static.startribune.com/svg/rural.svg" alt="map" class="map">
		<label>Turnout percentage<br/>

			<input type=range bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 class="density" id="rural-d">
			<div class="wrapper">
				<p class="less button">-</p>
				<input type=number bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0>
				<p class="more button">+</p>
			</div>
		</label>

		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 class="partisan" id="rural-p">
			<div class="wrapper">
				<p class="less button">-</p>
				<input type=number bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0 >
				<p class="more button">+</p>
			</div>
		</label>

		<div class="expert">
			<h5>Expert mode</h5>
			<label>Change other party percentage<br/>
				<input type=range bind:value={other_party_modifiers["rural"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<p class="less button">-</p>
					<input type=number bind:value={other_party_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0>
					<p class="more button">+</p>
				</div>
			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=range bind:value={other_party_partisan_modifiers["rural"]} min=0 max=1 step=0.1 placeholder=0.5 class="partisan">
				<div class="wrapper">
					<p class="less button">-</p>
					<input type=number bind:value={other_party_partisan_modifiers["rural"]} min=0 max=1 step=0.1>
					<p class="more button">+</p>
				</div>
			</label>
		</div>
	</div>

	<div id="outcity-dashboard"  class="dashboard">
		<h3>Greater MN counties with regional centers</h3>
		<div class="regional-stats outstate">
			<div class="sixteen">
				<h4>2016<br/>(actual)</h4>
				<div class="pct">{ turnout_outstate_2016 }%</div>
				<div class="votes">{ commaNumber($total_votes_regional_2016_outstate) }</div>
			</div>
			<div class="twenty">
				<h4>2020<br/>(projected)</h4>
				<div class="pct">{ turnout_outstate_projected }%</div>
				<div class="votes">{ commaNumber($proj_total_votes_regional_outstate) }</div>
			</div>
		</div>
		<img src="https://static.startribune.com/svg/regional.svg" alt="map" class="map">
		<label>Turnout percentage<br/>
			<input type=range bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="density">
			<div class="wrapper">
				<p class="less button">-</p>
				<input type=number bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0 >
				<p class="more button">+</p>
			</div>
		</label>
		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="partisan">
			<div class="wrapper">
				<p class="less button">-</p>
				<input type=number bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
				<p class="more button">+</p>
			</div>
		</label>

		<div class="expert">
			<h5>Expert mode</h5>
			<label>Change other party percentage<br/>
				<input type=range bind:value={other_party_modifiers["outstate city"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
				<p class="less button">-</p>
					<input type=number bind:value={other_party_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
					<p class="more button">+</p>
				</div>

			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=range bind:value={other_party_partisan_modifiers["outstate city"]} min=0 max=1 step=0.1 placeholder=0.5 class="partisan">
				<div class="wrapper">
				<p class="less button">-</p>
					<input type=number bind:value={other_party_partisan_modifiers["outstate city"]} min=0 max=1 step=0.1>
					<p class="more button">+</p>
				</div>
			</label>
		</div>
	</div>

	<div id="suburban-dashboard"  class="dashboard">
		<h3>Suburban Twin Cities</h3>
		<div class="regional-stats suburban">
			<div class="sixteen">
				<h4>2016<br/>(actual)</h4>
				<div class="pct">{ turnout_suburban_2016 }%</div>
				<div class="votes">{ commaNumber($total_votes_regional_2016_suburban) }</div>
			</div>
			<div class="twenty">
				<h4>2020<br/>(projected)</h4>
				<div class="pct">{ turnout_suburban_projected }%</div>
				<div class="votes">{ commaNumber($proj_total_votes_regional_suburban) }</div>
			</div>
		</div>
		<img src="https://static.startribune.com/svg/suburbs.svg" alt="map" class="map">
		<label>Turnout percentage<br/>
			<input type=range bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 class="density">
			<div class="wrapper">
				<p class="less button">-</p>
				<input type=number bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
				<p class="more button">+</p>
			</div>
		</label>
		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 class="partisan">
			<div class="wrapper">
				<p class="less button">-</p>
				<input type=number bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
				<p class="more button">+</p>
			</div>
		</label>

		<div class="expert">
			<h5>Expert mode</h5>
			<label>Change other party percentage<br/>
				<input type=range bind:value={other_party_modifiers["suburban"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
				<p class="less button">-</p>
					<input type=number bind:value={other_party_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
					<p class="more button">+</p>
				</div>


			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=range bind:value={other_party_partisan_modifiers["suburban"]} min=0 max=1 step=0.1 placeholder=0.5 class="partisan">
				<div class="wrapper">
					<p class="less button">-</p>
					<input type=number bind:value={other_party_partisan_modifiers["suburban"]} min=0 max=1 step=0.1>
					<p class="more button">+</p>
				</div>
			</label>
		</div>
	</div>

	<div id="urban-dashboard"  class="dashboard">
		<h3>Hennepin and Ramsey counties</h3>
		<div class="regional-stats urban">
			<div class="sixteen">
				<h4>2016<br/>(actual)</h4>
				<div class="pct">{ turnout_urban_2016 }%</div>
				<div class="votes">{ commaNumber($total_votes_regional_2016_urban) }</div>
			</div>
			<div class="twenty">
				<h4>2020<br/>(projected)</h4>
				<div class="pct">{ turnout_urban_projected }%</div>
				<div class="votes">{ commaNumber($proj_total_votes_regional_urban) }</div>
			</div>
		</div>
		<img src="https://static.startribune.com/svg/urban.svg" alt="map" class="map">
		<label>Turnout percentage<br/>
			<input type=range bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 class="density">
			<div class="wrapper">
				<p class="less button">-</p>
				<input type=number bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
				<p class="more button">+</p>
			</div>
		</label>
		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 class="partisan">
			<div class="wrapper">
				<p class="less button">-</p>
				<input type=number bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
				<p class="more button">+</p>
			</div>
		</label>

		<div class="expert">
			<h5>Expert mode</h5>
			<label>Change other party percentage<br/>
				<input type=range bind:value={other_party_modifiers["urban"]} min=-10 max=10 step=0.1 class="density">
				<div class="wrapper">
					<p class="less button">-</p>
					<input type=number bind:value={other_party_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
					<p class="more button">+</p>
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

<p class="expert-mode" on:click={myFunction} id="expert">Are you a statistical pro? Bring out the expert mode</p>


<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" alt="reset" class="reset">
Reset dials</button>

<table class="county-projections" cellspacing="0" cellpadding="0">
	<tr class="sticky">
		<th>County</th>
		<th>Type</th>
		<th>2016 total votes</th>
		<th>2016 3rd/other party votes</th>
		<th>Projected total votes</th>
		<th>2016 %R</th>
		<th>2016 %D</th>
		<th>Projected %R</th>
		<th>Projected %D</th>
	</tr>
	{#each county_list as county_data, list_index}
		<County name={county_data.county} {county_data} bind:turnout_modifier={turnout_modifiers[county_data.classification]} bind:partisan_modifier={partisan_modifiers[county_data.classification]} bind:other_party_modifier={other_party_modifiers[county_data.classification]} bind:other_party_partisan_modifier={other_party_partisan_modifiers[county_data.classification]}/>
	{/each}
</table>
