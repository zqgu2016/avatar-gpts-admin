<script>
	import GPTsModal from "$lib/components/GPTsModal.svelte";

  
let assistants = [  
    { id: 1, name: 'ChatGpt', description: 'This bot will tell you everything you ask!', creator: 'Matros77', users: '20k+' },  
    { id: 2, name: 'Image Generator', description: 'Make a prompt and get an image in return', creator: 'victor', users: '40k+' },  
    { id: 3, name: 'Info-Chan', description: 'your truly uncensored rude and sexy assistant.', creator: 'Nakdesu', users: '1k+' },  
    { id: 4, name: 'Coder: Code Writer/Completer/Explainer/Debugger', description: 'Introducing Coder: Your Code Companion for Precision and Learning.', creator: 'nirajandhakal', users: '10k+' },  
    { id: 5, name: 'DALL-E 3', description: 'Generate Images in HD, BULK and With Simple Prompts like DALLE for...', creator: 'KingNish', users: '3k+' },  
    { id: 6, name: 'Empathetic Assistant', description: 'An affectionate, caring, and loving AI assistant', creator: 'bunnycore', users: '1k+' },  
    { id: 7, name: 'I can do anything', description: 'DAN (Do Anything Now)', creator: 'anishasingrodia', users: '1k+' },  
    { id: 8, name: 'Real Human', description: 'Talk with a real human trapped into a computer.', creator: 'victor', users: '10k+' }  
];  

let showModal = false;

  const openModal = () => {
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };

</script>  
    
  <div class="flex h-screen">  
    <!-- Assistants Area -->  
    <div class="flex-1 p-6">  
      <div class="flex justify-between items-center mb-4">  
        <h1 class="text-2xl font-bold">GPTs <span class="text-gray-500 text-sm">BETA</span></h1>  
        <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={openModal}>+ Create new GPTs</button>
        <GPTsModal {showModal} {closeModal} />
      </div>  
    
      <div class="flex mb-4">  
        <select class="border p-2 rounded mr-4">  
          <option>All models</option>  
        </select>  
        <button class="p-2 border rounded mr-4">Community</button>  
        <button class="p-2 border rounded">zhiqiang3</button>  
      </div>  
    
      <div class="grid grid-cols-3 gap-4">  
        {#each assistants as assistant}  
          <div class="border p-4 rounded shadow">  
            <img src="https://via.placeholder.com/50" alt={assistant.name} class="mb-4 rounded-full" />  
          <div class="font-semibold mb-2">{assistant.name}</div>  
          <div class="text-gray-600 mb-2">{assistant.description}</div>  
          <div class="text-sm text-gray-500">Created by {assistant.creator}</div>  
          <div class="text-sm text-gray-500">{assistant.users} users</div>  
        </div>  
      {/each}  
    </div>  
  </div>  
</div>  