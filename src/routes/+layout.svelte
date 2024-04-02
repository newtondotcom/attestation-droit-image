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
    <img src="https://droninside.fr/logo.png" alt="logo" class="h-8" on:click={()=>goto("/")}>
  
        <div class="flex flex-1 items-center justify-end md:justify-between">
          <ul class="flex items-center gap-6 text-sm">
            <li>
              <a class="text-emerald-600 transition hover:text-emerald-600/75" href="https://droninside.fr/">
                Mon Portfolio
              </a>
            </li>
          </ul>
        </div>
</header>
  

<slot/>

<style lang="postcss">
  	:global(.visually-hidden:not(:focus):not(:active)) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		width: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
	}
	
	:global(canvas) {
		align-self: center;
	}
</style>