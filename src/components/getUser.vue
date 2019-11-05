<template>
    <div>
        <div id="edit-user-form">
            <form class="form-group" @submit.prevent="editUser">
                <legend>Update</legend>
                <div class="form-group">
                <label>First Name</label>
                <input type="text" v-model="user.f_name" />
                </div>
                <div class="form-group">
                <label>Middle Name</label>
                <input v-model="user.m_name" type="text" />
                </div>
                <div class="form-group">
                <label>Last Name</label>
                <input type="text" v-model="user.l_name" />
                </div>
                <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="user.email" readonly="true" />
                </div>
                <div class="form-group">
                <label>Phone</label>
                <input type="phone" v-model="user.phone" />
                </div>
                <div class="form-group">
                <label>Department</label>
                <select  v-model="user.department_id">
                    <option disabled value="user.department_id">{{ user.department }}</option>
                    <option v-for="department in departments" :key="department.department_id" :value="department.department_id">{{ department.department }}</option>
                </select>
                </div>                
                <button class="btn btn-success" @click.prevent="editUser(user)" v-on:click="showEditFrom = false">Edit user</button>
                <button class="btn btn-danger" @click.prevent="cancelEdit">Cancel</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        user: Object,
        error: String,
        departments: Array
    },
    mounted() {
        this.getUser(),
        this.getAllDepartments()
    },
    methods: {
        async getUser() {
            console.log(this.$route.params.id)
            const user_id = this.$route.params.id
            try {
                const response = await fetch('https://liquidity-be.herokuapp.com/user/' + user_id)
                const data = await response.json()
                console.log(data)
                console.log(data.error)
                if (data.error) this.error = data.error;
                else this.user = data.data;
                console.log(this.user)
            } catch (err) {
                console.log(err)
                this.error = err.toString()
            }
        },
        cancelEdit() {
            this.$router.push({ path: '/' })
        },
        async editUser(user) {
            console.log(user)
            if (user.f_name === '' || user.l_name === '' || user.phone === '' || user.department === '') return
            try {
                console.log(user.id);
                const response = await fetch(`https://liquidity-be.herokuapp.com/user/` + user.id, {
                    method: 'PUT',
                    body: JSON.stringify(user),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                console.log(response);
                const data = await response.json()
                console.log(data.error)
                if (data.error) {
                    console.log('insside error block')
                    this.error = data.error
                } else {
                    this.successMessage = data.message
                    console.log(data)
                    const updatedUser = data.data
                    console.log(updatedUser)
                    this.$router.push({ path: '/' })
                }
            } catch (err) {
                console.log(err.json());
                this.error = err.toString()
            }
        },
        async getAllDepartments() {
            try {
                const response = await fetch('https://liquidity-be.herokuapp.com/department')
                const data = await response.json()
                console.log(data.error)
                if (data.error) this.error = data.error;
                else this.departments = data.data;
                console.log(this.departments)
            } catch (err) {
                console.log(err)
                this.error = err.toString()
            }
        }

    }

}
</script>
<style scoped>
form {
    margin-bottom: 2rem;
}

[class*='-message'] {
    font-weight: 500;
}

.error-message {
    color: #d33c40;
}

.success-message {
    color: #32a95d;
}

button {
    margin: 0 0.5rem 0 0;
}
</style>