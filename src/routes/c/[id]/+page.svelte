<script lang="ts">
  import { tick } from 'svelte';

  import { getGPTs } from '$lib/apis/gpts';
  import { sendMessage } from '$lib/apis/messages';
  import { getChatsByGPTsId } from '$lib/apis/chats';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { currentUserId, conversations } from '../../../stores';

  let gpts;
  let audioElement;
  let enableVoice = false;
  let title;

  $: gptsId = $page.params.id;

  const messages = writable([]);
  let input = '';

  async function getAllList() {
    gpts = await getGPTs(gptsId);
  }

  async function loadChats() {
    const chats = await getChatsByGPTsId($currentUserId, gptsId);
    messages.update(() =>
      chats.map((chat) => ({ sender: chat.role === 'user' ? 'me' : 'bot', text: chat.content }))
    );
  }

  function getTitle() {
    title = $conversations.find(conversation => conversation.id === gptsId)?.name;
  }

  $: {
    if (gptsId) {
      getAllList();
      loadChats();
      getTitle()
    }
  }

  async function send() {
    if (input.trim()) {
      if (!audioElement.paused) {
        audioElement.pause();
      }

      messages.update((msgs) => [...msgs, { sender: 'me', text: input.trim() }]);
      sendQuery(input.trim());

      input = '';

      await tick();
      scrollToBottom();
    }
  }

  const scrollToBottom = () => {
    const element = document.getElementById('chat-window');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  async function sendQuery(input) {
    const response = await sendMessage({
      query: input.trim(),
      user_id: $currentUserId,
      gpts_id: gptsId,
      options: enableVoice ? {
        avatar_mode: true,
        voice_audio: true,
        speaker: 'zh-CN-XiaoxiaoNeural'
        // speaker: 'zh-CN-YunxiNeural'
      } : {
        avatar_mode: true,
      },
      stream: true
    });

    let lastPlayedAudioPromise = Promise.resolve();

    // 处理接收到的响应数据
    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(splitStream('\n'))
      .getReader();

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      let msg;
      try {
        msg = JSON.parse(value);
      } catch (err) {
        console.log(err);
      }

      if (msg.audio) {
        lastPlayedAudioPromise = lastPlayedAudioPromise.then(() => playAudio(msg.audio)); // 播放机器人的语音
      } else if (msg.actions) {
        for (const action of msg.actions) {
          if (action.name === 'find_and_play_music') {
            const data = JSON.parse(action.data);
            lastPlayedAudioPromise = lastPlayedAudioPromise.then(() =>
              playAudio(data.media_url, true)
            );
          }
        }
      } else {
        messages.update((msgs) => [...msgs, { sender: 'bot', text: msg.text }]);
        await tick();
        scrollToBottom();
      }
    }
  }

  function splitStream(splitOn) {
    let buffer = '';
    return new TransformStream({
      transform(chunk, controller) {
        buffer += chunk;
        const parts = buffer.split(splitOn);
        parts.slice(0, -1).forEach((part) => controller.enqueue(part));
        buffer = parts[parts.length - 1];
      },
      flush(controller) {
        if (buffer) controller.enqueue(buffer);
      }
    });
  }

  function playAudio(response, isUrl = false) {
    return new Promise((resolve) => {
      audioElement.src = isUrl ? response : 'data:audio/x-wav;base64,' + response;
      audioElement.volume = 0.2;
      audioElement.play();

      audioElement.onended = async () => {
        resolve();
      };
    });
  }
</script>

<div class="flex flex-col h-full w-full">
  <div class="text-lg font-bold ml-4 mt-2">Bot: {title}</div>
  <!-- GPTs Card Container -->
  {#if $messages.length === 0}
    <div class="flex-1 p-6 overflow-auto content-center">
      <!-- GPTs Card -->
      {#if gpts}
        <div class="bg-gray-100 p-6 rounded-lg shadow-md w-96 mx-auto">
          <div class="flex justify-between group">
            <img
              src={gpts.icon || 'https://via.placeholder.com/50'}
              alt={gpts.name}
              class="mb-4 rounded-full"
            />
          </div>
          <div class="font-semibold mb-2">{gpts.name}</div>
          <div class="text-gray-600 mb-2 truncate-text">
            {gpts.description ?? gpts.persona}
          </div>
          <div class="text-sm text-gray-500">
            <div class="flex">
              <div class="w-1/2">RAG:</div>
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
      {/if}
    </div>
  {:else}
    <section id="chat-window" class="flex-1 overflow-y-auto p-4 mx-auto w-2/3">
      {#each $messages as message (message)}
        <div class="flex {message.sender === 'me' ? 'me' : 'bot'}">
          <div class="chat-bubble">
            {message.text}
          </div>
        </div>
      {/each}
    </section>
  {/if}

  <!-- <ChatBox /> -->

  <!-- Chat Input -->
  <section class="p-4 border-gray-300 flex w-2/3 mx-auto">
    <input
      type="text"
      class="flex-1 p-2 border rounded-md focus:outline-none"
      bind:value={input}
      on:keydown={(e) => e.key === 'Enter' && send()}
      placeholder="Type your message..."
    />
    <label class="ml-2 inline-flex items-center">
      <input type="checkbox" class="form-checkbox" bind:checked={enableVoice} />
      <span class="ml-2">Enable Voice</span>
    </label>
    <button
      class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
      on:click={send}
    >
      Send
    </button>
  </section>

  <audio bind:this={audioElement}></audio>
</div>

<style>
  .truncate-text {
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 这里设置限制的行数，可以根据需要进行调整 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .me {
    justify-content: flex-end;
  }
  .bot {
    justify-content: flex-start;
  }
  .chat-bubble {
    max-width: 70%;
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 1.5rem;
    word-wrap: break-word;
  }
  .me .chat-bubble {
    background-color: #daf8cb;
    color: #000000;
  }
  .bot .chat-bubble {
    background-color: #f1f0f0;
    color: #000000;
  }
</style>
