<script lang="ts">
  import { z } from 'zod'
  import AgeStep from '$lib/components/calculator/AgeStep.svelte'
  import AffiliateOffersSection from '$lib/components/calculator/AffiliateOffersSection.svelte'
  import BreedStep from '$lib/components/calculator/BreedStep.svelte'
  import ExplainerGuideSection from '$lib/components/calculator/ExplainerGuideSection.svelte'
  import HeroSnapshotSection from '$lib/components/calculator/HeroSnapshotSection.svelte'
  import PetTypeStep from '$lib/components/calculator/PetTypeStep.svelte'
  import PreExistingConditionStep from '$lib/components/calculator/PreExistingConditionStep.svelte'
  import PriorityStep from '$lib/components/calculator/PriorityStep.svelte'
  import RecommendationSummaryCards from '$lib/components/calculator/RecommendationSummaryCards.svelte'
  import RecommendationTableSection from '$lib/components/calculator/RecommendationTableSection.svelte'
  import StateStep from '$lib/components/calculator/StateStep.svelte'
  import StepProgress from '$lib/components/calculator/StepProgress.svelte'
  import SectionHeading from '$lib/components/SectionHeading.svelte'
  import { affiliateCards, explainerSections, faqs, siteMeta } from '$lib/content/site'
  import {
    breeds,
    countries,
    defaultQuizInputs,
    defaultRegionByCountry,
    getCurrencyForCountry,
    getRecommendations,
    isValidRegion,
    regionsByCountry,
    type CountryCode,
    type PetType,
    type Priority,
    type QuizInputs,
  } from '$lib/petInsurance'

  const inputSchema = z.object({
    petType: z.union([z.literal('dog'), z.literal('cat'), z.literal('other')]),
    breed: z.string().min(1, 'Select a breed.'),
    age: z.number().min(0, 'Age cannot be negative.').max(15, 'Age must be 15 years or below.'),
    country: z.union([z.literal('US'), z.literal('CA')]),
    region: z.string().min(2, 'Select a state, province, or territory.').max(2, 'Select a valid region code.'),
    priorities: z
      .array(z.union([z.literal('price'), z.literal('coverage'), z.literal('reputation')]))
      .min(1, 'Select at least one priority.')
      .max(2, 'Select up to two priorities.'),
    hasPreExistingCondition: z.boolean(),
  })

  type FieldErrors = Partial<Record<keyof QuizInputs, string>>

  const steps = ['Pet type', 'Breed', 'Age', 'Location', 'Priority', 'Pre-existing conditions'] as const

  const scoreFormatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  let currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  const priorityOptions: Array<{ value: Priority; label: string; hint: string }> = [
    { value: 'price', label: 'Price', hint: 'Lower monthly premium' },
    { value: 'coverage', label: 'Coverage', hint: 'Broader policy fit' },
    { value: 'reputation', label: 'Reputation', hint: 'Provider track record' },
  ]

  const petTypeOptions: Array<{ value: PetType; label: string }> = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'other', label: 'Other' },
  ]

  let inputs: QuizInputs = { ...defaultQuizInputs }
  let currentStep = 1
  let submitted = false
  let breedQuery = ''

  function collectErrors(error: z.ZodError<QuizInputs> | null): FieldErrors {
    if (!error) return {}

    return error.issues.reduce<FieldErrors>((errors, issue) => {
      const field = issue.path[0] as keyof QuizInputs | undefined
      if (field && !errors[field]) {
        errors[field] = issue.message
      }
      return errors
    }, {})
  }

  $: validation = inputSchema.safeParse(inputs)
  $: fieldErrors = collectErrors(validation.success ? null : validation.error)
  $: availableBreeds = inputs.petType === 'other' ? [] : breeds.filter((breed) => breed.type === inputs.petType)
  $: filteredBreeds = availableBreeds.filter((breed) => breed.name.toLowerCase().includes(breedQuery.trim().toLowerCase()))
  $: visibleBreeds = breedQuery.trim() ? filteredBreeds.slice(0, 100) : availableBreeds.slice(0, 100)
  $: regionOptions = regionsByCountry[inputs.country]
  $: currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: getCurrencyForCountry(inputs.country),
    maximumFractionDigits: 0,
  })
  $: recommendations = submitted && validation.success ? getRecommendations(inputs) : []

  function setField<T extends keyof QuizInputs>(field: T, value: QuizInputs[T]) {
    inputs = { ...inputs, [field]: value }
  }

  function updatePetType(nextType: PetType) {
    const fallbackBreed = nextType === 'other'
      ? 'Other / Mixed'
      : breeds.find((breed) => breed.type === nextType)?.name ?? ''

    inputs = {
      ...inputs,
      petType: nextType,
      breed: fallbackBreed,
    }
    breedQuery = ''
  }

  function updateCountry(nextCountry: CountryCode) {
    inputs = {
      ...inputs,
      country: nextCountry,
      region: defaultRegionByCountry[nextCountry],
    }
  }

  function updateBreedQuery(query: string) {
    breedQuery = query

    if (inputs.petType === 'other') {
      return
    }

    const normalizedQuery = query.trim().toLowerCase()
    const matches = normalizedQuery
      ? availableBreeds.filter((breed) => breed.name.toLowerCase().includes(normalizedQuery))
      : availableBreeds

    const firstMatch = matches[0]?.name
    if (firstMatch && inputs.breed !== firstMatch) {
      setField('breed', firstMatch)
    }
  }

  function togglePriority(priority: Priority) {
    const exists = inputs.priorities.includes(priority)
    if (exists) {
      inputs = {
        ...inputs,
        priorities: inputs.priorities.filter((value) => value !== priority),
      }
      return
    }

    if (inputs.priorities.length >= 2) {
      return
    }

    inputs = {
      ...inputs,
      priorities: [...inputs.priorities, priority],
    }
  }

  function stepValid() {
    switch (currentStep) {
      case 1:
        return Boolean(inputs.petType)
      case 2:
        return inputs.petType === 'other' ? true : Boolean(inputs.breed)
      case 3:
        return inputs.age >= 0 && inputs.age <= 15
      case 4:
        return isValidRegion(inputs.country, inputs.region)
      case 5:
        return inputs.priorities.length > 0 && inputs.priorities.length <= 2
      case 6:
        return true
      default:
        return false
    }
  }

  function goNext() {
    if (!stepValid()) return
    currentStep = Math.min(currentStep + 1, steps.length)
  }

  function goBack() {
    currentStep = Math.max(currentStep - 1, 1)
  }

  function submitQuiz() {
    if (!validation.success) return
    submitted = true
  }

  function resetQuiz() {
    inputs = { ...defaultQuizInputs }
    currentStep = 1
    submitted = false
    breedQuery = ''
  }

</script>

<svelte:head>
  <title>Pet Insurance Comparison Guide | Quontly</title>
  <meta
    name="description"
    content="Compare pet insurance plans by pet profile, priorities, and estimated monthly premium in a guided six-step calculator."
  />
</svelte:head>

<main>
  <HeroSnapshotSection {currentStep} {inputs} />

  <section id="calculator" class="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
    <SectionHeading
      eyebrow="Calculator"
      title="Build your pet profile and rank matching plans"
      description="Complete each step to generate provider recommendations with estimated monthly premiums and score transparency."
    />

    <div class="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
      <section class="rounded-[1.35rem] border border-base-300 bg-base-100/85 p-5 shadow-xl md:p-6 xl:sticky xl:top-24 xl:self-start">
        <div class="space-y-2 border-b border-base-300/80 pb-5">
          <p class="text-primary text-xs font-semibold uppercase tracking-[0.28em]">Quiz flow</p>
          <h2 class="text-2xl font-semibold tracking-tight">Step {currentStep}: {steps[currentStep - 1]}</h2>
          <p class="text-sm leading-6 text-base-content/70">Progress through each section. You can go back at any time without losing your inputs.</p>
        </div>

        <div class="mt-5 space-y-6">
          <StepProgress {steps} {currentStep} />

          {#if currentStep === 1}
            <PetTypeStep selected={inputs.petType} options={petTypeOptions} onSelect={updatePetType} />
          {/if}

          {#if currentStep === 2}
            <BreedStep
              petType={inputs.petType}
              breed={inputs.breed}
              {breedQuery}
              options={visibleBreeds}
              hasMoreMatches={filteredBreeds.length > 100}
              error={fieldErrors.breed}
              onQueryChange={updateBreedQuery}
              onBreedChange={(value) => setField('breed', value)}
            />
          {/if}

          {#if currentStep === 3}
            <AgeStep age={inputs.age} error={fieldErrors.age} onAgeChange={(value) => setField('age', value)} />
          {/if}

          {#if currentStep === 4}
            <StateStep
              country={inputs.country}
              countries={countries}
              region={inputs.region}
              regionOptions={regionOptions}
              error={fieldErrors.country ?? fieldErrors.region}
              onCountryChange={updateCountry}
              onRegionChange={(value) => setField('region', value)}
            />
          {/if}

          {#if currentStep === 5}
            <PriorityStep
              priorities={inputs.priorities}
              options={priorityOptions}
              error={fieldErrors.priorities}
              onToggle={togglePriority}
            />
          {/if}

          {#if currentStep === 6}
            <PreExistingConditionStep
              hasPreExistingCondition={inputs.hasPreExistingCondition}
              onChange={(value) => setField('hasPreExistingCondition', value)}
            />
          {/if}

          <div class="flex flex-wrap items-center justify-between gap-3 border-t border-base-300 pt-4">
            <div class="flex flex-wrap items-center gap-2">
              <button class="btn btn-ghost" type="button" on:click={goBack} disabled={currentStep === 1}>Previous</button>
              {#if currentStep >= 2}
                <button class="btn btn-outline" type="button" on:click={resetQuiz}>Reset quiz</button>
              {/if}
            </div>
            {#if currentStep < 6}
              <button class="btn btn-primary" type="button" on:click={goNext}>Next step</button>
            {:else}
              <button class="btn btn-primary" type="button" on:click={submitQuiz}>Show recommendations</button>
            {/if}
          </div>
        </div>
      </section>

      <div class="space-y-6">
        <RecommendationSummaryCards {recommendations} {inputs} {scoreFormatter} {currencyFormatter} />
        <RecommendationTableSection {recommendations} {scoreFormatter} {currencyFormatter} />
      </div>
    </div>
  </section>

  <AffiliateOffersSection disclosure={siteMeta.disclosure} cards={affiliateCards} />

  <ExplainerGuideSection sections={explainerSections} {faqs} />
</main>