<template>
  <div>
    <hero></hero>
    <div class="container mt-5">
     <div class="container shadow p-5 m-5" >
      <div class="d-flex justify-content-end" > <div class="d-grid m-1 gap-2">
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
        users:[]
    };
  },
  components: {
    hero,
  },

 mounted() {
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
    }
 
  
  },
};
</script>
<style >
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
  margin: .5em 0 .75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  padding: .625em;
  text-align: center;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
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
    text-align: center;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    text-align: center;
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    text-align: center;
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
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