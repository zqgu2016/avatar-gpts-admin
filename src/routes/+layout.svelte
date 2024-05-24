<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '../tailwind.css'
</script>

<div class="flex h-screen">
	<Sidebar />
	<slot></slot>
</div>
