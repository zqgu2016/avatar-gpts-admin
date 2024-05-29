<script lang="ts">
  import { goto } from '$app/navigation';
  import * as ChatApi from '$lib/apis/chats';
  import * as RagApi from '$lib/apis/rags';
  import GarbageBin from '$lib/components/icons/GarbageBin.svelte';
  import Pencil from '$lib/components/icons/Pencil.svelte';
  import Plus from '$lib/components/icons/Plus.svelte';
  import {
    COLLECTIONS_MENU,
    EXPLORE_GPTS_MENU,
    PROJECT_NAME,
    SIDEBAR_MENUS,
    USER_PROFILES_MENU,
  } from '$lib/constants';
  import { conversations, currentUserId } from '../../stores';

  let collections = [];
  let editingCollectionIndex = -1;
  let addingNewCollection = false;
  let newCollection = '';

  async function getCollectionList() {
    collections = await RagApi.getCollectionList($currentUserId);
  }

  $: {
    if ($currentUserId) {
      getCollectionList();
    } else {
      collections = [];
    }
  }

  function navigateToMenu(page: string) {
    if (page === EXPLORE_GPTS_MENU) {
      goto('/gpts');
    } else if (page === USER_PROFILES_MENU) {
      goto('/user-profiles');
    }
  }

  function navigateToCollection(collection) {
    goto(`/collections/${collection.id}`);
  }

  function navigateToConversation(conversation) {
    goto(`/c/${conversation.id}`);
  }

  async function addCollection() {
    addingNewCollection = true;
  }

  async function handleKeydown(event) {
    if (event.key === 'Enter') {
      await RagApi.createCollection($currentUserId, newCollection.trim());
      getCollectionList();
      newCollection = '';
      addingNewCollection = false;
    } else if (event.key === 'Escape') {
      newCollection = '';
      addingNewCollection = false;
    }
  }

  function handleRenameCollection(index: number) {
    editingCollectionIndex = index;
  }

  async function saveCollection(event) {
    const value = event.target.value.trim();
    if (event.key === 'Escape') {
      editingCollectionIndex = -1;
    } else if (event.key === 'Enter' && value !== '') {
      await RagApi.renameCollection($currentUserId, collections[editingCollectionIndex].id, value);
      getCollectionList();
      editingCollectionIndex = -1;
    }
  }

  async function handleDeleteCollection(collectionId) {
    if (confirm('Are you sure you want to delete this collection?')) {
      await RagApi.deleteCollection($currentUserId, collectionId);
      getCollectionList();
      goto('/gpts');
    }
  }

  async function handleDeleteConversation(gptsId) {
    if (confirm('Are you sure you want to delete this conversation?')) {
      await ChatApi.deleteChatsByGPTsId($currentUserId, gptsId);
      conversations.update((oldConversations) => {
        const newConversations = oldConversations.filter(
          (conversation) => conversation.id !== gptsId
        );
        localStorage.setItem('conversations', JSON.stringify(newConversations));
        return newConversations;
      });
      goto('/gpts');
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="sidebar bg-gray-100 p-4">
  <div class="text-xl font-bold mb-4">{PROJECT_NAME}</div>
  <div class="mb-4">
    {#each SIDEBAR_MENUS as menu}
      <div
        class="mb-2 hover:bg-gray-200 p-2 rounded cursor-pointer flex items-center justify-between group"
        on:click={() => navigateToMenu(menu)}
      >
        {menu}
        {#if menu === COLLECTIONS_MENU}
          <button class="ml-2 hidden group-hover:block" on:click={addCollection}>
            <Plus />
          </button>
        {/if}
      </div>
      {#if menu === COLLECTIONS_MENU}
        <div class="ml-4">
          {#each collections as collection, index}
            <div
              class="mb-2 hover:bg-gray-200 p-2 rounded flex items-center justify-between group"
              on:click={() => navigateToCollection(collection)}
            >
              {#if editingCollectionIndex === index}
                <input
                  type="text"
                  class="border rounded p-1"
                  autofocus
                  bind:value={collection.name}
                  on:blur={() => (editingCollectionIndex = -1)}
                  on:keydown={saveCollection}
                />
              {:else}
                {collection.name}
                <div class="ml-2 hidden group-hover:block">
                  <button on:click|stopPropagation={() => handleRenameCollection(index)} class="ml-2">
                    <Pencil />
                  </button>
                  <button on:click|stopPropagation={() => handleDeleteCollection(collection.id)} class="ml-2">
                    <GarbageBin />
                  </button>
                </div>
              {/if}
            </div>
          {/each}
          {#if addingNewCollection}
            <li class="flex items-center space-x-2 pl-4">
              <input
                type="text"
                class="border rounded p-1"
                autofocus
                bind:value={newCollection}
                on:blur={() => addingNewCollection = false}
                on:keydown={handleKeydown}
              />
            </li>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
  <div class="font-medium mb-2 w-full pl-2.5 text-gray-500 dark:text-gray-500 pb-0.5">
    Conversations
  </div>
  {#each $conversations as chat}
    <div
      class="mb-2 hover:bg-gray-200 p-2 rounded flex items-center justify-between group"
      on:click={() => navigateToConversation(chat)}
    >
      {chat.name}
      <button
        class="ml-2 hidden group-hover:block"
        on:click|stopPropagation={() => handleDeleteConversation(chat.id)}
      >
        <GarbageBin />
      </button>
    </div>
  {/each}
</div>

<style>
  .sidebar {
    width: 300px;
  }
</style>
