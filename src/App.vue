<template>
    <div id="app" class="small-container">
        <nav class="navbar navbar-default" role="navigation">
            <div class="container-fluid">                
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><router-link to='/'>Home</router-link></li>
                        <li><router-link to='/register'>Register</router-link></li>
                        <li><router-link to='/login'>Login</router-link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><router-link to='/department'>Department</router-link></li>
                    </ul>
                </div>
            </div>
        </nav>
        <router-view />
    </div>
</template>
<script>
export default {}
</script>
<style>
button {
    background: #009435;
    border: 1px solid #009435;
}

.small-container {
    max-width: 1000px;
}
</style>