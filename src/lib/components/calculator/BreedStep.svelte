<script lang="ts">
  import clsx from 'clsx'
  import type { PetType } from '$lib/petInsurance'

  export let petType: PetType
  export let breed: string
  export let breedQuery: string
  export let options: Array<{ name: string }> = []
  export let hasMoreMatches = false
  export let error: string | undefined
  export let onQueryChange: (value: string) => void
  export let onBreedChange: (value: string) => void
</script>

<div class="space-y-3">
  <div class="flex items-center justify-between gap-3">
    <span class="font-semibold">Breed</span>
    <span class="text-xs text-base-content/55">Search and select a breed</span>
  </div>

  {#if petType === 'other'}
    <div class="rounded-box border border-dashed border-primary/30 bg-primary/8 p-4 text-sm text-base-content/80">
      Breed-level scoring is disabled for other pets. The estimator uses a generalized baseline profile.
    </div>
  {:else}
    <label class={clsx('input input-bordered flex items-center gap-2', error && 'input-error')}>
      <span class="text-xs uppercase tracking-[0.12em] text-base-content/55">Search</span>
      <input
        type="text"
        class="w-full"
        placeholder="Type breed name..."
        value={breedQuery}
        on:input={(event) => onQueryChange((event.currentTarget as HTMLInputElement).value)}
      />
    </label>

    <select
      class={clsx('select select-bordered w-full', error && 'select-error')}
      value={breed}
      on:change={(event) => onBreedChange((event.currentTarget as HTMLSelectElement).value)}
    >
      {#each options as option (option.name)}
        <option value={option.name}>{option.name}</option>
      {/each}
    </select>

    {#if hasMoreMatches}
      <p class="text-xs text-base-content/55">Showing first 100 matches. Narrow your search for faster selection.</p>
    {/if}

    {#if error}
      <p class="text-sm text-error">{error}</p>
    {/if}
  {/if}
</div>
