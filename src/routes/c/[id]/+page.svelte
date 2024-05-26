<script lang="ts">
	import { onMount } from 'svelte';

	import ChatBox from '$lib/components/ChatBox.svelte'
	import { WEBUI_BASE_URL, gpts_id } from '$lib/constants';
	import { getGPTs } from '$lib/apis/gpts';

    let gpts

    onMount(async () => {
        gpts = await getGPTs(gpts_id)
    })
</script>

<div class="flex flex-col h-full w-full">
    <!-- GPTs Card Container -->
    <div class="flex-1 p-6 overflow-auto content-center">
        <!-- GPTs Card -->
        {#if gpts}
        <div class="bg-gray-100 p-6 rounded-lg shadow-md mx-auto max-w-md">
            <div class="flex items-center">
                <img src="https://via.placeholder.com/50" alt="GPTs" class="rounded-full mr-4" />
                <div>
                    <div class="font-semibold">GPTs</div>
                    <div class="text-gray-500">{gpts.name}</div>
                    <div class="text-gray-500">{gpts.role_model}</div>
                </div>
            </div>
            <div class="mt-4 text-gray-600">
                {gpts.persona}
            </div>
        </div>
        {/if}
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
