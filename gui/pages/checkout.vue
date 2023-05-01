<template>
    <v-layout>
        <v-card
        class="mx-auto mt-5"
        width="300"
        :loading="ld">
            <v-card-title class="justify-center">
                Checkout
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
                Please note! This fee is used in activating your account. <span style="color:red">*</span>(A mpesa stk push will be sent to your phone.)
            </v-card-subtitle>
            <v-card-text>
                <v-form>
                    <v-text-field
                    v-model="contact"
                    label="Phone Number"
                    outlined
                    dense
                    prepend-icon="mdi-phone"/>
                    <v-text-field
                    v-model="amount"
                    label="Initiation Fee"
                    outlined
                    dense
                    prepend-icon="mdi-hand-coin"
                    readonly/>
                </v-form>
                <p><nuxt-link to="/about">Learn more on how to make money?</nuxt-link></p>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                color="primary"
                @click="checkout()"
                :loading="ld">
                  Pay with mpesa
                </v-btn>
            </v-card-actions>
            <p class="red--text ml-5"><span><v-icon>mdi-lock</v-icon></span>Secured by flutterwave</p>
        </v-card>
    </v-layout>
</template>

<script>
export default {
    middleware:["auth"],
    head(){
    return {
      title:"Checkout"
    }
  },
    data:()=>({
        error:null,
        on:false,
        contact:null,
        amount:1499,
        ld:false
    }),
    mounted(){
        this.contact=this.$auth.user.contact;
        if(this.$auth.user.initiated) {
            this.$router.push("/dashboard")
        }
    },
    methods :{
        async checkout() {
            try {
                this.ld = true;
                const b = await this.$store.dispatch("wallet/checkout",{
                    contact:this.contact,
                    amount:this.amount,
                    email:this.$auth.user.email
                });

                this.$gtag.event("InitiateCheckout",{
                "event_label":"checkout"
                 })

                this.$fb.track("InitiateCheckout",{
                em:this.$auth.user.email,
                ph:this.contact,
                external_id:this.$auth.user.id
                },{
                    eventID:b.id
                });

                this.$toast.success(`A stk push was sent to your phone number(${this.contact})`).goAway(3000);
                this.ld = false;
            } catch(r) {
               this.ld = false;
               this.on = true
               this.error = r.data.errors
            }
        }
    }
}
</script>