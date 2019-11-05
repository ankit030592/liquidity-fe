<template>
    <div id="login">
        <form @submit.prevent="handleSubmit" class="form-group">
            <legend>Sign in</legend>
            <div class="form-group">
                <label>Email</label>
                <input type="email" :class="{ 'has-error': submitting && invalidEmail }" v-model="user.email" @focus="clearStatus" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" :class="{ 'has-error': submitting && invalidPass }" v-model="user.password" @focus="clearStatus" />
            </div>
            <p v-if="error && submitting" class="error-message">
                ❗Please fill out all required fields
            </p>
            <p v-if="loginError">
                ❗{{ loginError }}
            </p>
            <p v-if="successMessage">
                ✅ {{ successMessage }}
            </p>
            <button class="btn btn-primary">Login</button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'user-form',
    props: {
        loginError: String,
        successMessage: String
    },
    data() {
        return {
            submitting: false,
            success: false,
            user: {
                phone: '',
                password: '',
            },
        }
    },
    computed: {
        invalidEmail() {
            return this.user.email === ''
        },
        invalidPass() {
            return this.user.password === ''
        }
    },
    methods: {
        async handleSubmit() {
            this.submitting = true
            this.clearStatus()
            console.log(this.error)

            if (this.invalidEmail || this.invalidPass) {
                this.error = true
                return
            }
            const user = this.user
            // console.log(this.user)
            try {
                console.log(user);
                const response = await fetch('https://liquidity-be.herokuapp.com/auth', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                console.log(response);
                const data = await response.json()
                console.log(data)
                if (data.error) {
                    console.log('insside error block')
                    this.loginError = data.error
                } else {
                    this.successMessage = data.status
                    console.log(data.data)
                    this.error = false
                    this.success = true
                    this.submitting = false
                    this.$router.push({ path: '/' })
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