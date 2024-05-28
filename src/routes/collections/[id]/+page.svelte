<script lang="ts">
	import { fade } from 'svelte/transition';
	import { deleteFile, getFileListByCollectionId, uploadFiles } from '$lib/apis/rags';
	import { page } from '$app/stores';
	import GarbageBin from '$lib/components/icons/GarbageBin.svelte';
	import Close from '$lib/components/icons/Close.svelte';
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

	function toggleModal() {
		showDialog = !showDialog;
	}

	async function handleSave() {
		await uploadFiles(collectionId, files);
		toggleModal();
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
	<div class="flex justify-between items-center mb-4">
		<h1 class="text-2xl font-bold">Documents</h1>
		<button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={toggleModal}
			>+ Upload</button
		>
	</div>

	<div class="mb-4 flex items-center">
		{#if showDialog}
			<div class="modal" in:fade={{ duration: 10 }}>
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="text-lg font-medium text-gray-900">Add Doc</h3>
						<button class="text-gray-500 hover:text-gray-700" on:click={toggleModal}>
							<Close />
						</button>
					</div>

					<div class="modal-body">
						<form>
							<div class="mb-4">
								<label class="block text-gray-700 text-sm font-bold mb-2"> Upload Files </label>
								<input
									type="file"
									accept=".txt,.md,.pdf,.doc,.docx,.csv,.xls,.xlsx,.xlsd,.ppt,.pptx"
									multiple
									class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
									on:change={handleFileChange}
								/>
								<p class="mt-1 text-sm text-gray-500">
									You can upload files with types: .txt, .md, .pdf, .doc, .docx, .csv, .xls, .xlsx,
									.xlsd, .ppt, .pptx
								</p>
							</div>
						</form>
					</div>

					<div class="modal-footer">
						<button
							class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							on:click={handleSave}
						>
							Save
						</button>
					</div>
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

	.modal {
		@apply fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-50;
	}

	.modal-content {
		@apply bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-lg;
	}

	.modal-header,
	.modal-footer {
		@apply flex items-center justify-between p-4 border-b border-gray-300;
	}

	.modal-body {
		@apply p-6;
	}
</style>
