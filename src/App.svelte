<script>
	import CountyData from './data/mncounties.json'
	import County from './County.svelte';
	const commaNumber = require('comma-number')

	import { projected_total_votes_statewide, projected_r_votes_statewide, projected_d_votes_statewide } from './stores.js';

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

	let projected_r_pct = 0;
	let projected_d_pct = 0;
	$ : {
		projected_r_pct = Math.round(($projected_r_votes_statewide / $projected_total_votes_statewide) * 1000) / 10;
		projected_d_pct = Math.round(($projected_d_votes_statewide / $projected_total_votes_statewide) * 1000) / 10;
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

<h1>It's tiiiiime to play! Flip! That! State!</h1>

<div class="totals r" class:winner="{$projected_r_votes_statewide > $projected_d_votes_statewide}">Republican: {projected_r_pct}% {commaNumber($projected_r_votes_statewide)}</div>
<div class="totals d" class:winner="{$projected_d_votes_statewide > $projected_r_votes_statewide}">Democrat: {projected_d_pct}% {commaNumber($projected_d_votes_statewide)}</div>
<div>Total statewide projected votes: {commaNumber($projected_total_votes_statewide)}</div>

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
	</div>

	<div id="outcity-dashboard">
		<h3>Outstate city</h3>
		<label>turnout percentage<br/>
			<input type=number bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
			<input type=range bind:value={turnout_modifiers["outstate city"]} min=-10 max=10 step=0.1>
		</label>
		<label>partisan balance<br/>
			<input type=number bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1 placeholder=0>
			More Dem <input type=range bind:value={partisan_modifiers["outstate city"]} min=-10 max=10 step=0.1> More GOP
		</label>
	</div>

	<div id="suburban-dashboard">
		<h3>Suburban</h3>
		<label>turnout percentage<br/>
			<input type=number bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
			<input type=range bind:value={turnout_modifiers["suburban"]} min=-10 max=10 step=0.1>
		</label>
		<label>partisan balance<br/>
			<input type=number bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1 placeholder=0>
			More Dem <input type=range bind:value={partisan_modifiers["suburban"]} min=-10 max=10 step=0.1> More GOP
		</label>
	</div>

	<div id="urban-dashboard">
		<h3>Urban</h3>
		<label>turnout percentage<br/>
			<input type=number bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
			<input type=range bind:value={turnout_modifiers["urban"]} min=-10 max=10 step=0.1>
		</label>
		<label>partisan balance<br/>
			<input type=number bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1 placeholder=0>
			More Dem <input type=range bind:value={partisan_modifiers["urban"]} min=-10 max=10 step=0.1> More GOP
		</label>
	</div>
</div>

<table class="county-projections" cellspacing="0" cellpadding="0">
	<tr>
		<th>County</th>
		<th>Type</th>
		<th>2016 total votes</th>
		<th>Projected total votes</th>
		<th>2016 %R</th>
		<th>2016 %D</th>
		<th>Projected %R</th>
		<th>Projected %D</th>
	</tr>
	{#each county_list as county_data, list_index}
		<County name={county_data.county} {county_data} bind:turnout_modifier={turnout_modifiers[county_data.classification]} bind:partisan_modifier={partisan_modifiers[county_data.classification]}/>
	{/each}
</table>
