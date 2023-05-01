<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!$vuetify.breakpoint.xs"
      app
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-container class="py-0 fill-height">
          <v-app-bar-nav-icon 
          @click="drawer = !drawer">
          </v-app-bar-nav-icon>
          <v-avatar
          size="40"
          >
          <img
          src="~/static/icon.png"
          alt="logo"/>
          </v-avatar>
          <v-toolbar-title>
            Cloud360
          </v-toolbar-title>
          <v-spacer/>
          <a href="https://wa.me/254778822251" style="text-decoration:none">
            <v-icon
            color="green">mdi-whatsapp</v-icon>
          </a>
          <lr v-if="!$auth.loggedIn"/>
          <llsw 
          v-else
          :id="$auth.user.id"
          :username="$auth.user.username"
          />
        </v-container>
      
    </v-app-bar>

    <v-main>
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      items: [
          { title: 'Home', to:"/",icon: 'mdi-home' },
          { title: 'Dashboard', to:"/dashboard",icon: 'mdi-view-dashboard' },
          { title: 'Wallet',to:"/wallet", icon: 'mdi-wallet' },
          { title: 'Referrals',to:"/referrals", icon: 'mdi-share' },
          { title: 'Crypto earn', to:"/tier",icon: 'mdi-bitcoin' },
          { title: 'Magic box',to:"/magicboxes", icon: 'mdi-gift' },
          { title: 'survey questions',to:"/survey", icon: 'mdi-help-box' },
          { title: 'Youtube videos', to:"/videos",icon: 'mdi-youtube' },
        ]
      }),
  }
</script>