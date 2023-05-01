<template>
    <v-layout>
        <v-card
        class="mx-auto mt-5"
        width="300"
        :loading="ld">
            <v-card-title class="justify-center">
                Login
            </v-card-title>
            <v-alert
            v-model="on"
            border="left"
            dismissible
            elevation="2"
            type="error">
                <ul v-for="{msg} in error"
                :key="msg">
                    <li>{{msg}}</li>
                </ul>
            </v-alert>
            <v-card-text>
                <v-form>
                    <v-text-field
                    v-model="username"
                    label="username"
                    outlined
                    dense
                    prepend-icon="mdi-account-circle"/>
                    <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    label="password"
                    outlined
                    dense
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"/>
                </v-form>
                <nuxt-link to="/register">Don't have an account?</nuxt-link>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                color="primary"
                @click="login()"
                :loading="ld">
                  Login
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
export default {
    head(){
    return {
      title:"Login"
    }
  },
    data:()=>({
        username:null,
        password:null,
        error:null,
        on:false,
        showPassword:false,
        ld:false
    }),
    methods :{
        async login() {
            try {
                this.ld = true;
                await this.$auth.loginWith("local",{
                    data:{
                    username:this.username,
                    password:this.password
                    }
                });
            this.$gtag.event("login",{
                "event_label":"login"
            })
                this.ld = false
            } catch ({response}) {
                this.ld = false
                this.on=true;
                this.error = response.data.errors;
            }
            
        }
    }
}
</script>