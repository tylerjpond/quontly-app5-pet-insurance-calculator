<script lang="ts">
  import clsx from 'clsx'
  import type { CountryCode, RegionOption } from '$lib/petInsurance'

  export let country: CountryCode
  export let countries: Array<{ code: CountryCode; label: string }>
  export let region: string
  export let regionOptions: RegionOption[]
  export let error: string | undefined
  export let onCountryChange: (value: CountryCode) => void
  export let onRegionChange: (value: string) => void
</script>

<div class="space-y-4">
  <div class="flex items-center justify-between gap-3">
    <span class="font-semibold">Location</span>
    <span class="text-xs text-base-content/55">Country and state/province/territory</span>
  </div>

  <label class="form-control w-full gap-2">
    <span class="label-text text-xs uppercase tracking-[0.2em] text-base-content/60">Country</span>
    <select
      class="select select-bordered w-full"
      value={country}
      on:change={(event) => onCountryChange((event.currentTarget as HTMLSelectElement).value as CountryCode)}
    >
      {#each countries as countryOption (countryOption.code)}
        <option value={countryOption.code}>{countryOption.label}</option>
      {/each}
    </select>
  </label>

  <label class="form-control w-full gap-2">
    <span class="label-text text-xs uppercase tracking-[0.2em] text-base-content/60">
      {country === 'US' ? 'State' : 'Province / Territory'}
    </span>
    <select
      class={clsx('select select-bordered w-full', error && 'select-error')}
      value={region}
      on:change={(event) => onRegionChange((event.currentTarget as HTMLSelectElement).value)}
    >
      {#each regionOptions as option (option.code)}
        <option value={option.code}>{option.label} ({option.code})</option>
      {/each}
    </select>
  </label>

  {#if error}
    <p class="text-sm text-error">{error}</p>
  {/if}
</div>
