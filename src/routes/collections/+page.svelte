<script>
  import { onMount } from "svelte";
  let documents = [{ id: 1, name: "MS Digital.docx", description: "MS Digital.docx (MS Digital.docx)" }];
  let newDoc = { name: "", description: "" };

  const addDocument = () => {
    if (newDoc.name && newDoc.description) {
      documents = [...documents, { ...newDoc, id: documents.length + 1 }];
      newDoc = { name: "", description: "" };
    }
  };

  const deleteDocument = (id) => {
    documents = documents.filter(doc => doc.id !== id);
  };

  const editDocument = (id) => {
    let doc = documents.find(doc => doc.id === id);
    if (doc) {
      const newName = prompt("Edit Name:", doc.name);
      const newDescription = prompt("Edit Description:", doc.description);
      if (newName && newDescription) {
        doc.name = newName;
        doc.description = newDescription;
      }
    }
  };
</script>

<!-- Styles (import Tailwind CSS in your main CSS file) -->
<style>
  .row:hover {
    background-color: #f3f4f6;
  }
</style>

<div class="w-full p-4">
  <header class="mb-4">
    <h2 class="text-xl font-bold">Documents</h2>
  </header>

  <div class="mb-4 flex items-center">
    <input type="text" bind:value={newDoc.name} placeholder="Document Name" class="mr-2 p-2 border rounded" />
    <input type="text" bind:value={newDoc.description} placeholder="Document Description" class="mr-2 p-2 border rounded" />
    <button on:click={addDocument} class="p-2 bg-blue-500 text-white rounded">+</button>
  </div>

  <ul>
    {#each documents as doc}
      <li class="row flex items-center p-2 border-b">
        <div class="flex-1">
          <p class="text-lg">{doc.name}</p>
          <p class="text-sm text-gray-600">{doc.description}</p>
        </div>
        <button on:click={() => editDocument(doc.id)} class="ml-2 p-1 text-blue-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.84 18.45l1.775-.968-1.39-1.58 8.68-8.68 2.12 2.12-8.68 8.68-1.794-1.376.968 1.775z"></path></svg></button>
        <button on:click={() => deleteDocument(doc.id)} class="ml-2 p-1 text-red-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </li>
    {/each}
  </ul>
</div>