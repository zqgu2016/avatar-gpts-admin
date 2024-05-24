<script>
    export let nodes = [];
  
    let expanded = [];
    const toggle = (index) => {
      expanded = expanded.includes(index)
        ? expanded.filter(i => i !== index)
        : [...expanded, index];
    };
  </script>
  
  <ul class="ml-4">
    {#each nodes as node, index}
      <li>
        <div class="flex items-center">
          {#if node.children}
            <button
              on:click={() => toggle(index)}
              class="mr-2 focus:outline-none"
            >
              {expanded.includes(index) ? '▼' : '▶'}
            </button>
          {:else}
            <span class="mr-5"></span>
          {/if}
          { node.name }
        </div>
        {#if expanded.includes(index) && node.children}
          <Tree nodes={node.children} />
        {/if}
      </li>
    {/each}
  </ul>
  
  <style>
    button {
      font-size: 0.75rem;
    }
  </style>