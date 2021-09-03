<template>
  <v-app>
    <v-snackbar
        v-model="$store.state.snackbar.show"
        top
        :color="$store.state.snackbar.color"
        :timeout="$store.state.snackbar.timeout"
    >
      <span class="d-flex justify-center align-center">{{
        $store.state.snackbar.text
      }}</span>
    </v-snackbar>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
