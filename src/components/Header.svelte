<script>
        import Flèche from "../assets/flècheF.png";
</script>

<header>
        <img class="logo" src={Flèche} alt="" />
        <h1>Ton alliée, <br />pour ne rien manquer !</h1>
        <!-- <a href="/ImportExportJson">json</a> -->
</header>

<style>
        header {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                background-color: white;
        }
        header h1 {
                font-size: 1.5em;
                color: #333;
                text-align: center;
                line-height: 25px;
                font-weight: 600;
        }

        .logo {
                width: 60px;
                height: 60px;
        }

        @media screen and (max-width: 768px) {
                header {
                        flex-direction: column;
                        align-items: center;
                        padding: 20px;
                        justify-content: space-between;
                        gap: 15px;
                }
                header h1 {
                        font-size: 1.2em;
                }
        }
</style>
