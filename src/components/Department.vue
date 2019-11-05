<template>
    <div>
        <div id="department">
            <h1>Departments</h1>
            <p v-if="departments.length < 1" class="empty-table">
                No Departmwnt Found
            </p>
            <table v-else class="table table-hover">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="department in departments" :key="department.department_id">
                        <td>{{ department.department_id }}</td>
                        <td>{{ department.department }}</td>
                    </tr>

                </tbody>
            </table>
                    <p v-if="error" class="text-danger">❗{{ error }}</p>
                    <p v-if="addDeprtError" class="text-danger">❗{{ addDeprtError }}</p>
                    <p v-if="successMessage" class="text-success">✅{{ successMessage }}</p>
            <h1>Create Department</h1>
            <form @submit.prevent="handleSubmit" class="form-group">
                <div class="form-group">
                <label>Department Name</label>
                <input type="text" v-model="department.name">
                </div>
                <button class="btn btn-primary">Create Department</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'department',
    props: {
        departments: Array,
        error: String,
        addDeprtError: String,
        successMessage: String
    },
    data() {
        return {
            submitting: false,
            success: false,
            department: {
                name: ''
            },
        }
    },
    mounted() {
        this.getAllDepartments()
    },
    /*computed: {
        invalidDepartmentName() {
            return this.department.name === ''
        }
    },*/
    methods: {
        editMode(user, element) {
            console.log(user)
            console.log(element)
            this.user = user
        },
        async getAllDepartments() {
            try {
                const response = await fetch('http://localhost:3000/department')
                const data = await response.json()
                console.log(data.error)
                if (data.error) this.error = data.error;
                else this.departments = data.data;
                console.log(this.departments)
            } catch (err) {
                console.log(err)
                this.error = err.toString()
            }
        },
        async handleSubmit() {
            /*this.submitting = true
            this.clearStatus()
            console.log(this.error)*/
            console.log('ins ide hander')

            /*if (this.invalidDepartmentName) {
                this.error = true
                return
            }*/
            const department = this.department
            // console.log(this.user)
            try {
                console.log(department);
                const response = await fetch('http://localhost:3000/department', {
                    method: 'POST',
                    body: JSON.stringify(department),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                console.log(response);
                const data = await response.json()
                console.log(data)
                if (data.error) {
                    console.log('insside error block')
                    this.addDeprtError = data.error
                } else {
                    this.successMessage = data.status
                    console.log(data.data)
                    this.departments = [...this.departments, data.data]
                    this.error = false
                    this.success = true
                    this.submitting = false
                    this.$router.push({ path: '/department' })
                }
            } catch (err) {
                console.log(err.json());
                this.error = err.toString()
            }
        },
    }
}
</script>
<style scoped>
button {
    margin: 0 0.5rem 0 0;
}
</style>


