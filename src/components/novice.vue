<script setup>
defineProps({
  userPoints: Number
})
</script>

<template>
  <div class="background">
    <div class="slope"></div>
    <!-- Tree images temporarily disabled -->
    <!-- <img id="seed" v-if="userPoints < 250" src="../assets/trees/seed.png" /> -->
    <!-- <img id="sapling" v-if="userPoints >= 250" src="../assets/trees/sapling.png" /> -->
  </div>
</template>

<style scoped>
.background {
  width: 350px;
  height: 445px;
  position: relative;
  margin: auto;
  bottom: 100%;
  /* top: 100%; */
  /* left: -200px;
        right: -200px; */
}
.background .slope {
  position: relative;
  /* top:; */
  bottom: 20;
}
.slope {
  background: #cadc88;
  width: 100%;
  height: 100px;
  border-radius: 50% 50% 0px 0px / 100% 100% 0px 0px;
  overflow: hidden;
  z-index: -1;
  top: 80%;
}
.slope:before {
  content: '';
  background: #f2edb4;
  border-radius: 50%;
  width: 80px;
  height: 30px;
  position: relative;
  left: 45%;
  margin-left: -40px;
  top: -5px;
}
#seed {
  /* width: 5%; */
  width: 15%;
  bottom: 0%;
  top: 53%;
  left: 43%;
  position: relative;
}
#sapling {
  width: 45%;
  bottom: 0%;
  top: 37%;
  left: 28%;
  position: relative;
}
</style>
