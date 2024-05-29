<script lang="ts">
  import { onMount } from 'svelte';

  import { getUserProfile, saveUserProfile } from '$lib/apis/users';
  import { user_id } from '$lib/constants';

  let userId = user_id;
  let userProfile = '';

  const search = async () => {
    userProfile = await getUserProfile(userId);
  };

  onMount(() => {
    search();
  });

  const save = async () => {
    await saveUserProfile(userId, userProfile);
    search();
  };
</script>

<div class="container mx-auto p-4 h-screen flex flex-col">
  <div class="mb-4">
    <label class="block mb-2" for="userId">User ID:</label>
    <span class="font-bold" id="userId">{userId}</span>
  </div>

  <div class="mb-4 flex-1">
    <label class="block mb-2" for="userProfile">User Profile:</label>
    <textarea
      bind:value={userProfile}
      class="w-full border rounded p-2 resize-none h-[calc(100%-30px)]"
      id="userProfile"
    />
  </div>

  <button on:click={save} class="bg-blue-500 text-white p-2 rounded">Save</button>
</div>
