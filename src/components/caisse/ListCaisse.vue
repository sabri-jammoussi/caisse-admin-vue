<template>
  <div>
    <router-link to="/AjouterCaisse">
      <v-btn
        >Ajouter Caisse
        <v-tooltip activator="parent" location="end">AjouterCaisse</v-tooltip>
      </v-btn>
    </router-link>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Code</th>
          <th class="text-left">Intitule</th>
          <th class="text-left">Depot</th>
          <th class="text-left">Souche</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody v-if="caisses.length > 0">
        <tr v-for="(item, index) in caisses" :key="index">
          <td>{{ item.Code }}</td>
          <td>{{ item.Intitule }}</td>
          <td>{{ item.Depot }}</td>
          <td>{{ item.Souches }}</td>
          <td>
            <router-link :to="`/EditCaisse/${item.id}`">
            <v-btn v-bind="attrs" v-on="on">
                  <v-tooltip activator="parent" location="end">Consulter</v-tooltip>
              <v-icon
                class="text-subtitle-1"
                color="blue"
                @click.stop="editCaisse(item.id)"
                style="margin-right: 12px"
                >mdi-magnify
             
                </v-icon>
            </v-btn>
            </router-link>
                <v-btn v-bind="attrs" v-on="on">
                             <v-tooltip activator="parent" location="end">Supprimer</v-tooltip>
                  <v-icon
                    class="text-subtitle-1"
                    color="red"
                    @click.stop="deleteCaisse(item.id)"
                  >
                    mdi-delete
                  </v-icon>
                </v-btn>
             
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td>Loading ...</td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Confirmation</v-card-title>
        <v-card-text>
          Voulez-vous vraiment supprimer cette caisse ?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="deleteDialog = false"
            >Annuler</v-btn
          >
          <v-btn color="red" text @click="confirmDelete">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "caisses",
  data() {
    return {
      caisses: [],
      deleteDialog: false,
      caisseToDelete: null,
    };
  },
  mounted() {
    this.getCaisses();
  },
  methods: {
    getCaisses() {
      axios
        .get("https://my-json-server.typicode.com/sabri-jammoussi/mockJson/caisses")
        .then((res) => {
          this.caisses = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deleteCaisse(caisseId) {
      this.caisseToDelete = caisseId;
      this.deleteDialog = true;
    },
    confirmDelete() {
      const caisseId = this.caisseToDelete;
      axios
        .delete(`http://localhost:3000/caisses/${caisseId}`)
        .then((res) => {
          // Handle successful deletion if needed
          console.log(res);
          // Refresh the list of caisses
          this.getCaisses();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.deleteDialog = false;
        });
    },
  },
};
</script>
