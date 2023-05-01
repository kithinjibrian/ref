<template>
    <v-layout>
        <v-card
        class="mx-auto mt-5"
        width="300"
        :loading="ld">
            <v-card-title class="justify-center">
                Reset password
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
            <v-card-subtitle>
                Once you enter your username, an email will be sent to you with details on how to reset your password.
            </v-card-subtitle>
            <v-card-text>
                <v-form>
                    <v-text-field
                    v-model="username"
                    label="username"
                    outlined
                    dense
                    prepend-icon="mdi-account-circle"/>
                </v-form>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                color="primary"
                @click="reset()"
                :loading="ld">
                  Send
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
export default {
    head(){
    return {
      title:"Reset"
    }
  },
    data:()=>({
        username:null,
        error:null,
        on:false,
        ld:false
    }),
    methods :{
    }
}
</script>