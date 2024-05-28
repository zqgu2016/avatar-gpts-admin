<script>
  let messages = ['Hello!', 'How can I help you today?'];
  let newMessage = '';

  const sendMessage = () => {
    if (newMessage.trim()) {
      messages = [...messages, newMessage];
      newMessage = '';
    }
  };
</script>

<div class="flex-grow overflow-y-scroll bg-white p-4">
  {#each messages as message}
    <div class="mb-2">{message}</div>
  {/each}
</div>
