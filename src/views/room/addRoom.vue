<template>
  <div>
    <hero></hero>
    <div class="container">
      <div class="row m-5 p-5 shadow">
        <i
          class="fa fa-chevron-left"
          v-if="roomType != null"
          @click="roomType = null"
          aria-hidden="true"
        ></i>
        <div v-if="roomType == null" class="col text-center">
          <h3 class="text-muted mb-5">Choose the type of space</h3>
          <div class="d-flex justify-content-center m-2">
            <button
              class="btn btn-primary"
              v-on:click="roomType = 'sharedSpace'"
            >
              Shared Space
            </button>
            <button class="btn btn-primary" v-on:click="roomType = 'room'">
              &nbsp;&nbsp;&nbsp;&nbsp;Room&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
          </div>
        </div>

        <div v-if="roomType == 'sharedSpace'" class="col">
          <h3 class="text-muted">Add New Shared space</h3>
          <form @submit.prevent="createRoom()">
            <div>
              <div class="row">
                <div class="col-md-4">
                  <base-input
                    placeholder="name"
                    addon-left-icon="fa fa-font"
                    v-model="name"
                  ></base-input>
                </div>
                <div class="col-md-4">
                  <base-input
                    placeholder="number of seats"
                    addon-left-icon="fa fa-users"
                    v-model="numSeats"
                  >
                  </base-input>
                </div>
                <div class="col-md-4">
                  <base-input
                    placeholder="price"
                    addon-left-icon="fa fa-money"
                    v-model="price"
                  ></base-input>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Thumnail</label>
                    <input
                      class="form-control"
                      accept="image/*"
                      @change="handleFileChange"
                      type="file"
                      id="formFile"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Images</label>
                    <input
                      multiple
                      class="form-control"
                      accept="image/*"
                      @change="handleImagesChange"
                      type="file"
                      id="formFile"
                    />
                  </div>
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
                <input
                  type="submit"
                  @click="createRoom()"
                  name=""
                  id=""
                  class="btn btn-primary"
                />
              </div>
            </div>
          </form>
        </div>

        <div v-if="roomType == 'room'" class="col">
          <h3 class="text-muted">Add New Space</h3>
          <!-- <form  @submit.prevent="createRoom()" > -->
          <div>
            <div class="row">
              <div class="col-md-4">
                <base-input
                  placeholder="name"
                  addon-left-icon="fa fa-font"
                  v-model="name"
                ></base-input>
              </div>
              <div class="col-md-4">
                <base-input
                  placeholder="number of seats"
                  addon-left-icon="fa fa-users"
                  v-model="numSeats"
                  
                >
                </base-input>
                
              </div>
                <div class="col-md-4">
                <base-input
                  placeholder="price"
                  addon-left-icon="fa fa-money"
                  v-model="price"
                ></base-input>
              </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Thumnail</label>
                    <input
                      class="form-control"
                      accept="image/*"
                      @change="handleFileChange"
                      type="file"
                      id="formFile"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Images</label>
                    <input
                    multiple
                      class="form-control"
                      accept="image/*"
                      @change="handleImagesChange"
                      type="file"
                      id="formFile"
                    />
                  </div>
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
          </div>
          <!-- </form> -->
          <div class="row d-flex justify-content-center mt-3">
            <button
              type="button"
              @click="createRoom()"
              name=""
              id=""
              class="btn btn-primary"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hero from "../components/Hero.vue";
import axios from "../../axios.config";
import Modal from "@/components/Modal.vue";

export default {
  data() {
    return {
      name: null,
      price: null,
      description: null,
      roomType: null,
      numSeats: null,
      selectedThumnail: null,
      images: null,
    };
  },
  components: {
    hero,
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.selectedThumnail = file;
      // Do something with the file, such as upload it to a server
    },
    handleImagesChange(event) {
      const file = event.target.files;
      this.images = file;
      // Do something with the file, such as upload it to a server
    },
    createRoom() {
      Swal.fire({
        title: "The room information you want to add is as follows",
        text: `name: ${this.name}, Number of seats: ${this.numSeats}, price: ${this.price}`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            name: this.name,
            description: this.description,
            price: this.price,
            num_seats: this.numSeats,
            room_type: this.roomType,
            availability: 1,
            thumbnail: this.selectedThumnail,
            images: this.images,
          };
          axios
            .post("/room", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              Swal.fire("added successfully!", "", "success");
            })
            .catch((error) => {
              console.log(error.response);
              Swal.fire("faild!", "", "error");
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>