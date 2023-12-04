<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    export let data:any;

    let src:any = "";
    let mobile:boolean;

    onMount(() => {
        src = data.pdfURi;
        if (window.innerWidth < 768) {
            mobile = true;
        } else {
            mobile = false;
        }
    });

    function dlPdf() {
        const res = fetch('/api/dl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encodeURIComponent(data.pdfURi)
        });
        goto('/');
    }

    async function sendPdf() {
        const res = await fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encodeURIComponent(data.pdfURi)
        });
        goto('/success');
	}

    function savePdf() {
        null;
    }

</script>
<iframe src={src} title="test" class="z-30" id="pdf"></iframe>
<div class="fixed bottom-10 left-0 right-0 flex flex-col justify-center items-center">
    <div class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
        <button
        class="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative "
        title="Supprimer l'attestation"
        on:click={dlPdf}
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
        >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
        </svg>
        </button>

        <button
        class="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
        title="Envoyer l'attestation"
        on:click={savePdf}
        >
        <svg 
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8"
        >
        <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
        </svg>
        </button>
    

    </div>
</div>

<style lang="postcss">
    iframe {
        width: 100vw;
        height: 100vh;
        border: none;
    }
</style>