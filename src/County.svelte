<script>
	import { eligible_voters_rural, eligible_voters_outstate, eligible_voters_suburban, eligible_voters_urban, total_votes_statewide_2016, r_votes_statewide_2016, d_votes_statewide_2016, proj_total_votes_statewide, proj_r_votes_statewide, proj_d_votes_statewide, total_votes_regional_2016_rural, total_votes_regional_2016_outstate, total_votes_regional_2016_suburban, total_votes_regional_2016_urban, r_votes_regional_2016_rural, r_votes_regional_2016_outstate, r_votes_regional_2016_suburban, r_votes_regional_2016_urban, d_votes_regional_2016_rural, d_votes_regional_2016_outstate, d_votes_regional_2016_suburban, d_votes_regional_2016_urban, proj_total_votes_regional_rural, proj_total_votes_regional_outstate, proj_total_votes_regional_suburban, proj_total_votes_regional_urban, proj_r_votes_regional_rural, proj_r_votes_regional_outstate, proj_r_votes_regional_suburban, proj_r_votes_regional_urban, proj_d_votes_regional_rural, proj_d_votes_regional_outstate, proj_d_votes_regional_suburban, proj_d_votes_regional_urban, excessive_turnout_rural, excessive_turnout_outstate, excessive_turnout_suburban, excessive_turnout_urban } from './stores.js';
	const commaNumber = require('comma-number')

	const roundPct = function(input) {
		return Math.round(input * 1000) / 10 + '%';
	}

	export let name;
	export let county_data = {
		votes_2016: 0,
		rVotes_2016: 0,
		dVotes_2016: 0,
		// rPct_2016: 0,
		// dPct_2016: 0,
		turnout_2016: 0,
		cvap_2016: 0,
		classification: ''
	};
	let proj_total_votes = 0;
	let proj_r_votes = 0;
	let proj_d_votes = 0;
	let proj_other_votes = 0;
	let proj_r_pct = 1;
	let proj_d_pct = 1;
	let proj_turnout_pct = 0;
	let proj_final_r_pct = 1;
	let proj_final_d_pct= 1;
	let eligible_voters = 0;
	let d_pct_2016 = 0;
	let r_pct_2016 = 0;
	let turnout_2016 = 0;
	let bool_excessive_turnout = false;

	// let proj_other_pct = 0.5;  // By default each party loses/gains half of projected third party votes

	let thirdPartyCount = function(data_obj) {
		return data_obj.votes_2016 - data_obj.rVotes_2016 - data_obj.dVotes_2016
	}

	// let thirdPartyPct = function(data_obj) {
	// 	return roundPct(thirdPartyCounty / data_obj.votes_2016)
	// }

	let classification_label = function(classification) {
		if (classification == 'outstate city') {
			return 'Regional center'
		} else if (classification == 'urban') {
			return 'Urban'
		} else if (classification == 'suburban') {
			return 'Twin Cities suburb'
		} else if (classification == 'rural') {
			return 'Small town/rural'
		}
	}

	export let turnout_modifier = 0;
	export let partisan_modifier = 0;
	export let other_party_modifier = 0;
	export let other_party_partisan_modifier = 0;

	total_votes_statewide_2016.update(n => n + county_data.votes_2016);
	r_votes_statewide_2016.update(n => n + county_data.rVotes_2016);
	d_votes_statewide_2016.update(n => n + county_data.dVotes_2016);

	// eligible_voters = county_data.votes_2016 / county_data.turnout_2016);
	d_pct_2016 = county_data.dVotes_2016 / county_data.votes_2016;
	r_pct_2016 = county_data.rVotes_2016 / county_data.votes_2016;
	eligible_voters = county_data.cvap_2016;
	turnout_2016 = county_data.votes_2016 / eligible_voters;
	// turnout_2016_rounded = Math.round((county_data.votes_2016 / eligible_voters) * 1000) / 10;

	if (county_data['classification'] == 'rural') {
		total_votes_regional_2016_rural.update(n => n + county_data.votes_2016);
		r_votes_regional_2016_rural.update(n => n + county_data.rVotes_2016);
		d_votes_regional_2016_rural.update(n => n + county_data.dVotes_2016);

		eligible_voters_rural.update(n => n + eligible_voters);
	} else if (county_data['classification'] == 'outstate city') {
		total_votes_regional_2016_outstate.update(n => n + county_data.votes_2016);
		r_votes_regional_2016_outstate.update(n => n + county_data.rVotes_2016);
		d_votes_regional_2016_outstate.update(n => n + county_data.dVotes_2016);

		eligible_voters_outstate.update(n => n + eligible_voters);
	} else if (county_data['classification'] == 'suburban') {
		total_votes_regional_2016_suburban.update(n => n + county_data.votes_2016);
		r_votes_regional_2016_suburban.update(n => n + county_data.rVotes_2016);
		d_votes_regional_2016_suburban.update(n => n + county_data.dVotes_2016);

		eligible_voters_suburban.update(n => n + eligible_voters);
	} else if (county_data['classification'] == 'urban') {
		total_votes_regional_2016_urban.update(n => n + county_data.votes_2016);
		r_votes_regional_2016_urban.update(n => n + county_data.rVotes_2016);
		d_votes_regional_2016_urban.update(n => n + county_data.dVotes_2016);

		eligible_voters_urban.update(n => n + eligible_voters);
	}

	const add_to_array = function (array, county) {
		if (county) {
			const index = array.indexOf(county);
			if (index == -1) {
			  array.push(county);
			}
		}
	}

	const remove_from_array = function (array, county) {
		if (county) {
			const index = array.indexOf(county);
			if (index > -1) {
			  array.splice(index, 1);
			}
		}
	}

	$ : {
		if (!isNaN(partisan_modifier) && !isNaN(turnout_modifier)) {
			let prev_proj_total_votes = proj_total_votes;
			let prev_proj_r_votes = proj_r_votes;
			let prev_proj_d_votes = proj_d_votes;
			proj_total_votes = Math.round(county_data.votes_2016 * (1 + (turnout_modifier / 100)));

			proj_turnout_pct = proj_total_votes / eligible_voters;
			if (proj_turnout_pct >= 0.81 && proj_turnout_pct > turnout_2016) {
				console.log('too high!');
				bool_excessive_turnout = true;
			} else {
				bool_excessive_turnout = false;
			}

			let proj_base_r_pct = (county_data.rVotes_2016 / county_data.votes_2016) + (partisan_modifier / 100);
			let proj_base_d_pct = (county_data.dVotes_2016 / county_data.votes_2016) - (partisan_modifier / 100);

			// let proj_base_r_pct = county_data.rPct_2016 + (partisan_modifier / 100);
			// let proj_base_d_pct = county_data.dPct_2016 - (partisan_modifier / 100);

			proj_other_votes = thirdPartyCount(county_data) * (1 + (other_party_modifier / 100));
			let proj_other_votes_diff = proj_other_votes - thirdPartyCount(county_data);
			let proj_other_r_loss = proj_other_votes_diff * other_party_partisan_modifier;
			let proj_other_d_loss = proj_other_votes_diff * (1 - other_party_partisan_modifier);

			proj_r_votes = Math.round((proj_base_r_pct * proj_total_votes) - proj_other_r_loss);
			proj_d_votes = Math.round((proj_base_d_pct * proj_total_votes) - proj_other_d_loss);
			proj_final_r_pct = proj_r_votes / proj_total_votes;
			proj_final_d_pct = proj_d_votes / proj_total_votes;

			proj_total_votes_statewide.update(n => n - prev_proj_total_votes + proj_total_votes);
			proj_r_votes_statewide.update(n => n - prev_proj_r_votes + proj_r_votes);
			proj_d_votes_statewide.update(n => n - prev_proj_d_votes + proj_d_votes);

			if (county_data['classification'] == 'rural') {
				proj_total_votes_regional_rural.update(n => n - prev_proj_total_votes + proj_total_votes);
				proj_r_votes_regional_rural.update(n => n - prev_proj_r_votes + proj_r_votes);
				proj_d_votes_regional_rural.update(n => n - prev_proj_d_votes + proj_d_votes);
				if (bool_excessive_turnout === true) {
					add_to_array($excessive_turnout_rural, name);
				} else {
					remove_from_array($excessive_turnout_rural, name);
				}
			} else if (county_data['classification'] == 'outstate city') {
			 proj_total_votes_regional_outstate.update(n => n - prev_proj_total_votes + proj_total_votes);
			 proj_r_votes_regional_outstate.update(n => n - prev_proj_r_votes + proj_r_votes);
			 proj_d_votes_regional_outstate.update(n => n - prev_proj_d_votes + proj_d_votes);
			 if (bool_excessive_turnout === true) {
				 add_to_array($excessive_turnout_outstate, name);
			 } else {
				 remove_from_array($excessive_turnout_outstate, name);
			 }
			} else if (county_data['classification'] == 'suburban') {
			 proj_total_votes_regional_suburban.update(n => n - prev_proj_total_votes + proj_total_votes);
			 proj_r_votes_regional_suburban.update(n => n - prev_proj_r_votes + proj_r_votes);
			 proj_d_votes_regional_suburban.update(n => n - prev_proj_d_votes + proj_d_votes);
			 if (bool_excessive_turnout === true) {
				 add_to_array($excessive_turnout_suburban, name);
			 } else {
				 remove_from_array($excessive_turnout_suburban, name);
			 }
			} else if (county_data['classification'] == 'urban') {
			 proj_total_votes_regional_urban.update(n => n - prev_proj_total_votes + proj_total_votes);
			 proj_r_votes_regional_urban.update(n => n - prev_proj_r_votes + proj_r_votes);
			 proj_d_votes_regional_urban.update(n => n - prev_proj_d_votes + proj_d_votes);
			 if (bool_excessive_turnout === true) {
				 add_to_array($excessive_turnout_urban, name);
			 } else {
				 remove_from_array($excessive_turnout_urban, name);
			 }
			}
		}
	}

</script>

<tr>
	<td class="county">{name}<br><span class="type">{classification_label(county_data.classification)}</span></td>
	<!-- <td class="desktop-show type"></td> -->
	<td class="desktop-show number votes-2016">{commaNumber(county_data.votes_2016)} <span class="turnout">({roundPct(turnout_2016)})</span></td>
	<!-- <td class="desktop-show number">{roundPct(thirdPartyCount(county_data) / county_data.votes_2016)}</td> -->
	<td class="desktop-show number votes-2020">{commaNumber(proj_total_votes)} <span class="turnout" class:excessive="{bool_excessive_turnout}">({roundPct(proj_turnout_pct)})</span></td>
	<td class="desktop-show number r-2016 R-{county_data.winner_2016}-2016">{roundPct(r_pct_2016)}</td>
	<td class="desktop-show number d-2016 D-{county_data.winner_2016}-2016">{roundPct(d_pct_2016)}</td>
	<td class="number r-2020" class:R-R-projected="{proj_final_r_pct > proj_final_d_pct}">{roundPct(proj_final_r_pct)}</td>
	<td class="number d-2020" class:D-D-projected="{proj_final_r_pct < proj_final_d_pct}">{roundPct(proj_final_d_pct)}</td>
</tr>
