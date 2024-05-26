<script lang="ts">
	import { deleteFile, getFileListByCollectionId, uploadFiles } from '$lib/apis/rags';
	import { page } from '$app/stores';
	import GarbageBin from '$lib/components/icons/GarbageBin.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	let documents = [];
	let files;
	let showDialog = false;

	$: collectionId = $page.params.id;

	async function getFileList() {
		documents = await getFileListByCollectionId(collectionId);
	}

	$: {
		if (collectionId) {
			getFileList();
		}
	}

  const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			console.log('Escape');
			showDialog = false;
		}
	};

  $: if (showDialog) {
			window.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		} else {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'unset';
		}

	function handleFileChange(event) {
		files = Array.from(event.target.files);
	}

	function addDocument() {
		showDialog = true;
	}

	async function handleSave() {
		await uploadFiles(collectionId, files);
		showDialog = false;
		getFileList();
	}

	const deleteDocument = async (fileId) => {
		if (confirm('Are you sure you want to delete this file?')) {
			await deleteFile(collectionId, fileId);
			getFileList();
		}
	};
</script>

<div class="w-full p-4">
	<header class="mb-4">
		<h2 class="text-xl font-bold">Documents</h2>
	</header>

	<div class="mb-4 flex items-center">
		<button on:click={addDocument} class="p-2 bg-blue-500 text-white rounded">
			<Plus />
		</button>
		{#if showDialog}
			<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
				<div class="bg-white p-6 rounded shadow-lg">
					<input type="file" multiple on:change={handleFileChange} class="mb-4" />
					<button on:click={handleSave} class="bg-green-500 text-white font-bold py-2 px-4 rounded"
						>Save</button
					>
				</div>
			</div>
		{/if}
	</div>

	<ul>
		{#each documents as doc}
			<li class="row flex items-center p-2 border-b">
				<div class="flex-1">
					<p class="text-lg">{doc.file_name}</p>
					<!-- <p class="text-sm text-gray-600">{doc.description}</p> -->
				</div>
				<button on:click={() => deleteDocument(doc.file_id)} class="ml-2 p-1 text-red-500">
					<GarbageBin />
				</button>
			</li>
		{/each}
	</ul>
</div>

<!-- Styles (import Tailwind CSS in your main CSS file) -->
<style>
	.row:hover {
		background-color: #f3f4f6;
	}
</style>
