<template>
  <footer class="py-5 bg-dark">
    <div class="container px-4 px-lg-5">
      <p class="m-0 text-center text-white">Sponsored with love ♡:</p>
    </div>

    <!-- <div class="container-fluid">
    <div class="row gx-4 gx-lg-4 align-items-center my-5"> -->
    <div class="image-container">
      <img class="img-fluid rounded-circle" src="../assets/1.jpg" alt="./src/assets/1.jpg" />
      <img class="img-fluid rounded-circle" src="../assets/2.jpg" alt="./src/assets/2.jpg" />
      <img class="img-fluid rounded-circle" src="../assets/3.jpg" alt="./src/assets/3.jpg" />
      <img class="img-fluid rounded-circle" src="../assets/4.jpg" alt="./src/assets/4.jpg" />
      <img class="img-fluid rounded-circle" src="../assets/5.jpg" alt="./src/assets/5.jpg" />
      <!-- <img
          class="img-fluid rounded-circle"
          src="../assets/6.jpg"
          alt="./src/assets/6.jpg"
        /> -->
    </div>
  </footer>
</template>
<style>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.image-container img {
  margin-right: 30px;
  margin-left: 30px;
  margin-top: 40px;
  width: 80px;
  height: 80px;
}
/* @media (max-width: 768px) {
    .img-fluid {
      width: 50px;
      height: 50px;
    }

    .image-container {
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  } */
</style>
