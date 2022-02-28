<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <ObServe></ObServe>
  </div>
</template>

<script>
import Card from "./Card";
import Sale from "./Sale";
import ObServe from "./ObServe";

export default {
  name: "Dashboard",
  components: {
    Card,
    Sale,
    ObServe,
  },
};
</script>

<style scoped></style>
