<script>
  import SelectionTown from "../components/SelectionTown.svelte";
  // import Headings from "./Headings.svelte";
  import ServicesCollapse from "../components/ServicesCollapse.svelte"; // Assuming this is your Collapse component

  // Adapt your data structure (see explanation below)
  let headingsTab = [
    {
      ville: "Brignais",
      services: [
        {
          type: "Garage",
          annonces: [
            {
              adress: "104 rue de la carrosserie",
              advertiser: "Garage Ménon",
              slogan: "10% sur les promos dété",
              description: "depuis 100 ans",
              img: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            {
              adress: "104 rue de la carrosserie",
              advertiser: "Garage Ménon",
              slogan: "10% sur les promos dété",
              description: "depuis 100 ans",
              img: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            // ... more garage announcements
          ],
        },
        {
          type: "Coiffeur",
          annonces: [
            {
              adress: "104 rue de la Mairie", // Update address for clarity
              advertiser: "Coiff' Magic",
              slogan: "Nouvelle coupe tendance pour l'été",
              description: "20 ans d'expérience à votre service",
              img: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },    {
              adress: "104 rue de la Mairie", // Update address for clarity
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

<SelectionTown />

<section class="headings">
  {#each headingsTab as town}
    <h1>{town.ville}</h1>
     {#each town.services as service}
      <h2>{service.type}</h2>
      {#each service.annonces as annonce}
        <ServicesCollapse  adress={annonce.adress}
          advertiser={annonce.advertiser}
          slogan={annonce.slogan}
          description={annonce.description}
          img={annonce.img}
        />
      {/each}
    {/each}
  {/each}
</section>

<style>
  h1 {
    font-size: 2rem;
    font-weight: 800;
    margin: 1rem 0;
  }
  h2  {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1rem 0;
  }
</style>
