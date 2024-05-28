<script>
  let model = 'CohereForAI/c4ai-command-r-plus';
  let temperature = 0.3;
  let topP = 1;
  let repetitionPenalty = 1.0;
  let topK = 50;
</script>

<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="model"> Model </label>
  <div class="flex items-center space-x-2">
    <select
      bind:value={model}
      class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="CohereForAI/c4ai-command-r-plus">CohereForAI/c4ai-command-r-plus</option>
      <!-- Add more options here -->
    </select>
    <button class="p-2 rounded border border-gray-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 10a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0v-5zm-5.25-.75a.75.75 0 000 1.5H10v-1.5H4.75zm5.25-6.5a.75.75 0 01.75.75V10H20a.75.75 0 010 1.5h-9.25v9.25a.75.75 0 01-1.5 0V11.5H4.5a.75.75 0 110-1.5H10V3.25A.75.75 0 0110.75 2.5z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>

  <div class="p-4">
    <div class="mt-4 p-4 border border-gray-200 rounded-md bg-blue-50">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700 flex items-center"
            >Temperature
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 10a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0v-5zm-5.25-.75a.75.75 0 000 1.5H10v-1.5H4.75zm5.25-6.5a.75.75 0 01.75.75V10H20a.75.75 0 010 1.5h-9.25v9.25a.75.75 0 01-1.5 0V11.5H4.5a.75.75 0 110-1.5H10V3.25A.75.75 0 0110.75 2.5z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            bind:value={temperature}
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700 flex items-center"
            >Top P
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 10a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0v-5zm-5.25-.75a.75.75 0 000 1.5H10v-1.5H4.75zm5.25-6.5a.75.75 0 01.75.75V10H20a.75.75 0 010 1.5h-9.25v9.25a.75.75 0 01-1.5 0V11.5H4.5a.75.75 0 110-1.5H10V3.25A.75.75 0 0110.75 2.5z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            bind:value={topP}
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700 flex items-center"
            >Repetition penalty
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 10a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0v-5zm-5.25-.75a.75.75 0 000 1.5H10v-1.5H4.75zm5.25-6.5a.75.75 0 01.75.75V10H20a.75.75 0 010 1.5h-9.25v9.25a.75.75 0 01-1.5 0V11.5H4.5a.75.75 0 110-1.5H10V3.25A.75.75 0 0110.75 2.5z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="2"
            bind:value={repetitionPenalty}
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700 flex items-center"
            >Top K
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 10a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0v-5zm-5.25-.75a.75.75 0 000 1.5H10v-1.5H4.75zm5.25-6.5a.75.75 0 01.75.75V10H20a.75.75 0 010 1.5h-9.25v9.25a.75.75 0 01-1.5 0V11.5H4.5a.75.75 0 110-1.5H10V3.25A.75.75 0 0110.75 2.5z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <input
            type="number"
            step="1"
            min="0"
            max="100"
            bind:value={topK}
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .info-icon {
    display: inline;
  }
</style>
