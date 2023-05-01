<template>
    <v-layout>
        <v-card
        class="mx-auto mt-5"
        :width="$vuetify.breakpoint.xs ? '300' : '400'"
        :loading="ld">
            <v-card-title class="justify-center">
                Register
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
                    v-model="email"
                    label="email"
                    outlined
                    dense
                    prepend-icon="mdi-email"/>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="6" xs="12">
                                <v-text-field
                                v-model="password"
                                :type="showPassword1 ? 'text' : 'password'"
                                label="password"
                                outlined
                                dense
                                prepend-icon="mdi-lock"
                                :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword1 = !showPassword1"/>
                            </v-col>
                            <v-col cols="12" md="6" xs="12">
                                <v-text-field
                                v-model="cpassword"
                                :type="showPassword2 ? 'text' : 'password'"
                                label="confirm password"
                                outlined
                                dense
                                prepend-icon="mdi-lock"
                                :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword2 = !showPassword2"/>
                            </v-col>
                        </v-row>
                    </v-container>
                    <VuePhoneNumberInput v-model="contact" dark default-country-code="KE" @update="obj=$event"/>
                    <v-divider/>
                    <v-container>
                        <v-checkbox v-model="checkbox">
                            <template v-slot:label>
                                <div>
                                    I agree to the
                                        <NuxtLink to="/terms">
                                            Terms and Condition
                                        </NuxtLink>
                                </div>
                            </template>
                        </v-checkbox>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                :disabled="!checkbox"
                color="primary"
                @click="submit()"
                :loading="ld">
                  Register
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
export default {
    head(){
    return {
      title:"Register"
    }
  },
    data:()=>({
        username:null,
        email:null,
        password:null,
        cpassword:null,
        contact:null,
        error:null,
        on:false,
        showPassword1:false,
        showPassword2:false,
        ld:false,
        checkbox:false,
        obj:{}
    }),
    mounted(){
        if("ref" in this.$route.query) {
            this.$cookies.set("uplineID",this.$route.query.ref,{
            path:"/",
            maxAge:60*60*24*14
         });
        } else {
          this.$cookies.set("uplineID",null,{
            path:"/",
            maxAge:60*60*24*14
         }); 
        } 
    },
    methods:{
       async submit(){
            try {
               if(this.obj.isValid) {
                this.ld = true;
               await this.$axios.$post('/api/users/register',{
                username:this.username,
                email:this.email,
                password:this.password,
                passwordConfirmation:this.cpassword,
                contact:this.obj.formattedNumber,
                uplineID:this.$cookies.get("uplineID")
              });
              this.ld = false;
              this.$gtag.event("registration",{
                "event_label":"registered"
            })
              this.$fb.track("CompleteRegistration",{
               em:this.email,
               ph:this.contact
              });
              this.$router.push("/login");
            } else {
               this.on = true
               this.error = [{msg:"Phone number invalid."}]
            }
           } catch ({response}) {
               this.ld = false;
               this.on = true
               this.error = response.data.errors
           }           
        }
    }
}
</script>