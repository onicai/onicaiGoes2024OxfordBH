<script lang="ts">
	import { store, currentAiCreationObject } from "../store";
	import Topnav from "../components/Topnav.svelte";
	import Footer from "../components/Footer.svelte";
	import Form from '../components/AiCreationProcess/AiCreationForm.svelte';
	import ProgressBar from '../components/AiCreationProcess/Helpers/ProgressBar.svelte';
    import { onMount } from "svelte";

	let progressBar;
	let steps = ['Select', 'Info', 'Create', 'Result', 'Use'];
	let currentActive = $currentAiCreationObject.currentActiveFormStepIndex;
	currentAiCreationObject.subscribe((value) => currentActive = value.currentActiveFormStepIndex);
	
	const handleProgress = (stepIncrement) => {
		progressBar.handleProgress(stepIncrement);
	};

	const resetActiveStepIndex = () => {
		if ($currentAiCreationObject.currentActiveFormStepIndex !== 1) {
			$currentAiCreationObject.currentActiveFormStepIndex = 1;
		};		
	};

	onMount(resetActiveStepIndex);

</script>

<Topnav />

<section id="createai" class="py-7 space-y-6 items-center text-center bg-slate-100 dark:bg-slate-800">

	<section class="bg-white dark:bg-gray-900 bg-[url('/images/hero-pattern.svg')]">
	  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">  
		<h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
		  Create Your On-Chain AI</h1>
		<p class="mb-8 text-lg font-normal text-gray-900 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
		  {#if !$store.isAuthed}
			<p id='createSubtext' class="dark:text-gray-400">Log in to create your own generative AI on-chain!</p>
		  {:else}
			<p id='createSubtext' class="dark:text-gray-400">You're logged in!</p>
		  {/if}
		</p>
	  </div>
	</section>
  
	<div class="center-container">
		<div>
			<ProgressBar {steps} bind:currentActive={$currentAiCreationObject.currentActiveFormStepIndex} bind:this={progressBar}/>
		</div>
			
		<div class="step-button">
			<button id="createAiProcessPrevButton" on:click|preventDefault={() => handleProgress(-1)} disabled={currentActive == 1} class="btn dark:bg-slate-700 dark:text-gray-200 dark:border-gray-600" >Prev</button>
			<button id="createAiProcessNextButton" on:click|preventDefault={() => handleProgress(+1)} disabled={currentActive == steps.length} class="btn dark:bg-slate-700 dark:text-gray-200 dark:border-gray-600" >Next</button>
		</div>
		<div>
			<Form active_step={steps[currentActive-1]}/>
		</div>
		<div class="step-button">
			<button id="createAiProcessPrevButton" on:click|preventDefault={() => handleProgress(-1)} disabled={currentActive == 1} class="btn dark:bg-slate-700 dark:text-gray-200 dark:border-gray-600" >Prev</button>
			<button id="createAiProcessNextButton" on:click|preventDefault={() => handleProgress(+1)} disabled={currentActive == steps.length} class="btn dark:bg-slate-700 dark:text-gray-200 dark:border-gray-600" >Next</button>
		</div>
	</div>

</section>
  

<div class='clearfix'></div>

<Footer />

<style>
  .urlInput {
    width: 100%;
  }

  .load-holder {
    background:url(../assets/loading.gif) center center no-repeat;
  }

  /* @import url('https://fonts.googleapis.com/css?family=Muli&display=swap'); */

  .center-container {
        align-items: center;
        width: 100%; /* Use full viewport width */
    }
	
	* {
		box-sizing: border-box;
	}

	main {
		font-family: 'Muli', sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		overflow: hidden;
		margin: 0;
	}

	.btn {
		background-color: #3498db;
		color: #fff;
		border: 0;
		border-radius: 6px;
		cursor: pointer;
		font-family: inherit;
		padding: 8px 30px;
		margin: 5px;
		font-size: 14px;
	}

	.btn:active {
		transform: scale(0.98);
	}

	.btn:focus {
		outline: 0;
	}

	.btn:disabled {
		background-color: #e0e0e0;
		cursor: not-allowed;
	}
	
	.step-button{
		margin-top: 1rem;
		text-align: center;
	}
</style>
