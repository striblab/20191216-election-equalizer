<script>
	import { projected_total_votes_statewide, projected_r_votes_statewide, projected_d_votes_statewide } from './stores.js';
	const commaNumber = require('comma-number')

	const roundPct = function(input) {
		return Math.round(input * 1000) / 10 + '%';
	}

	export let name;
	export let county_data = {
		votes_2016: 0,
		rPct_2016: 0,
		dPct_2016: 0,
		classification: ''
	};
	let projected_total_votes = 0;
	let projected_r_votes = 0;
	let projected_d_votes = 0;
	let projected_other_votes = 0;
	let projected_r_pct = 1;
	let projected_d_pct = 1;
	let projected_final_r_pct = 1;
	let projected_final_d_pct= 1;
	// let projected_other_pct = 0.5;  // By default each party loses/gains half of projected third party votes

	let thirdPartyCount = function(data_obj) {
		return data_obj.votes_2016 - data_obj.rVotes_2016 - data_obj.dVotes_2016
	}

	// let thirdPartyPct = function(data_obj) {
	// 	return roundPct(thirdPartyCounty / data_obj.votes_2016)
	// }

	export let turnout_modifier = 0;
	export let partisan_modifier = 0;
	export let other_party_modifier = 0;
	export let other_party_partisan_modifier = 0;
	$ : {
		if (!isNaN(partisan_modifier) && !isNaN(turnout_modifier)) {
			let prev_projected_total_votes = projected_total_votes;
			let prev_projected_r_votes = projected_r_votes;
			let prev_projected_d_votes = projected_d_votes;
			projected_total_votes = Math.round(county_data.votes_2016 * (1 + (turnout_modifier / 100)));

			let projected_base_r_pct = county_data.rPct_2016 + (partisan_modifier / 100);
			let projected_base_d_pct = county_data.dPct_2016 - (partisan_modifier / 100);

			projected_other_votes = thirdPartyCount(county_data) * (1 + (other_party_modifier / 100));
			let projected_other_votes_diff = projected_other_votes - thirdPartyCount(county_data);
			let projected_other_r_loss = projected_other_votes_diff * other_party_partisan_modifier;
			let projected_other_d_loss = projected_other_votes_diff * (1 - other_party_partisan_modifier);



			projected_r_votes = Math.round((projected_base_r_pct * projected_total_votes) - projected_other_r_loss);
			projected_d_votes = Math.round((projected_base_d_pct * projected_total_votes) - projected_other_d_loss);
			projected_final_r_pct = projected_r_votes / projected_total_votes;
			projected_final_d_pct = projected_d_votes / projected_total_votes;

			projected_total_votes_statewide.update(n => n - prev_projected_total_votes + projected_total_votes);
			projected_r_votes_statewide.update(n => n - prev_projected_r_votes + projected_r_votes);
			projected_d_votes_statewide.update(n => n - prev_projected_d_votes + projected_d_votes);
		}
	}

</script>

<style>

	td.number {
		text-align: right;
	}

	td {
		padding: 4px 10px;
		border-bottom: 2px #FFF solid;
	}

	td.D-D-2016,
	td.D-D-projected {
		background-color: #9999ff;
	}

	td.R-R-2016,
	td.R-R-projected {
		background-color: #ff9999;
	}
</style>

<tr>
	<td>{name}</td>
	<td>{county_data.classification}</td>
	<td class="number">{commaNumber(county_data.votes_2016)}</td>
	<td class="number">{roundPct(thirdPartyCount(county_data) / county_data.votes_2016)}</td>
	<td class="number">{commaNumber(projected_total_votes)}</td>
	<td class="number R-{county_data.winner_2016}-2016">{roundPct(county_data.rPct_2016)}</td>
	<td class="number D-{county_data.winner_2016}-2016">{roundPct(county_data.dPct_2016)}</td>
	<td class="number" class:R-R-projected="{projected_final_r_pct > projected_final_d_pct}">{roundPct(projected_final_r_pct)}</td>
	<td class="number" class:D-D-projected="{projected_final_r_pct < projected_final_d_pct}">{roundPct(projected_final_d_pct)}</td>
</tr>
