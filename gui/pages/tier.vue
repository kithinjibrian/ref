<template>
    <div>
        <enroll v-if="has"/>
        <div v-else>
            <dash
                MainTitle="Crypto Earn"
                :balance="$store.getters['tier/getPackages']['interest']"
                @actions1="deposit($event)"
                @actions2="withdraw($event)"/>
            <p class="pa-2">You initial investment is KES {{$store.getters['tier/getPackages']['amount']}}. Consider adding your seed capital to earn even more by clicking on deposit button above.</p>
        </div>
    </div>
</template>

<script>
export default {
    middleware:["auth","initiated"],
    head(){
    return {
      title:"Crypto invest"
    }
  },
    computed:{
        has() {
            return this.$store.getters["tier/has"]
        }
    },
    async fetch() {
        this.$store.dispatch("tier/all");
    },
    methods:{
        async deposit (e) {
            try {
                await this.$store.dispatch("tier/deposit",{
                    amount:e,
                    id:this.$store.getters["tier/getPackages"]["id"]
                })
                this.$fetch()
            } catch (e) {
                const self = this;
                e.data.errors.map(i=>self.$toast.error(i.msg).goAway(3000))
            }
        },
        async withdraw (e) {
            try {
                await this.$store.dispatch("tier/withdraw",{
                    amount:e,
                    id:this.$store.getters["tier/getPackages"]["id"]
                })
                this.$fetch()
            } catch (e) {
                const self = this;
                e.data.errors.map(i=>self.$toast.error(i.msg).goAway(3000))
            }
        }
    }
}
</script>