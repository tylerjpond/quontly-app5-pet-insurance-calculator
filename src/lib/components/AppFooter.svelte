<script lang="ts">
  import { siteMeta } from '$lib/content/site'

  export let year: number
</script>

<footer class="border-t border-base-300/70 bg-base-100/80">
  <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-base-content/75 sm:flex-row sm:items-center sm:justify-between lg:px-6">
    <div class="space-y-2">
      <p>© {year} Quontly</p>
      <p class="max-w-3xl">Educational estimate only. This tool helps compare plan fit but is not insurance, legal, or veterinary advice.</p>
    </div>
    <p class="max-w-2xl">{siteMeta.disclosure}</p>
  </div>
</footer>
