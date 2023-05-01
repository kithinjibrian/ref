<template>
    <dash
    MainTitle="Main Wallet"
    :balance='$store.getters["wallet/getWalletTotal"]'
    desc1="This actions will deposit money into your main wallet."
    desc2="This action will withdraw money from your main wallet. Bonus tip! Consider investing your money on Crypto Earn and earn 6.3% daily rather than withdrawing."
    html2="<a href='/tier'>Visit here.</a>"
    @actions1="deposit($event)"
    @actions2="withdraw($event)"/>
</template>

<script>
export default {
    name:"wallet",
    middleware:["auth","initiated"],
    head(){
    return {
      title:"Wallet"
    }
  },
    async fetch() {
    await this.$store.dispatch("wallet/all");
  },
    methods:{
        async deposit (e) {
           try {
                await this.$store.dispatch("wallet/deposit",{
                    contact:this.$auth.user.contact,
                    amount:e,
                    email:this.$auth.user.email
                })
                this.$toast.success(`A stk push was sent to your phone number(${this.$auth.user.contact})`).goAway(3000);
            } catch(e) {
                const self = this;
                e.data.errors.map(i=>self.$toast.error(i.msg).goAway(3000))
            } 
        },
        async withdraw (e) {
           try {
                await this.$store.dispatch("wallet/withdraw",{
                    amount:e
                })
                this.$fetch()
            } catch(e) {
                const self = this;
                e.data.errors.map(i=>self.$toast.error(i.msg).goAway(3000))
            } 
        }
    }
}
</script>