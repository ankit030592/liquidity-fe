<template>
    <div>
        <div id="home">
            <h1>Users</h1>
            <p v-if="users.length < 1" class="empty-table">
                No Users Found
            </p>
            <table v-else class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>DEPARTMENT</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.f_name }} {{ user.m_name }} {{ user.l_name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.department }}</td>
                        <td>
                            <button class="btn btn-success" @click.prevent="editMode(user)">Edit</button>
                            <button class="btn btn-danger" @click.prevent="deleteMode(user.id)">Delete</button>
                        </td>
                    </tr>
                    <p>{{ error }}</p>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'user-table',
    props: {
        users: Array,
        error: String
    },
    /*data() {
        return {
            showEditFrom: false,
            user: {}
        }
    },*/
    mounted() {
        this.getAllUsers()
    },
    methods: {
        async getAllUsers() {
            try {
                const response = await fetch('https://liquidity-be.herokuapp.com/user')
                const data = await response.json()
                console.log(data.error)
                if (data.error) this.error = data.error;
                else this.users = data.data;
                console.log(this.users)
            } catch (err) {
                console.log(err)
                this.error = err.toString()
            }
        },
        editMode(user) {
            console.log(user)
            // console.log(this.$router())
            const user_path = '/user/' + user.id
            console.log(user_path)
            this.$router.push({ path: user_path })
            // this.$router.push({ path: 'login' })
        },
        async deleteMode(user_id) {
            if (confirm("Do you really want to delete?")) {
                try {
                    console.log(user_id);
                    const response = await fetch(`https://liquidity-be.herokuapp.com/user/` + user_id, {
                        method: 'DELETE',
                        headers: { "Content-type": "application/json; charset=UTF-8" }
                    })
                    console.log(response);
                    const data = await response.json()
                    console.log(data.error)
                    if (data.error) {
                        console.log('insside error block')
                        this.error = data.error
                    } else {
                        this.successMessage = data.message;
                        this.users = this.users.filter(
                            user => user.id !== user_id
                        )
                    }
                } catch (err) {
                    console.log(err.json());
                    this.error = err.toString()
                }
            }
        },
    }
}
</script>
<style scoped>
button {
    margin: 0 2rem 0 0;
}
</style>