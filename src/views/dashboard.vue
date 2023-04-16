<template>
  <div>
    <!-- <hero></hero> -->
    <div class="profile-page">
      <section class="section-profile-cover section-shaped my-0">
        <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
      <section class="section section-skew">
        <div class="container">
          


          <card shadow class="card-profile mt--300" no-body>
            <div class="px-4">
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="card-profile-image">
                    <a href="#">
                      <img
                        v-lazy="'img/theme/team-4-800x800.jpg'"
                        class="rounded-circle"
                      />
                    </a>
                  </div>
                </div>
                <div
                  class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
                >
                  <div class="card-profile-actions py-4 mt-lg-0">
                    <!-- <base-button type="info" size="sm" class="mr-4"
                      >Connect</base-button
                    > -->
                    <button type="default" @click="logout"  class="btn btn-dark"
                      >logout</button
                    >
                  </div>
                </div>
                <div class="col-lg-4 order-lg-1">
                  <div class="card-profile-stats d-flex justify-content-center">
                    <div>
                      <span class="heading">22</span>
                      <span class="description">Friends</span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Photos</span>
                    </div>
                    <div>
                      <span class="heading">89</span>
                      <span class="description">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center mt-5">
                <h3>
                  {{user.name}}
                  <span class="font-weight-light"> {{city}}</span>
                </h3>
                <div class="h6 font-weight-300">
                  <i class="ni location_pin mr-2"></i>
                </div>
                <div class="h6 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>role
                  - {{user.role}}
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>University of Computer
                  Science
                </div>
              </div>
              <div class="mt-5 py-5 border-top text-center">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <p>
                      An artist of considerable range, Ryan — the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                    <a href="#">Show more</a>
                  </div>
                </div>
              </div>
            </div>
          </card>
        </div>
      </section>
    </div>

    <div class="container">
      <div class="row">
         <div class="col-md-4">
          <Modal
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
                  <h5 class="text-muted">Edit reservation details</h5>
                  {{ reservationid }}
                </div>
           
              </template>
              <template>
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
                    v-if="type == 'sharedSpace'"
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
          </Modal>
        </div>
      </div>
    </div>

    
 
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12 mt-5 mt-lg-0">
          <tabs fill class="flex-column flex-md-row">
            <card shadow>
              <tab-pane title="All Rooms">
                <div class="d-flex justify-content-end">
                  <router-link class="btn btn-primary shadow" to="/addRoom">
                    Add Space
                  </router-link>
                </div>
                <div class="container container-lg mt-3">
                  <div class="text-center display-3 shadow p-3">
                    Show All Spaces
                  </div>
                  <div class="row d-flex justify-content-center">
                    <div
                      v-for="room in filteredRooms"
                      :key="room.id"
                      class="col-md-5 mb-5 mb-md-0 m-4"
                    >
                      <div
                        v-if="room.room_type == 'room'"
                        class="card card-lift--hover shadow border-0 p-2"
                      >
                        <router-link
                          :to="'/showRoom/' + room.id"
                          title="Landing Page"
                        >
                          <img v-lazy="room.thumbnail_url" class="card-img" />
                        </router-link>
                        <div>
                          <button
                            type="button"
                            @click="deleteRoom(room.id)"
                            class="btn btn-primary m-2 btn-sm"
                          >
                            delete
                          </button>
                          <router-link
                            type="button"
                            class="btn btn-primary m-2 btn-sm"
                            :to="'/editRoom/' + room.id"
                          >
                            edit
                          </router-link>
                        </div>
                      </div>
                    </div>
                    <div class="text-center display-3 shadow p-3 m-5">
                      Show All Shared Spaces
                    </div>
                    <div>
                      <div
                        class="row d-flex justify-content-center"
                        v-for="(room, index) in filteredSharedSpace"
                        :key="index"
                      >
                        <div
                          class="col-md-10 mb-5 mb-md-0 m-4"
                          v-if="room.room_type == 'sharedSpace'"
                        >
                          <div
                            class="card card-lift--hover shadow border-0 p-5"
                          >
                            <router-link
                              :to="'/showRoom/' + room.id"
                              title="Landing Page"
                            >
                              <img :src="room.thumbnail_url" class="card-img" />
                            </router-link>
                            <div>
                              <button
                                type="button"
                                @click="deleteRoom(room.id)"
                                class="btn btn-primary m-2 btn-sm"
                              >
                                delete
                              </button>
                              <button
                                type="button"
                                @click="editRoom()"
                                class="btn btn-primary m-2 btn-sm"
                              >
                                edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </tab-pane>

              <tab-pane title="reservations">            
                <div class="container">
                  <div class="row m-3" >
                    <div class="col">
                    <div class="input-group">
                    <!-- <input type="search" class="form-control rounded mx-5 px-2"  v-model="reservationId" placeholder="search for id" aria-label="Search" aria-describedby="search-addon" /> -->
                    <input type="search" class="form-control rounded"  v-model="q" placeholder="search by id or room name or date or hours" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" @click="search" class="btn btn-outline-primary">search</button>
                    </div>
                    </div>
                  </div>
                </div>
                <p class="description">
                  <table>
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">room name</th>
                          <th scope="col">DATE</th>
                          <th scope="col">START DATE</th>
                          <th scope="col">END DATE</th>
                          <th scope="col">LAST UPDATE AT</th>
                          <th scope="col">EDIT</th>
                          <th scope="col">DELETE</th>
                        </tr>
                      </thead>
                      <tbody>
                    
                        <tr  v-for="(reservation,index) in reservations" :key="index"  :class="{'bg': reservation.type === 'room'}"  >                          
                          <td  scope="row" data-label="ID">{{ reservation.id }}</td>
                          <td  data-label="room name">{{ reservation.room_name }}</td>
                          <td data-label="DATE">{{ reservation.date }}</td>
                          <td data-label="START DATE">{{ reservation.start_time }}</td>
                          <td data-label="End DATE">{{ reservation.end_time }}</td>
                          <td data-label="LAST UPDATE AT">{{ reservation.updated_at.substr(0, 16) }}</td>
                           <td data-label="edit">
                    <button
                      @click="showform(reservation.id,reservation.type,reservation.room_id,reservation.date,reservation.start_time,reservation.end_time,reservation.num_seats)"
                      type="button"
                      class="btn btn-warning btn-sm"
                    >
                      edit
                    </button>
                  </td>
                  <td data-label="delete">
                    <button
                      @click="deleteReservation(reservation.id)"
                      type="button"
                      class="btn btn-danger btn-sm"
                    >
                      delete
                    </button>
                  </td>
                        </tr>
                      </tbody>
                    </table>
                </p>
              </tab-pane>

              <tab-pane title="Users">
                
                    <!-- <div class="container shadow p-5 m-5" > -->
                      <div class="d-flex justify-content-end" > 
                        <div class="d-grid m-1 gap-2">
                        <router-link to="/register" type="button"  name="" id="" class="btn btn-primary">ADD New user</router-link>
                      </div> </div>
                        <h3 class="display-4 text-white bg-primary rounded p-3" >All users</h3>
                        <div class="row">
                          <div class="col">
                            <table>
                              <thead>
                                <tr>
                                  <th scope="col">id</th>
                                  <th scope="col">name</th>
                                  <th scope="col" >email</th>
                                  <th scope="col">role</th>
                                  <!-- <th scope="col">email_verified_at</th> -->
                                  <!-- <th scope="col" colspan="2">updated_at</th> -->
                                  <th scope="col" >delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(user,index) in users" :key="index" >
                                  <td scope="row" data-label="id">{{user.id}}</td>
                                  <td data-label="name">{{user.name}}</td>
                                  <td data-label="email">{{user.email}}</td>
                                  <td data-label="role">{{user.role}}</td>
                                  <!-- <td data-label="Period">{{user.updated_at}}</td> -->
                                  <!-- <td data-label="Period"></td> -->
                                  <td data-label="delete">
                                    <div class="d-grid gap-2">
                                      <button type="button" name="" @click="deleteuser(user.id)" id="" class="btn btn-danger">delete</button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                    <!-- </div> -->
              </tab-pane>
            </card>
          </tabs>
        </div>
        
      </div> 
    </div>    
  </div>
</template>
<script>
import Hero from "./components/Hero";
import BasicElements from "./components/BasicElements";
import Inputs from "./components/Inputs";
import CustomControls from "./components/CustomControls";
import Navigation from "./components/Navigation";
import JavascriptComponents from "./components/JavascriptComponents";
import Carousel from "./components/Carousel";
import Icons from "./components/Icons";
import Examples from "./components/Examples";
import DownloadSection from "./components/DownloadSection";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import axios from "../axios.config";
import Modal from "@/components/Modal.vue";

export default {
  name: "components",
  components: {
    Hero,
    BasicElements,
    Inputs,
    CustomControls,
    Navigation,
    JavascriptComponents,
    Carousel,
    Icons,
    Examples,
    DownloadSection,
    Tabs,
    TabPane,
    Modal,
  },
  data() {
    return {
      rooms: [],
      reservations: [],
      city: null,
      users:[],
      q: null,
      reservationId: "",
      dateToSearch: "",
      searchResults: [],
      modals: {
        modal1: false,
        modal2: false,
        modal3: false,
      },
      reservationid: null,
      startTime: null,
      endTime: null,
      date: null,
      room: null,
      type: null,
      room_id: null,
    };
  },
  computed: {
    filteredRooms() {
      return this.rooms.filter((room) => room.room_type === "room");
    },
    filteredSharedSpace() {
      return this.rooms.filter((room) => room.room_type === "sharedSpace");
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
    filterReservation() {
      if (this.reservationId) {
        return this.reservations.filter((r) =>
          r.id.toString().includes(this.reservationId)
        );
      } else {
        return this.reservations;
      }
    },
  },
  mounted() {
    this.getallRooms();
    this.getallReservaions();
        this.getAllUsers();

  },
  methods: {
       getAllUsers() {
      axios
        .get("/users")
        .then((response) => {
          this.users = response.data.data;
          console.log(this.users);
        })
        .catch((error) => {
          console.log(response);
        });
    },
    deleteuser(userId){
              axios
              .delete(`/deleteUser/${userId}`)
              .then((response) => {
                console.log(response.data);
                Swal.fire('user deleted successfully')

              
                this.users = this.users.filter(
                  (user) => user.id !== userId
                );
              })
              .catch((error) => {
                Swal.fire('error')

                console.log(error);
              });
    },
 
  
    showform(id, type, room_id, date, st, en, num) {
      this.modals.modal3 = true;
      this.reservationid = id;
      this.type = type;
      this.room_id = room_id;
      this.date = date;
      this.startTime = st;
      this.endTime = en;
      this.numSeats = num;
      console.log(id);
    },
    editReservation() {
      let reservationid = this.reservationid;
      console.log(reservationid);
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
            id: reservationid,
            type: this.type,
            room_id: this.room_id,
          };
          axios
            .patch(`/reservations/${reservationid}`, reservation)
            .then((response) => {
              console.log(response.data);
              Swal.fire("Saved!", "", "success");
            })
            .catch((error) => {
              const err = error.response.data.errors;
              const err2 =  Object.values(err)[0]
              console.log(error);
              Swal.fire({
                title: "Error!",
                text: err2,
                icon: "error",
                confirmButtonText: "ok",
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },

    getallRooms() {
      axios
        .get("/room")
        .then((response) => {
          this.rooms = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  search() {
  const q = this.q;
  axios
    .get("/reservations2/search", { params: { q } })
    .then((response) => {
      console.log(response)
     const result = response.data[0].result;
     console.log(result)
      this.reservations = result; // Replace current contents with new results
    })
    .catch((error) => {
      console.error(error);
    });
  },
    getallReservaions() {
      axios
        .get("/reservations2/last")
        .then((response) => {
          this.reservations = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteRoom(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete("/room/" + id)
            .then((response) => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.rooms = this.rooms.filter((room) => room.id !== id);
            })
            .catch((error) => {
              console.error(error);
              Swal.fire("faild!", error.response.data.message, "error");
            });
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
      logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.$router.push("/login");
      }
   
  },

};
</script>
<style scoped>
.bg {
  background-color: rgb(255, 189, 189);
}
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  font-weight: 700;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
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

@media screen and (max-width: 780px) {
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