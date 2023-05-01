<!--login register menu-->

<template>
    <v-menu offset-y :nudge-width="200">
        <template #activator="{ on, attrs}">
            <v-btn
            icon
            v-bind="attrs"
            v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-if="!($route.path==='/login')" to="/login">
                <v-list-item-title>
                    Login
                </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!($route.path==='/register')" to="/register">
                <v-list-item-title>
                    Register
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>