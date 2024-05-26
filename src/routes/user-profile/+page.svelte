<script lang="ts">
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

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
		<label class="block mb-2">User ID:</label>
		<span class="font-bold">{userId}</span>
	</div>

	<div class="mb-4 flex-1">
		<label class="block mb-2">User Profile:</label>
		<textarea
			bind:value={userProfile}
			class="w-full border rounded p-2 resize-none h-[calc(100%-30px)]"
		/>
	</div>

	<button on:click={save} class="bg-blue-500 text-white p-2 rounded"> Save </button>
</div>
