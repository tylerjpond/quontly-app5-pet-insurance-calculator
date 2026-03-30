<script lang="ts">
  import type { QuizInputs } from '$lib/petInsurance'

  export let currentStep: number
  export let inputs: QuizInputs
</script>

<section class="mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-20">
  <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
    <div class="space-y-6">
      <div class="text-primary text-xs font-semibold uppercase tracking-[0.24em]">Pet Insurance Comparison</div>
      <div class="space-y-4">
        <h1 class="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          Match pet insurance plans to your pet profile in minutes.
        </h1>
        <p class="max-w-2xl text-lg leading-8 text-base-content/80">
          Compare coverage, reputation, and estimated monthly cost with a guided quiz for dogs and cats.
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
        <a class="btn btn-primary btn-lg" href="#calculator">Start comparison quiz</a>
        <a class="btn btn-outline btn-lg" href="#how-it-works">See scoring details</a>
      </div>
      <div class="grid gap-3 sm:grid-cols-3">
        <div class="rounded-box border border-base-300 bg-base-100/85 p-4">
          <p class="text-sm text-base-content/60">Quiz steps</p>
          <p class="mt-1 text-lg font-semibold">6-step flow</p>
        </div>
        <div class="rounded-box border border-base-300 bg-base-100/85 p-4">
          <p class="text-sm text-base-content/60">Compare plans</p>
          <p class="mt-1 text-lg font-semibold">Top 4 ranked</p>
        </div>
        <div class="rounded-box border border-base-300 bg-base-100/85 p-4">
          <p class="text-sm text-base-content/60">Factors</p>
          <p class="mt-1 text-lg font-semibold">Price, coverage, reputation</p>
        </div>
      </div>
    </div>

    <div class="card border border-base-300 bg-base-100/90 shadow-xl">
      <div class="card-body gap-5">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.3em]">Quick snapshot</p>
        <div class="space-y-3">
          <div>
            <p class="text-sm text-base-content/60">Current quiz status</p>
            <p class="text-3xl font-semibold">Step {currentStep} of 6</p>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-box border border-base-300 bg-base-200/60 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Pet</p>
              <p class="mt-2 text-xl font-semibold wrap-break-word">{inputs.petType === 'other' ? 'Other' : `${inputs.petType.toUpperCase()} · ${inputs.breed}`}</p>
            </div>
            <div class="rounded-box border border-base-300 bg-base-200/60 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Priority</p>
              <p class="mt-2 text-xl font-semibold wrap-break-word">{inputs.priorities.length ? inputs.priorities.join(', ') : 'Select one'}</p>
            </div>
          </div>
        </div>
        <p class="rounded-box bg-base-200 p-4 text-sm leading-6 text-base-content/75">
          Educational comparison only. Confirm exclusions, waiting periods, and policy language directly with providers.
        </p>
      </div>
    </div>
  </div>
</section>
