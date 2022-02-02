<script>
  export default {
    created() {
      this.favoriteUrl = this.imageLink.img_src
      console.log(this.imageLink.img_src)
    },

    data() {
      return {
        imageLink: this.source,
        favoriteUrl: null
      }
    },
    props: {
      source: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      onLike() {
        this.$emit('on-like', {
          url: this.imageLink.img_src
        })
      },
      onSaveFavorite() {
        this.$store.commit('updateUrl', this.favoriteUrl)
      }
    },
    emits: ['on-like']
  }
</script>

<style>
  .picture-open {
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
  }
  #buttons {
    display: flex;
    margin-bottom: 20px;
  }
</style>

<style lang="sass" scoped>
  @import 'bootstrap/scss/bootstrap'
</style>

<template>
  <h1>{{ imageLink.rover.name }}</h1>
  <p>picture id: {{ imageLink.id }}</p>
  <img class="picture-open" :src="imageLink.img_src" />
  <div id="buttons">
    <button type="button" class="btn btn-dark" @click="onLike">Like</button>
    <div>
      <button class="btn btn-secondary" @click="onSaveFavorite">
        Favorite
      </button>
    </div>
  </div>
  <p v-if="$store.state.favoriteUrl === 'No favorite saved yet'">
    {{ $store.state.favoriteUrl }}
  </p>
</template>
