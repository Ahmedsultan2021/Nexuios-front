<template>
    <section class="section-hero section-shaped my-0">
        <div class="shape shape-style-1 shape-primary">
            <span class="span-150"></span>
            <span class="span-50"></span>
            <span class="span-50"></span>
            <span class="span-75"></span>
            <span class="span-100"></span>
            <span class="span-75"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
        </div>
        <div class="container shape-container d-flex align-items-center">
            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-7 text-center pt-lg">
                        <img src="img/brand/white.png" style="width: 200px;" class="img-fluid">
                        <p class="lead text-white mt-4 mb-5"> </p>
                        <div class="btn-wrapper">
                            <router-link to="/dashboard"
                                         class="mb-3 mb-sm-0 btn btn-primary text-white"
                                         icon="fa fa-code">
                                dashboard
                            </router-link>
                            <router-link 
                                         href="https://www.creative-tim.com/product/vue-argon-design-system"
                                         class="mb-3 mb-sm-0  btn btn-primary text-white"
                                         to="/register"
                                         >
                                register
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="row align-items-center justify-content-around stars-and-coded">
                    <div class="col-sm-4">
                      
                    </div>
                    <div class="col-sm-4 mt-4 mt-sm-0 text-right">
                      
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {};
</script>
<style>
</style>
