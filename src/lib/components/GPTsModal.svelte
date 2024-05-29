<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import ModelConfiguration from './ModelConfiguration.svelte';
  import { createGPTs, updateGPTs } from '$lib/apis/gpts';
  import { user_id } from '$lib/constants';
  export let showModal = false;
  export let assistant = {
    motions: [],
    type: ''
  };
  export let collections = [];

  let mounted = false;
  const types = ['Companion', 'Roleplay', 'Knowledge']

  let action_example = [
    {
      name: 'name of action',
      description: 'description of action',
      end_point: 'url of end point',
      api_key: 'api_key in http header',
      parameters: {
        type: 'object',
        properties: { query: { type: 'string', description: 'user query to search from web.' } },
        required: ['query']
      }
    }
  ];

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
      });
    } else {
      await updateGPTs(user_id, assistant);
    }
    toggleModal();
    dispatch('finish');
  };

  let newTag = '';

  function addTag(e) {
    e.stopPropagation();
    e.preventDefault();

    if (!assistant.motions) {
      assistant.motions = [];
    }

    if (newTag && !assistant.motions.includes(newTag)) {
      assistant.motions = [...assistant.motions, newTag];
      newTag = '';
    }
  }

  function removeTag(tag) {
    assistant.motions = assistant.motions.filter((t) => t !== tag);
  }

  function json2str(obj) {
    return obj ? JSON.stringify(obj, null, 2) : '';
  }

  function str2json(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  }

  let base64Image = '';

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      base64Image = e.target.result;
      assistant.icon = base64Image;
    };

    reader.readAsDataURL(file);
  }
</script>

{#if showModal}
  <div class="modal">
    <div class="modal-content">
      <h2 class="text-2xl font-semibold mb-4">{assistant.id ? 'Update' : 'Create'} assistant</h2>
      <div class="form-container">
        <div class="form-section">
          <div class="left-column">
            <form on:submit={handleSubmit}>
              <div class="flex items-center justify-between mt-4">
                <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mr-4">
                  {#if assistant.icon}
                    <img src={assistant.icon} alt="avatar preview" class="object-cover w-full h-full" />
                  {:else}
                    <span class="text-gray-500">No Image</span>
                  {/if}
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Upload Image</label>
                  <input type="file" accept="image/*" class="mt-1 block w-full" on:change={handleFileUpload} />
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="type">
                  Type
                </label>
                <select class="form-select" bind:value={assistant.type} id="type">
                  <option value="" disabled hidden>choose a Type</option>
                  {#each types as type}
                    <option value={type}>{type}</option>
                  {/each}
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name"> Name </label>
                <input
                  class="w-full border border-gray-300 p-2 rounded"
                  id="name"
                  type="text"
                  placeholder="Assistant Name"
                  bind:value={assistant.name}
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name"> Role Model </label>
                <input
                  class="w-full border border-gray-300 p-2 rounded"
                  id="name"
                  type="text"
                  placeholder="Assistant Name"
                  bind:value={assistant.role_model}
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="persona">
                  Persona
                </label>
                <textarea
                  class="w-full h-40 border border-gray-300 p-2 rounded"
                  id="persona"
                  placeholder="He knows everything about python"
                  bind:value={assistant.persona}
                ></textarea>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="conversationSamples">
                  Conversation Samples
                </label>
                <textarea
                  class="w-full h-40 border border-gray-300 p-2 rounded"
                  id="conversationSamples"
                  placeholder="He knows everything about python"
                  bind:value={assistant.conversation_samples}
                ></textarea>
              </div>
              <!-- <ModelConfiguration /> -->
              <!-- <div class="mb-4">  
                                <label class="block text-gray-700 text-sm font-bold mb-2">  
                                    User start messages  
                                </label>  
                                <div class="flex flex-wrap gap-2">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 1">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 2">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 3">  
                                    <input class="border border-gray-300 p-2 rounded w-1/2" type="text" placeholder="Start Message 4">  
                                </div>  
                            </div>   -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2"> Capabilities </label>
                <div class="mb-4">
                  <label class="inline-flex items-center">
                    <input type="checkbox" class="form-checkbox" bind:checked={assistant.rag} />
                    <span class="ml-2">Knowledge Base</span>
                  </label>
                  <select class="form-select" bind:value={assistant.collection_id}>
                    <option value="" disabled selected hidden>choose a Collection</option>
                    {#each collections as option}
                      <option value={option.id}>{option.name}</option>
                    {/each}
                  </select>
                </div>
                <div class="mb-4">
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      bind:checked={assistant.browsing}
                    />
                    <span class="ml-2">Web Browsing</span>
                  </label>
                </div>
                <div class="mb-4">
                  <label class="inline-flex items-center">
                    <input type="checkbox" class="form-checkbox" bind:checked={assistant.memory} />
                    <span class="ml-2">Memory</span>
                  </label>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="language">
                    Language
                  </label>
                  <input
                    class="w-full border border-gray-300 p-2 rounded"
                    id="language"
                    type="text"
                    placeholder="Language"
                    bind:value={assistant.language}
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="speaker">
                    Speaker
                  </label>
                  <input
                    class="w-full border border-gray-300 p-2 rounded"
                    id="speaker"
                    type="text"
                    placeholder="Speaker"
                    bind:value={assistant.speaker}
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="motions">
                    Motions
                  </label>
                  <div class="flex flex-wrap items-center -m-1">
                    {#if assistant?.motions}
                      {#each assistant.motions as tag}
                        <div
                          class="bg-blue-500 text-white rounded-full px-3 py-1 m-1 flex items-center"
                        >
                          {tag}
                          <button class="ml-2" on:click={() => removeTag(tag)}> &times; </button>
                        </div>
                      {/each}
                    {/if}

                    <input
                      type="text"
                      bind:value={newTag}
                      on:keydown={(e) => e.key === 'Enter' && addTag(e)}
                      class="m-1 p-1 border rounded"
                      placeholder="Add motion..."
                    />
                  </div>
                </div>
                <div class="mb-4">  
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="domain">  
                        Domain  
                    </label>  
                    <input class="w-full border border-gray-300 p-2 rounded" id="domain" type="text" placeholder="Domain" bind:value={assistant.domain}>  
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="actions">
                    Actions
                  </label>
                  <textarea
                    class="w-full h-60 border border-gray-300 p-2 rounded"
                    id="actions"
                    placeholder={json2str(action_example)}
                    value={json2str(assistant.actions)}
                    on:input={(evt) => (assistant.actions = str2json(evt.target.value))}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="right-column">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Instructions (System Prompt)
            </label>
            <textarea
              class="w-full h-[calc(100%-30px)] border border-gray-300 p-2 rounded"
              placeholder="You'll act as..."
              bind:value={assistant.instructions}
            ></textarea>
          </div>
        </div>
        <div class="footer">
          <button
            type="button"
            class="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2"
            on:click={toggleModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            on:click={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

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
  input[type="file"] {
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  input[type="file"]:hover {
    border-color: #9ca3af;
  }
</style>
