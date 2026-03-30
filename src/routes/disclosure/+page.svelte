<script lang="ts">
  import LegalContentPage from '$lib/components/LegalContentPage.svelte'
  import { legalPageCopy } from '$lib/content/site'

  const page = legalPageCopy.disclosure
</script>

<svelte:head>
  <title>Affiliate disclosure | Quontly</title>
  <meta name="description" content={page.description} />
</svelte:head>

<LegalContentPage eyebrow="Disclosure" {page} />