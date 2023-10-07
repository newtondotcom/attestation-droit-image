<script lang="ts">
  var nom = "";
  var adresse = "";
  var telephone = "";
  var date = "";
  var lieux = "";
  var duration = "3";
</script>

<div class="text-lg flex flex-col justify-center items-center h-screen">
  <label
  class="block mt-4 sm:w-3/4 xl:w-1/3 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  >
    <div class="w-64 text-base font-medium text-gray-700">Prénom & Nom</div>
    <input
      type="text"
      bind:value={nom}
      placeholder="Michel Dupont"
      class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    />
  </label>
  <label
  class="block mt-4 sm:w-3/4 xl:w-1/3 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  >
    <div class="w-64 text-base font-medium text-gray-700">Adresse</div>
    <input
      type="text"
      bind:value={adresse}
      placeholder="3 rue de la Paix, 75000 Paris"
      class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    />
  </label>
  <label
  class="block mt-4 sm:w-3/4 xl:w-1/3 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  >
    <div class="w-64 text-base font-medium text-gray-700">Téléphone</div>
    <input
      type="tel"
      bind:value={telephone}
      placeholder="06 12 34 56 78"
      class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    />
  </label>
  <label
  class="block mt-4 sm:w-3/4 xl:w-1/3 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  >
    <div class="w-64 text-base font-medium text-gray-700">Fait à</div>
    <input
      type="text"
      bind:value={lieux}
      placeholder="Paris"
      class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    />
  </label>
</div>
  
<style lang="postcss">
</style>