<script>
        import Flèche from "../assets/flècheF.png";
        import svgMenu from "../assets/svg-menu.svg";
        import {slide} from "svelte/transition";
        let menuVisible = false;
        function openCloseMenu() {
                menuVisible = !menuVisible;
        }
</script>

<header>
        <div class="wrapper-header">
                <img class="logo" src={Flèche} alt="Logo" />
                <h1>Ton alliée, pour ne rien manquer !</h1>
                <button on:click={openCloseMenu}>
                        <img class="svg-menu" src={svgMenu} alt="Menu" />
                </button>
        </div>
</header>

<!-- Contenu du menu -->
<div class="menu-container" >
        {#if menuVisible}
              <div class="menu" transition:slide="{{ duration: 1200 }}">
                        <a href="/Advertisement">Services</a>
                        <a href="/">Diffuser une annonce</a>
                        <a href="/">Apparaître sur Flèche</a>
                        <a href="/">Nous contacter</a>
                        <!-- Ajoutez d'autres éléments de menu ici -->
                </div>
        {/if}
</div>

<style>
        .menu-container {
                display: flex;
                justify-content: center;
                width: 60%;
                margin: 0px auto;
        }

        .menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                align-content: center;
        }

        .wrapper-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
        }

        .logo {
                height: 50px; /* Ajustez la taille de l'image */
        }

        .svg-menu {
                height: 30px; /* Ajustez la taille de l'icône du menu */
                cursor: pointer;
        }
button{
                background-color: #f1f1f1;
                border: none;
                padding: 10px;
                cursor: pointer;
                margin-right: 10px;
        }
        button:hover{
                background-color: rgb(211, 211, 213);
        }

        h1 {
                font-size: 1rem;
                padding: 10px;
        }
        a{
                text-decoration: none; 
        }
</style>
