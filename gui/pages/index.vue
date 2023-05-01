<template>
  <v-layout>
    <v-container>
      <v-row>
          <flyer/>
      </v-row>
      <v-row>
        <v-col cols="12">
          <trust/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title primary-title class="justify-center">
            <p class="text-h5">Our methods of earning.</p>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="4" xs="12">
                  <card1
                  img="/referrals.png"
                  header="Referrals"
                  subheader="KES 750 for every person you bring in."
                  :hasbtn="true"
                  @click="$router.push('/referrals')">
                  <template #default>
                        Try!
                      </template>
                  </card1>
                </v-col>
                <v-col cols="12" md="4" xs="12">
                  <card1
                  img="/bitcoin.png"
                  header="Crypto Earn"
                  subheader="Daily 6.3% on your money."
                  :hasbtn="true"
                  @click="$router.push('/tier')">
                  <template #default>
                        Try!
                      </template>
                  </card1>
                </v-col>
                <v-col cols="12" md="4" xs="12">
                  <card1
                  img="/gift.png"
                  header="Magic Boxes"
                  subheader="upto 10x your money"
                  :hasbtn="true"
                  @click="$router.push('/magicboxes')">
                  <template #default>
                        Try!
                      </template>
                  </card1>
                </v-col>
                <v-col cols="12" md="4" xs="12">
                  <card1
                    img="/youtube.png"
                    header="Youtube videos"
                    subheader="KES 200 per video."
                    :hasbtn="true"
                     @click="$router.push('/videos')">
                    <template #default>
                     Try!
                    </template>
                  </card1>
                </v-col>
                <v-col cols="12" md="4" xs="12">
                  <card1
                    img="/q.png"
                    header="Survey Questions"
                    subheader="KES 200 for 8/10 correct answers."
                    :hasbtn="true"
                    @click="$router.push('/survey')">
                    <template #default>
                      Try!
                    </template>
                  </card1>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  head() {
    return {
      title:"Earn money online in kenya: #1 platform in kenya."
    }
  }
}
</script>