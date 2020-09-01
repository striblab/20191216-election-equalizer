<script>
	import CountyData from './data/mncounties.json'
	import County from './County.svelte';
	const commaNumber = require('comma-number')

	import { total_votes_statewide_2016, r_votes_statewide_2016, d_votes_statewide_2016, projected_total_votes_statewide, projected_r_votes_statewide, projected_d_votes_statewide } from './stores.js';

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

	let projected_r_pct = 0;
	let projected_d_pct = 0;
	let d_pct_2016 = 0;
	let r_pct_2016 = 0;
	$ : {

		d_pct_2016 = Math.round(($d_votes_statewide_2016 / $total_votes_statewide_2016) * 1000) / 10;
		r_pct_2016 = Math.round(($r_votes_statewide_2016 / $total_votes_statewide_2016) * 1000) / 10;

		projected_r_pct = Math.round(($projected_r_votes_statewide / $projected_total_votes_statewide) * 1000) / 10;
		projected_d_pct = Math.round(($projected_d_votes_statewide / $projected_total_votes_statewide) * 1000) / 10;
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

</script>
<!-- 
<div class="hero">
	<h1>What would it take for Trump to win Minnesota?</h1>

	<p>Geography is just one of many variables in a presidential race. But it’s a big one. Where voters turn out could determine whether President Donald Trump becomes the first Republican presidential candidate to win Minnesota in nearly half a century. Try changing voter turnout and the partisan mix in different regions based on the 2016 election -- when Hillary Clinton won the state by less than 2 percent -- to discover what it would take to flip Minnesota red.</p>
</div> -->

<svelte:window bind:scrollY/>

<section id="year-comparison" class="fixed">

	<div class="project-wrapper" >
		<div id="totals-2020" class="year-totals">
			<h2>2020 Projected Minnesota election results</h2>
			<div class="cand-totals">
				<div class:winner="{$projected_d_votes_statewide > $projected_r_votes_statewide}" class="cand-info d">
					<div class="cand-mug"></div>
					<h4 class="cand-name"><b>Joe Biden</b> {commaNumber($projected_d_votes_statewide)} votes</h4>
					<h4 class="cand-name old"><b>2016: Hillary Clinton</b> {commaNumber($d_votes_statewide_2016)}</h4>
				</div>

				<div class:winner="{$projected_r_votes_statewide > $projected_d_votes_statewide}" class="cand-info r" >
					<div class="cand-mug"></div>
					<h4 class="cand-name">{commaNumber($projected_r_votes_statewide)} votes <b>Donald Trump</b></h4>
					<h4 class="cand-name old"><b>2016: Donald Trump</b> {commaNumber($r_votes_statewide_2016)}</h4>
				</div>

				<div class:winner="{$projected_r_votes_statewide > $projected_d_votes_statewide}" class="trump bar" style="width: {projected_r_pct}%;">
					<h3>{projected_r_pct}%</h3>
				</div>
				<div class:winner="{$projected_d_votes_statewide > $projected_r_votes_statewide}" class="biden bar" style="width: {projected_d_pct}%;">
					<h3>{projected_d_pct}%</h3>
				</div>

				<div class="trump bar old" style="width: {r_pct_2016}%;"></div>
				<div class="biden bar old" style="width: {d_pct_2016}%;"></div>
			
			</div>
		</div>
	</div>

	<!-- <div id="totals-2016" class="year-totals">
		<h2>2016</h2>
		<div class="cand-totals">
			<img class="cand-mug" src="img/placeholder.jpg" alt="Hillary Clinton"/>
			<div class="cand-info">
				<span class="cand-name">Hillary Clinton</span>
				<span class="totals d winner">{d_pct_2016}% {commaNumber($d_votes_statewide_2016)}</span>
			</div>
		</div>
		<div class="cand-totals">
			<img class="cand-mug" src="img/placeholder.jpg" alt="Donald Trump"/>
			<div class="cand-info">
				<span class="cand-name">Donald Trump</span>
				<span class="totals r">{r_pct_2016}% {commaNumber($r_votes_statewide_2016)}</span>
			</div>
		</div>
	</div> -->

	
</section>

<!-- <div class="totals r" class:winner="{$projected_r_votes_statewide > $projected_d_votes_statewide}">Republican: {projected_r_pct}% {commaNumber($projected_r_votes_statewide)}</div>
<div class="totals d" class:winner="{$projected_d_votes_statewide > $projected_r_votes_statewide}">Democrat: {projected_d_pct}% {commaNumber($projected_d_votes_statewide)}</div>
<div>Total statewide projected votes: {commaNumber($projected_total_votes_statewide)}</div> -->
<div id="dashboard" class="dashboard-wrapper">
	<div id="rural-dashboard" class="dashboard">
		
		<h3>Rural<br></h3>
		<img src="https://static.startribune.com/svg/blankmap.svg" alt="map" class="map">
		<label>Turnout percentage<br/>
			
			<input type=range bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 class="density">
			<div class="wrapper">
				<p class="less button">-</p>
				<input type=number bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0>
				<p class="more button">+</p>
			</div>
		</label>

		<label>Partisan balance<br/>
			<input type=range bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 class="partisan">
			<div class="wrapper">
				<p class="less button">-</p>
				<input type=number bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0.0 >
				<p class="more button">+</p>
			</div>
		</label>

		<div class="expert">
			<label>change other party percentage<br/>
				<input type=number bind:value={other_party_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0>
				<input type=range bind:value={other_party_modifiers["rural"]} min=-10 max=10 step=0.1>
			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=number bind:value={other_party_partisan_modifiers["rural"]} min=0 max=1 step=0.1>
				All from Dem <input type=range bind:value={other_party_partisan_modifiers["rural"]} min=0 max=1 step=0.1 placeholder=0.5> All from GOP
			</label>
		</div>
	</div>

	<div id="outcity-dashboard"  class="dashboard">
		<h3>Greater MN counties with regional centers</h3>
		<img src="https://static.startribune.com/svg/blankmap.svg" alt="map" class="map">
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
			<label>Change other party percentage<br/>
				<input type=number bind:value={other_party_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
				<input type=range bind:value={other_party_modifiers["outstate city"]} min=-10 max=10 step=0.1>
			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=number bind:value={other_party_partisan_modifiers["outstate city"]} min=0 max=1 step=0.1>
				All from Dem <input type=range bind:value={other_party_partisan_modifiers["outstate city"]} min=0 max=1 step=0.1 placeholder=0.5> All from GOP
			</label>
		</div>
	</div>

	<div id="suburban-dashboard"  class="dashboard">
		<h3>Suburban Twin Cities</h3>
		<img src="https://static.startribune.com/svg/blankmap.svg" alt="map" class="map">
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
			<label>change other party percentage<br/>
				<input type=number bind:value={other_party_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
				<input type=range bind:value={other_party_modifiers["suburban"]} min=-10 max=10 step=0.1>
			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=number bind:value={other_party_partisan_modifiers["suburban"]} min=0 max=1 step=0.1>
				All from Dem <input type=range bind:value={other_party_partisan_modifiers["suburban"]} min=0 max=1 step=0.1 placeholder=0.5> All from GOP
			</label>
		</div>
	</div>

	<div id="urban-dashboard"  class="dashboard">
		<h3>Hennepin and Ramsey counties</h3>
		<img src="https://static.startribune.com/svg/blankmap.svg" alt="map" class="map">
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
			<label>change other party percentage<br/>
				<input type=number bind:value={other_party_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
				<input type=range bind:value={other_party_modifiers["urban"]} min=-10 max=10 step=0.1>
			</label>
			<label>Which party do new "other party" votes take from?<br/>
				<input type=number bind:value={other_party_partisan_modifiers["urban"]} min=0 max=1 step=0.1>
				All from Dem <input type=range bind:value={other_party_partisan_modifiers["urban"]} min=0 max=1 step=0.1 placeholder=0.5> All from GOP
			</label>
		</div>
	</div>
</div>

<p class="expert-mode" on:click={myFunction} id="expert">Are you a statistical pro? Bring out the expert mode</p>


<button class="reset-button" type="button" on:click={resetDials}>
	<img src="https://static.startribune.com/svg/reset.svg" class="reset">
Reset dials</button>

<table class="county-projections" cellspacing="0" cellpadding="0">
	<tr>
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
