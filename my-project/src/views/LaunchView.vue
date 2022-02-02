<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        launchInformation: null
      }
    },
    created() {
      this.$watch(
        () => this.$route.params,
        () => {
          if (this.$route.params.id !== undefined) {
            this.fetchData()
          }
        },
        { immediate: true }
      )
    },
    methods: {
      fetchData() {
        axios
          .get(
            `https://api.spacexdata.com/v4/launches/${this.$route.params.id}`
          )
          .then((response) =>
            console.log((this.launchInformation = response.data))
          )
      }
    },
    computed: {
      noCaps() {
        return this.launchInformation.details.toLowerCase()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $text-color: rgba(255, 255, 255, 0.5);

  #container {
    display: flex;
    justify-content: center;
  }
  #image,
  #headline {
    color: $text-color;
    display: flex;
    justify-content: center;
  }
  #headline {
    gap: 100px;
  }
  #image {
    padding: 0 200px;
  }
</style>

<template>
  <div id="container " v-if="launchInformation !== null">
    <div id="headline">
      <h1>{{ launchInformation.name }}</h1>
      <p v-if="launchInformation.success">Successful mission</p>
      <p v-else>Unsuccessful mission</p>
    </div>
    <div id="image">
      <img :src="launchInformation.links.patch.large" alt="" />
      <p>{{ noCaps }}</p>
    </div>
  </div>
</template>
