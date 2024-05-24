<script>
    let documents = [
        { id: 1, name: 'Document 1' },
        { id: 2, name: 'Document 2' }
    ];

    function handleFileUpload(event) {
        const files = event.target.files;
        if (files.length) {
            const newDoc = {
                id: documents.length + 1,
                name: files[0].name
            };
            documents = [...documents, newDoc];
        }
    }
</script>

<div class="doc-page bg-white p-4">
    <h1 class="text-2xl font-bold mb-4">Documents</h1>
    <ul class="mb-4">
        {#each documents as doc}
            <li class="mb-2">{doc.name}</li>
        {/each}
    </ul>
    <label class="block">
        <span class="text-gray-700">Upload Document</span>
        <input type="file" on:change={handleFileUpload} class="mt-1 block w-full" />
    </label>
</div>

<style>
    .doc-page {
        max-width: 600px;
        margin: 0 auto;
    }
</style>