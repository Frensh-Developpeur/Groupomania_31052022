<template>
  <div id="table-column">
    <div class="mb-3">

        <!-- Gestion de la connexion -->

        <!-- Input-Label de l'adresse mail avec regexp -->
      <label for="email-login" id="fontText" class="form-label">{{mail}}</label>

      <div class="icoDiv">
        <input
          type="email"
          class="template-login-signup"
          id="email-login"
          @keyup="verifRegexp"
          placeholder="Groupomania@example.com"
        />
        <font-awesome-icon
          icon="fa-solid fa-triangle-exclamation"
          class="exclamationRegexp"
          v-show="regexpBoolMail === false"
        />
        <font-awesome-icon
          icon="fa-solid fa-check"
          class="validCheckRegexp"
          v-show="regexpBoolMail === true"
        />
      </div>
      <!-- Input-Label de l'adresse mail avec regexp -->

      <!-- Input-Label du password avec regexp et affichage du mot de passe par button -->
      <label
        for="password-login"
        id="fontText"
        class="form-label"
        >{{password}}</label
      >

      <div class="icoDiv">
        <input
          type="password"
          class="template-login-signup"
          @keyup="verifRegexp"
          id="password-login"
          placeholder="Groupomania"
        />
        <font-awesome-icon
          @click="affichPassword"
          icon="fa-solid fa-eye-low-vision"
          class="validCheckRegexp"
        />
        <font-awesome-icon
          icon="fa-solid fa-triangle-exclamation"
          class="exclamationRegexpLogin"
          v-show="regexpBoolPassword === false"
        />
        <font-awesome-icon
          icon="fa-solid fa-check"
          class="validRegexpLogin"
          v-show="regexpBoolPassword === true"
        />
      </div>
       <!-- Input-Label du password avec regexp et affichage du mot de passe par button -->

      <!-- Input d'envoie des données -->
      <input
        @click="sendLogin"
        href="/espaceUser"
        v-show="buttonLogin === true"
        class="button-loginSignup"
        id="buttonLoginSignup"
        type="submit"
        value="Confirmer"
      />
       <!-- Input d'envoie des données -->

      <!-- Message de confirmation ou d'erreur -->
      <p class="validColor" v-show="validLogin === true">Connexion Réussie !</p>
      <p class="errorColor" v-show="validLogin === false">
        L'adresse mail ou le mot de passe est incorrect !
      </p>
       <!-- Message de confirmation ou d'erreur -->

      <!-- Gestion de la connexion -->
      
    </div>
  </div>
</template>

<script>
export default {
   name:'loginPage',
data(){

   /* DATA */
    return{

   mail: 'Adresse email',
   password:'Mot de passe',
   affichMdp: 'Aperçu du mot de passe',
   messageMdp: '',
   numberAffichMsg: true,

   /* Permet d'afficher le button de connexion ou non --- Null par défaut -- Vérification par regexp */
   validLogin: null,
   buttonLogin: false,
   /* Permet d'afficher le button de connexion ou non --- Null par défaut -- Vérification par regexp */

   /* Permet d'afficher une erreur ou une confirmation des regexp */
   regexpBoolMail: null,
   regexpBoolPassword: null,
   /* Permet d'afficher une erreur ou une confirmation des regexp */

   /* Permet d'accéder à la page forum si true */
   connexionUser : false,
   /* Permet d'accéder à la page forum si true */

   /* Regexp  connexion */
   passwordRegExp : new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})`),
   emailRegExp : new RegExp (/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/i),
   /* Regexp  connexion */
 
    }
   /* DATA */
},
 methods: {
     /* Permet d'afficher le mot de passe au click */
    affichPassword() {

         /* IF qui permet de passer de l'était password à l'état text pour afficher le mot de passe */
        if (this.numberAffichMsg === false) {
            this.numberAffichMsg = true;
            document.getElementById('password-login').setAttribute("type", "password");
        } else {
            this.numberAffichMsg = false;
            document.getElementById('password-login').setAttribute("type", "text");
        }
         /* IF qui permet de passer de l'était password à l'état text pour afficher le mot de passe */

    },
     /* Permet d'afficher le mot de passe au click */

   /* Permet de vérifier les données rentrée par l'utilisateur */
    verifRegexp() {

         /* Vérifie si le regexp n'est pas valid et ajoute un texte indiquant d'ou vien l'erreur */
        let mailLogin = document.getElementById('email-login');
        let passwordLogin = document.getElementById('password-login');

        if (this.emailRegExp.test(mailLogin.value.trim()) ? this.regexpBoolMail = true : this.regexpBoolMail = false);
        if (this.passwordRegExp.test(passwordLogin.value.trim()) ? this.regexpBoolPassword = true : this.regexpBoolPassword = false);
        /* Vérifie si le regexp n'est pas valid et ajoute un texte indiquant d'ou vien l'erreur */
       
       /* Affiche le bouton si le regexp est valide sinon le retire */
        if (this.regexpBoolMail === true && this.regexpBoolPassword === true) {
            this.buttonLogin = true;
        }
        if (this.regexpBoolMail === false || this.regexpBoolPassword === false) {
            this.buttonLogin = false;
        }
         /* Affiche le bouton si le regexp est valide sinon le retire */

    },
     /* Permet de vérifier les données rentrée par l'utilisateur */

    /* Fonction qui envoie les données rentrer par l'utilisateur, sous condition que les regexp soit valider  */
    sendLogin() {
 
     /* Enregistre les données rentrer par l'user dans une variable si le regexp est valide */
        if (this.regexpBoolMail === true && this.regexpBoolPassword === true) {

            /* Enregistre les valeur dans la variable */
            let loginCheck = {
                Email: document.querySelector('#email-login').value,
                Password: document.querySelector('#password-login').value
            };
            /* Enregistre les valeur dans la variable */

           /* Requête qui envoie les données rentrer par l'utilisateur à la BDD */
            fetch('http://localhost:3000/api/auth/login', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(loginCheck)
                })
           /* Requête qui envoie les données rentrer par l'utilisateur à la BDD */

           /* Réponse de l'api si mot de passe ou email incorrect renvoie une erreur sinon connecte l'user */
                .then(res => res.json())
                .then(login => {
                    if (login.userId === undefined) {
                        this.validLogin = false;
                        setTimeout(() => {
                            this.validLogin = null;
                            return false;
                        }, 3000)
                    } else {
                        this.validLogin = true;
                        setTimeout(() => {
                            window.location.assign(`http://localhost:8080/fil`)
                            sessionStorage.setItem('user', JSON.stringify(login));
                            location.reload();
                        }, 2000)
            /* Réponse de l'api si mot de passe ou email incorrect renvoie une erreur sinon connecte l'user */
                    }
                })

        }
    }
}
}
/* Fonction qui envoie les données rentrer par l'utilisateur, sous condition que les regexp soit valider  */

</script>

<style>
#fontText{margin-top:3%;font-family:Raleway,sans-serif;font-size:1.2rem}#buttonLoginSignup,#buttonLoginSignup2{margin-top:5%;border:2px solid #fff;border-radius:15px/20px;background-color:#fff;font-family:Raleway,sans-serif;font-size:1.2rem;padding:1% 5%;cursor:grab}#buttonLoginSignup2:hover,#buttonLoginSignup:hover,.buttonUpdateImg:hover,.commPostGet:hover,.deletePost:hover,.modifButtonPostTest:hover,.modifButtonUser:hover,.modifyPostGet:hover,.nav-li:hover,.suppButtonUser:hover,.updateButtonUser:hover{transform:scale(1.1);transition:1.5s}#table-column{width:100%;display:flex;align-items:center;justify-content:center;padding-top:10%}.errorMsg{color:red;font-family:Raleway,sans-serif;margin-top:15px;font-size:1.5rem}.mb-3{color:#fff;padding-top:5%;width:50%;padding-bottom:5%;border-radius:15px;display:flex;flex-direction:column;align-items:center;background-size:800%;background-image:url("../../assets/background-login.webp")}.template-login-signup{width:50%;margin-top:15px;text-align:center;font-family:Raleway,sans-serif;font-size:1.2rem}.errorColor{margin-top:5%;text-align:center;width:50%;color:orange;font-family:Raleway,sans-serif;font-size:2rem}.validColor{margin-top:5%;text-align:center;width:50%;color:#90ee90;font-family:Raleway,sans-serif;font-size:2rem}.validCheckRegexp{width:25px;height:26px;color:green;position:absolute;top:38%;right:25%;cursor:grab}.eyesPassword{cursor:grab}.exclamationRegexp{width:30px;height:26px;color:red;position:absolute;top:38%;right:25%}.test13{width:30px;height:26px;color:red;position:absolute;top:38%;right:35%}.test12{width:25px;height:26px;color:green;position:absolute;top:38%;right:35%}@media screen and (max-width:1164px){.template-login-signup{width:90%}.exclamationRegexp.svg-inline--fa.fa-triangle-exclamation,.validCheckRegexp.svg-inline--fa.fa-check{right:5%}.validCheckRegexp.svg-inline--fa.fa-eye-low-vision{right:5%}.validRegexpLogin.svg-inline--fa.fa-check,.exclamationRegexpLogin.svg-inline--fa.fa-triangle-exclamation{right:11%}}@media screen and (max-width:768px){.mb-3{padding-top:0;width:80%}}@media screen and (max-width:700px){.nav-li{margin-bottom:15%}.nav-ul-login{width:20%!important;margin-right:5%;flex-direction:column}}@media screen and (max-width:540px){.nav-li{margin-bottom:50%!important}.nav-ul-login{width:10%!important;margin-right:5%!important;flex-direction:column}.mb-3{width:90%}}@media screen and (max-width:430px){.nav-ul-login{margin-right:10%!important}}@media screen and (max-width:375px){.mb-3{width:100%;border-radius:0}#table-column{padding-top:0!important}.template-login-signup{width:95%}.exclamationRegexp.svg-inline--fa.fa-triangle-exclamation,.validCheckRegexp.svg-inline--fa.fa-check{right:2%}.validCheckRegexp.svg-inline--fa.fa-eye-low-vision{right:2%}.validRegexpLogin.svg-inline--fa.fa-check,.exclamationRegexpLogin.svg-inline--fa.fa-triangle-exclamation{right:9%}}
</style>
