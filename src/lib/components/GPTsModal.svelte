<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';
    import ModelConfiguration from './ModelConfiguration.svelte';
	import { createGPTs, updateGPTs } from '$lib/apis/gpts';
	import { user_id } from '$lib/constants';

	export let showModal = false;
	export let assistant = {};

    let mounted = false;

    const dispatch = createEventDispatcher();

    const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			console.log('Escape');
			showModal = false;
		}
	};

    onMount(() => {
		mounted = true;
	});

	$: if (mounted) {
		if (showModal) {
			window.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		} else {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'unset';
		}
	}

    function toggleModal() {  
        showModal = !showModal;  
    }  

	const handleSubmit = async (event) => {
		event.preventDefault();
        if (!assistant.id) {
            await createGPTs(user_id, {
                ...assistant,
                id: uuidv4(),
                type: 'Companion'
            })
        } else {
            await updateGPTs(user_id, assistant)
        }
		toggleModal();
        dispatch('finish');
	};
</script>

<style>  
    .modal {  
        @apply fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center;  
    }  
    .modal-content {  
        @apply bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 max-h-full overflow-y-auto p-6;  
    }  
    .form-container {  
        @apply flex flex-col;  
    }  
    .form-section {  
        @apply flex flex-col md:flex-row gap-4;  
    }  
    .left-column {  
        @apply w-full md:w-1/2;  
    }  
    .right-column {  
        @apply w-full md:w-1/2;  
    }  
    .footer {  
        @apply flex justify-end mt-4;  
    } 
</style>
  
{#if showModal}  
    <div class="modal">  
        <div class="modal-content">  
            <h2 class="text-2xl font-semibold mb-4">{assistant.id ? 'Update' : 'Create'} assistant</h2>  
            <div class="form-container">  
                <div class="form-section">  
                    <div class="left-column">  
                        <form on:submit={handleSubmit}>  
                            <div class="mb-4">  
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="avatar">  
                                    Avatar  
                                </label>  
                                <button class="bg-gray-200 text-gray-700 py-2 px-4 rounded">Upload</button>  
                            </div>  
                            <div class="mb-4">  
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">  
                                    Name  
                                </label>  
                                <input class="w-full border border-gray-300 p-2 rounded" id="name" type="text" placeholder="Assistant Name" bind:value={assistant.name}>  
                            </div>  
                            <div class="mb-4">  
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">  
                                    Description  
                                </label>  
                                <textarea class="w-full border border-gray-300 p-2 rounded" id="description" placeholder="He knows everything about python" bind:value={assistant.persona}></textarea>  
                            </div>  
                            <!-- <ModelConfiguration /> -->
                            <div class="mb-4">  
                                <label class="block text-gray-700 text-sm font-bold mb-2">  
                                    User start messages  
                                </label>  
                                <div class="flex flex-wrap gap-2">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 1">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 2">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 3">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 4">  
                                </div>  
                            </div>  
                            <div class="mb-4">  
                                <label class="block text-gray-700 text-sm font-bold mb-2">  
                                    Capabilities  
                                </label>  
                                <div class="mb-4"> 
                                    <label class="inline-flex items-center">  
                                        <input type="checkbox" class="form-checkbox" bind:checked={assistant.rag}>  
                                        <span class="ml-2">Knowledge Base</span>  
                                    </label>  
                                </div>
                                <div class="mb-4">  
                                    <label class="inline-flex items-center">  
                                        <input type="checkbox" class="form-checkbox" bind:checked={assistant.browsing}>  
                                        <span class="ml-2">Web Browsing</span>  
                                    </label>  
                                </div>
                                <div class="mb-4">  
                                    <label class="inline-flex items-center">  
                                        <input type="checkbox" class="form-checkbox" bind:checked={assistant.memory}>  
                                        <span class="ml-2">Memory</span>  
                                    </label>  
                                </div>
                            </div>
                            
                        </form>  
                    </div>  
                    <div class="right-column">  
                        <label class="block text-gray-700 text-sm font-bold mb-2">  
                            Instructions (System Prompt)  
                        </label>  
                        <textarea class="w-full h-[calc(100%-30px)] border border-gray-300 p-2 rounded" placeholder="You'll act as..." bind:value={assistant.instructions}></textarea>  
                    </div>  
                </div>  
                <div class="footer">  
                    <button type="button" class="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2" on:click={toggleModal}>  
                        Cancel  
                    </button>  
                    <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded" on:click={handleSubmit}>  
                        Save  
                    </button>  
                </div>  
            </div>  
        </div>  
    </div>  
{/if}  
