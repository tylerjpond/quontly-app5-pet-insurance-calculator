<script lang="ts">
  import SectionHeading from '$lib/components/SectionHeading.svelte'
  import type { ContentSection } from '$lib/content/site'
  import FaqSection from '$lib/components/calculator/FaqSection.svelte'

  export let sections: ContentSection[] = []
  export let faqs: readonly { question: string; answer: string }[] = []
</script>

<section id="how-it-works" class="border-t border-base-300 bg-base-100/40">
  <div class="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
    <SectionHeading
      eyebrow="Guide"
      title="How this pet insurance comparison guide works"
      description="Understand the assumptions behind ranking and premium estimation before selecting a provider."
    />

    <div class="mt-10 grid gap-6 xl:grid-cols-3">
      {#each sections as section (section.title)}
        <article class="card border border-base-300 bg-base-100 shadow-sm">
          <div class="card-body gap-4">
            <div class="text-primary text-sm font-semibold uppercase tracking-[0.3em]">{section.eyebrow}</div>
            <h2 class="text-2xl font-semibold">{section.title}</h2>
            <div class="space-y-4 leading-7 text-base-content/80">
              {#each section.paragraphs as paragraph (paragraph)}
                <p>{paragraph}</p>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>

    <div class="mt-12">
      <FaqSection items={faqs} />
    </div>
  </div>
</section>
