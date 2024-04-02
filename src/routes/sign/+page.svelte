<script>
    import { goto } from "$app/navigation";
    import Canvas from "$lib/Canvas.svelte";
    import { onMount } from "svelte";

    let loading = false;

    async function trigger() {
        loading = true;
        const res = await fetch("/api/gen", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nom: sessionStorage.getItem("nom"),
                adresse: sessionStorage.getItem("adresse"),
                mail: sessionStorage.getItem("lieux"),
                lieux: sessionStorage.getItem("lieux"),
                signature: sessionStorage.getItem("signature"),
            }),
        });
        const data = await res.json();
        sessionStorage.setItem("pdfURI", data.pdfURI);
        loading = false;
        goto(`/mail`);
    }

    onMount(() => {
        let nom = sessionStorage.getItem("nom");
        let adresse = sessionStorage.getItem("adresse");
        let mail = sessionStorage.getItem("mail");
        let lieux = sessionStorage.getItem("lieux");

        if (nom == null || adresse == null || mail == null || lieux == null) {
            goto("/");
        }
    });

</script>

<h1 class="mb-4 mx-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Signez votre attestation</h1>

<Canvas width={300} height={300} color="#333" trigger={trigger} loading={loading}/>