<script lang="ts">
    import "../app.css";
</script>

<header class="bg-white">
    <div
      class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
    >
    <img src="https://newton-creations.fr/favicon.ico" alt="logo" class="h-8 w-8">
  
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