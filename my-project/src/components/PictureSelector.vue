<script>
  import axios from 'axios'
  import ViewPicture from './ViewPicture.vue'
  export default {
    data() {
      return {
        rover: 'curiosity',
        camera: 'NAVCAM',
        date: '2022-01-19',
        pictures: null,
        pictureProp: null,
        rendering: false,
        openPicture: false
      }
    },
    methods: {
      getPictures() {
        this.$watch(
          () => this.$route.params,
          () => {
            this.fetchData()
          },
          { immediate: true }
        )
      },
      fetchData() {
        axios
          .get(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}` +
              `/photos?earth_date=${this.date}&camera=${this.camera}` +
              `&api_key=oXrYJO0gE8FTKINrVwwkStlc0NKCTXqjAbu1uG3s`
          )
          .then((response) => (this.pictures = response.data.photos))
        this.rendering = true
      },
      reset() {
        this.rendering = false
      },
      renderPicture(object) {
        this.openPicture = true
        this.pictureProp = object
      },
      closePicture() {
        this.openPicture = false
      },
      onLike() {
        alert('You liked this picture, well done!')
      }
    },
    components: { ViewPicture }
  }
</script>

<template>
  <div id="open-picture" v-if="openPicture !== false">
    <ViewPicture @on-like="onLike" :source="pictureProp" />
    <input type="button" @click="closePicture" value="Close" />
  </div>
  <h1>mars</h1>
  <ul id="picture-selector">
    <li>
      <select v-model="rover" name="rover">
        <option value="curiosity">Curiosity</option>
        <option value="opportunity">Opportunity</option>
        <option value="spirit">Spirit</option>
      </select>
    </li>
    <li>
      <select id="camera-selector" v-model="camera" name="camera">
        <option value="NAVCAM">Navigation Camera</option>
        <option value="FHAZ">Front Hazard Avoidance Camera</option>
        <option value="RHAZ">Rear Hazard Avoidance Camera</option>
        <option v-if="rover === 'curiosity'" value="MAST">Mast Camera</option>
        <option v-if="rover === 'curiosity'" value="CHEMCAM">
          Chemistry and Camera Complex
        </option>
        <option v-if="rover !== 'curiosity'" value="PANCAM">
          Panoramic Camera
        </option>
        <option v-if="rover === 'curiosity'" value="MAHLI">
          Mars Hand Lens Imager
        </option>
        <option v-if="rover === 'curiosity'" value="MARDI">
          Mars Descent Imager
        </option>
        <option v-if="rover !== 'curiosity'" value="MINITES">
          Miniature Thermal Emission Spectrometer (Mini-TES)
        </option>
      </select>
    </li>
    <li>
      <input id="date-input" v-model="date" type="date" />
    </li>
    <li>
      <input
        class="button"
        type="button"
        @click="getPictures"
        value="Get Pictures"
      />
    </li>
    <li>
      <input class="button" type="button" @click="reset" value="Reset" />
    </li>
  </ul>
  <div v-if="pictures !== null && rendering === true" id="image-container">
    <div
      id="favorite-container"
      v-if="$store.state.favoriteUrl !== 'No favorite saved yet'"
    >
      <p id="favorite-text">favorite image</p>
      <img :src="$store.state.favoriteUrl" alt="" />
    </div>
    <div v-for="picture in pictures" :key="picture.index">
      <img @click="renderPicture(picture)" :src="picture.img_src" />
    </div>
  </div>
</template>

<style>
  #favorite-text {
    padding: 5px 27px;
    background-color: rgba(26, 26, 26, 0.425);
    position: absolute;
    font-size: 1.5rem;
    margin: auto;
    border-radius: 10px;
  }
  #favorite-container {
    /* width: 200px;
    height: 200px; */
    position: relative;
  }
  #open-picture {
    z-index: 99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(26, 26, 26, 0.425);
    backdrop-filter: blur(10px);
    position: fixed;
    border-radius: 10px;
    text-align: center;
    height: 75%;
    width: 80%;
    margin: 0 10%;
  }
  #camera-selector {
    width: 150px;
  }
  #image-container {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: flex-end;
    width: 80%;
    margin: 50px 10%;
  }
  #picture-selector {
    height: 34px;
    justify-content: center;
    gap: 20px;
  }
  .button {
    height: 30px;
  }
  input {
    font-family: 'Red Hat Mono', monospace;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.5);
    width: 130px;
    height: 30px;
    margin: 0;
    padding: 0;
    color: white;
    border-radius: 5px;
    border-style: none;
  }
  select {
    font-family: 'Red Hat Mono', monospace;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.5);
    color: white;
    border-radius: 5px;
    border-style: none;
    width: 130px;
    height: 30px;
  }
  input:hover,
  select:hover {
    background-color: rgba(156, 156, 156, 0.377);
    cursor: pointer;
    transition: 0.3s;
  }
  ul {
    display: flex;
    justify-content: space-around;
    padding: 0;
  }
  li {
    list-style-type: none;
  }
  img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
  img:hover:not(#open-picture img, header img, #favorite-container img) {
    filter: brightness(80%);
    cursor: pointer;
    transition: 0.3s;
  }
</style>
