<template>
	<div class="container">
		<h2 class="text-center mt-5">To-Do Vue App</h2>

		<div class="row table-responsive">

			<!--Text and button-->
			<div class="d-flex ps-0 pe-0">
				<input type="text" class="form-control" placeholder="Enter Task Name" v-model="inputTask"
					@input="haveTaskName = false">
				<button class="btn btn-primary ml-auto" aria-label="Submit" @click="submitTask">Submit</button>
			</div>

			<!--Error Msg-->
			<div>
				<span v-show="haveTaskName" class="text-danger">Task Name is required</span>
			</div>

			<!--No Result Table-->
			<table class="table table-bordered mt-4" v-if="tasks.length === 0">
				<tbody>
					<tr>
						<td colspan="4" class="text-center">No Results</td>
					</tr>
				</tbody>
			</table>

			<!--Task Table-->
			<table class="table table-bordered mt-4 table-hover" v-else-if="tasks.length >= 1">
				<thead class="table-light">
					<tr>
						<th scope="col" @click="sortTasks('taskname')" class="w-50 pointer">Task Name
							<span v-if="sortColumn === 'taskname'">
								<font-awesome-icon :icon="sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'" size="lg" />
							</span>
						</th>
						<th scope="col" @click="sortTasks('status')" class="text-center w-25 pointer">Status

							<span v-if="sortColumn === 'status'">
								<font-awesome-icon :icon="sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'" size="lg" />
							</span>
						</th>
						<th scope="col" class="text-center"></th>
						<th scope="col" class="text-center"></th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="(task, index) in tasks" :key="index">
						<td> {{ task.taskname }} </td>
						<td :class="['text-center',
					{
						'bg-success': task.status === 'Completed',
						'bg-warning': task.status === 'In Progress',
						'bg-info': task.status === 'To Do'
					}
				]" title="Click on it to change Status">
							<span class="pointer" @click="changeStatus(index)"> {{ task.status }}</span>
						</td>
						<td class="text-center">
							<div @click="editTask(index)" class="edit-icon" title="Edit" aria-label="Edit">
								<font-awesome-icon icon="edit" size="lg" />
							</div>
						</td>
						<td class="text-center">
							<div @click="removeTask(index)" class="remove-icon" title="Delete" aria-label="Delete">
								<font-awesome-icon icon="trash" size="lg" />
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

	data() {
		return {
			inputTask: '',
			editedTask: null,
			haveTaskName: false,
			tasks: [], //array need to empty here to ease hide or show the table results
			availableStatus: ['To Do', 'In Progress', 'Completed', 'On Hold'],
			sortColumn: null,
			sortOrder: 'asc'
		}
	},

	created() {

	},

	computed: {
	},

	methods: {
		submitTask() {

			if (this.inputTask.length === 0) {
				this.haveTaskName = true;
				return;
			}
			else {
				this.haveTaskName = false;
			}


			if (this.editedTask == null) {
				this.tasks.push(
					{
						taskname: this.inputTask,
						status: 'To Do'
					})
			}
			else {
				this.tasks[this.editedTask].taskname = this.inputTask;
				this.editedTask = null;
			}
			this.inputTask = '';
		},

		editTask(value) {
			this.inputTask = this.tasks[value].taskname;
			this.editedTask = value;
		},

		removeTask(value) {
			this.tasks = this.tasks.filter((task, index) => index !== value);
		},

		changeStatus(value) {
			//This object acts as a simple state machine for task statuses.
			const statusMap = {
				'To Do': 'In Progress',
				'In Progress': 'Completed',
				'Completed': 'To Do'
			};

			this.tasks[value].status = statusMap[this.tasks[value].status];
		},

		sortTasks(selectedColumn) {
			if (this.sortColumn === selectedColumn) {
				this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
			} else {
				this.sortColumn = selectedColumn;
				this.sortOrder = 'asc';
			}

			this.tasks.sort((a, b) => {
				if (a[selectedColumn] < b[selectedColumn]) return this.sortOrder === 'asc' ? -1 : 1;
				if (a[selectedColumn] > b[selectedColumn]) return this.sortOrder === 'asc' ? 1 : -1;
				return 0;
			});
		}
	}
}
</script>

<style scoped>
.pointer {
	cursor: pointer;
}

.edit-icon {
	color: blue;
}

.remove-icon {
	color: red;
}
</style>