<script lang="ts">
  import { goto } from "$app/navigation";

  var nom = "";
  var adresse = "";
  var lieux = "";
  var mail = "";

  let error = false;

  function genpdf() {
    if (nom == "" || adresse == "" || mail == "" || lieux == "") {
      error = true;
      setTimeout(() => {
        error = false;
      }, 1000);
      console.log("pb avec les champs");
    } else if (mail == "" || !mail.includes("@") || !mail.includes(".")) {
      error = true;
      setTimeout(() => {
        error = false;
      }, 1000);
      console.log("pb avec le mail");
    }    
    else {
      sessionStorage.setItem("nom", nom);
      sessionStorage.setItem("adresse", adresse);
      sessionStorage.setItem("mail", mail);
      sessionStorage.setItem("lieux", lieux);
      goto("/sign");
    }
  };

  function onKeyDown(e:any) {
		 switch(e.key) {
			 case "Enter":
          genpdf();
          e.preventDefault();
          break;
		 }
	}

</script>

<svelte:window on:keydown={onKeyDown} />

{#if error}
<div class="flex flex-col justify-center items-center">
<div role="alert" class="mt-4 rounded border-s-4 border-red-500 bg-red-50 p-4">
  <div class="flex items-center gap-2 text-red-800">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="h-5 w-5"
    >
      <path
        fill-rule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clip-rule="evenodd"
      />
    </svg>
    <strong class="block font-medium"> Quelque chose a planté quelque part ... </strong>
  </div>
  <p class="mt-2 text-sm text-red-700">
    Merci de compléter tous les champs.
  </p>
</div>
</div>
{/if}

<div class="text-lg flex flex-col justify-center items-center h-screen">
<h1 class="mb-4 mx-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Générer une autorisation au droit à l'image</h1>

  <label
  class="block mt-4 sm:w-3/4 xl:w-2/5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600"
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
  class="block mt-4 sm:w-3/4 xl:w-2/5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600"
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
  class="block mt-4 sm:w-3/4 xl:w-2/5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600"
  >
    <div class="w-64 text-base font-medium text-gray-700">Adresse mail</div>
    <input
      type="tel"
      bind:value={mail}
      placeholder="michel.dupont@nmail.org"
      class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    />
  </label>
  <label
  class="block mt-4 sm:w-3/4 xl:w-2/5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600"
  >
    <div class="w-64 text-base font-medium text-gray-700">Fait à</div>
    <input
      type="text"
      bind:value={lieux}
      placeholder="Paris"
      class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    />
  </label>
  <button on:click={genpdf} class="mt-16 inline-block rounded bg-emerald-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-emerald-500">
    Signer votre attestation
  </button>
  <div class="xl:h-20 sm:h-60"></div>
</div>