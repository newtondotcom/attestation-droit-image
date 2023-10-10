<script lang="ts">
    import "../app.css";
    import { goto } from "$app/navigation";

    import "nprogress/nprogress.css";
    import NProgress from "nprogress";
    import { navigating } from "$app/stores";

    NProgress.configure({
        minimum: 0.16,
    });

    $: {
        if ($navigating) {
            NProgress.start();
        } else NProgress.done();
    }

</script>

<header class="bg-white">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
    >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img src="https://newton-creations.fr/favicon.ico" alt="logo" class="h-8 w-8" on:click={()=>goto("/")}>
  
        <div class="flex flex-1 items-center justify-end md:justify-between">
          <ul class="flex items-center gap-6 text-sm">
            <li>
              <a class="text-gray-500 transition hover:text-gray-500/75" href="https://newton-creations.fr/">
                Mon Portfolio
              </a>
            </li>
          </ul>
        </div>
</header>
  

<slot/>