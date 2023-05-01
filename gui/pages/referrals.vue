<template>
    <div>
        <dash
        MainTitle="Referrals"
        :balance="$store.getters['wallet/getOtherTotal']('referrals')"
        :deposit="false"
        @actions2="withdraw($event)"/>
        <v-card>
            <v-card-title>Your upline</v-card-title>
            <v-card-subtitle>This is your upline's data.</v-card-subtitle>
            <v-card-text>
                <v-data-table
                :headers="headers1"
                :items="items1"/>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-title>Your downlines</v-card-title>
            <v-card-subtitle>This is your downlines' data. Please note, you can't earn a commission for downlines whose initiated value is false.</v-card-subtitle>
            <v-card-text>
                <v-data-table
                :headers="headers2"
                :items="items2"/>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    middleware:["auth","initiated"],
    head(){
    return {
      title:"Referrals"
    }
  },
    data:()=>({
        headers1:[{
            text:"id",
            align:"start",
            value:"id"
        },{
            text:"username",
            value:"username"
        }],
        headers2:[{
            text:"id",
            align:"start",
            value:"id"
        },{
            text:"username",
            value:"username"
        },{
            text:"initiated",
            value:"initiated"
        }]
    }),
    computed:{
        items1() {
            return [this.$store.getters["users/getUpline"]]
        },
        items2() {
            return this.$store.getters["users/getDownlines"]
        }
    },
    async fetch() {
        await this.$store.dispatch("wallet/all")
        await this.$store.dispatch("users/lines")
    },
    methods:{
        async withdraw(e) {
            try {
                await this.$store.dispatch("wallet/withdrawOther",{
                    type:"referrals",
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