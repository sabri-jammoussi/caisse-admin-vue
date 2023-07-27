<template>
  <div>
    <router-link to="/ajouterpersonnel">
      <v-btn class="ajoutbtn"><Icon  icon="material-symbols:add" width="25px" color="green"/>
      <v-tooltip activator="parent" 
                  >Ajouter Utilisateur
      
    </v-tooltip>
  </v-btn>
    </router-link>
    <v-table class="bordered">
      <caption>List Utilisateur</caption>
      <thead>
        <tr>
          <!-- <th class="text-left">Image</th> -->
          <th class="text-left">Nom</th>
          <th class="text-left">Prenom</th>
          <th class="text-left">Role</th>
          <th class="text-left">Surnom</th>
          <th class="text-left">Email</th>

          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody v-if="paginatedUtilisateur.length > 0">
        <tr v-for="(item, index) in paginatedUtilisateur" :key="index">
          <!-- <td>{{ item.image }}</td> -->
          <td>{{ item.nom }}</td>
          <td>{{ item.prenom }}</td>
          <td>{{ item.role }}</td>
          <td>{{ item.surnom }}</td>
          <td>{{ item.email }}</td>
          <td>
            <router-link :to="`/editpersonnel/${item.id}`">
              <v-btn icon v-bind="props" v-on="on" style="margin-right: 20px;" >
                <v-tooltip activator="parent" location="end">Consulter</v-tooltip>
                <v-icon
                  
                  color="blue"
                  @click.stop="editUtilisateur(item.id)"
                  style="margin: auto "
                >
                  mdi-magnify
                </v-icon>
              </v-btn>
            </router-link>
            <v-btn icon v-bind="props" v-on="on" @click.stop="deleteUtilisateur(item.id)">
              <v-tooltip activator="parent" location="end">Supprimer</v-tooltip>
              <v-icon  color="red" style="margin: auto ">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
      <!-- <tbody v-else-if="paginatedUtilisateur.length ===0">
        <tr>
          <td colspan="5" class="text-center">
         pas de données
          </td>
        </tr>
      </tbody> -->
      <tbody v-else>
        <tr>
          <td colspan="7" class="text-center">
            <v-progress-circular :size="30" color="primary" indeterminate></v-progress-circular>
            Loading ...
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-pagination v-model="currentPage" :length="totalPages" @input="changePage"></v-pagination>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Confirmation</v-card-title>
        <v-card-text>
          Voulez-vous vraiment supprimer cet utilisateur ?
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="confirmDelete">Supprimer</v-btn>
          <v-btn color="primary" text @click="deleteDialog = false">Annuler</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from '@iconify/vue';
export default {
  name: "utilisateurs",
  data() {
    return {
      utilisateurs: [],
      currentPage: 1,
      itemsPerPage: 9,
      deleteDialog: false,
      utilisateurToDelete: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.getUtilisateurs();
    }, 1000);
  },
  components: {
		Icon,
	},
  computed: {
    totalPages() {
      return Math.ceil(this.utilisateurs.length / this.itemsPerPage);
    },
    paginatedUtilisateur() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.utilisateurs.slice(startIndex, endIndex);
    },
  },
  methods: {
    getUtilisateurs() {
      axios
        .get("http://localhost:3000/utilisateurs")
        .then((res) => {
          this.utilisateurs = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deleteUtilisateur(utilisateurId) {
      this.utilisateurToDelete = utilisateurId;
      this.deleteDialog = true;
    },
    confirmDelete() {
      const utilisateurId = this.utilisateurToDelete;
      axios
        .delete(`http://localhost:3000/utilisateurs/${utilisateurId}`)
        .then((res) => {
          // Handle successful deletion if needed
          console.log(res);
          // Refresh the list of utilisateurs
          this.getUtilisateurs();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.deleteDialog = false;
          location.reload();
        });
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.bordered {
  border-collapse: collapse;
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.bordered th,
.bordered td {
  border: 1px solid #e0e0e0;
  padding: 8px;
}
.ajoutbtn {
  display: flex;
  margin-right: 12px;
    margin-left: auto;
    width: 194px;


  }
  caption {
  font-size: large;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  color:#005E7E;
}
.text-center {
  text-align: center;
}
</style>
