<template>
        <v-card
        width="100%"
        height="600">
        <v-img
        max-width="100%"
        height="600"
        src="/money.jpg"
        gradient="to top right, rgb(0, 51, 51,.5) , rgba(25,32,72,.4)">
        <v-container pa-13>
            <v-row>
            <v-col cols="12">
                <p class="text-md-h3 text-h4 font-weight-bold text-center">
                    #1 platform in Kenya
                </p>
                <p class="text-center">Get paid Kshs 200 for answering survey questions, watching video ads or Kshs 750 for inviting your friends. Even better, win 10x your money playing magic boxes and a daily 6.3% on your money by investing on our crypto investments.</p>
            </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="4" xs="3" class="text-center">
                        <v-btn
                        class="primary"
                        to="/register"
                        x-large
                        rounded>
                            Register
                        </v-btn>
                    </v-col>
                    <v-col cols="6" md="4" xs="3" class="text-center">
                        <v-btn
                        outlined
                        color="red"
                        to="/login"
                        x-large
                        rounded>
                            Login
                        </v-btn>
                    </v-col>
            </v-row>
        </v-container>
        </v-img>
    </v-card>
</template>