<template>
    <v-layout>
        <v-card
        class="mx-auto mt-5"
        width="300"
        :loading="ld">
            <v-card-title class="justify-center">
                Enroll for daily package
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
                    v-model="amount"
                    label="amount"
                    outlined
                    dense
                    prepend-icon="mdi-money"/>
                </v-form>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                color="primary"
                @click="enroll()"
                :loading="ld">
                  Enroll
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
export default {
    data:()=>({
        amount:null,
        error:null,
        on:false,
        ld:false
    }),
    async fetch() {
        this.$store.dispatch("tier/all");
    },
    methods :{
       async enroll() {
            try {
                this.ld = true;
                const a = await this.$store.dispatch("tier/enroll",{
                    amount:this.amount
                });
                this.ld = false;
                this.$fetch()
            } catch (e) {
                this.ld = false;
                this.on = true;
                this.error = e.data.errors
            }
        }
    }
}
</script>