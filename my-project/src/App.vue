<script>
  import axios from 'axios'

  export default {
    data() {
      return { missions: null }
    },
    created() {
      this.$watch(
        () => this.$route.params,
        () => {
          this.fetchLaunches()
        },
        { immediate: true }
      )
    },
    methods: {
      fetchLaunches() {
        axios
          .get(`https://api.spacexdata.com/v4/launches/`)
          .then((response) => {
            this.missions = response.data
          })
      },
      shortName(missionName) {
        return missionName.split(' ')[0].toLowerCase()
      }
    },
    store: {
      strict: true,
      state: {
        number: 2
      },
      mutations: {
        updateNumber() {}
      }
    }
  }
</script>

<style>
  header {
    display: flex;
  }
  header img {
    width: 100px;
    height: 100px;
  }
  header div {
    height: 100px;
    padding: 15px 100px;
  }
  body {
    background-color: rgb(26, 26, 26);
    color: white;
    font-family: 'Red Hat Mono', monospace;
    font-variant: small-caps;
  }
  nav {
    height: 30px;
    margin-bottom: 50px;
  }
  h1,
  h2 {
    display: flex;
    justify-content: center;
    margin: 0;
  }
  nav ul {
    display: flex;
    justify-content: space-around;
  }
  nav li {
    text-align: center;
    width: 150px;
    height: 35px;
    list-style-type: none;
    text-decoration: none;
    border-radius: 4px;
  }
  a {
    display: block;
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
  }
  nav li:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transition: 0.3s;
  }
  a:hover {
    color: gray;
    transition: 0.3s;
  }
</style>

<template>
  <header>
    <img src="../public/manifest-icon-512.maskable.png" alt="" />
    <div>
      <h1>individuellt projekt</h1>
      <h2>javascript med ramverk</h2>
    </div>
  </header>
  <nav>
    <ul v-if="missions !== null">
      <li>
        <RouterLink to="/"> mars </RouterLink>
      </li>
      <li v-for="mission in missions.slice(0, 4)" :key="mission.id">
        <RouterLink :to="`${mission.id}`">
          {{ shortName(mission.name) }}
        </RouterLink>
      </li>
    </ul>
  </nav>
  <router-view />
</template>
