<script>
    import { goto } from "$app/navigation";
    import { writable } from "svelte/store";

    let chats = [
        { id: 1, name: 'Programming code', time: 'Today' },
        { id: 2, name: 'AI summarizer', time: 'This week' },
        { id: 3, name: 'Greeting', time: 'This week' }
    ];

    let menus = ['New Chat', 'Explore GPTs', 'Collections', 'Users'];

    let collections = [
        { id: 1, name: 'Collection 1' },
        { id: 2, name: 'Collection 2' },
        { id: 3, name: 'Collection 3' }
    ];

    let showCollections = writable(false);

    function navigateTo(page) {  
        if (page === 'New Chat') {
            goto('/')
        } else if (page === 'Explore GPTs') {  
            goto('/gpts');  
        } else if (page === 'Collections') {
            showCollections.update(n => !n); // toggle the collections visibility
			goto('/collections');
        } else if (page === 'Users') {  
            goto('/users');  
        }
    }
</script>

<div class="sidebar bg-gray-100 p-4">
    <div class="font-bold mb-4">Avatar GPTs</div>
    <div class="mb-4">
        {#each menus as menu}
            <div class="mb-2 hover:bg-gray-200 p-2 rounded cursor-pointer" on:click={() => navigateTo(menu)}>{menu}</div>
			{#if menu === 'Collections' && showCollections}
		<div class="ml-4">
            {#each collections as collection}
                <div class="mb-2 hover:bg-gray-200 p-2 rounded">
                    {collection.name}
                </div>
            {/each}
        </div>
		{/if}
        {/each}
		
    </div>
    <div class="font-semibold mb-2">Today</div>
    {#each chats as chat}
        <div class="mb-2 hover:bg-gray-200 p-2 rounded">
            {chat.name}
        </div>
    {/each}
</div>

<style>
    .sidebar {
        width: 300px;
    }
</style>