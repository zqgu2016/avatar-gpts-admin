<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { WEBUI_BASE_URL } from '$lib/constants';
	import '../tailwind.css'

</script>

<div class="flex h-screen">
	<Sidebar />
	<slot></slot>
</div>
