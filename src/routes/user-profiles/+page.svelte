<script lang="ts">
  import { onMount } from 'svelte';

  import * as UserProfileApi from '$lib/apis/users';
  import { v4 as uuidv4 } from 'uuid';
  import { currentUserId } from '../../stores';
  import GarbageBin from '$lib/components/icons/GarbageBin.svelte';

  let userProfile = '';
  let userProfiles = [];

  async function getUserProfileList() {
    userProfiles = await UserProfileApi.getUserProfileList();
    if ($currentUserId) {
      userProfile = userProfiles.find((val) => val.user_id === $currentUserId).profile;
    } else {
      userProfile = '';
    }
  }

  onMount(() => {
    getUserProfileList();
  });

  async function saveUserProfile() {
    let userId = $currentUserId;
    if (!$currentUserId) {
      userId = uuidv4();
      currentUserId.set(userId);
    }
    await UserProfileApi.saveUserProfile(userId, userProfile);
    getUserProfileList();
  }

  async function deleteUserProfile() {
    if (confirm('Are you sure you want to delete this user profile?')) {
      await UserProfileApi.deleteUserProfile($currentUserId);
      getUserProfileList();
      currentUserId.set('');
      userProfile = '';
      localStorage.setItem('user_profile', '');
    }
  }

  function handleChange(event) {
    const userId = event.target.value;
    userProfile = $currentUserId
      ? userProfiles.find((val) => val.user_id === $currentUserId).profile
      : '';
    currentUserId.set(userId);
    localStorage.setItem('user_profile', event.target.value);
  }
</script>

<div class="container mx-auto p-4 h-screen flex flex-col">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="userId"> User ID </label>
    <div class="flex items-center justify-between">
      <select class="form-select" bind:value={$currentUserId} on:change={handleChange} id="userId">
        <option value="">choose a User</option>
        {#each userProfiles as user}
          <option value={user.user_id}>{user.user_id}</option>
        {/each}
      </select>
      {#if $currentUserId}
        <button on:click|stopPropagation={() => deleteUserProfile()} class="ml-2 text-red-500">
          <GarbageBin />
        </button>
      {/if}
    </div>
  </div>

  <div class="mb-4 flex-1">
    <label class="block mb-2" for="userProfile">User Profile:</label>
    <textarea
      bind:value={userProfile}
      class="w-full border rounded p-2 resize-none h-[calc(100%-30px)]"
      id="userProfile"
    />
  </div>

  <button on:click={saveUserProfile} class="bg-blue-500 text-white p-2 rounded">Save</button>
</div>
