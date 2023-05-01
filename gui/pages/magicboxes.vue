<template>
    <v-control>
        <v-row>
            <v-col>
                <dash
                MainTitle="Magic Boxes"
                :balance="$store.getters['wallet/getOtherTotal']('boxes')"
                @actions1="deposit($event)"
                @actions2="withdraw($event)"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card v-if="!active"> 
                    <v-card-title class="justify-center">
                        <p><v-icon x-large>mdi-lock</v-icon>This module is only active on Fridays.</p>
                    </v-card-title>
                </v-card>
                <v-card
                :loading="ld"
                v-else>
                    <v-card-title>
                        Place a bet
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
                        Your bet will be multiplied by the number in the box you pick.
                    </v-card-subtitle>
                    <v-card-text>
                        <v-text-field
                        v-model="stake"
                        label="Stake"
                        outlined
                        dense/>
                    </v-card-text>
                    <v-card-actions>
                        You have selected box number : {{box+1}}
                        <v-spacer/>
                        <v-btn
                        @click="bet()"
                        color="success"
                        :loading="ld">Bet</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col
            v-for="(n,i) of boxes"
            :key="i"
            cols="4">
                <v-card
                v-if="active"
                height="100"
                @click="box=i">
                    <v-card-title class="justify-center font-weight-light">
                        <div v-if="values.length !== 0">{{values[i]}}</div>
                        <v-icon v-else x-large color="yellow">mdi-gift</v-icon>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-control>
</template>

<script>

export default {
  middleware:["auth","initiated"],
  head(){
    return {
      title:"Magic Boxes"
    }
  },
    data:()=>({
        stake:null,
        dialog:false,
        box:null,
        values:[],
        ld:false,
        on:false,
        error:null,
        active:false
    }),
    computed:{
        boxes() {
            return this.$store.getters["boxes/getBoxes"]
        }
    },
    async fetch() {
        await this.$store.dispatch("wallet/all")
        try {
            await this.$store.dispatch("boxes/get");
            this.active = true;
        } catch (e) {
            this.active = false;
        }
        
    },
    methods:{
        async bet(){
            try {
                this.ld = true;
                const a = await this.$store.dispatch("boxes/bet",{
                    id:this.boxes[this.box],
                    stake:this.stake
                });
                this.ld = false;
                this.values=a;
                const self = this;
                setTimeout(()=>self.values=[],3000)
                this.$fetch()
            } catch (e) {
                this.ld = false;
                this.on = true;
                this.error = e.data.errors
            }
        },
        async deposit(e) {
            try {
                await this.$store.dispatch("wallet/depositOther",{
                    type:"boxes",
                    amount:e
                });
                this.$fetch()
            } catch(e) {
                const self = this;
                e.data.errors.map(i=>self.$toast.error(i.msg).goAway(3000))
            }
        },
        async withdraw(e) {
            try {
                await this.$store.dispatch("wallet/withdrawOther",{
                    type:"boxes",
                    amount:e
                });
                this.$fetch()
            } catch(e) {
                const self = this;
                e.data.errors.map(i=>self.$toast.error(i.msg).goAway(3000))
            }
        }
    }
}
</script>