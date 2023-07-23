<template>
  <div>
    <router-link to="/AjouterCaisse">
      <v-btn class="ajoutbtn"><Icon  icon="material-symbols:add" width="25px" color="green"/>
      <v-tooltip activator="parent" 
                  >Ajouter Caisse
      
    </v-tooltip>
  </v-btn>
    </router-link>

    <v-table class="bordered" >
      <caption class="center-text">List Caisse</caption>
      
    
      <thead >
  
     
        <tr>
          <th class="text-left">Code</th>
          <th class="text-left">Intitule</th>
          <th class="text-left">Depot</th>
          <th class="text-left">Souche</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody v-if="paginatedCaisses.length > 0">
        <tr v-for="(item, index) in paginatedCaisses" :key="index">
          <td>{{ item.Code }}</td>
          <td>{{ item.Intitule }}</td>
          <td>{{ item.Depot }}</td>
          <td>{{ item.Souches }}</td>
          <td>
            <router-link :to="`/EditCaisse/${item.id}`">
              <v-btn icon style="margin-right: 20px;" v-bind="props" v-on="on">
                <v-tooltip activator="parent" location="end"
                  >Consulter</v-tooltip
                >
                <v-icon
                  
                  color="blue"
                  @click.stop="editCaisse(item.id)"
                  style="margin: auto  "
                  
                  >mdi-magnify</v-icon
                >
              </v-btn>
            </router-link>
            <v-btn icon @click.stop="deleteCaisse(item.id)">
              <v-tooltip activator="parent" location="end">Supprimer</v-tooltip>
              <v-icon  color="red" style="margin: auto ">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5" class="text-center">
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
          Voulez-vous vraiment supprimer cette caisse ?
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
  name: "caisses",
  data() {
    return {
      caisses: [],
      currentPage: 1,
      itemsPerPage: 9,
      deleteDialog: false,
      caisseToDelete: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.getCaisses();
    
    }, 1000);
  },
  components: {
		Icon,
	},
  computed: {
    totalPages() {
      return Math.ceil(this.caisses.length / this.itemsPerPage);
    },
    paginatedCaisses() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.caisses.slice(startIndex, endIndex);
    },
  },
  methods: {
    getCaisses() {
      axios
        .get("http://localhost:3000/caisses")
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
  padding: 12px;
  border-collapse: collapse;
  border: 1px solid #e0e0e0;
}
.ajoutbtn {
  display: flex;
  margin-right: 12px;
    margin-left: auto;
    width: 194px;


  }

.bordered th,
.bordered td {
  border: 1px solid #e0e0e0;
  padding: 8px;
}
caption {
  font-size: large;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  color:#005E7E;
}

</style>
