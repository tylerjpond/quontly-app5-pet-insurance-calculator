<script lang="ts">
  export let items: readonly { question: string; answer: string }[]
</script>

<div class="grid gap-4">
  {#each items as item, index (item.question)}
    <div class="collapse collapse-arrow border border-base-300 bg-base-100">
      <input type="checkbox" name={`faq-${index}`} />
      <div class="collapse-title text-lg font-semibold">{item.question}</div>
      <div class="collapse-content leading-7 text-base-content/80">
        <p>{item.answer}</p>
      </div>
    </div>
  {/each}
</div>
