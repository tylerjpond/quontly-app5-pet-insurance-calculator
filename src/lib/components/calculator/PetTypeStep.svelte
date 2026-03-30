<script lang="ts">
  import clsx from 'clsx'
  import type { PetType } from '$lib/petInsurance'

  export let selected: PetType
  export let options: Array<{ value: PetType; label: string }>
  export let onSelect: (value: PetType) => void
</script>

<div class="space-y-2">
  <div class="flex items-center justify-between gap-3">
    <span class="font-semibold">Pet type</span>
    <span class="text-xs text-base-content/55">Choose your pet category</span>
  </div>
  <div class="grid gap-2 sm:grid-cols-3">
    {#each options as option (option.value)}
      <button
        type="button"
        class={clsx(
          'btn h-auto min-h-0 rounded-2xl border-2 px-4 py-3 justify-between',
          selected === option.value ? 'btn-primary border-primary' : 'btn-outline border-base-300'
        )}
        on:click={() => onSelect(option.value)}
      >
        <span>{option.label}</span>
        <span>{selected === option.value ? '✓' : ''}</span>
      </button>
    {/each}
  </div>
</div>
