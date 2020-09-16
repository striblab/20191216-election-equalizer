<script>
  const commaNumber = require('comma-number')

  export let region = '';
  // export let d_votes_2016 = 0;
  // export let d_pct_2016 = 0;
  export let d_votes_proj = 0;
  export let d_pct_proj = 0;
  // export let r_votes_2016 = 0;
  // export let r_pct_2016 = 0;
  export let r_votes_proj = 0;
  export let r_pct_proj = 0;
  // export let total_votes_2016 = 0;
  // export let total_votes_proj = 0;
  export let turnout_pct_2016 = 0;
  export let turnout_pct_proj = 0;
</script>

<h4 class="regional">Regional vote totals</h4>
<div class="regional-votes {region}">
  <div class="dem" class:winner="{d_votes_proj > r_votes_proj}">
    <h4>Joe Biden</h4>
    <div class="pct">{ d_pct_proj }%</div>
    <div class="votes">{ commaNumber(d_votes_proj) }</div>
  </div>
  <div class="gop" class:winner="{r_votes_proj > d_votes_proj}">
    <h4>Donald Trump</h4>
    <div class="pct">{ r_pct_proj }%</div>
    <div class="votes">{ commaNumber(r_votes_proj) }</div>
  </div>
</div>
<!-- <div class="regional-votes {region}">
  <div class="dem" class:winner="{d_votes_proj > r_votes_proj}">
    <h4>Hillary Clinton</h4>
    <div class="pct">{ d_pct_2016 }%</div>
    <div class="votes">{ commaNumber(d_votes_2016) }</div>
  </div>
  <div class="gop" class:winner="{r_votes_proj > d_votes_proj}">
    <h4>Donald Trump</h4>
    <div class="pct">{ r_pct_2016 }%</div>
    <div class="votes">{ commaNumber(r_votes_2016) }</div>
  </div>
</div> -->
<h4 class="turnout">Voter turnout</h4>
<div class="regional-turnout {region}">
  <div class="sixteen">
    <h4>2016</h4>
    <div class="pct">{ turnout_pct_2016 }%</div>
    <!-- <div class="votes">{ commaNumber(total_votes_2016) }</div> -->
  </div>
  <div class="twenty">
    <h4>2020 projected</h4>
    <div class="pct">{ turnout_pct_proj }%</div>
    <!-- <div class="votes">{ commaNumber(total_votes_proj) }</div> -->
  </div>
</div>
