<template>
  <div class="">
    <hero></hero>
    <div class="body">
      <div class="container mt-5">
        <div class="row mt-5 border p-5 shadow rounded">
          <div class="col">
            <h1 class="display-4 text-white bg-primary rounded p-3">
              room information
            </h1>
            <ul class="list-group">
              <li class="list-group-item">
                name: {{ room.name }} {{ room.room_type }}
              </li>
              <li class="list-group-item">id: {{ room.id }}</li>
              <li class="list-group-item">
                description {{ room.description }}
              </li>
              <li class="list-group-item">
                Number of total seats: {{ room.num_seats }}
              </li>
              <!-- <li class="list-group-item">
                Number of Availiable seats now: {{ remaining_seats }}
              </li> -->
            
              <li class="list-group-item">price: {{ room.price }}</li>
              <li class="list-group-item">created_at: {{ room.created_at }}</li>
              <li class="list-group-item">
                last update at: {{ room.updated_at }}
              </li>
            </ul>
          </div>
        </div>

        <div class="row mt-5 border p-5 shadow rounded">
          <div class="col">
            <h1 class="display-4 text-white bg-primary rounded p-3">
              Make A new reservation
            </h1>
            <form @submit.prevent="createReservation()">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="time"
                      class="form-control form-control-alternative"
                      id="exampleFormControlInput1"
                      placeholder="start time"
                      v-model="startTime"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="time"
                      placeholder="end time"
                      class="form-control form-control-alternative"
                      v-model="endTime"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="input-group input-group-alternative mb-4">
                      <input
                        class="form-control form-control-alternative"
                        placeholder="Search"
                        type="date"
                        v-model="date"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="input-group input-group-alternative mb-4">
                      <div v-if="room.room_type == 'sharedSpace'">
                        <input
                          class="form-control"
                          placeholder="Number of seats"
                          type="Number"
                          v-model="numSeats"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <input
                  name=""
                  id=""
                  class="btn btn-primary"
                  type="submit"
                  value="reserve"
                />
              </div>
            </form>
          </div>
        </div>
        <div class="row rounded shadow p-5 my-5">
          <div class="col m-2">
            <h1 class="display-4 text-white bg-primary rounded p-3">
              check all reservations
            </h1>
            <table>
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">date</th>
                  <th scope="col">start date</th>
                  <th scope="col">end date</th>
                  <th scope="col" v-if="room.room_type == 'sharedSpace'">
                    number of seats
                  </th>
                  <th scope="col" colspan="2">last update at</th>
                  <th scope="col">edit</th>
                  <th scope="col">delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(reservation, index) in reservations" :key="index">
                  <td data-label="id">{{ reservation.id }}</td>
                  <td data-label="date">{{ reservation.date }}</td>
                  <td data-label="start date">{{ reservation.start_time }}</td>
                  <td data-label="end date">{{ reservation.end_time }}</td>
                  <td
                    data-label="end date"
                    v-if="room.room_type == 'sharedSpace'"
                  >
                    {{ reservation.num_seats }}
                  </td>
                  <td data-label="last update at" colspan="2">
                    {{ reservation.updated_at }}
                  </td>
                  <td data-label="edit">
                    <button
                      @click="showform(reservation.id)"
                      type="button"
                      class="btn btn-warning"
                    >
                      edit
                    </button>
                  </td>
                  <td data-label="delete">
                    <button
                      @click="deleteReservation(reservation.id)"
                      type="button"
                      class="btn btn-danger"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-4">
          <modal
            :show.sync="modals.modal3"
            body-classes="p-0"
            modal-classes="modal-dialog-centered modal-sm"
          >
            <card
              type="secondary"
              shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0"
            >
              <template>
                <div class="text-muted text-center mb-3">
                  <h5 class="text-muted">Edit reservation details</h5> {{reservationid}}
                </div>
                <!-- <div class="btn-wrapper text-center">
                            <base-button type="neutral">
                                <img slot="icon" src="img/icons/common/github.svg">
                                Github
                            </base-button>

                            <base-button type="neutral">
                                <img slot="icon" src="img/icons/common/google.svg">
                                Google
                            </base-button>
                        </div> -->
              </template>
              <template>
                <!-- <div class="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div> -->
                <form role="form">
                  <base-input
                    alternative
                    class="mb-3"
                    type="time"
                    placeholder="from"
                    addon-left-icon="fa fa-clock-o"
                    v-model="startTime"
                  >
                  </base-input>
                  <base-input
                    alternative
                    type="time"
                    placeholder="to"
                    addon-left-icon="fa fa-clock-o"
                    v-model="endTime"
                  >
                  </base-input>
                  <base-input
                    alternative
                    type="date"
                    placeholder="date"
                    addon-left-icon="fa fa-calendar"
                    v-model="date"
                  >
                  </base-input>
                  <base-input
                    v-if="room.room_type == 'sharedSpace'"
                    alternative
                    type="number"
                    placeholder="number of seates"
                    addon-left-icon="fa fa-users"
                    v-model="numSeats"
                  >
                  </base-input>

                  <div class="text-center">
                    <base-button
                      type="primary"
                      @click="editReservation()"
                      class="my-4"
                      >update</base-button
                    >
                  </div>
                </form>
              </template>
            </card>
          </modal>
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
      registerationid: null,
      responseMessage: "",
      selectedRoom: null,
      room: null, // array of available rooms
      reservations: null,
      // newReservation:null,
      date: null,
      startTime: null,
      endTime: null,
      remaining_seats: null,
      reservationid: null,
      numSeats: 1,
      modals: {
        modal1: false,
        modal2: false,
        modal3: false,
      },
    };
  },
  components: {
    hero,
    Modal,
  },

  mounted() {
    this.fetchrooms();
  },
  methods: {
    fetchrooms() {
      const id = this.$route.params.id;
      axios
        .get("/room/" + id)
        .then((response) => {
          this.room = response.data.data;
          this.reservations = response.data.reservations;
          this.remaining_seats = response.data.remaining_seats;
          this.selectedRoom = this.room.id; // set default value to the first room
          // this.numSeats = this.room.num_seats;
        })
        .catch((error) => console.log(error));
    },
    createReservation() {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      const formattedToday = yyyy + "-" + mm + "-" + dd;
      const reservation = {
        room_id: this.selectedRoom,
        date: this.date,
        start_time: this.startTime,
        end_time: this.endTime,
        num_seats: this.numSeats,
        type: this.room.room_type,
      };
      axios
        .post("/reservations", reservation)
        .then((response) => {
          Swal.fire({
            title: "Done",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "close",
          });
          if (formattedToday == this.date) {
            this.remaining_seats -= this.numSeats;
          }
          console.log(response);
          this.responseMessage = response.data.message;
          // this.newReservation = response.data.data;
          const reservation2 = response.data.data;
          console.log(reservation2);

          this.reservations.push(reservation2);
        })
        .catch((error) => {
          console.log(error)
          const erro = error.response.data.message;
          Swal.fire({
            title: "Error!",
            text: erro,
            icon: "error",
            confirmButtonText: "ok",
          });
          console.log(firstError);
          this.responseMessage = error.response.data.errors;
        });
    },
    showform(id) {
      this.modals.modal3 = true;
      this.reservationid = id;
      console.log(id);
    },
    editReservation() {
      let reservationid = this.reservationid;
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const reservation = {
            date: this.date,
            start_time: this.startTime,
            end_time: this.endTime,
            num_seats: this.numSeats,
            type: this.room.room_type,
            room_id: this.room.id,
          };
          axios
            .patch(`/reservations/${reservationid}`, reservation)
            .then((response) => {
              console.log(response.data);
              Swal.fire("Saved!", "", "success");
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
                confirmButtonText: "ok",
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
    deleteReservation(reservationId) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`/reservations/${reservationId}`)
              .then((response) => {
                console.log(response.data);
                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
                this.reservations = this.reservations.filter(
                  (reservation) => reservation.id !== reservationId
                );
              })
              .catch((error) => {
                console.log(error);
                swalWithBootstrapButtons.fire("error!", "canceld.", "error");
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your imaginary file is safe :)",
              "error"
            );
          }
        });
    },
  },
};
</script>

<style scoped>
/* .body{
  background-image: url('../../../public/workspace.png');
  background-repeat: no-repeat;
  background-size: cover;
} */
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
  padding: 10px;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>