<template>
    <v-menu
    offset-y
    :nudge-width="250">
        <template #activator="{ on, attrs}">
            <v-avatar
            color="indigo"
            size="40"
            v-bind="attrs"
            v-on="on">
                {{username.split("")[0]}}
            </v-avatar>
        </template>
        <v-card>
            <v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="3">
                            <v-avatar
                            color="indigo"
                            size="40">
                             {{username.split("")[0]}}
                            </v-avatar>
                        </v-col>
                        <v-col cols="9">
                            <div>{{username}}</div>
                            <div class="text-subtitle-2 font-weight-light">
                                ID:
                                <span style="text-decoration:underline dotted">
                                    {{id}}
                                </span>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>
                            Profile
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-btn
                class="red"
                block
                @click="$auth.logout()">
                    logout
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    props:{
        username:{
            type:String,
            default:"username"
        },
        id:{
            type:String,
            default:"id"
        }
    }
}
</script>