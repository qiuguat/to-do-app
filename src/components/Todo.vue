<template>
  <div class="container">
    <h2 class="text-center mt-5">To-Do Vue App</h2>
    

    <div class="row">

      <!--Text and button-->
      <div class="d-flex ps-0 pe-0">
        <input type="text" class="form-control" placeholder="Enter Task Name" v-model="inputtask">
        <button class="btn btn-primary ml-auto" @click="submitTask">Submit</button>
      </div>

      <!--Task Table-->
      <table class="table table-bordered mt-4">
        <thead class="bg-info">
          <tr>
            <th scope="col">Task Name</th>
            <th scope="col" class="text-center w-25">Status</th>
            <th scope="col" class="text-center"></th>
            <th scope="col" class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="index">
            <td> {{ task.taskname }} </td>
            <td :class="
                ['text-center',
                {
                  'bg-success': task.status === 'Completed', 
                  'bg-warning': task.status === 'In Progress', 
                  'bg-info': task.status === 'To Do'
                }
                ]"
                title="Click on it to change Status">
                <span class="statuspointer" 
                  @click="changeStatus(index)"> {{ task.status }} 
                </span>
            </td>
            <td class="text-center">
              <div @click="editTask(index)" class="edit-icon">
                <font-awesome-icon icon="edit" size="lg"/>
              </div>
            </td>
            <td class="text-center">
              <div @click="removeTask(index)" class="remove-icon">
                <font-awesome-icon icon="trash" size="lg"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    
  },

  data(){
    return{
      inputtask:'',
      editedtask:null,
      tasks:
      [
        {
          taskname: 'Cut Banana',
          status: 'To Do'
        },
        {
          taskname: 'Wash Clothes',
          status: 'Completed'
        },
        {
          taskname: 'Groceries',
          status: 'To Do'
        },
        {
          taskname: 'Gym',
          status: 'In Progress'
        }
      ],
      availablestatus: ['To Do','In Progress','Completed','On Hold']
    }
  },

  methods:{
    submitTask(){ 
      
      if(this.inputtask.length === 0) return;

      if(this.editedtask == null)
      {
        this.tasks.push(
        {
          taskname: this.inputtask,
          status: 'To Do'
        })
      }
      else{
        this.tasks[this.editedtask].taskname = this.inputtask;
        this.editedtask = null;
      }
      this.inputtask = '';
    },

    editTask(value){
      this.inputtask = this.tasks[value].taskname;
      this.editedtask = value;
    },

    removeTask(value){
      this.tasks = this.tasks.filter((task, index) => index !== value);
    },

    changeStatus(value){
      const statusMap = {
        'To Do': 'In Progress',
        'In Progress': 'Completed',
        'Completed': 'To Do'
    };

    this.tasks[value].status = statusMap[this.tasks[value].status];
    }
  }
}
</script>

<style scoped>
.statuspointer{
  cursor: pointer;
}

.edit-icon {
  color: blue;
}

.remove-icon {
  color: red;
}
</style>