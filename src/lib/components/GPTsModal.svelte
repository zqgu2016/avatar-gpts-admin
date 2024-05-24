<script>
	export let showModal = false;
	export let closeModal;

	let assistantName = '';
	let description = '';
	let model = 'CohereForAI/c4ai-command-r-plus';
	let startMessages = ['', '', '', ''];
	let internetAccess = 'default';
	let dynamicPrompt = false;

    function toggleModal() {  
        showModal = !showModal;  
    }  

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		console.log({
			field1: formData.get('field1'),
			field2: formData.get('field2')
		});
		closeModal();
	};
</script>

<style>  
    .modal {  
        @apply fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center;  
    }  
    .modal-content {  
        @apply bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-full overflow-y-auto p-6;  
    }  
    .form-container {  
        @apply flex flex-col;  
    }  
    .form-section {  
        @apply flex flex-col md:flex-row gap-4;  
    }  
    .left-column {  
        @apply w-full md:w-2/3;  
    }  
    .right-column {  
        @apply w-full md:w-1/3;  
    }  
    .footer {  
        @apply flex justify-end mt-4;  
    } 
</style>
  
{#if showModal}  
    <div class="modal">  
        <div class="modal-content">  
            <h2 class="text-2xl font-semibold mb-4">Create new assistant</h2>  
            <div class="form-container">  
                <div class="form-section">  
                    <div class="left-column">  
                        <form>  
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
                                <input class="w-full border border-gray-300 p-2 rounded" id="name" type="text" placeholder="Assistant Name">  
                            </div>  
                            <div class="mb-4">  
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">  
                                    Description  
                                </label>  
                                <textarea class="w-full border border-gray-300 p-2 rounded" id="description" placeholder="He knows everything about python"></textarea>  
                            </div>  
                            <div class="mb-4">  
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="model">  
                                    Model  
                                </label>  
                                <select class="w-full border border-gray-300 p-2 rounded" id="model">  
                                    <option>CohereForAI/c4ai-command-r-plus</option>  
                                    <!-- Add other options as needed -->  
                                </select>  
                            </div>  
                            <div class="mb-4">  
                                <label class="block text-gray-700 text-sm font-bold mb-2">  
                                    User start messages  
                                </label>  
                                <div class="flex flex-wrap gap-2">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 1">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 2">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 3">  
                                    <input class="border border-gray-300 p-2 rounded w-1                                    /2" type="text" placeholder="Start Message 4">  
                                </div>  
                            </div>  
                            <div class="mb-4">  
                                <label class="block text-gray-700 text-sm font-bold mb-2">  
                                    Internet access  
                                </label>  
                                <div>  
                                    <label class="inline-flex items-center">  
                                        <input type="radio" class="form-radio" name="internet" value="default" checked>  
                                        <span class="ml-2">Default</span>  
                                    </label>  
                                </div>  
                                <div class="mt-2">  
                                    <label class="inline-flex items-center">  
                                        <input type="radio" class="form-radio" name="internet" value="web">  
                                        <span class="ml-2">Web search</span>  
                                    </label>  
                                </div>  
                                <div class="mt-2">  
                                    <label class="inline-flex items-center">  
                                        <input type="radio" class="form-radio" name="internet" value="domains">  
                                        <span class="ml-2">Domains search</span>  
                                    </label>  
                                </div>  
                                <div class="mt-2">  
                                    <label class="inline-flex items-center">  
                                        <input type="radio" class="form-radio" name="internet" value="links">  
                                        <span class="ml-2">Specific Links</span>  
                                    </label>  
                                </div>  
                            </div>  
                            <div class="mb-4">  
                                <label class="inline-flex items-center">  
                                    <input type="checkbox" class="form-checkbox">  
                                    <span class="ml-2">Dynamic Prompt</span>  
                                </label>  
                            </div>  
                        </form>  
                    </div>  
                    <div class="right-column">  
                        <label class="block text-gray-700 text-sm font-bold mb-2">  
                            Instructions (System Prompt)  
                        </label>  
                        <textarea class="w-full h-full border border-gray-300 p-2 rounded" placeholder="You'll act as..."></textarea>  
                    </div>  
                </div>  
                <div class="footer">  
                    <button type="button" class="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2" on:click={toggleModal}>  
                        Cancel  
                    </button>  
                    <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">  
                        Create  
                    </button>  
                </div>  
            </div>  
        </div>  
    </div>  
{/if}  
