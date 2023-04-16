<template>
  <div>
    <hero></hero>
    <div class="container">
      <div class="row mt-5">
        <div class="col">
          <div>
            <div class="row">
              <div class="col-md-6">
                <base-input
                  placeholder="name"
                  addon-left-icon="fa fa-font"
                  v-model="name"
                ></base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  placeholder="number of seats"
                  addon-left-icon="fa fa-users"
                  v-model="numSeats"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  placeholder="price"
                  addon-left-icon="fa fa-money"
                  v-model="price"
                ></base-input>
              </div>
              <div class="col-md-6">
                <input
                      class="form-control"
                      accept="image/*"
                      @change="handleFileChange"
                      type="file"
                      id="formFile"
                    />
              </div>
            </div>
          

            <div class="row">
              <div class="col-md-12">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Write a large text here ..."
                  v-model="description"
                ></textarea>
              </div>
            </div>
            <div class="row d-flex justify-content-center mt-3">
              <button
                type="button"
                @click="updateRoom()"
                name=""
                id=""
                class="btn btn-primary"
              >
                update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hero from "../components/Hero.vue";
import axios from "../../axios.config";
export default {
  data() {
    return {
      room_id: this.$route.params.id,
      name: null,
      price: null,
      description: null,
      roomType: null,
      numSeats: null,
      room: null,
      selectedThumnail:null
    };
  },
  components: {
    hero,
  },
  mounted() {
    this.fetchroom();
  },
  methods: {
    fetchroom() {
      const id = this.$route.params.id;
      axios
        .get("/room/" + id)
        .then((response) => {
          this.room = response.data.data;
          this.name = this.room.name;
          this.price = this.room.price;
          this.description = this.room.description;
          this.numSeats = this.room.num_seats;
        })
        .catch((error) => console.log(error));
    },
     handleFileChange(event) {
      const file = event.target.files[0];
      this.selectedThumnail = file;
      // Do something with the file, such as upload it to a server
    },
    updateRoom() {


      Swal.fire({
  title: 'Do you want to save the changes?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Save',
  denyButtonText: `Don't save`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append("num_seats", this.numSeats);

      axios
        .patch("/room/" + id, formData)
        .then((response) => {
          console.log(response.data);
          // this.$router.push({ name: "RoomDetail", params: { id: id } });
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    Swal.fire('Saved!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})
    },
  },
};
</script>

<style lang="scss" scoped>
</style>