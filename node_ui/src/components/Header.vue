<template>
  <v-app-bar app elevate-on-scroll>
    <v-app-bar-title>프루덴셜 고객관리</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="150"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
        >
          Profile
        </v-btn>
      </template>

      <v-card>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="Kyudong"
              >
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title><b>Kyudong Kim</b></v-list-item-title>
              <v-list-item-subtitle>kyudong.kim@mongodb.com</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
         <v-list>
          <v-list-item>
            <v-list-item-title @click="signout" style="cursor:pointer">Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  props: [ "email"],
  data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }),
  methods: {
    signout () {
      console.log("Sign out");
      sessionStorage.clear();
       this.$router.push({name: 'signIn'});
    }
  }
}
</script>