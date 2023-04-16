<template>
  <div>
    <div style="margin-top: 200px">
      <form @submit.prevent="submitForm()" enctype="multipart/form-data">
        <label>
          Thumbnail:
          <input type="file" accept="image/*" @change="onThumbnailChange" />
        </label>
        <label>
          name:
          <input type="test" v-model="name2" />
        </label>
        <label>
          Images:
          <input
            type="file"
            accept="image/*"
            multiple
            @change="onImagesChange"
          />
        </label>
        <label>
          descreption:
          <input type="text" v-model="description" />
        </label>
        <label>
          numof seats:
          <input type="number" v-model="numSeats" />
        </label>
        <label>
          type:
          <input type="text" v-model="roomType" />
        </label>
        <label>
          price:
          <input type="number" v-model="price" />
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
    {{ room }}
  </div>
</template>

<script>
import axios from "../../axios.config";

export default {
  data() {
    return {
      isLoading: false,
      rooms: [],
      thumbnail: null,
      images: [],
      price: null,
      numSeats: null,
      roomType: null,
      name2: null,
      room: null,
      description: null,
    };
  },
  mounted() {
    this.fetchRooms();
  },
  methods: {
    async fetchRooms() {
      try {
        this.isLoading = true;
        const response = await axios.get("/room"); // replace with your API endpoint
        this.rooms = response.data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    onThumbnailChange(event) {
      this.thumbnail = event.target.files[0];
    },
    onImagesChange(event) {
      this.images = Array.from(event.target.files);
    },
    submitForm() {
      const data = {
        name: this.name2,
        description: this.description,
        price: this.price,
        num_seats: this.numSeats,
        room_type: this.roomType,
        availability: true,
        thumbnail: this.thumbnail, // update this line
        images: this.images,
      };

      axios
        .post("/room", data)
        .then((response) => {
          console.log(response);
          this.room = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>