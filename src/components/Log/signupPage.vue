<template>
  <div id="table-column">
    <div class="mb-3">

      <!-- Gestion de l'inscription -->
      <label for="nom-signup" id="fontText" class="form-label">{{name}}</label>
      <div class="icoDiv">
        <input
          type="text"
          class="template-login-signup"
          id="nom-signup"
          v-on:keyup="verifRegexp"
          placeholder="Insérez votre nom"
        />
        <font-awesome-icon
          icon="fa-solid fa-triangle-exclamation"
          class="exclamationRegexp"
          v-show="regexpBoolName === false"
        />
        <font-awesome-icon
          icon="fa-solid fa-check"
          class="validCheckRegexp"
          v-show="regexpBoolName === true"
        />
      </div>
      <label
        for="prenom-signup"
        id="fontText"
        class="form-label"
        >{{firstName}}</label
      >
      <div class="icoDiv">
        <input
          type="text"
          class="template-login-signup"
          v-on:keyup="verifRegexp"
          id="prenom-signup"
          placeholder="Insérez votre prénom"
        />
        <font-awesome-icon
          icon="fa-solid fa-triangle-exclamation"
          class="exclamationRegexp"
          v-show="regexpBoolFirstName === false"
        />
        <font-awesome-icon
          icon="fa-solid fa-check"
          class="validCheckRegexp"
          v-show="regexpBoolFirstName === true"
        />
      </div>
      <label
        for="email-signup"
        id="fontText"
        class="form-label"
        >{{mail}}</label
      >
      <div class="icoDiv">
        <input
          type="email"
          class="template-login-signup"
          v-on:keyup="verifRegexp"
          id="email-signup"
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
      <label
        for="password-signup"
        id="fontText"
        class="form-label"
        >{{password}}</label
      >
      <div class="icoDiv">
        <input
          type="password"
          class="template-login-signup"
          v-on:keyup="verifRegexp"
          id="password-signup"
          placeholder="Insérez votre mot de passe"
        />
        <font-awesome-icon
          @click="affichPassword"
          icon="fa-solid fa-eye-low-vision"
          class="validCheckRegexp eyesPassword"
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
      <p class="infoPassword" v-show="regexpBoolPassword === false">Majuscule, caractère spécial, chiffre requis ! Minimum 7 caractère.</p>
      <label
        for="date-signup"
        id="fontText"
        class="form-label"
        >{{birthday}}</label
      >
      <div class="icoDiv">
        <input
          type="date"
          class="template-login-signup"
          v-on:keyup="verifRegexp"
          id="date-signup"
          min="1950-01-01"
          max="2015-01-01"
          required
        />
        <font-awesome-icon
          icon="fa-solid fa-triangle-exclamation"
          class="exclamationRegexpLogin"
          v-show="regexpBoolBirthday === false"
        />
        <font-awesome-icon
          icon="fa-solid fa-check"
          class="validRegexpLogin"
          v-show="regexpBoolBirthday === true"
        />
      </div>
      <label
        for="ville-signup"
        id="fontText"
        class="form-label"
        >{{city}}</label
      >
      <div class="icoDiv">
        <input
          type="text"
          class="template-login-signup"
          v-on:keyup="verifRegexp"
          id="ville-signup"
          placeholder="Strasbourg"
        />
        <font-awesome-icon
          icon="fa-solid fa-triangle-exclamation"
          class="exclamationRegexp"
          v-show="regexpBoolCity === false"
        />
        <font-awesome-icon
          icon="fa-solid fa-check"
          class="validCheckRegexp"
          v-show="regexpBoolCity === true"
        />
      </div>
      <label
        for="adresse-signup"
        id="fontText"
        class="form-label"
        >{{adress}}</label
      >
      <div class="icoDiv">
        <input
          type="text"
          class="template-login-signup"
          id="adresse-signup"
          v-on:keyup="verifRegexp"
          placeholder="32 rue de Paris"
        />
        <font-awesome-icon
          icon="fa-solid fa-triangle-exclamation"
          class="exclamationRegexp"
          v-show="regexpBoolAdress === false"
        />
        <font-awesome-icon
          icon="fa-solid fa-check"
          class="validCheckRegexp"
          v-show="regexpBoolAdress === true"
        />
      </div>
       <!-- Gestion de l'inscription -->

       <!-- Button qui envoie les données de l'inscription -->
      <input
        @click="sendLogin"
        class="button-loginSignup"
        v-show="buttonSignup === true"
        id="buttonLoginSignup2"
        type="button"
        value="Inscription"
      />
       <!-- Button qui envoie les données de l'inscription -->

        <!-- Si toutes les valeurs sont bonnes  -->
      <p class="validColor" v-show="validSignup === true">
        Inscription Réussie ! Redirection en cours ...
      </p>
      <!-- Si toutes les valeurs sont bonnes  -->

      <!-- Si une valeur est mal remplie  -->
      <p class="errorColor" v-show="validSignup === false">
        Veuillez sélectionner une autre adresse mail ou vérifier que tout les
        champs sont bien remplies !
      </p>
      <!-- Si une valeur est mal remplie  -->
      
    </div>
  </div>
</template>
<script
  src="https://kit.fontawesome.com/2334703c75.js"
  crossorigin="anonymous"
></script>

<script>
export default {
    name: 'signupPage',
    data() {
        /* DATA */
        return {
            name: 'Nom',
            firstName: 'Prénom',
            mail: 'Adresse mail',
            password: 'Mot de passe',
            birthday: 'Date de naissance',
            city: 'Ville',
            adress: 'Adresse',
            affichMdp: 'Aperçu du mot de passe',
            messageMdp: '',

            /* PERMET D'AFFICHER UNE ERREUR OU UNE VALIDATION SI FALSE OU TRUE --- VALEUR NULL DE BASE */
            regexpBoolName: null,
            regexpBoolFirstName: null,
            regexpBoolAdress: null,
            regexpBoolCity: null,
            regexpBoolMail: null,
            regexpBoolPassword: null,
            regexpBoolBirthday: null,
            validSignup: null,
            /* PERMET D'AFFICHER UNE ERREUR OU UNE VALIDATION SI FALSE OU TRUE --- VALEUR NULL DE BASE */

            /* Button qui permet d'afficher le mot de passe */
            boolAffichMsg: false,
            /* Button qui permet d'afficher le mot de passe */

            /* button signup qui apparait si toutes les conditions sont remplies */
            buttonSignup: false,
            /* button signup qui apparait si toutes les conditions sont remplies */
             

            /* REGEXP INSCRIPTION */
            firstNameRegExp: new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç° -]{1,}$`),
            passwordRegExp: new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})`),
            lastNameRegExp: new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç° -]{1,}$`),
            regexAddress: new RegExp(/^[a-zA-Z0-9 ]+$/),
            cityRegExp: new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç° -]{1,}$`),
            emailRegExp: new RegExp(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/i),
            dateBirthdayRegExp: new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
             /* REGEXP INSCRIPTION */
        }
         /* DATA */
    },
    methods: {
        /* Permet de vérifier les données rentrée par l'utilisateur */
       verifRegexp() {
           /* REGEXP GÉRANT TOUTES LES INFORMATIONS RENTRÉ PAR L'USER */
        let nameSignup = document.getElementById('nom-signup');
        let firstNameSignup = document.getElementById('prenom-signup');
        let adressSignup = document.getElementById('adresse-signup');
        let citySignup = document.getElementById('ville-signup');
        let mailSignup = document.getElementById('email-signup');
        let passwordSignup = document.getElementById('password-signup');
        let dateSignup = document.getElementById('date-signup');

        if (this.lastNameRegExp.test(nameSignup.value.trim()) ? this.regexpBoolName = true : this.regexpBoolName = false);
        if (this.firstNameRegExp.test(firstNameSignup.value.trim()) ? this.regexpBoolFirstName = true : this.regexpBoolFirstName = false);
        if (this.regexAddress.test(adressSignup.value.trim()) ? this.regexpBoolAdress = true : this.regexpBoolAdress = false);
        if (this.cityRegExp.test(citySignup.value.trim()) ? this.regexpBoolCity = true : this.regexpBoolCity = false);
        if (this.emailRegExp.test(mailSignup.value.trim()) ? this.regexpBoolMail = true : this.regexpBoolMail = false);
        if (this.passwordRegExp.test(passwordSignup.value.trim()) ? this.regexpBoolPassword = true : this.regexpBoolPassword = false);
        if (this.dateBirthdayRegExp.test(dateSignup.value.trim()) ? this.regexpBoolBirthday = true : this.regexpBoolBirthday = false);

         /* REGEXP GÉRANT TOUTES LES INFORMATIONS RENTRÉ PAR L'USER */

         /* If qui permet de vérifier si tout les regexp sont valide pour afficher le button Signup */

        if (this.regexpBoolName === true && this.regexpBoolFirstName === true &&
            this.regexpBoolAdress === true && this.regexpBoolCity === true &&
            this.regexpBoolMail === true && this.regexpBoolPassword === true &&
            this.regexpBoolPassword === true && this.regexpBoolBirthday === true) {
            this.buttonSignup = true;
        }
         /* If qui permet de vérifier si tout les regexp sont valide pour afficher le button Signup */

          /* If qui permet de vérifier si tout les regexp ne sont pas valide pour afficher le button Signup */
        if (this.regexpBoolName === false || this.regexpBoolFirstName === false ||
            this.regexpBoolAdress === false || this.regexpBoolCity === false ||
            this.regexpBoolMail === false || this.regexpBoolPassword === false ||
            this.regexpBoolPassword === false || this.regexpBoolBirthday === false) {
            this.buttonSignup = false;
        }
         /* If qui permet de vérifier si tout les regexp ne sont pas valide pour afficher le button Signup */

    },

  /* Function qui permet d'afficher le mot de passe rentrer par l'utilisateur */
    affichPassword() {

        /* IF qui permet de passer de l'était password à l'état text pour afficher le mot de passe */
        if (this.numberAffichMsg === false) {
            this.numberAffichMsg = true;
            document.getElementById('password-signup').setAttribute("type", "password");
        } else {
            this.numberAffichMsg = false;
            document.getElementById('password-signup').setAttribute("type", "text");
        }
        /* IF qui permet de passer de l'était password à l'état text pour afficher le mot de passe */

    }, 
    /* Function qui permet d'afficher le mot de passe rentrer par l'utilisateur */
    
    /* Fonction qui envoie les données rentrer par l'utilisateur, sous condition que les regexp soit valider  */
    sendLogin() {
         /* Vérifie si le regexp n'est pas valid et ajoute un texte indiquant d'ou vien l'erreur */
        if (this.regexpBoolName === false || this.regexpBoolFirstName === false ||
            this.regexpBoolAdress === false || this.regexpBoolCity === false ||
            this.regexpBoolMail === false || this.regexpBoolPassword === false ||
            this.regexpBoolPassword === false || this.regexpBoolBirthday === false) {
     
            this.validSignup = false;
            setTimeout(() => {
                this.validSignup = null;
            }, 3000)
            return false;
             /* Vérifie si le regexp n'est pas valid et ajoute un texte indiquant d'ou vien l'erreur */
        } else {

            /* Enregistre les données rentrer par l'user dans une variable */
            let signupCheck = {
                Name: document.querySelector('#nom-signup').value,
                FirstName: document.querySelector('#prenom-signup').value,
                Email: document.querySelector('#email-signup').value,
                Password: document.querySelector('#password-signup').value,
                Birthday: document.querySelector('#date-signup').value,
                City: document.querySelector('#ville-signup').value,
                Adress: document.querySelector('#adresse-signup').value
            };
             /* Enregistre les données rentrer par l'user dans une variable */

             /* Fetch qui envoie les données à la BDD */
            fetch('http://localhost:3000/api/auth/signup', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(signupCheck)
                })
                .then(() => {

                    /* Message de confirmation et redirige sur la page connexion */
                    this.validSignup = true;
                    setTimeout(() => {
                        location.reload();
                    }, 3000)
                    /* Message de confirmation et redirige sur la page connexion */
                })
                .catch(function() {

                     /* Message d'erreur */
                    this.validSignup = false;
                    setTimeout(() => {
                        location.reload();
                    }, 3000)
                   /* Message d'erreur */

                });
                /* Fetch qui envoie les données à la BDD */
        }
    }

}

}
/* Fonction qui envoie les données rentrer par l'utilisateur, sous condition que les regexp soit valider  */
</script>

<style>

  

.icoDiv{color:#fff;width:100%;border-radius:15px;display:flex;flex-direction:column;align-items:center;position:relative}.affichMdp{margin-top:15px;padding:5px;color:#000;height:16px;background:#fff;width:49.5%;text-align:center;font-family:Raleway,sans-serif;font-size:1.2rem}.validCheckRegexp{width:25px;height:26px;color:green;position:absolute;top:38%;right:25%}.eyesPassword{cursor:grab}.exclamationRegexp{width:30px;height:26px;color:red;position:absolute;top:38%;right:25%}.exclamationRegexpLogin{width:30px;height:26px;color:red;position:absolute;top:38%;right:29%}.validRegexpLogin{width:25px;height:26px;color:green;position:absolute;top:38%;right:29%}.infoPassword{margin-top:2%;color:#adff2f;font-size:1.3rem;text-align:center;width:40%;font-family:Raleway,sans-serif}@media screen and (max-width:700px){.infoPassword{font-size:.9rem;text-align:center;width:60%}}
</style>
