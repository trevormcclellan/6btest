<template>
  <div id='task-list'>
    <v-list-item-group>

      <!-- Iterate through each item in the tasks array -->
      <v-list-item v-for="task in tasks" :key="task._id">
        <template>
          <v-list-item-action>

            <!-- Add a click event handler attribute that updates an task -->
            <v-btn icon @click="update(task._id, task.Done)">

              <!-- Add a v-if and v-else check based on the current task's Done property -->
              <v-icon v-if="task.Done">check_box</v-icon>
              <v-icon v-else>check_box_outline_blank</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>

              <!-- Show the value of the task's Text property -->
              {{task.Text}}
            </v-list-item-title>
            <v-list-item-subtitle>

              <!-- Show the value of the task's Date property -->
              {{task.Date}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>

            <!-- Add a click event handler attribute that deletes this task -->
            <v-btn icon @click="deleteTask(task._id)">
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    // Use the tasks array from Home.vue
    tasks: {
      default: () => []
    }
  },
  methods: {
    update(id, currVal) {
      const newVal = !currVal
      this.$emit('task-updated', id, newVal)
    },
    deleteTask(id) {
      this.$emit('task-deleted', id)
    }
  }
}
</script>
