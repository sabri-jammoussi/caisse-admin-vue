<template>
  <div>

    <router-link to="/ajouterpersonnel">
      <v-btn class="ajoutbtn"
        ><Icon icon="material-symbols:add" width="30px" color="green" />
        <v-tooltip activator="parent">Ajouter Utilisateur </v-tooltip>
        
      </v-btn>
    </router-link>
    <legend>List Utilisateur</legend>
    <v-table class="bordered">
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
              <v-btn icon v-bind="props" v-on="on" style="margin-right: 20px">
                <v-tooltip activator="parent" location="end"
                  >Consulter</v-tooltip
                >
                <v-icon
                  color="blue"
                  @click.stop="editUtilisateur(item.id)"
                  style="margin: auto"
                >
                  mdi-magnify
                </v-icon>
              </v-btn>
            </router-link>
            <v-btn
              icon
              v-bind="props"
              v-on="on"
              @click.stop="deleteUtilisateur(item.id)"
            >
              <v-tooltip activator="parent" location="end">Supprimer</v-tooltip>
              <v-icon color="red" style="margin: auto">mdi-delete</v-icon>
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
            <v-progress-circular
              :size="30"
              color="primary"
              indeterminate
            ></v-progress-circular>
            Loading ...
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @input="changePage"
    ></v-pagination>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Confirmation</v-card-title>
        <v-card-text>
          Voulez-vous vraiment supprimer cet utilisateur ?
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="confirmDelete">Supprimer</v-btn>
          <v-btn color="primary" text @click="deleteDialog = false"
            >Annuler</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { Icon } from "@iconify/vue";

export default {
  name: "utilisateurs",
  components: {
    Icon,
  },
  setup() {
    const utilisateurs = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 9;
    const deleteDialog = ref(false);
    const utilisateurToDelete = ref(null);

    const totalPages = computed(() =>
      Math.ceil(utilisateurs.value.length / itemsPerPage)
    );
    const paginatedUtilisateur = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return utilisateurs.value.slice(startIndex, endIndex);
    });

    const getUtilisateurs = async () => {
      await axios
        .get("http://localhost:3000/utilisateurs")
        .then((res) => {
          utilisateurs.value = res.data;
          console.log("aaaaaaaaaaaa", utilisateurs);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const deleteUtilisateur = (utilisateurId) => {
      utilisateurToDelete.value = utilisateurId;
      deleteDialog.value = true;
    };

    const confirmDelete = () => {
      const utilisateurId = utilisateurToDelete.value;
      axios
        .delete(`http://localhost:3000/utilisateurs/${utilisateurId}`)
        .then((res) => {
          // Handle successful deletion if needed
          console.log(res);
          // Refresh the list of utilisateurs
          getUtilisateurs();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          deleteDialog.value = false;
          location.reload();
        });
    };

    const changePage = (page) => {
      currentPage.value = page;
    };

    onMounted(() => {
      setTimeout(() => {
        getUtilisateurs();
      }, 1000);
    });

    return {
      utilisateurs,
      currentPage,
      itemsPerPage,
      deleteDialog,
      utilisateurToDelete,
      totalPages,
      paginatedUtilisateur,
      getUtilisateurs,
      deleteUtilisateur,
      confirmDelete,
      changePage,
    };
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
  margin-top: 10px;
  margin-bottom: -20px;
}
legend {
  font-size: large;
  font-style: italic;
}
.text-center {
  text-align: center;
}
</style>
