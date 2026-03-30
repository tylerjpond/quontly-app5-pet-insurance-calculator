<script lang="ts">
  import clsx from 'clsx'

  export let age: number
  export let error: string | undefined
  export let onAgeChange: (value: number) => void
</script>

<div class="space-y-2">
  <div class="flex items-center justify-between gap-3">
    <span class="font-semibold">Pet age</span>
    <span class="text-xs text-base-content/55">Years</span>
  </div>
  <div class="grid gap-3 sm:grid-cols-[1fr_148px]">
    <input
      type="range"
      class="range range-primary"
      min="0"
      max="15"
      step="1"
      value={age}
      on:input={(event) => onAgeChange(Number((event.currentTarget as HTMLInputElement).value))}
    />
    <label class={clsx('input input-bordered flex items-center gap-2', error && 'input-error')}>
      <input
        type="number"
        class="no-spinner w-full"
        min="0"
        max="15"
        step="1"
        value={age}
        on:input={(event) => onAgeChange(Number((event.currentTarget as HTMLInputElement).value))}
      />
      <span class="text-xs text-base-content/55">yrs</span>
    </label>
  </div>
  {#if error}
    <p class="text-sm text-error">{error}</p>
  {/if}
</div>
