// sebastien.pro210@gmail.com ADRESSE MAIL ADMIN
// Tokenrandom&1 MOT DE PASSE ADMIN

<template>
  <div id="indexPage">
    <!-- Barre de navigation MODULABLE -->
    <div id="nav-bar">

      <!-- Logo du site -->
      <h1>
        <a @click="loginEmpt" href="#"
          ><img src="../assets/icon-left-font.png" alt="Logo du site"
        /></a>
      </h1>
      <!-- Logo du site -->

      <!-- Partie Connexion Inscription NAV-BAR -->
      <ul v-if="this.verifSession < 1" class="nav-ul-login">
        <a @click="loginEmpt" class="nav-li" href="#"
          ><li>{{ login }}</li></a
        >
        <a @click="signupEmpt" class="nav-li" href="#"
          ><li>{{ signup }}</li></a
        >
      </ul>
      <!-- Partie Connexion Inscription NAV-BAR -->

      <!-- Partie FORUM NAV-BAR -->
      <ul v-if="this.verifSession >= 1" class="nav-ul-forum">
        <a @click="pageForumBool" class="nav-li"
          ><li>{{ forum }}</li></a
        >
        <a @click="pageUserBool" class="nav-li"
          ><li>{{ espaceUser }}</li></a
        >
        <a @click="userDisconnect" class="nav-li"
          ><li>{{ deconnexion }}</li></a
        >
      </ul>
      <!-- Partie FORUM NAV-BAR -->
    </div>
    <!-- Barre de navigation MODULABLE -->

    <!-- Login et inscription -->
    <loginPage
      v-show="this.loginVerif === true"
      v-if="this.verifSession < 1"
    ></loginPage>
    <signupPage
      v-show="this.signupVerif === true"
      v-if="this.verifSession < 1"
    ></signupPage>
    <!-- Login et inscription -->

    <!-- Espace Utilisateur -->
    <espaceUser v-if="this.userPage === true"></espaceUser>
    <!-- Espace Utilisateur -->

    <!-- Espace Utilisateur -->
    <forumUser v-if="this.userPage === false && verifSession >= 1"></forumUser>
    <!-- Espace Utilisateur -->
  </div>
</template>

<script>

/* IMPORT DES DIFFÉRENTS MODULES */
import loginPage from '../components/Log/loginPage.vue'
import signupPage from '../components/Log/signupPage.vue'
import espaceUser from '../components/forum/espaceUser.vue'
import forumUser from '../components/forum/forumUser.vue'
/* IMPORT DES DIFFÉRENTS MODULES */


export default {
  name: 'principalPage',

  data() {
    return {
      /* DATA  */

      login: 'Connexion',
      signup: 'Inscription',
      forum: "Fil d'actualité",
      espaceUser: 'Espace Utilisateur',
      deconnexion: 'Déconnexion',
      loginVerif: true,
      signupVerif: false,
      verifSession: sessionStorage.length,
      userPage: false,

      /* DATA  */
    }
  },

  components:{
    /* Composants des différents modules */

    loginPage,
    signupPage,
    espaceUser,
    forumUser

    /* Composants des différents modules */
  },

  methods:{
    
   /* Permet à l'utilisateur de passer au module Forum */
   pageForumBool() {
		if (this.userPage === true) {
			this.userPage = false;
		}
	},
  /* Permet à l'utilisateur de passer au module Forum */

  /* Permet à l'utilisateur de passer au module Espace personnel */
	pageUserBool() {
		if (this.userPage === false) {
			this.userPage = true;
		}
	},
  /* Permet à l'utilisateur de passer au module Espace personnel */

	/* Déconnecte l'utilisateur  */
	userDisconnect() {
		sessionStorage.clear();
		location.reload();
		window.location.assign(`http://localhost:8080/`)
	},
	/* Déconnecte l'utilisateur  */

	/* Permet à l'utilisateur de passer au module Inscription */
	signupEmpt() {
		if (this.loginVerif === true) {
			this.loginVerif = false;
			return this.signupVerif = true;
		}
	},
	/* Permet à l'utilisateur de passer au module Inscription */


	/* Permet à l'utilisateur de passer au module Connexion */
	loginEmpt() {
		if (this.signupVerif === true) {
			this.signupVerif = false;
			return this.loginVerif = true;
		}
	}
/* Permet à l'utilisateur de passer au module Connexion */

}
}
</script>

<style>
#indexPage{display:flex;flex-direction:column;align-items:center}.nav-ul-login{width:20%;display:flex;justify-content:space-around;flex-wrap:wrap}.nav-ul-forum{width:40%;display:flex;justify-content:space-around;flex-wrap:wrap}.nav-li{font-family:Raleway,sans-serif;font-size:1.2rem;color:#000;cursor:pointer}.nav-li:hover{border-bottom:2px solid red}#nav-bar{background:#fff;display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%}img{text-align:center;width:17%;height:20%;border-radius:50%}@media screen and (max-width:1120px){.nav-ul-login{width:20%}}@media screen and (max-width:1030px){.nav-ul-login{width:50%}}@media screen and (max-width:540px){#nav-bar{flex-direction:column}}@media screen and (max-width:670px){.nav-li{font-size:.9rem}}@media screen and (max-width:564px){.nav-li{font-size:.7rem}}@media screen and (max-width:540px){.nav-li{font-size:1rem}}
</style>
