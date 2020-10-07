import { writable } from 'svelte/store';

export const eligible_voters_rural = writable(0);
export const eligible_voters_outstate = writable(0)
export const eligible_voters_suburban = writable(0)
export const eligible_voters_urban = writable(0)

export const total_votes_statewide_2016 = writable(0);
export const r_votes_statewide_2016 = writable(0);
export const d_votes_statewide_2016 = writable(0);

export const proj_total_votes_statewide = writable(0);
export const proj_r_votes_statewide = writable(0);
export const proj_d_votes_statewide = writable(0);

export const total_votes_regional_2016_rural = writable(0);
export const total_votes_regional_2016_outstate = writable(0);
export const total_votes_regional_2016_suburban = writable(0);
export const total_votes_regional_2016_urban = writable(0);

export const r_votes_regional_2016_rural = writable(0);
export const r_votes_regional_2016_outstate = writable(0);
export const r_votes_regional_2016_suburban = writable(0);
export const r_votes_regional_2016_urban = writable(0);

export const d_votes_regional_2016_rural = writable(0);
export const d_votes_regional_2016_outstate = writable(0);
export const d_votes_regional_2016_suburban = writable(0);
export const d_votes_regional_2016_urban = writable(0);

export const proj_total_votes_regional_rural = writable(0);
export const proj_total_votes_regional_outstate = writable(0);
export const proj_total_votes_regional_suburban = writable(0);
export const proj_total_votes_regional_urban = writable(0);

export const proj_r_votes_regional_rural = writable(0);
export const proj_r_votes_regional_outstate = writable(0);
export const proj_r_votes_regional_suburban = writable(0);
export const proj_r_votes_regional_urban = writable(0);

export const proj_d_votes_regional_rural = writable(0);
export const proj_d_votes_regional_outstate = writable(0);
export const proj_d_votes_regional_suburban = writable(0);
export const proj_d_votes_regional_urban = writable(0);

export let excessive_turnout_rural = writable([]);
export let excessive_turnout_outstate = writable([]);
export let excessive_turnout_suburban = writable([]);
export let excessive_turnout_urban = writable([]);


export const eligible_voters_brianastan = writable(0);
export const total_votes_regional_2016_brianastan = writable(0);
export const r_votes_regional_2016_brianastan = writable(0);
export const d_votes_regional_2016_brianastan = writable(0);
export const proj_total_votes_regional_brianastan = writable(0);
export const proj_r_votes_regional_brianastan = writable(0);
export const proj_d_votes_regional_brianastan = writable(0);
export let excessive_turnout_brianastan = writable([]);
