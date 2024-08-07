<script>
        import TitleCollapse from "../components/TitleCollapse.svelte";
        import ServicesCollapse from "../components/ServicesCollapse.svelte";

        let headingsTab = [
                {
                        ville: "Brignais",
                        title: {
                                serviceTitle: "Services",
                        },
                        services: [
                                {
                                        type: "Garage",
                                        annonces: [
                                                {
                                                        adress: "104 rue de la carrosserie",
                                                        advertiser: "Garage Ménon",
                                                        slogan: "10% sur les promos d'été",
                                                        description: "depuis 100 ans",
                                                        img: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                                                },
                                                      {
                                                        adress: "104 rue de la carrosserie",
                                                        advertiser: "Garage Ménon",
                                                        slogan: "10% sur les promos d'été",
                                                        description: "depuis 100 ans",
                                                        img: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                                                },
                                        ],
                                },
                                {
                                        type: "Coiffeur",
                                        annonces: [
                                                {
                                                        adress: "104 rue de la Mairie",
                                                        advertiser: "Coiff' Magic",
                                                        slogan: "Nouvelle coupe tendance pour l'été",
                                                        description: "20 ans d'expérience à votre service",
                                                        img: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                                                },
                                                // ... more coiffeur announcements
                                        ],
                                },
                        ],
                },
                // ... other towns with their services and announcements
        ];
</script>

<section id="annonces">
    {#each headingsTab as town}
        <h2>{town.ville}</h2> 
        <TitleCollapse title={town.title.serviceTitle}>
            {#each town.services as service} 
                <TitleCollapse title={service.type}>
            {#each service.annonces as annonce}
                        <ServicesCollapse
                            adress={annonce.adress}
                            advertiser={annonce.advertiser}
                            slogan={annonce.slogan}
                            description={annonce.description}
                            img={annonce.img}
                        />
                    {/each}
                </TitleCollapse>
            {/each}
        </TitleCollapse>
    {/each}
</section>


<style>
        /* h1 {
                font-size: 2rem;
                font-weight: 800;
                margin: 1rem 0;
        } */
        /* h2  {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1rem 0;
  } */
</style>
