<script lang="ts">
    import Pdf from "$lib/Pdf.svelte";
    import { onMount } from "svelte";

    // goto using : /pdf?file=${data.pdfURI}

    let file: string;
    let name : string;
    let displaypdf: boolean = false;

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

    onMount(async ()=> {
        const urlParams = new URLSearchParams(window.location.search);
        name = urlParams.get("file") || "";
        await getFileStream();
        displaypdf = true;
    });
</script>

{#if displaypdf}
    <Pdf content={file} name={name}/>
{/if}