<script>
        export let type;
        export let annonceur;
        export let horaire;
        export let date;
        export let lieu;
        export let tarif;
        import { fade, slide } from "svelte/transition";

        let close = false;

        function collapse() {
                close = !close;
        }
</script>

<div class="wrapper {close ? 'active' : ''}">
        <button class="button" on:click={collapse}>
                {type}
                <span class="button-arrows">
                        {#if close}
                                <img src="moins.svg" alt="Arrow Up" in:fade={{ duration: 1200 }} />
                        {:else}
                                <img src="plus.svg" alt="Arrow Down" in:fade={{ duration: 1200 }} />
                        {/if}
                </span>
        </button>

        {#if close}
                <span transition:slide={{ duration: 1200 }}>
                        <div class="content {close ? 'less' : ''} " in:fade={{ duration: 1200 }} out:fade={{ duration: 1200 }}>
                                <p class="p">Date: {date}</p>
                                <p class="p">Horaire: {horaire}</p>
                                <p class="p">Tarif: {tarif}</p>
                                <p class="p">Lieu: {lieu}</p>
                                <p class="p">Annonceur: {annonceur}</p>
                        </div>
                </span>
        {/if}
</div>

<style>
        .wrapper {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100vw;
        }

        .button {
                display: flex;
                align-items: center;
                padding: 10px 30px;
                width: 90%;
                gap: 10px;
                font-size: 1rem;
                font-weight: 800;
                min-width: auto;
                cursor: pointer;
                border: none;
                border-radius: 8px;
                background-color: rgb(255, 255, 255);
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
                text-align: left;
                letter-spacing: -1px;
                margin-bottom: 10px;
                /* height: fit-content; */
        }

        .button-arrows {
                margin-left: auto;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
        }

        .button-arrows img {
                height: 15px;
                width: 15px;
        }

        .button-arrows img:hover {
                animation: bounce 0.4s;
        }

        .content {
                width: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                padding: 20px 20px;
                border-radius: 5px;
                border: none;
                background-color: white;
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
        }

        .p {
                width: auto;
                text-align: center;
                font-size: 1rem;
                font-weight: 400;
                color: rgb(100, 8, 54);
                padding: 3px;
        }

        @keyframes bounce {
                0% {
                        transform: scale(1) translateY(-2px);
                }
                25% {
                        transform: scale(1) translateY(3px);
                }
                50% {
                        transform: scale(1) translateY(-1px);
                }
                75% {
                        transform: scale(1) translateY(2px);
                }
                100% {
                        transform: scale(1) translateY(0);
                }
        }

        /* @media screen and (max-width: 768px) {
                .wrapper {
                        width: 100vw;
                }
        } */
</style>
