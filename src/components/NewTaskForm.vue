<template>
  <div id="new-task-form">

    <!-- Call the onSubmit function when the form is submitted and prevent the page from reloading -->
    <v-form @submit.prevent="onSubmit()">
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="6">

            <!-- Bind this input to the Text property value of the form prop -->
            <v-text-field label="Add a task..." prepend-icon="edit" required v-model="form.Text"></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="4">
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">

                <!-- Bind this input to the Date property value of the form prop -->
                <v-text-field label="When should the task be done?" prepend-icon="event" v-on="on" v-model="form.Date"></v-text-field>
              </template>
              <!-- Also bind this input to the Date property value of the form prop -->
              <v-date-picker @input="menu = false" v-model="form.Date"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" xs="4" offset-xs="4" sm="2">
            <v-btn class="mt-3" type="submit" text color="success" block>
              <v-icon left>mdi-plus</v-icon>
              Add Task
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { getCurrentDate, formatDate } from '@/util'
export default {
  name: 'NewTaskForm',
  props: {
    // Use the form prop from Home.vue
    form: {
      type: Object,
      Default: {
        type: Object,
        Text: "",
        Date: getCurrentDate()
      }
    },
  },
  methods: {
    onSubmit() {
      this.$emit('todo-added')
    }
  },
  data: () => ({
    menu: false,
  }),
}
</script>

<style scoped>
form {
  padding: 0 1rem;
}
</style>
