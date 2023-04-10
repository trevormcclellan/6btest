<template>
  <div class="home">
    <v-card class="mx-auto" max-width="900" v-if="fetched">

      <!-- Add NewTaskForm component -->
      <NewTaskForm @todo-added="createTask(form)" :form="form"></NewTaskForm>
      <v-divider></v-divider>
      <v-list subheader two-line flat>
        <v-subheader>
          {{user.UserName}}'s Tasks:
        </v-subheader>

        <!-- Add TaskList component -->
        <TaskList @task-updated="updateTask" @task-deleted="deleteTask" :tasks="tasks"></TaskList>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { getCurrentDate, formatDate } from '@/util'
// Import the NewTaskForm and TaskList components
import NewTaskForm from '@/components/NewTaskForm.vue'
import TaskList from '@/components/TaskList.vue'
export default {
  name: 'Home',
  components: {
    NewTaskForm,
    TaskList
  },
  props: {
    user: {
      Type: Object,
      Default: {
        Type: Object,
        UserName: ""
      }
    }
    // Add the user object as a prop that's passed in from the App.vue component
  },
  computed: {
  console: () => console,
  window: () => window,
  },
  data: () => ({
    fetched: false, // This keeps us from getting an error when the page loads, but there's no data
    tasks: [], // This will hold the list of tasks you get from your API
    form: {
      Text: "", // Set the default username to an empty string
      Date: getCurrentDate() // Set the default date to today's date
    },
  }),
  mounted() {
    // Calls readTasks when the page loads
    this.readTasks();
  },
  methods: {
    // Sends a POST request to the API to create a task with the data from the form
    createTask(form) {
      fetch(
        // The first parameter is a string that contains the full URL to your endpoint
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks`,
        // The second parameter is an object with options. You can include request
        // headers here, options for credentials, which method, which mode, etc.
        {
          method: `POST`,
          credentials: `include`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Text: this.form.Text, Date: this.form.Date })
        }
      ).then(response => {
        // Here we're just checking if the response was successful or not before
        // trying to do anything about it.
        if (response.ok) {
          // If it is successful, we want to update the task list.
          this.readTasks()
        }
      })
      this.form.Text = ""
      this.form.Date = getCurrentDate()
    },
    // Sends a GET request to the API and sets the tasks array to the JSON from the response
    readTasks() {
      fetch(
        // The first parameter is a string that contains the full URL to your endpoint
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks`,
        // The second parameter is an object with options. You can include request
        // headers here, options for credentials, which method, which mode, etc.
        {
          credentials: `include`,
        }
      ).then(async response => {
        // Here we're just checking if the response was successful or not before
        // trying to do anything about it.
        if (response.ok) {
          // If it is successful, set the tasks array to the JSON from the response
          this.tasks = await response.json()
          this.fetched = true;
        }
      })
    },
    // Flips the tasks Done value and sends a PUT request to the API with the new value
    updateTask(id, newVal) {
      console.log('Update: ', id, newVal)
       fetch(
        // The first parameter is a string that contains the full URL to your endpoint
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${id}`,
        // The second parameter is an object with options. You can include request
        // headers here, options for credentials, which method, which mode, etc.
        {
          method: `PUT`,
          credentials: `include`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Done: newVal })
        }
      ).then(response => {
        // Here we're just checking if the response was successful or not before
        // trying to do anything about it.
        if (response.ok) {
          // If it is successful, we want to update the task list.
          this.readTasks()
        }
      })
    },
    // Sends a DELETE request to the API with the task's id as a route parameter
    deleteTask(id) {
      fetch(
        // The first parameter is a string that contains the full URL to your endpoint
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${id}`,
        // The second parameter is an object with options. You can include request
        // headers here, options for credentials, which method, which mode, etc.
        {
          method: `DELETE`,
          credentials: `include`,
        }
      ).then(response => {
        // Here we're just checking if the response was successful or not before
        // trying to do anything about it.
        if (response.ok) {
          // If it is successful, we want to update the task list.
          this.readTasks()
        }
      })
    }
  }
}
</script>

<style scoped>
.form {
  padding: 0 1rem;
}
</style>
