<template>

    <!-- Add the text here -->
    <div class="content">
      <v-card>
        <v-card-title>A propos </v-card-title>
        <v-card-text>
          <ul>
            <li>-Caisse enregistreuse : appareil servant à enregistrer les achats du client d’un magasin. Cet appareil est muni d’un clavier, d’une machine à calculer et d’un tiroir caisse.</li>
            <li>-Tactile : caisse enregistreuse munie d’un écran tactile, c’est-à-dire réactif au toucher. Cette technologie permet un gain de temps conséquent lors du passage en caisse du client.</li>
            <li>-Tiroirs caisse : tiroirs qui ne s’ouvrent que lorsqu’une transaction a lieu. Ils constituent un dispositif de sécurité antivol magasin.</li>
            <li>-Balances intégrées : appareils permettant de peser les articles ou produits et de calculer le prix en fonction du poids des marchandises.</li>
            <li>-Terminal de point de vente : système d’informatisation de l’encaissement qui inclut toute une série d’équipements (écran, afficheur client, imprimante, lecteur carte bleue, etc.).</li>
            <li>-Clavier pin pad : petit clavier numérique sur lequel le client saisit son code confidentiel sans que l’on ait besoin de déplacer le terminal.</li>
            <li>-Logiciel de caisse: application informatique dédiée permettant d’enregistrer, traiter, analyser les données transitant par le terminal de paiement du magasin : gestion, trésorerie, stocks, etc.</li>
          </ul>
          
        </v-card-text>
      </v-card>
    </div>
    <!-- End of the added text -->

    <div class="content">
      <v-rating
        class="rating"
        v-model="rating"
        hover
        half-increments
      ></v-rating>
      <pre>{{ rating }}</pre>
    </div>

</template>

<script>
export default {
  data: () => ({
    rating: 3.5,
  }),
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 70vh;
}

.content {
  text-align: center;
}
</style>
