import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    emailuser:null// Provide a default value for the user state
  }),

  actions: {
    setEmail(emailuser){
      this.emailuser=emailuser;
      console.log("user-------",this.emailuser)
    },
    async fetchUser() {

      try {
        const res = await fetch(`http://localhost:3000/authentification?email=${this.emailuser}`);      
        console.log("res !!!!!!!!!",res)
        const user = await res.json();
        console.log("user loaded",user[0])
        this.user = user[0];
        console.log("55555555555555555 store user",this.user)
      } catch (error) {
        console.error('Error fetching user:', error);
      }
     
    },
   
  },
});

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    photo: null,
  }),

  actions: {
    setPhoto(photo) {
      this.photo = photo;
    },
  },
});
