<script lang="ts">
    import { onMount } from "svelte";
    import PdfViewer from "svelte-pdf";

    // goto using : /pdf?file=${data.pdfURI}

    let file: string;
    let name: string;
    let displaypdf: boolean = false;
    let displaybanner: boolean = false;
    let fileloading: boolean = true;

    async function getFileStream() {
        const res = await fetch("/api/stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                file: name,
            }),
        });
        const data = await res.json();
        file = data.file;
        displaypdf = true;
    }


    async function sendPdf() {
        const res = await fetch('/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: name
        });
        fileloading = false;
        displaybanner = true;
	}

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        name = urlParams.get("file") || "";
        sendPdf();
        getFileStream();
    });
</script>

<div
    class="flex flex-col justify-center items-center w-screen"
>
    {#if fileloading}
    <div
        role="alert"
        class="rounded-xl border border-gray-100 bg-white p-4 xl:w-3/5"
    >
        <div class="flex items-start gap-4">
            <span class="text-orange-600"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3V6M3 12H6M5.63607 5.63604L7.75739 7.75736M5.63604 18.3639L7.75736 16.2426M21 12.0005H18M18.364 5.63639L16.2427 7.75771M11.9998 21.0002V18.0002M18.3639 18.3642L16.2426 16.2429" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </span>

            <div class="flex-1">
                <strong class="block font-medium text-gray-900">
                    Expédition de votre attestation 📧
                </strong>

                <p class="mt-1 text-sm text-gray-700 flex-wrap">
                    Est ce possible de patienter quelques instants de plus ? 🥺
                </p>
            </div>
        </div>
    </div>
    {/if}
    {#if displaybanner}
    <div
        role="alert"
        class="rounded-xl border border-gray-100 bg-white p-4 xl:w-3/5"
    >
        <div class="flex items-start gap-4">
            <span class="text-green-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </span>

            <div class="flex-1">
                <strong class="block font-medium text-gray-900">
                    Attestation envoyée
                </strong>

                <p class="mt-1 text-sm text-gray-700 flex-wrap">
                    Votre attestation a été correctement envoyée. Merci beaucoup
                    !
                </p>
            </div>

            <button
                class="text-gray-500 transition hover:text-gray-600"
                on:click={() => displaybanner = false}
            >
                <span class="sr-only">Dismiss popup</span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    </div>
    {/if}
</div>

{#if displaypdf}
    <PdfViewer 
    showButtons={["zoom", "print", "rotate", "download"]}
    showBorder={true}
    data={atob(file)}/>
{/if}



<ul class="mt-12 mb-[200px] flex justify-center gap-6 md:gap-8">
    <li>
        <a
            href="https://www.instagram.com/newton.creations/"
            rel="noreferrer"
            target="_blank"
            class="text-gray-700 transition hover:text-gray-700/75"
        >
            <span class="sr-only">Instagram</span>
            <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                />
            </svg>
        </a>
    </li>

    <li>
        <a
            href="https://github.com/newtondotcom/autorisation-exploitation-image"
            rel="noreferrer"
            target="_blank"
            class="text-gray-700 transition hover:text-gray-700/75"
        >
            <span class="sr-only">GitHub</span>
            <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                />
            </svg>
        </a>
    </li>

    <li>
        <a
            href="https://www.linkedin.com/in/robin-augereau/"
            rel="noreferrer"
            target="_blank"
            class="text-gray-700 transition hover:text-gray-700/75"
        >
            <span class="sr-only">LinkedIn</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                />
            </svg>
        </a>
    </li>
</ul>