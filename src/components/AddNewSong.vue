<template>
  <div class="add-song">
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form @submit.prevent="handleSubmit" v-else>
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useDocument from "@/composables/useDocument";

export default {
  props: ["playlist"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const { error, updateDoc } = useDocument("playlists", props.playlist.id);

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        //semi random number for id, could be done with third party library
        id: Math.floor(Math.random() * 1000000),
      };
      await updateDoc({
        songs: [...props.playlist.songs, newSong],
      });

      title.value = "";
      artist.value = "";
      showForm.value = false;
    };

    return { title, artist, showForm, handleSubmit, error };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
