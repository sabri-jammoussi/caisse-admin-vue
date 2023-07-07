<template>
    <v-btn >Ajouter un Personnel</v-btn>
  <v-row>
    <v-col
      v-for="(photo, index) in photos"
      :key="index"
      class="d-flex child-flex"
      cols="3"
    >

      <v-img

        :src="photo.url"
        :lazy-src="photo.url"
        aspect-ratio="1"
       cover
        
        class=""
      >
      
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
            
          </v-row>
        </template>
     
      </v-img>
       
    </v-col>
    
  </v-row>
  
</template>

<script>
export default {
  data() {
    return {
      photos: [],
    };
  },
  created() {
    this.fetchPhotos();
  },
  methods: {
    fetchPhotos() {
      // Replace this with your logic to fetch the list of photos
      // Example:
      // Call an API or fetch photos from a database
      // Assign the fetched photos to the 'photos' data property

      // Sample code to assign dummy photo data
      this.photos = [
        { url: 'https://media.istockphoto.com/id/1171169099/fr/photo/homme-avec-les-bras-crois%C3%A9s-disolement-sur-le-fond-gris.jpg?s=612x612&w=0&k=20&c=csQeB3utGtrGeb3WmdSxRYXaJvUy_xqlhbOIZxclcGA=',name :'Caisse 1' },
        { url: 'https://st.depositphotos.com/1269204/1219/i/600/depositphotos_12196477-stock-photo-smiling-men-isolated-on-the.jpg' ,name:'Caisse 2'},
        { url: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' ,name:'Caisse 3'},
        // ... add more photo objects as needed
      ];
    },
  },
};
</script>
<style scoped>
.photo-name {
  text-align: center;
  color: #171616;
  font-weight: bold;
  margin-top: 308px;
}
</style>