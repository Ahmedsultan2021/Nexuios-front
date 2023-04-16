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
                <small>add new user with</small>
                <!-- {{nameError}}
                {{emailError}}
                {{passwordError}}
                {{confirmationPasswordError}}
                <hr>
                {{isFormInvalid}} -->
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
                <small>Or sign up with credentials</small>
              </div>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Name"
                  addon-left-icon="ni ni-hat-3"
                  v-model="name"
                >
                </base-input>
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                  v-model="email"
                >
                </base-input>


                <base-input
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                >
                </base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="confirmation Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="confirmationPassword"
                >
                </base-input>
                <div class="text-muted font-italic">
                  <small
                    >password strength:
                    <span class="text-success font-weight-700" ref="strength">{{
                      passwordStrength
                    }}</span>
                  </small>
                </div>
                <base-checkbox>
                  <span
                    >I agree with the
                    <a href="#">Privacy Policy</a>
                  </span>
                </base-checkbox>
                <div class="text-center">
                  <base-button type="primary" @click="addNewUser" class="my-4"
                    >Create account</base-button
                  >
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "./../axios.config";
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmationPassword: null,
      passwordStrength: "",
      nameError: "invalid data",
      emailError: "invalid data",
      passwordError: "invalid data",
      confirmationPasswordError: "invalid data",
    };
  },
  computed: {
    isFormInvalid() {
      return (
        this.nameError ||
        this.emailError ||
        this.passwordError ||
        this.confirmationPasswordError
      );
    },
  },
  mounted() {},
  methods: {
    handleSubmit() {
      // Submit form data to server
    },
    validateName() {
      if (!this.name) {
        this.nameError = "Name is required.";
      } else {
        this.nameError = "";
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = "Email is required.";
      } else if (!emailRegex.test(this.email)) {
        this.emailError = "Invalid email address.";
      } else {
        this.emailError = "";
      }
    },
    validatePassword() {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!this.password) {
        this.passwordError = "Password is required.";
      } else if (!passwordRegex.test(this.password)) {
        this.passwordError =
          "Password should contain at least 8 characters, one uppercase, one lowercase, and one number.";
      } else {
        this.passwordError = "";
      }
    },
    validateConfirmationPassword() {
      if (!this.confirmationPassword) {
        this.confirmationPasswordError = "Confirmation password is required.";
      } else if (this.confirmationPassword !== this.password) {
        this.confirmationPasswordError = "Passwords do not match.";
      } else {
        this.confirmationPasswordError = "";
      }
    },
    checkPasswordStrength() {
      const password = this.password;
      let strength = 0;

      if (password.length >= 8) {
        strength++;
      }

      if (/[a-z]/.test(password)) {
        strength++;
      }

      if (/[A-Z]/.test(password)) {
        strength++;
      }

      if (/[0-9]/.test(password)) {
        strength++;
      }

      if (/[@#$%^&+=]/.test(password)) {
        strength++;
      }
      const convert = [
        "week",
        "week",
        "meduim",
        "meduim",
        "strong",
        "very Strong",
      ];
      this.passwordStrength = convert[strength];
    },
    addNewUser() {
      if (!this.isFormInvalid) {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        axios
          .post("/register", data)
          .then((response) => {
            console.log(response);
            Swal.fire({
              title: "user add succesfully",
              confirmButtonText: " show All users ",
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.$router.push("/allusers");
              }
            });
          })
          .catch((error) => {
            console.log(error);
            const error2 = error.response.data.errors;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: Object.values(error2)[0],
              // footer: '<a href="">Why do I have this issue?</a>'
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            this.nameError +
            this.passwordError +
            this.emailError +
            this.confirmationPasswordError,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      }
    },
  },
  watch: {
    password: "checkPasswordStrength",
    name: "validateName",
    email: "validateEmail",
    password: "validatePassword",
    confirmationPassword: "validateConfirmationPassword",
  },
};
</script>
<style>
</style>
