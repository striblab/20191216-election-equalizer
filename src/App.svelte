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

</script>

<style>
	#dashboard {
			margin-bottom: 2em;
	}

	#dashboard div {
			display: inline-block;
			font-size: 0.7em;
			margin-right: 2em;
	}

	#year-comparison {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.year-totals {
		flex: 1 1 0px;
		max-width: 350px;
	}

	#totals-2016 {
		text-align: right;
	}

	#totals-2016 h2 {
		text-align: left;
	}

	#totals-2020 h2 {
		text-align: right;
	}

	img.cand-mug {
		display: inline-block;
		width: 25%;
	}

	.cand-info {
		display: inline-block;
		/* width: 70%; */
	}

	.cand-info span {
		display: block;
		width: 8em;
	}

	#totals-2016 .cand-info span {
		margin-right: 1em;
	}

	#totals-2020 .cand-info span {
		margin-left: 1em;
	}

	#dashboard input[type=number] {
		width: 3em;
	}

	input[type=number]::-webkit-outer-spin-button,
	input[type=number]::-webkit-inner-spin-button {
	    -webkit-appearance: none;
	    margin: 0;
	}

	input[type=number] {
	    -moz-appearance:textfield;
	}

	@supports (-moz-appearance:none) {
		#dashboard input[type=range] {
			padding: 9px 0;
			position: relative;
			top: 10px;
		}
	}


	.reset-button {
		margin: 0 0 1em;
	}

	.totals {
		display: inline-block;
		width: 50%;
		font-size: 1em;
		padding: 10px;
		margin-bottom: 20px;
	}

	.totals.r.winner {
		background-color: #ff9999;
	}

	.totals.d.winner {
		background-color: #9999ff;
	}

	table.county-projections th {
		padding: 4px 10px;
		border-bottom: 2px #FFF solid;
	}
</style>

<h1>What would it take for Trump to win Minnesota?</h1>

<p>Geography is just one of many variables in a presidential race. But it’s a big one. Where voters turn out could determine whether President Donald Trump becomes the first Republican presidential candidate to win Minnesota in nearly half a century. Try changing voter turnout and the partisan mix in different regions based on the 2016 election -- when Hillary Clinton won the state by less than 2 percent -- to discover what it would take to flip Minnesota red.</p>

<section id="year-comparison">

	<div id="totals-2016" class="year-totals">
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
	</div>

	<div id="totals-2020" class="year-totals">
		<h2>2020 (projected)</h2>
		<div class="cand-totals">
			<div class="cand-info">
				<span class="cand-name">Joe Biden</span>
				<span class="totals d" class:winner="{$projected_d_votes_statewide > $projected_r_votes_statewide}">{projected_d_pct}% {commaNumber($projected_d_votes_statewide)}</span>
			</div>
			<img class="cand-mug" src="img/placeholder.jpg" alt="Joe Biden"/>
		</div>
		<div class="cand-totals">
			<div class="cand-info">
				<span class="cand-name">Donald Trump</span>
				<span class="totals r" class:winner="{$projected_r_votes_statewide > $projected_d_votes_statewide}">{projected_r_pct}% {commaNumber($projected_r_votes_statewide)}</span>
			</div>
			<img class="cand-mug" src="img/placeholder.jpg" alt="Donald Trump"/>
		</div>
	</div>
</section>

<!-- <div class="totals r" class:winner="{$projected_r_votes_statewide > $projected_d_votes_statewide}">Republican: {projected_r_pct}% {commaNumber($projected_r_votes_statewide)}</div>
<div class="totals d" class:winner="{$projected_d_votes_statewide > $projected_r_votes_statewide}">Democrat: {projected_d_pct}% {commaNumber($projected_d_votes_statewide)}</div>
<div>Total statewide projected votes: {commaNumber($projected_total_votes_statewide)}</div> -->
<div id="dashboard">
	<div id="rural-dashboard">
		<h3>Rural</h3>
		<label>turnout percentage<br/>
			<input type=number bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0>
			<input type=range bind:value={turnout_modifiers["rural"]} min=-10 max=10 step=0.1>
		</label>
		<label>partisan balance<br/>
			<input type=number bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0>
			More Dem <input type=range bind:value={partisan_modifiers["rural"]} min=-10 max=10 step=0.1> More GOP
		</label>

		<br/><br/>Expert mode:
		<label>change other party percentage<br/>
			<input type=number bind:value={other_party_modifiers["rural"]} min=-10 max=10 step=0.1 placeholder=0>
			<input type=range bind:value={other_party_modifiers["rural"]} min=-10 max=10 step=0.1>
		</label>
		<label>Which party do new "other party" votes take from?<br/>
			<input type=number bind:value={other_party_partisan_modifiers["rural"]} min=0 max=1 step=0.1>
			All from Dem <input type=range bind:value={other_party_partisan_modifiers["rural"]} min=0 max=1 step=0.1 placeholder=0.5> All from GOP
		</label>
	</div>

	<div id="outcity-dashboard">
		<h3>Greater MN counties with regional centers</h3>
		<label>turnout percentage<br/>
			<input type=number bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
			<input type=range bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1>
		</label>
		<label>partisan balance<br/>
			<input type=number bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
			More Dem <input type=range bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1> More GOP
		</label>

		<br/><br/>
		<label>change other party percentage<br/>
			<input type=number bind:value={other_party_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
			<input type=range bind:value={other_party_modifiers["outstate city"]} min=-10 max=10 step=0.1>
		</label>
		<label>Which party do new "other party" votes take from?<br/>
			<input type=number bind:value={other_party_partisan_modifiers["outstate city"]} min=0 max=1 step=0.1>
			All from Dem <input type=range bind:value={other_party_partisan_modifiers["outstate city"]} min=0 max=1 step=0.1 placeholder=0.5> All from GOP
		</label>
	</div>

	<div id="suburban-dashboard">
		<h3>Suburban Twin Cities</h3>
		<label>turnout percentage<br/>
			<input type=number bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
			<input type=range bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1>
		</label>
		<label>partisan balance<br/>
			<input type=number bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
			More Dem <input type=range bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1> More GOP
		</label>

		<br/><br/>
		<label>change other party percentage<br/>
			<input type=number bind:value={other_party_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
			<input type=range bind:value={other_party_modifiers["suburban"]} min=-10 max=10 step=0.1>
		</label>
		<label>Which party do new "other party" votes take from?<br/>
			<input type=number bind:value={other_party_partisan_modifiers["suburban"]} min=0 max=1 step=0.1>
			All from Dem <input type=range bind:value={other_party_partisan_modifiers["suburban"]} min=0 max=1 step=0.1 placeholder=0.5> All from GOP
		</label>
	</div>

	<div id="urban-dashboard">
		<h3>Hennepin and Ramsey counties</h3>
		<label>turnout percentage<br/>
			<input type=number bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
			<input type=range bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1>
		</label>
		<label>partisan balance<br/>
			<input type=number bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
			More Dem <input type=range bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1> More GOP
		</label>

		<br/><br/>
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
<button class="reset-button" type="button" on:click={resetDials}>Reset dials</button>

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
