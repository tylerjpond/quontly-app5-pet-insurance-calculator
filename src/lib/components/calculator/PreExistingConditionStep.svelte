<script lang="ts">
  import clsx from 'clsx'

  export let hasPreExistingCondition: boolean
  export let onChange: (value: boolean) => void
</script>

<div class="space-y-2">
  <div class="flex items-center justify-between gap-3">
    <span class="font-semibold">Pre-existing conditions</span>
    <span class="text-xs text-base-content/55">Impacts estimate and provider fit</span>
  </div>
  <div class="grid gap-2 sm:grid-cols-2">
    {#each [
      { value: false, label: 'No' },
      { value: true, label: 'Yes' },
    ] as option (option.label)}
      <button
        type="button"
        class={clsx(
          'btn h-auto min-h-0 rounded-2xl border-2 px-4 py-3 justify-between',
          hasPreExistingCondition === option.value ? 'btn-primary border-primary' : 'btn-outline border-base-300'
        )}
        on:click={() => onChange(option.value)}
      >
        <span>{option.label}</span>
        <span>{hasPreExistingCondition === option.value ? '✓' : ''}</span>
      </button>
    {/each}
  </div>
</div>
