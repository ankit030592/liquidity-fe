<template>
    <div id="user-form">
        <form @submit.prevent="handleSubmit">
            <legend>Register</legend>
            <div class="form-group">
                <label>First Name</label>
                <input ref="first" type="text" :class="{ 'has-error': submitting && invalidFirstName }" v-model="user.f_name" @focus="clearStatus" @keypress="clearStatus" />
            </div>
            <div class="form-group">
            <label>Middle Name</label>
            <input v-model="user.m_name" type="text" />
            </div>
            <div class="form-group">
            <label>Last Name</label>
            <input type="text" :class="{ 'has-error': submitting && invalidLastName }" v-model="user.l_name" @focus="clearStatus" />
            </div>
            <div class="form-group">
            <label>Email</label>
            <input type="email" :class="{ 'has-error': submitting && invalidEmail }" v-model="user.email" @focus="clearStatus" />
            </div>
            <div class="form-group">
            <label>Phone</label>
            <input type="phone" :class="{ 'has-error': submitting && invalidPhone }" v-model="user.phone" @focus="clearStatus" />
            </div>
            <div class="form-group">
            <label>Department</label>
            <select :class="{ 'has-error': submitting && invalidDepartment }" v-model="user.department_id" @focus="clearStatus">
                <option disabled value="">Please select one</option>
                <option v-for="department in departments" :key="department.department_id" :value="department.department_id">{{ department.department }}</option>
            </select>
            </div>
            <label>Password</label>
            <input type="password" :class="{ 'has-error': submitting && invalidPass }" v-model="user.password" @focus="clearStatus" />
            <div class="form-group">
            </div>
            <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" :class="{ 'has-error': submitting && invalidRePass }" v-model="user._password" @focus="clearStatus" />
            </div>
            <p v-if="error && submitting" class="error-message">
                ❗Please fill out all required fields
            </p>
            <p v-if="addUserError">
                ❗{{ addUserError }}
            </p>
            <p v-if="successMessage">
                ✅ {{ successMessage }}
            </p>
            <button class="btn btn-primary">Add user</button>
        </form>
    </div>
</template>
<script>
    export default {
    name: 'user-form',
    props: {
        addUserError: String,
        successMessage: String,
        departments: Array
    },
    data() {
        return {
            submitting: false,
            success: false,
            user: {
                f_name: '',
                m_name: '',
                l_name: '',
                email: '',
                phone: '',
                department_id: '',
                password: '',
                _password: '',
            },
        }
    },mounted() {
        this.getAllDepartments()
    },
    computed: {
        invalidFirstName() {
            return this.user.f_name === ''
        },
        invalidLastName() {
            return this.user.f_name === ''
        },
        invalidEmail() {
            return this.user.email === ''
        },
        invalidPhone() {
            return this.user.phone === ''
        },
        invalidDepartment() {
            return this.user.department_id === ''
        },
        invalidPass() {
            return this.user.password === ''
        },
        invalidRePass() {
            return this.user._password === ''
        }
    },
    methods: {
        async handleSubmit() {
            this.submitting = true
            this.clearStatus()
            console.log(this.error)

            if (this.invalidFirstName || this.invalidLastName || this.invalidEmail || this.invalidPhone || this.invalidDepartment || this.invalidPass || this.invalidRePass) {
                this.error = true
                return
            }
            const user = this.user
            // console.log(this.user)
            try {
                console.log(user);
                const response = await fetch('http://localhost:3000/user', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                console.log(response);
                const data = await response.json()
                console.log(data)
                // console.log(data.headers.status);
                if (data.error|| data.code!=200) {
                    console.log('insside error block')
                    this.addUserError = data.error
                } else {
                    this.successMessage = data.status
                    console.log(data.data)
                    this.error = false
                    this.success = true
                    this.submitting = false
                    this.$router.push({ path: '/login' })
                }
            } catch (err) {
                console.log(err.json());
                this.error = err.toString()
            }
        },
        clearStatus() {
            this.success = false
            this.error = false
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
        }
    },
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
</style>