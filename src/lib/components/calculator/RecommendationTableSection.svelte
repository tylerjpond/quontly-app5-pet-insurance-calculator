<script lang="ts">
  import type { Recommendation } from '$lib/petInsurance'

  export let recommendations: Recommendation[] = []
  export let scoreFormatter: Intl.NumberFormat
  export let currencyFormatter: Intl.NumberFormat
</script>

<div class="card border border-base-300 bg-base-100 shadow-xl">
  <div class="card-body gap-5">
    <div>
      <p class="text-primary text-sm font-semibold uppercase tracking-[0.3em]">Comparison table</p>
      <h2 class="text-2xl font-semibold">Top plan matches</h2>
    </div>

    {#if recommendations.length}
      <div class="overflow-x-auto">
        <table class="table table-zebra table-sm">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Monthly</th>
              <th>Deductible</th>
              <th>Reimbursement</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {#each recommendations as row (row.provider.key)}
              <tr>
                <td>
                  <a class="link link-primary" href={row.provider.affiliateUrl} target="_blank" rel="noreferrer">
                    {row.provider.name}
                  </a>
                </td>
                <td>{currencyFormatter.format(row.monthlyPremiumEstimate)}</td>
                <td>{row.provider.deductibleOptions}</td>
                <td>{row.provider.reimbursementOptions}</td>
                <td>{scoreFormatter.format(row.matchScore)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <div class="rounded-box border border-dashed border-base-300 bg-base-200/70 p-4 text-sm text-base-content/70">
        Recommendations will appear after you complete and submit the quiz.
      </div>
    {/if}
  </div>
</div>
