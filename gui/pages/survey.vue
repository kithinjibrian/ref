<template>
    <div>
        <dash
        MainTitle="Survey questions"
        :balance="$store.getters['wallet/getOtherTotal']('trivia')"
        :deposit="false"
        @actions2="withdraw($event)"/>
        <v-card v-if="!active"> 
            <v-card-title class="justify-center">
                <p><v-icon x-large>mdi-lock</v-icon>This module is only active on Sundays.</p>
            </v-card-title>
        </v-card>
        <v-card v-else>
            <v-card-title>Today's survey questions.</v-card-title>
            <v-card-subtitle>Please note, you will earn if you get 8 out of 10 questions correct.</v-card-subtitle>
            <v-card-text v-if="q.length !== 0">
                <div>
                    <p>1.{{q[0].q}}</p>
                    <v-radio-group
                    v-model="one">
                        <v-radio
                        :label="q[0].A"
                        value="A"/>
                        <v-radio
                        :label="q[0].B"
                        value="B"/>
                        <v-radio
                        :label="q[0].C"
                        value="C"/>
                        <v-radio
                        :label="q[0].D"
                        value="D"/>
                    </v-radio-group>
                </div>
                <div>
                    <p>2.{{q[1].q}}</p>
                    <v-radio-group
                    v-model="two">
                        <v-radio
                        :label="q[1].A"
                        value="A"/>
                        <v-radio
                        :label="q[1].B"
                        value="B"/>
                        <v-radio
                        :label="q[1].C"
                        value="C"/>
                        <v-radio
                        :label="q[1].D"
                        value="D"/>
                    </v-radio-group>
                </div>
                <div>
                    <p>3.{{q[2].q}}</p>
                    <v-radio-group
                    v-model="three">
                        <v-radio
                        :label="q[2].A"
                        value="A"/>
                        <v-radio
                        :label="q[2].B"
                        value="B"/>
                        <v-radio
                        :label="q[2].C"
                        value="C"/>
                        <v-radio
                        :label="q[2].D"
                        value="D"/>
                    </v-radio-group>
                </div>
                <div>
                    <p>4.{{q[3].q}}</p>
                    <v-radio-group
                    v-model="four">
                        <v-radio
                        :label="q[3].A"
                        value="A"/>
                        <v-radio
                        :label="q[3].B"
                        value="B"/>
                        <v-radio
                        :label="q[3].C"
                        value="C"/>
                        <v-radio
                        :label="q[3].D"
                        value="D"/>
                    </v-radio-group>
                </div>
                <div>
                    <p>5.{{q[4].q}}</p>
                    <v-radio-group
                    v-model="five">
                        <v-radio
                        :label="q[4].A"
                        value="A"/>
                        <v-radio
                        :label="q[4].B"
                        value="B"/>
                        <v-radio
                        :label="q[4].C"
                        value="C"/>
                        <v-radio
                        :label="q[4].D"
                        value="D"/>
                    </v-radio-group>
                </div>
                <div>
                    <p>6.{{q[5].q}}</p>
                    <v-radio-group
                    v-model="six">
                        <v-radio
                        :label="q[5].A"
                        value="A"/>
                        <v-radio
                        :label="q[5].B"
                        value="B"/>
                        <v-radio
                        :label="q[5].C"
                        value="C"/>
                        <v-radio
                        :label="q[5].D"
                        value="D"/>
                    </v-radio-group>
                </div>
                <div>
                    <p>7.{{q[6].q}}</p>
                    <v-radio-group
                    v-model="seven">
                        <v-radio
                        :label="q[6].A"
                        value="A"/>
                        <v-radio
                        :label="q[6].B"
                        value="B"/>
                        <v-radio
                        :label="q[6].C"
                        value="C"/>
                        <v-radio
                        :label="q[6].D"
                        value="D"/>
                    </v-radio-group>
                </div>
                <div>
                    <p>8.{{q[7].q}}</p>
                    <v-radio-group
                    v-model="eight">
                        <v-radio
                        :label="q[7].A"
                        value="A"/>
                        <v-radio
                        :label="q[7].B"
                        value="B"/>
                        <v-radio
                        :label="q[7].C"
                        value="C"/>
                        <v-radio
                        :label="q[7].D"
                        value="D"/>
                    </v-radio-group>
                </div>
                <div>
                    <p>9.{{q[8].q}}</p>
                    <v-radio-group
                    v-model="nine">
                        <v-radio
                        :label="q[8].A"
                        value="A"/>
                        <v-radio
                        :label="q[8].B"
                        value="B"/>
                        <v-radio
                        :label="q[8].C"
                        value="C"/>
                        <v-radio
                        :label="q[8].D"
                        value="D"/>
                    </v-radio-group>
                </div>
                <div>
                    <p>10.{{q[9].q}}</p>
                    <v-radio-group
                    v-model="ten">
                        <v-radio
                        :label="q[9].A"
                        value="A"/>
                        <v-radio
                        :label="q[9].B"
                        value="B"/>
                        <v-radio
                        :label="q[9].C"
                        value="C"/>
                        <v-radio
                        :label="q[9].D"
                        value="D"/>
                    </v-radio-group>
                </div>
            </v-card-text>
            <div v-if="an!==null">
                Answers
                <p v-for="n of 10" :key="n">
                    {{n}}.{{an[n-1]}}
                </p>
            </div>
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
            <v-card-actions>
                <v-spacer/>
                <v-btn
                color="primary"
                @click="submit()"
                :loading="ld">
                  Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    middleware:["auth","initiated"],
    head(){
    return {
      title:"Survey Questions"
    }
  },
    data:()=>({
        one:null,
        two:null,
        three:null,
        four:null,
        five:null,
        six:null,
        seven:null,
        eight:null,
        nine:null,
        ten:null,
        ld:false,
        an:null,
        error:null,
        on:false,
        active:false
    }),
    computed:{
        q() {
            return this.$store.getters['trivia/getQuestions']
        }
    },
    async fetch() {
        await this.$store.dispatch("wallet/all");
        try {
            await this.$store.dispatch("trivia/questions");
            this.active = true;
        } catch(e) {
            this.active = false
        }
        
    },
    methods:{
        async submit () {
             try {
                this.ld = true;
                const a = await this.$store.dispatch("trivia/submit",{
                    answers:[this.one,this.two,this.three,this.four,this.five,
                    this.six,this.seven,this.eight,this.nine,this.ten]
                });
                this.ld = false
                this.an=a;
                const self = this;
                setTimeout(()=>self.an=null,5000)
                this.$fetch()
            } catch (e) {
                this.ld = false
                this.on=true;
                this.error = e.data.errors;
            }
        },
        async withdraw(e) {
            try {
                await this.$store.dispatch("wallet/withdrawOther",{
                    type:"trivia",
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