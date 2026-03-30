<script lang="ts">
  import { getRegionLabel, type QuizInputs, type Recommendation } from '$lib/petInsurance'

  export let recommendations: Recommendation[] = []
  export let inputs: QuizInputs
  export let scoreFormatter: Intl.NumberFormat
  export let currencyFormatter: Intl.NumberFormat
</script>

<div class="grid gap-4 sm:grid-cols-2">
  <article class="card border border-primary/30 bg-primary/8">
    <div class="card-body">
      <p class="text-xs uppercase tracking-[0.2em] text-base-content/70">Top match score</p>
      <p class="text-2xl font-semibold">{recommendations[0] ? `${scoreFormatter.format(recommendations[0].matchScore)} / 100` : 'Pending'}</p>
      <p class="text-sm text-base-content/80">{recommendations[0] ? recommendations[0].provider.name : 'Complete all steps and submit.'}</p>
    </div>
  </article>

  <article class="card border border-base-300 bg-base-100">
    <div class="card-body">
      <p class="text-xs uppercase tracking-[0.2em] text-base-content/70">Estimated monthly</p>
      <p class="text-2xl font-semibold">{recommendations[0] ? currencyFormatter.format(recommendations[0].monthlyPremiumEstimate) : '$0'}</p>
      <p class="text-sm text-base-content/80">
        {#if recommendations[0]}
          {inputs.country} · {getRegionLabel(inputs.country, inputs.region)} · {inputs.age} yrs
        {:else}
          Profile required
        {/if}
      </p>
    </div>
  </article>

  <article class="card border border-base-300 bg-base-100">
    <div class="card-body">
      <p class="text-xs uppercase tracking-[0.2em] text-base-content/70">Priority weighting</p>
      <p class="text-2xl font-semibold capitalize">{inputs.priorities.length ? inputs.priorities.join(' + ') : 'Not set'}</p>
      <p class="text-sm text-base-content/80">Choose up to two priorities</p>
    </div>
  </article>

  <article class="card border border-base-300 bg-base-100">
    <div class="card-body">
      <p class="text-xs uppercase tracking-[0.2em] text-base-content/70">Compared providers</p>
      <p class="text-2xl font-semibold">{recommendations.length || 0}</p>
      <p class="text-sm text-base-content/80">Top ranked results shown</p>
    </div>
  </article>
</div>
