<template>
  <div>
    <img :src="photoStore.photo" :alt="photoStore.photoAlt" />
  </div>
</template>

<script>
import { usePhotoStore } from '@/store/store.js';

export default {
  computed: {
    photoStore() {
      return usePhotoStore();
    },
  },
  mounted() {
    const photo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgH3Flk3DHc0-_R6l1jeX-YST6Y_9BM7iMyw&usqp=CAU';
    const alt = 'Photo';
    this.photoStore.setPhoto(photo, alt);
  },
};
</script>
