<script lang="ts">
	import { onMount } from "svelte";

	export let width: number = 300;
	export let height: number = 300;
	export let color: string = "#fff";
	export let trigger: () => Promise<void>;
	export let loading = false;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let isDrawing: boolean = false;
	let start: { x: number; y: number };

	let t: number, l: number;

	onMount(() => {
		context = canvas.getContext("2d") as CanvasRenderingContext2D;
		context.lineWidth = 3;

		handleSize();
	});

	$: if (context) {
		context.strokeStyle = color;
	}

	const handleStart = ({ offsetX: x, offsetY: y }) => {
		isDrawing = true;
		start = { x, y };
	};

	const clearCanvas = () => {
		context.clearRect(0, 0, width, height);
	};

	const handleMove = ({ offsetX: x1, offsetY: y1 }) => {
		if (!isDrawing) return;

		if (x1 >= 0 && x1 <= width && y1 >= 0 && y1 <= height) {
			const { x, y } = start;
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x1, y1);
			context.closePath();
			context.stroke();

			start = { x: x1, y: y1 };
		}

		const { x, y } = start;
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x1, y1);
		context.closePath();
		context.stroke();

		start = { x: x1, y: y1 };
	};

	const handleEnd = () => {
		isDrawing = false;
	};

	const handleSize = () => {
		const rect = canvas.getBoundingClientRect();
		t = rect.top;
		l = rect.left;
	};

	async function exportCanvasAsImage() {
		const imageURL = canvas.toDataURL("image/png");
		sessionStorage.setItem("signature", imageURL);
		await trigger();
	}
</script>

<svelte:window on:resize={handleSize} />

<div class="flex justify-center flex-col items-center">
	<canvas
		{width}
		{height}
		style="background-color: #e5e5e5;border-radius: 10px;"
		bind:this={canvas}
		on:mousedown={handleStart}
		on:touchstart={(e) => {
			const { clientX, clientY } = e.touches[0];
			handleStart({ offsetX: clientX - l, offsetY: clientY - t });
		}}
		on:mouseup={handleEnd}
		on:touchend={handleEnd}
		on:mouseleave={handleEnd}
		on:mousemove={handleMove}
		on:touchmove={(e) => {
			const { clientX, clientY } = e.touches[0];
			handleMove({ offsetX: clientX - l, offsetY: clientY - t });
		}}
	/>

	<button
		class="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
		title="Supprimer l'attestation"
		on:click={clearCanvas}
	>
		<svg
			class="w-14 h-14 text-emerald-500 mt-4"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			></g><g id="SVGRepo_iconCarrier">
				<path
					d="M4.56189 13.5L4.14285 13.9294L4.5724 14.3486L4.99144 13.9189L4.56189 13.5ZM9.92427 15.9243L15.9243 9.92427L15.0757 9.07574L9.07574 15.0757L9.92427 15.9243ZM9.07574 9.92426L15.0757 15.9243L15.9243 15.0757L9.92426 9.07574L9.07574 9.92426ZM19.9 12.5C19.9 16.5869 16.5869 19.9 12.5 19.9V21.1C17.2496 21.1 21.1 17.2496 21.1 12.5H19.9ZM5.1 12.5C5.1 8.41309 8.41309 5.1 12.5 5.1V3.9C7.75035 3.9 3.9 7.75035 3.9 12.5H5.1ZM12.5 5.1C16.5869 5.1 19.9 8.41309 19.9 12.5H21.1C21.1 7.75035 17.2496 3.9 12.5 3.9V5.1ZM5.15728 13.4258C5.1195 13.1227 5.1 12.8138 5.1 12.5H3.9C3.9 12.8635 3.92259 13.2221 3.9665 13.5742L5.15728 13.4258ZM12.5 19.9C9.9571 19.9 7.71347 18.6179 6.38048 16.6621L5.38888 17.3379C6.93584 19.6076 9.54355 21.1 12.5 21.1V19.9ZM4.99144 13.9189L7.42955 11.4189L6.57045 10.5811L4.13235 13.0811L4.99144 13.9189ZM4.98094 13.0706L2.41905 10.5706L1.58095 11.4294L4.14285 13.9294L4.98094 13.0706Z"
					fill="currentColor"
				></path>
			</g></svg
		>
	</button>

	<button
		on:click={exportCanvasAsImage}
		class="mt-6 inline-block rounded bg-emerald-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500"
	>
		{#if loading}
			<svg
				class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				><circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				></circle><path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
				></path></svg
			>
		{:else}
			Envoyez votre attestation
		{/if}
	</button>
</div>
