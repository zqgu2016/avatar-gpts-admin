<script lang="ts">
  import { goto } from '$app/navigation';
  import * as GPTsApi from '$lib/apis/gpts';
  import * as RagApi from '$lib/apis/rags';
  import GPTsModal from '$lib/components/GPTsModal.svelte';
  import GarbageBin from '$lib/components/icons/GarbageBin.svelte';
  import Pencil from '$lib/components/icons/Pencil.svelte';
  import * as Avatar from '$lib/components/ui/avatar';
  import { onMount } from 'svelte';
  import { conversations, currentUserId } from '../../stores';

  let showModal = false;
  let collections = [];
  let gptsList = [];
  let currentGpts = {};

  async function getGPTsList() {
    gptsList = await GPTsApi.getGPTsList();
  }

  async function getCollectionList() {
    collections = await RagApi.getCollectionList($currentUserId);
  }

  onMount(() => {
    getGPTsList();
    getCollectionList();
  });

  function openModal(val?) {
    showModal = true;
    currentGpts = val ?? {};
  }

  function navigateToChat(gptsId: string) {
    const conversation = $conversations.find((conversation) => conversation.id === gptsId);

    if (!conversation) {
      conversations.update((oldConversations) => {
        const newConversations = [
          {
            id: gptsId,
            name: gptsList.find((gpts) => gpts.id === gptsId).name
          },
          ...oldConversations
        ];
        localStorage.setItem('conversations', JSON.stringify(newConversations));
        return newConversations;
      });
    }

    goto(`/c/${gptsId}`);
  }

  async function handleDeleteGPTs(gptsId: string) {
    if (confirm('Are you sure you want to delete this GPTs?')) {
      await GPTsApi.deleteGPTs($currentUserId, gptsId);
      getGPTsList();
    }
  }
</script>

<div class="flex h-screen w-screen">
  <!-- GPTs Area -->
  <div class="flex-1 p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">All GPTs</h1>
      <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={() => openModal()}
        >+ Create new GPTs</button
      >
    </div>

    <div class="grid grid-cols-3 gap-4">
      {#each gptsList as gpts}
        <div class="border p-4 rounded shadow w-96" on:click={() => navigateToChat(gpts.id)}>
          <div class="flex justify-between group">
            <Avatar.Root>
              <Avatar.Image src={'https://via.placeholder.com/50'} alt="GPTs Icon" />
            </Avatar.Root>
            <div class="hidden group-hover:flex">
              <button on:click|stopPropagation={() => openModal(gpts)} class="mr-2">
                <Pencil />
              </button>
              <button on:click|stopPropagation={() => handleDeleteGPTs(gpts.id)}>
                <GarbageBin />
              </button>
            </div>
          </div>
          <div class="font-semibold mb-2">{gpts.name}</div>
          <div class="text-gray-600 mb-2 truncate-text h-12">
            {gpts.description ?? gpts.persona}
          </div>
          <div class="text-sm text-gray-500">
            <div class="flex">
              <div class="w-1/2">Knowledge Base:</div>
              <div class="w-1/2">{gpts.rag ? 'Enabled' : 'Disabled'}</div>
            </div>
            <div class="flex">
              <div class="w-1/2">Web Browsing:</div>
              <div class="w-1/2">{gpts.browsing ? 'Enabled' : 'Disabled'}</div>
            </div>
            <div class="flex">
              <div class="w-1/2">Memory:</div>
              <div class="w-1/2">{gpts.memory ? 'Enabled' : 'Disabled'}</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
<GPTsModal bind:showModal gpts={currentGpts} {collections} on:finish={getGPTsList} />

<style>
  .truncate-text {
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 这里设置限制的行数，可以根据需要进行调整 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
