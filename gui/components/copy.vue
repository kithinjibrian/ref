<template>
    <v-text-field
    v-model="value"
    id="qwerty"
    label="Referral link"
    outlined
    dense
    readonly
    :append-icon="icon"
    @click:append="copy()"/>
</template>

<script>
export default {
    props:{
        value:{
            type:String,
            default:null
        }
    },
    data:()=>({
        icon:"mdi-content-copy"
    }),
    methods:{
        copy() {
            const q=document.querySelector("#qwerty");
            q.select();
            q.setSelectionRange(0, 99999)
            navigator.clipboard.writeText(q.value)
            this.chameleon();
        },
        chameleon(){
            const self=this;
            self.icon="copied"
            setTimeout(()=>self.icon="mdi-content-copy",1000);
        }
    }
}
</script>