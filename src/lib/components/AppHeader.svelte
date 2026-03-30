<script lang="ts">
  import BrandLogo from '$lib/components/BrandLogo.svelte'
  import { siteMeta } from '$lib/content/site'

  const navItems = [
    { href: '/', label: 'Calculator' },
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/disclosure', label: 'Disclosure' },
  ]
</script>

<header class="border-b border-base-300/70 bg-base-100/75 backdrop-blur">
  <div class="navbar mx-auto max-w-7xl px-4 lg:px-6">
    <div class="navbar-start flex-wrap gap-2">
      <BrandLogo />
      <span class="text-primary ml-2 text-lg font-semibold">{siteMeta.siteName}</span>
    </div>
    <div class="navbar-end hidden gap-1 sm:flex">
      {#each navItems as item (item.href)}
        <a class="btn btn-ghost btn-sm" href={item.href}>{item.label}</a>
      {/each}
    </div>
  </div>
</header>
