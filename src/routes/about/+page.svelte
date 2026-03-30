<script lang="ts">
  import LegalContentPage from '$lib/components/LegalContentPage.svelte'
  import { legalPageCopy } from '$lib/content/site'

  const page = legalPageCopy.about
</script>

<svelte:head>
  <title>About this comparison guide | Quontly</title>
  <meta name="description" content={page.description} />
</svelte:head>

<LegalContentPage eyebrow="Methodology" {page} />