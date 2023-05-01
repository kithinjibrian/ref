//a card with image, header, text, button

<template>
    <v-card
    :width="width"
    :height="height">
        <v-img
        :max-width="imgwidth"
        :max-height="imgheight"
        contain
        :src="img">
        </v-img>
        <v-card-title>
            <p>
                {{header}}
            </p>
            
        </v-card-title>
        <v-card-subtitle v-if="subheader!==''" class="font-italic">
            {{subheader}}
        </v-card-subtitle>
        <v-card-text>
            <div v-if="!islist">
                {{text}}
            </div>
            <ul 
            v-for="n of list"
            v-else
            :key="n">
                <li>{{n}}</li>
            </ul>
        </v-card-text>
        <v-card-actions v-if="hasbtn">
            <v-btn
            block
            class="primary"
            @click="$emit('click')">
                <slot>button</slot>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

    export default {
        props:{
            img:{
                type:String,
                required:true
            },
            header:{
                type:String,
                required:true
            },
            subheader:{
                type:String,
                default:''
            },
            text:{
                type:String,
                default:""
            },
            list:{
                type:Array,
                default () {
                    return []
                }
            },
            width:{
                type:String,
                default:"100%"
            },
            height:{
                type:String,
                default:"100%"
            },
            imgwidth:{
                type:Number,
                default:200
            },
            imgheight:{
                type:Number,
                default:150
            },
            islist:{
                type:Boolean,
                default:false
            },
            hasbtn:{
                type:Boolean,
                default:false
            }
        }
    }

</script>
