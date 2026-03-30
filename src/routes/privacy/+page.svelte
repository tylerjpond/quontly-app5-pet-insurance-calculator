<script lang="ts">
  import LegalContentPage from '$lib/components/LegalContentPage.svelte'
  import { legalPageCopy } from '$lib/content/site'

  const page = legalPageCopy.privacy
</script>

<svelte:head>
  <title>Privacy policy | Quontly</title>
  <meta name="description" content={page.description} />
</svelte:head>

<LegalContentPage eyebrow="Privacy" {page} />