<template>
    <v-card>
        <v-card-title primary-title class="justify-center font-weight-light">
            {{MainTitle}}
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-control name="inner">
                <v-row>
                    <v-col cols="6" style="border-right:1px solid grey">
                        <div class="text-h3 pa-2">KES</div>
                        <div class="text-h4 pa-2">{{balance}}</div>
                    </v-col>
                    <v-col cols="6">
                        <wts
                        v-if="deposit"
                        btn="deposit"
                        title="Deposit"
                        :desc="desc1"
                        :html="html1"
                        @clicked="$emit('actions1',$event)"/>

                        <wts
                        v-if="withdraw"
                        :outlined="true"
                        clr="red"
                        btn="withdraw"
                        title="Withdraw"
                        :desc="desc2"
                        :html="html2"
                        @clicked="$emit('actions2',$event)"/>
                    </v-col>
                </v-row>
            </v-control>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name:"dash",
    props:{
        MainTitle:{
            type:String,
            required:true
        },
        balance:{
            type:Number,
            required:true
        },
        deposit:{
            type:Boolean,
            default:true
        },
        withdraw:{
            type:Boolean,
            default:true
        },
        desc1:{
            type:String,
            default:"This action will withdraw money from your main wallet."
        },
        desc2:{
            type:String,
            default:"This action will deposit money into your main wallet."
        },
        html1:{
            type:String,
            default:null
        },
        html2:{
            type:String,
            default:null
        }
    }
}
</script>