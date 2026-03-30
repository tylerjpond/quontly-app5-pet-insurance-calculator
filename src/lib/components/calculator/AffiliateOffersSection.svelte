<script lang="ts">
  import SectionHeading from '$lib/components/SectionHeading.svelte'
  import type { AffiliateCardContent } from '$lib/content/site'

  export let disclosure: string
  export let cards: AffiliateCardContent[] = []
</script>

<section id="offers" class="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
  <SectionHeading
    eyebrow="Affiliate offers"
    title="Provider and quote links"
    description="These links support operation of this free tool. Recommendation scoring is independent of affiliate relationships."
  />

  <div class="alert border border-primary/15 bg-primary/5 mt-8 text-sm text-base-content/80">
    <span>{disclosure}</span>
  </div>

  <div class="mt-8 grid gap-6 lg:grid-cols-3">
    {#each cards as card (card.title)}
      <article class="card border border-base-300 bg-base-100 shadow-sm">
        <div class="card-body gap-4">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-xl font-semibold">{card.title}</h2>
              <p class="mt-1 text-sm text-base-content/55">{card.disclosureTag}</p>
            </div>
            <span class="badge badge-primary badge-outline">{card.badge}</span>
          </div>
          <p class="leading-7 text-base-content/75">{card.description}</p>
          <ul class="space-y-2 text-sm text-base-content/70">
            {#each card.highlights as highlight (highlight)}
              <li class="flex gap-2">
                <span class="bg-primary mt-1 h-2 w-2 rounded-full" aria-hidden="true"></span>
                <span>{highlight}</span>
              </li>
            {/each}
          </ul>
          <div class="card-actions mt-auto justify-between">
            <a class="btn btn-primary" href={card.href} target="_blank" rel="noreferrer">{card.ctaLabel}</a>
            <span class="text-xs text-base-content/55">FTC disclosure applies</span>
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>
