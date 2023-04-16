<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/github.svg" />
                  Github
                </base-button>

                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/google.svg" />
                  Google
                </base-button>
              </div>
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <div v-if="mismatch" class="text-center mb-4">
                <div class="alert alert-primary" role="alert">
                    <strong>wrong email or password</strong> {{mismatch}}
                </div>
                
              </div>
              <form role="form" @submit.prevent="login">
                <base-input
                  alternative
                  class="mb-3"
                  v-model="email"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                >
                </base-input>
                <small class="text-danger" v-if="emailVallidate" > {{emailVallidate}} </small>
                <base-input
                  alternative
                  type="password"
                  v-model="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                >
                </base-input>
                <small class="text-danger" v-if="passwordVallidate" > {{passwordVallidate}} </small>
                <base-checkbox> Remember me </base-checkbox>
                <div class="text-center">
                  <base-button @click="login" type="primary" class="my-4"
                    >Sign In</base-button
                  >
                  <button type="submit" style="display: none"></button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="#" class="text-light">
                <small>Create new account</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "../axios.config";


export default {
  data() {
    return {
      email: "",
      password: "",
      emailVallidate: '',
      passwordVallidate: '',
      mismatch: ''
    };
  },
  methods: {
    validemail(){
        if (this.email.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)>=0) {
            this.emailVallidate = '';
            return true;
        }
        else{
            this.emailVallidate = 'please enter valid email';
            return false;
        }
    },
    login() {
      if (this.email.length != 0 && this.password != 0) {
       this.passwordVallidate ='';
        let result = this.validemail();
        console.log(result);
        if (result) {
            axios
          .post("/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            // save the token in local storage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            this.$router.push("/dashboard");
          })
          .catch((error) => {
              console.log(error.response.data.message);
            this.mismatch = error.response.data.message;
          });
        }
      }
      else{
        if (this.email.length == 0 ) {
            this.emailVallidate ='email is requird';
        }
        else{
            this.emailVallidate ='';
        }
        if (this.password.length == 0 ) {
          this.passwordVallidate ='password is requird';
        }else{
            this.passwordVallidate ='';
        }
      }
    },
  },
};
</script>
<style>
</style>
