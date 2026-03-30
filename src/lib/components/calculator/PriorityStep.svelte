<script lang="ts">
  import clsx from 'clsx'
  import type { Priority } from '$lib/petInsurance'

  export let priorities: Priority[]
  export let options: Array<{ value: Priority; label: string; hint: string }>
  export let error: string | undefined
  export let onToggle: (value: Priority) => void
</script>

<div class="space-y-2">
  <div class="flex items-center justify-between gap-3">
    <span class="font-semibold">What matters most</span>
    <span class="text-xs text-base-content/55">Select up to two</span>
  </div>
  <div class="grid gap-2 sm:grid-cols-3">
    {#each options as option (option.value)}
      <button
        type="button"
        class={clsx(
          'rounded-2xl border-2 p-4 text-left transition duration-200 hover:-translate-y-0.5',
          priorities.includes(option.value)
            ? 'border-primary bg-primary text-primary-content shadow-sm'
            : 'border-base-300 bg-base-100 text-base-content hover:border-primary/40 hover:bg-primary/5'
        )}
        on:click={() => onToggle(option.value)}
      >
        <p class="font-semibold">{option.label}</p>
        <p class={clsx('mt-1 text-xs', priorities.includes(option.value) ? 'text-primary-content/80' : 'text-base-content/55')}>
          {option.hint}
        </p>
      </button>
    {/each}
  </div>
  <p class="text-xs text-base-content/55">Selected: {priorities.length ? priorities.join(', ') : 'none'}</p>
  {#if error}
    <p class="text-sm text-error">{error}</p>
  {/if}
</div>
