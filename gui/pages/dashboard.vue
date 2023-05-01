<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
        elevation="4">
          <v-card-title>
            Referral link
          </v-card-title>
          <v-card-text>
            <copy
            :value="rlink"/>
          </v-card-text>
          <v-card-actions>
            <nuxt-link to="/promote" style="text-decoration:underline">How to promote your referral link?</nuxt-link>
            <!--Share your link on :  
            <a href="https://wa.me/254721731515">
              <v-icon>mdi-whatsapp</v-icon>
            </a>-->
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <card
        title="Total Money"
        :subtitle="tm"
        details="This is the cumulative money in your account."/>
      </v-col>
      <v-col cols="6">
        <card
        :hasLink="true"
        link="/wallet"
        title="Main Wallet"
        :subtitle="mw"
        details="This is the money in your wallet."/>
      </v-col>
      <v-col cols="6">
        <card
        :hasLink="true"
        link="/referrals"
        title="Referrals"
        :subtitle="r"
        details="This is the money you have earned by inviting people to open an account through your referral link."/>
      </v-col>
      <v-col cols="6">
        <card
        :hasLink="true"
        link="/videos"
        title="Youtube"
        :subtitle="y"
        details="This is money you have earned through watching youtube videos."/>
      </v-col>
      <v-col cols="6">
        <card
        :hasLink="true"
        link="/magicboxes"
        title="Magic boxes"
        :subtitle="s"
        details="This is money you have earned by betting on the magic boxes."/>
      </v-col>
      <v-col cols="6">
        <card
        :hasLink="true"
        link="/survey"
        title="Survey"
        :subtitle="tr"
        details="This is money you have earned by answering survey questions."/>
      </v-col>
      <v-col cols="12">
        <card
        :hasLink="true"
        link="/tier"
        title="Crypto Earn"
        :subtitle="i"
        details="This is money you have earned by investment options."/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import copy from '~/components/copy.vue'
export default {
  components: { copy },
  middleware:["auth","initiated"],
  head(){
    return {
      title:"Dashboard"
    }
  },
  data:()=>({
    rlink:null
  }),
  computed:{
    tm() {
      return `Kshs ${this.$store.getters["wallet/getAllTotals"]}`
    },
    mw() {
      return `Kshs ${this.$store.getters["wallet/getWalletTotal"]}`
    },
    r() {
      return `Kshs ${this.$store.getters["wallet/getOtherTotal"]("referrals")}`
    },
    y() {
      return `Kshs ${this.$store.getters["wallet/getOtherTotal"]("videos")}`
    },
    s() {
      return `Kshs ${this.$store.getters["wallet/getOtherTotal"]("boxes")}`
    },
    tr() {
      return `Kshs ${this.$store.getters["wallet/getOtherTotal"]("trivia")}`
    },
    i() {
      return (this.$store.getters["tier/has"]) ? "Earn 6.3% daily of your capital. This is an investment option and money will reflect on your account on a daily basis." : `Kshs ${this.$store.getters['tier/getPackages']['interest']}`
    }
  },
  mounted(){
    this.rlink=`https://cloud360.co.ke/register?ref=${this.$auth.user.id}`
  },
  async fetch() {
    await this.$store.dispatch("wallet/all");
    await this.$store.dispatch("tier/all")
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
