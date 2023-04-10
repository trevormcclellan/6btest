<template>
  <v-app>
    <!-- Link to Material Icons-->
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      rel="stylesheet"
      type="text/css"
    />

    <!-- Add an AppBar component -->
    <!-- Pass in the user object as a prop. -->
    <AppBar v-bind:user="user"></AppBar>

    <v-content>
      <router-view :user="user"></router-view>
    </v-content>
  </v-app>
</template>

<script>
// Import the app bar component
import AppBar from '@/components/AppBar.vue'
export default {
  name: 'App',
  components: {
    AppBar
  },
  asyncComputed: {
    user: {
      async get() {
        // Use fetch() to get the user from API
        const resp = await fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/user`,
        {
          credentials: `include`,
        })
        if (resp.ok) return resp.json();
        else return { UserName: '' }
      },
      default: {
        UserName: ''
      }
    }
  }
}
</script>
