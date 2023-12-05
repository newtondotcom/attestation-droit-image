<script lang="ts">
    import Pdf from "$lib/Pdf.svelte";
    import { onMount } from "svelte";

    var path:any;
    let displaypdf:boolean = false;

    onMount(()=> {
        path = sessionStorage.getItem("pdfURI");
        displaypdf = true;
    });
</script>

{#if displaypdf}
<Pdf blob={path}/>
{/if}