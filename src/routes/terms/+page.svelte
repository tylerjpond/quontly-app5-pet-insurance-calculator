<script lang="ts">
  import LegalContentPage from '$lib/components/LegalContentPage.svelte'
  import { legalPageCopy } from '$lib/content/site'

  const page = legalPageCopy.terms
</script>

<svelte:head>
  <title>Terms of use | Quontly</title>
  <meta name="description" content={page.description} />
</svelte:head>

<LegalContentPage eyebrow="Terms" {page} />