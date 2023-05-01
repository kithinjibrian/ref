<template>
    <v-container>
        <v-row>
            <v-col>
                <dash
                MainTitle="Youtube Videos"
                :balance="balance"
                :deposit="false"
                @actions2="withdraw($event)"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card v-if="!active"> 
                    <v-card-title class="justify-center">
                        <p><v-icon x-large>mdi-lock</v-icon>This module is only active on Saturdays.</p>
                    </v-card-title>
                </v-card>
                <div v-else>
                <div>Today's video</div>
                <p>
                Please note! Don't refresh this page until your balance updates automatically.
                </p>
                <video id="video" controls muted width="100%" height="auto">
                    <source :src="$store.getters['videos/getSrc']" type="video/mp4">
                </video>
                </div>
            </v-col>
        </v-row>
    </v-container> 
</template>

<script>
import dash from '~/components/dash.vue';
 export default {
     middleware:["auth","initiated"],
     head(){
    return {
      title:"Youtube videos"
    }
  },
     components: { dash },
     data:() => ({
         active:false
     }),
     computed:{
         balance() {
             return this.$store.getters['wallet/getOtherTotal']('videos')
         }
     },
     async fetch() {
        await this.$store.dispatch("wallet/all");
        try {
            await this.$store.dispatch("videos/src");
            this.active = true;
        } catch(e) {
            this.active = false;
        }
    },
    methods:{
         async withdraw(e) {
            try {
                await this.$store.dispatch("wallet/withdrawOther",{
                    type:"videos",
                    amount:e
                });
                this.$fetch()
            } catch(e) {
                const self = this;
                e.data.errors.map(i=>self.$toast.error(i.msg).goAway(3000))
            }
        }
    },
    mounted() {
        const self = this;
        setTimeout(async (self)=>{
            try {
                await self.$store.dispatch("videos/played",{
                    videoID:"hello"
                })
                self.$fetch()
            } catch(e) {
                e.data.errors.map(i=>self.$toast.error(i.msg).goAway(3000))
            }
        },45000,self)
    }
     /*mounted() {
         if(this.active) {
         const self = this;
         var video = document.getElementById('video');
        var supposedCurrentTime = 0;
        video.addEventListener('timeupdate', function() {
        if (!video.seeking) {
                supposedCurrentTime = video.currentTime;
        }
        });
        // prevent user from seeking
        video.addEventListener('seeking', function() {
        // guard agains infinite recursion:
        // user seeks, seeking is fired, currentTime is modified, seeking is fired, current time is modified, ....
        var delta = video.currentTime - supposedCurrentTime;
        // delta = Math.abs(delta); // disable seeking previous content if you want
        if (delta > 0.01) {
            video.currentTime = supposedCurrentTime;
        }
        });
        video.addEventListener('ended',async function() {
        // reset state in order to allow for rewind
            supposedCurrentTime = 0;
            try {
                console.log(0)
                await self.$store.dispatch("videos/played",{
                    videoID:"hello"
                })
                self.$fetch()
            } catch(e) {
                e.data.errors.map(i=>self.$toast.error(i.msg).goAway(3000))
            }
        });
        }
     }*/
 }
</script>