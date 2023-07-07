// store.js
import { defineStore } from 'pinia';

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
