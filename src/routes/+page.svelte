<script>
	import { onMount } from 'svelte';

	import ChatBox from '$lib/components/ChatBox.svelte'
	import { getGPTsConfig } from '$lib/apis/gpts';

    onMount(() => {
        const gptsConfig = getGPTsConfig('', '60d99596-1417-11ef-a79c-00155d1b30ba')
    })
</script>

<div class="flex flex-col h-full w-full">
    <!-- GPTs Card Container -->
    <div class="flex-1 p-6 overflow-auto content-center">
        <!-- GPTs Card -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-md mx-auto max-w-md">
            <div class="flex items-center">
                <img src="https://via.placeholder.com/50" alt="GPTs" class="rounded-full mr-4" />
                <div>
                    <div class="font-semibold">GPTs</div>
                    <div class="text-gray-500">Coder: Code Writer/Completer/Explainer/Debugger</div>
                </div>
            </div>
            <div class="mt-4 text-gray-600">
                Introducing Coder: Your Code Companion for Precision and Learning. Feeling exhausted
                with ChatGPT? Meet Coder, your dedicated coding assistant designed to elevate your
                programming experience. Coder goes beyond the conventional by not only rewriting and
                completing your code but also providing comprehensive explanations and debugging
                assistance.
            </div>
        </div>
    </div>

	<!-- <ChatBox /> -->

	<!-- Chat Input -->
    <div class="p-6 bg-white">
        <div class="flex items-center">
            <textarea rows="1" placeholder="Ask anything..." class="flex-1 p-2 border rounded" />
            <button class="ml-2 p-2 bg-blue-500 text-white rounded">Send</button>
        </div>
    </div>
</div>
