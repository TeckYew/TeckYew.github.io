<script setup>
defineProps({
  eventData: {
    type: Object,
    required: true
  }
})
// defineProps({
//     eventTitle: {
//     type: String,
//     required: true
//   },
//   eventType: {
//     type: String,
//     required: true
//   },
//   startDate: {
//     type: Date,
//     required: true
//   }
// })
// can put if-else statement and redirect them to another page when the the props are not filled
</script>

<template>
  <div>This is a card [currently not in use. Feel free to use this as a testing page]</div>
  <div>
    Event Title: {{ eventData.eventTitle }}
    <!-- <h1>{{ eventTitle }}</h1>
        <h2>{{ eventType }}, Event Date: {{ startDate }}</h2> -->
  </div>
</template>

<script>
// console.log(this.eventData)
</script>
