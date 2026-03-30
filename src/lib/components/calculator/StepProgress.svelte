<script lang="ts">
  import clsx from 'clsx'

  export let steps: readonly string[]
  export let currentStep: number
</script>

<div class="grid gap-2 sm:grid-cols-3">
  {#each steps as label, index (label)}
    {@const stepNumber = index + 1}
    <div
      class={clsx(
        'rounded-box min-h-16 border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] flex items-center',
        stepNumber === currentStep && 'border-primary bg-primary/10 text-primary',
        stepNumber < currentStep && 'border-success/30 bg-success/10 text-success',
        stepNumber > currentStep && 'border-base-300 text-base-content/55'
      )}
    >
      {stepNumber}. {label}
    </div>
  {/each}
</div>
