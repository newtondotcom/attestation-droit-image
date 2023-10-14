<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { pdfStoreUri, pdfStoreBlob } from "$lib/store";

    let src:any = "";
    let doc: any;
    let mobile:boolean;

    onMount(() => {
        pdfStoreUri.subscribe((value) => {
            src = value;
        });
        if (window.innerWidth < 768) {
            mobile = true;
        } else {
            mobile = false;
        }
    });

    function dlPdf() {
        console.log(doc);
    }

    async function sendPdf() {
        pdfStoreBlob.subscribe((value) => {
            doc = value;
        });
		const response = await fetch('/api/pdf', {
			method: 'POST',
			body: doc,
			headers: {
				'content-type': 'application/json'
			}
		});
		const total = await response.json();
        goto('/success');
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
        title="L'envoyer"
        on:click={sendPdf}
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
            stroke="#000000" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
           /> 
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