<script>
        // export let icon;
        export let type;
        export let annonceur;
        export let horaire;
        export let date;
        export let lieu;
        export let tarif;

        //   export let number;
        import { fade, slide } from "svelte/transition";
        import arrowUp from "/arrowUp.svg";
        import arrowDown from "/arrowDown.svg";

        let close = false;

        function collapse() {
                close = !close;
        }
</script>

- <div class="wrapper {close ? 'active' : ''}">
        <button class="button" on:click={collapse}>
                {type}
                <span class="button-arrows">
                        {#if close}
                                <img src={arrowUp} alt="Arrow Up" in:fade={{ duration: 1200 }} />
                        {:else}
                                <img src={arrowDown} alt="Arrow Down" in:fade={{ duration: 1200 }} />
                        {/if}
                </span>
        </button>

        {#if close}
                <span class="content" transition:slide={{ duration: 1200 }}>
                        <div class="content {close ? 'less' : ''} " in:fade={{ duration: 1200 }} out:fade={{ duration: 1200 }}>
                                <p class="p">{date}</p>
                                <p class="p">{horaire}</p>
                                <p class="p">{tarif}</p>
                                <p class="p">{lieu}</p>
                                <p class="p">{annonceur}</p>
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
                width: 80%;
                height: fit-content;
        }
        .button {
                position: relative;
                display: flex;
                align-items: center;
                padding: 20px;
                font-size: 1rem;
                font-weight: 800;
                width: 90%;
                cursor: pointer;
                border: none;
                border-radius: 8px;
                background-color: rgb(255, 255, 255);
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
                height: auto;
                text-align: left;
                letter-spacing: -1px;
                margin-bottom: 10px;
        }
        .button-arrows {
                position: absolute;
                content: "{buttonText}";
                color: rgb(100, 100, 229);
                font-size: 1em;
                font-weight: bolder;
                top: 40px;
                left: 90%;
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
                width: 90%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
                text-align: center;
                padding: 10px;
                border-radius: 5px;
                border: none;
        }

        .p {
                width: 100%;
                text-align: center;
                font-size: 1rem;
                font-weight: 400;
                color: white;
                background-color: rgb(66, 66, 208);
                padding: 10px;
                border-radius: 8px;
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
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

        @media screen and (max-width: 768px) {
                .wrapper {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 100vw;
                }
                .button {
                        font-size: 1em;
                }

                .button-arrows {
                        right: 0px;
                        margin-top: -30px;
                }
        }
</style>
