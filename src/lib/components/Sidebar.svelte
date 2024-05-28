<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    createCollection,
    deleteCollection,
    getCollectionList,
    renameCollection
  } from '$lib/apis/rags';
  import Plus from '$lib/components/icons/Plus.svelte';
  import Pencil from '$lib/components/icons/Pencil.svelte';
  import GarbageBin from '$lib/components/icons/GarbageBin.svelte';
  import { collection_id, user_id } from '$lib/constants';
  import { onMount, tick } from 'svelte';
  import { writable } from 'svelte/store';
  import { conversations } from '../../stores';
  import { deleteChatsByGPTsId } from '$lib/apis/chats';

  let menus = ['Explore GPTs', 'Collections', 'User Profile'];

  let collections = [];
  let editingIndex = null;
  let addingNew = false;
  let newCollection = '';

  let showCollections = writable(false);

  async function searchCollectionList() {
    collections = await getCollectionList(user_id);
  }

  onMount(() => {
    searchCollectionList();
  });

  function navigateTo(page) {
    if (page === 'Explore GPTs') {
      goto('/gpts');
    } else if (page === 'Collections') {
      showCollections.update((n) => !n); // toggle the collections visibility
    } else if (page === 'User Profile') {
      goto('/user-profile');
    }
  }

  function navigateToConversation(conversation) {
    goto(`/c/${conversation.id}`);
  }

  async function addCollection() {
    addingNew = true;
  }

  async function handleKeydown(event) {
    if (event.key === 'Enter') {
      await createCollection(user_id, newCollection.trim());
      searchCollectionList();
      newCollection = '';
      addingNew = false;
    } else if (event.key === 'Escape') {
      newCollection = '';
      addingNew = false;
    }
  }

  function handleRenameCollection(index) {
    editingIndex = index;
  }

  async function saveEdit(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      await renameCollection(user_id, collections[editingIndex].id, event.target.value.trim());
      searchCollectionList();
      editingIndex = null;
    }
  }

  async function handleDeleteCollection(collectionId) {
    if (confirm('Are you sure you want to delete this collection?')) {
      await deleteCollection(user_id, collectionId);
      searchCollectionList();
    }
  }

  async function handleDeleteConversation(gptsId) {
    if (confirm('Are you sure you want to delete this conversation?')) {
      await deleteChatsByGPTsId(user_id, gptsId);
      conversations.update((cons) => {
        const newCons = cons.filter((v) => v.id !== gptsId);
        localStorage.setItem('conversations', JSON.stringify(newCons));
        return newCons;
      });
      goto('/gpts');
    }
  }

  function handleBlur(event) {
    addingNew = false;
  }
</script>

<div class="sidebar bg-gray-100 p-4">
  <div class="font-bold mb-4">Avatar GPTs</div>
  <div class="mb-4">
    {#each menus as menu}
      <div
        class="mb-2 hover:bg-gray-200 p-2 rounded cursor-pointer flex items-center group"
        on:click={() => navigateTo(menu)}
      >
        {menu}
        {#if menu === 'Collections'}
          <button class="ml-2 hidden group-hover:block" on:click={addCollection}>
            <Plus />
          </button>
        {/if}
      </div>
      {#if menu === 'Collections' && showCollections}
        <div class="ml-4">
          {#each collections as collection, index}
            <div
              class="mb-2 hover:bg-gray-200 p-2 rounded flex items-center group"
              on:click={() => goto('/collections/' + collection.id)}
            >
              {#if typeof editingIndex === 'number' && editingIndex === index}
                <input
                  type="text"
                  class="border rounded p-1"
                  autofocus
                  bind:value={collection.name}
                  on:blur={() => (editingIndex = null)}
                  on:keydown={saveEdit}
                />
              {:else}
                {collection.name}
              {/if}
              <div class="ml-2 hidden group-hover:block">
                <button on:click={() => handleRenameCollection(index)} class="ml-2">
                  <Pencil />
                </button>
                <button on:click={() => handleDeleteCollection(collection.id)} class="ml-2">
                  <GarbageBin />
                </button>
              </div>
            </div>
          {/each}
          {#if addingNew}
            <li class="flex items-center space-x-2 pl-4">
              <input
                bind:value={newCollection}
                on:keydown={handleKeydown}
                on:blur={handleBlur}
                autofocus
                class="border-b-2 focus:outline-none"
              />
            </li>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
  <div class="font-semibold mb-2">Conversations</div>
  {#each $conversations as chat}
    <div
      class="mb-2 hover:bg-gray-200 p-2 rounded flex items-center group"
      on:click={() => navigateToConversation(chat)}
    >
      {chat.name}
      <div class="ml-2 hidden group-hover:block">
        <button on:click={() => handleDeleteConversation(chat.id)} class="ml-2">
          <GarbageBin />
        </button>
      </div>
    </div>
  {/each}
</div>

<style>
  .sidebar {
    width: 300px;
  }

  .hover-menu {
    display: none;
  }
  li:hover .hover-menu {
    display: inline;
  }

  li:hover .hover-menu {
    display: inline;
  }
</style>
