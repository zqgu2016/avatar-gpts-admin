<script lang="ts">
  import { goto } from '$app/navigation';
  import GPTsModal from '$lib/components/GPTsModal.svelte';
  import { onMount } from 'svelte';
  import { getAllGPTs, deleteGPTs } from '$lib/apis/gpts';
  import { getCollectionList } from '$lib/apis/rags';
  import Pencil from '$lib/components/icons/Pencil.svelte';
  import GarbageBin from '$lib/components/icons/GarbageBin.svelte';
  import { user_id } from '$lib/constants';
  import { conversations } from '../../stores';
  import * as Avatar from "$lib/components/ui/avatar";

  let showModal = false;
  let assistants = [];
  let collections = [];
  let assistant = {
    motions: []
  };

  const searchGPTs = async () => {
    assistants = await getAllGPTs();
  };

  const searchCollectionList = async () => {
    collections = await getCollectionList(user_id);
  };

  onMount(async () => {
    searchGPTs();
    searchCollectionList();
  });

  const openModal = (asst) => {
    showModal = true;
    assistant = asst || {
      motions: []
    };
  };

  const chooseGPTs = (gptsId: string) => {
    const existed = $conversations.find((c) => c.id === gptsId);
    if (!existed) {
      conversations.update((val) => {
        const newCons = [
          ...val,
          {
            id: gptsId,
            name: assistants.find((v) => v.id === gptsId).name
          }
        ];
        localStorage.setItem('conversations', JSON.stringify(newCons));
        return newCons;
      });
    }

    goto(`/c/${gptsId}`);
  };

  const handleDeleteGPTs = async (gptsId: string) => {
    if (confirm('Are you sure you want to delete this GPTs?')) {
      await deleteGPTs(user_id, gptsId);
      searchGPTs();
    }
  };
</script>

<div class="flex h-screen w-screen">
  <!-- Assistants Area -->
  <div class="flex-1 p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">GPTs</h1>
      <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={() => openModal()}
        >+ Create new GPTs</button
      >
    </div>

    <div class="grid grid-cols-3 gap-4">
      {#each assistants as assistant}
        <div class="border p-4 rounded shadow w-96" on:click={() => chooseGPTs(assistant.id)}>
          <div class="flex justify-between group">
            <Avatar.Root>
              <Avatar.Image src={assistant.icon || 'https://via.placeholder.com/50'} alt="GPTs Icon" />
            </Avatar.Root>
            <div class="hidden group-hover:flex">
              <button on:click|stopPropagation={() => openModal(assistant)} class="mr-2">
                <Pencil />
              </button>
              <button on:click|stopPropagation={() => handleDeleteGPTs(assistant.id)}>
                <GarbageBin />
              </button>
            </div>
          </div>
          <div class="font-semibold mb-2">{assistant.name}</div>
          <div class="text-gray-600 mb-2 truncate-text">
            {assistant.description ?? assistant.persona}
          </div>
          <div class="text-sm text-gray-500">
            <div class="flex">
              <div class="w-1/2">Knowledge Base:</div>
              <div class="w-1/2">{assistant.rag ? 'Enabled' : 'Disabled'}</div>
            </div>
            <div class="flex">
              <div class="w-1/2">Web Browsing:</div>
              <div class="w-1/2">{assistant.browsing ? 'Enabled' : 'Disabled'}</div>
            </div>
            <div class="flex">
              <div class="w-1/2">Memory:</div>
              <div class="w-1/2">{assistant.memory ? 'Enabled' : 'Disabled'}</div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <GPTsModal bind:showModal {assistant} {collections} on:finish={searchGPTs} />
  </div>
</div>

<style>
  .truncate-text {
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 这里设置限制的行数，可以根据需要进行调整 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
