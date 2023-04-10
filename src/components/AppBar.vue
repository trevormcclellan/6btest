<template>
  <div id='app-bar'>
    <v-app-bar app color="primary" dark>

      <v-toolbar-title>Todo App</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Use a v-if to only show this button when the user is logged in -->
      <v-btn v-if="loggedIn" icon v-on:click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list-item>
        <v-list-item-title>{{user.UserName}}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <!-- Add an :href attribute to this tag so that clicking this link will log a user out -->
        <v-list-item :href="`${apiOrigin}/api/v1/auth/logout`" link>
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { authenticated } from '@/util'
export default {
  name: 'AppBar',
  props: {
    // Pass in the user object to this component as a prop
    user: {
      Type: Object,
      Default: {
        Type: Object,
        UserName: ""
      }
    }
  },
  data: () => ({
    drawer: false,
    apiOrigin: process.env.VUE_APP_API_ORIGIN
  }),
  asyncComputed: {
    // Set loggedIn variable to the true if authenticated() returns true
    loggedIn: {
      get: async () => await authenticated(),
      default: false
    },
  }
}
</script>
