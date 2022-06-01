<template>
  <div id="table-column">
      <!-- Affiche la partie espaceUser avec toute ses information -->
    <div v-show="modifUser === false" class="mb-3 page2">
      <img
        class="imgUser"
        v-if="user.imageUrl"
        :src="user.imageUrl"
        alt="image de profil"
      />
      <img
        class="imgUser"
        v-if="!user.imageUrl"
        src="../../assets/test4.jpeg"
        alt="image de profil"
      />
      <h1 class="nameUser">{{user.FirstName}} {{user.Name}}</h1>
      <p class="paramsUser">Adresse mail : {{user.Email}}</p>
      <p class="paramsUser">Date de naissance : {{user.Birthday}}</p>
      <p class="paramsUser">Ville : {{user.City}}</p>
      <p class="paramsUser">Adresse: {{user.Adress}}</p>

      <!-- Button modifier user & supprimer l'user -->
      <div v-show="modifUser === false" class="buttonUser">
        <button @click="updateUser" class="modifButtonUser">Modifier</button>
        <button @click="suppUser" class="suppButtonUser">
          Supprimer mon compte
        </button>
      <!-- Button modifier user & supprimer l'user -->

      </div>
    </div>
<!-- Affiche la partie espaceUser avec toute ses information-->
  
  <!-- Div gérant les posts personnels -->
    <div
      id="post"
      v-on:click="function(e){modifPost(e)}"
      v-show="modifUser === false"
      class="mb-5 page2"
    >
      <h2 class="titlePost">Fil d'actualité personnel</h2>
    </div>
  <!-- Div gérant les posts personnels -->

  <!-- Affiche la partie modification de l'user -->
    <div v-show="modifUser === true" class="mb-3 page2">
      <img
        class="imgUser"
        v-if="user.imageUrl && url === null"
        :src="user.imageUrl"
        alt="image de profil"
      />
      <img class="imgUser" v-if="url" :src="url" />
      <img
        class="imgUser"
        v-if="user.imageUrl === null && url === null"
        src="../../assets/test4.jpeg"
        alt="image de profil"
      />

      <label id="fontTextImg" class="form-label" for="Img-modifUser"
        >Sélectionner une image de profil
      </label>

      <div class="icoDiv">
        <input
          type="file"
          class="template-login-signup"
          encType="mutipart/form-data"
          accept=".jpg, .png, .gif"
          id="Img-modifUser"
          @change="onFileChange"
        />
        <p class="buttonUpdateImg">Modifier l'image</p>
      </div>

      <label for="Name-modifUser" id="fontText" class="form-label">Nom</label>

      <div class="icoDiv">
        <input
          type="text"
          v-on:keyup="onEnter"
          class="template-login-signup"
          id="Nom-modifUser"
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

      <label for="FirstName-modifUser" id="fontText" class="form-label"
        >Prénom</label
      >

      <div class="icoDiv">
        <input
          type="text"
          v-on:keyup="onEnter"
          class="template-login-signup"
          id="FirstName-modifUser"
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

      <label for="City-modifUser" id="fontText" class="form-label">Ville</label>

      <div class="icoDiv">
        <input
          type="text"
          v-on:keyup="onEnter"
          class="template-login-signup"
          id="City-modifUser"
          placeholder="Strasbourg"
        />

        <font-awesome-icon
          icon="fa-solid fa-triangle-exclamation"
          class="exclamationRegexp"
          v-show="regexpBoolCity === false"
        />
        <font-awesome-icon
          icon="fa-solid fa-check"
          class="verifRegexp"
          v-show="regexpBoolCity === true"
        />
      </div>

      <label for="Adress-modifUser" id="fontText" class="form-label"
        >Adresse</label
      >

      <div class="icoDiv">
        <input
          type="text"
          v-on:keyup="onEnter"
          class="template-login-signup"
          id="Adress-modifUser"
          placeholder="32 rue de paris"
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

      <label for="Password-modifUser" id="fontText" class="form-label"
        >Mot de passe</label
      >

      <div class="icoDiv">
        <input
          type="password"
          v-on:keyup="onEnter"
          class="template-login-signup"
          id="Password-modifUser"
          placeholder="Group&1mania"
        />
        <font-awesome-icon
          @click="affichMsgConf"
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
        <!-- Affiche la partie modification de l'user -->

        <!-- Button de confirmation avec message -->

      <div v-show="modifUser === true" class="buttonUserUpdate">
        <button
          @click="UserValid"
          v-show="buttonModifUser === true"
          class="updateButtonUser"
        >
          Confirmer
        </button>
        <p class="validColor" v-show="this.buttonValidModifUser === true">
          Modification réussie ! Redirection en cours..
        </p>
       <!-- Button de confirmation avec message -->

      </div>
    </div>
  </div>
</template>

<script>

/* Import de axios */
import axios from 'axios';
/* Import de axios */

/* Enregistre les données du session storage dans une variable et le convertie */
let sessionUser = JSON.parse(sessionStorage.getItem('user'));
/* Enregistre les données du session storage dans une variable et le convertie */

export default {
   name: 'espace-user',

   data(){
       return{
              /* Data */
           user : '',
           modifUser: false,
           userId: sessionUser.userId,
           tokenUser: sessionUser.token,
           url: null,
           alt_text: null,
           modifImg: false,
           boolAffichMsg: false,
           regexpBoolName: null,
           regexpBoolFirstName: null,
           regexpBoolAdress: null,
           regexpBoolCity: null,
           regexpBoolPassword: null,

           /* Permet d'afficher le button de confirmation */
           buttonModifUser: false,
           buttonValidModifUser: false,
            /* Permet d'afficher le button de confirmation */

        /* REGEXP MODIFICATION USER */
        firstNameRegExp : new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç° -]{1,}$`),
        passwordRegExp : new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})`),
        lastNameRegExp : new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç° -]{1,}$`),
        regexAddress : new RegExp(/^[a-zA-Z0-9 ]+$/),
        cityRegExp : new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç° -]{1,}$`),
        /* REGEXP MODIFICATION USER */
       }
          /* Data */
   },
   mounted () {
        /* Requete l'api de l'user et l'enregistre dans le data */
        axios.get(`http://localhost:3000/api/auth/` + sessionUser.userId, {
        headers: {
            'Authorization': 'Bearer ' + sessionUser.token,
        },
    })
    .then(response => (this.user = response.data))
    .catch((error) => {
        error
        sessionStorage.clear();
        location.reload();
        window.location.assign(`http://localhost:8080/`)
    })
     /* Requete l'api de l'user et l'enregistre dans le data */

 /* Requete l'api des post personnel */
axios.get(`http://localhost:3000/api/post/` + sessionUser.userId, {

    })
    .then(response => {
        let postdata = JSON.parse(response.data);

  /* Boucle sur le nombre de post */
        postdata.forEach((response) => {

            let deletePost = '';

             /* Vérifie qu'il y a une image sur le Post */
            if (!response.imageUrl) {
                response.imageUrl = ""
            }
             /* Vérifie qu'il y a une image sur le Post */

            let modifyText = '';

             /* Vérifie l'userId et le grade de l'user */
            if (response.userId == sessionUser.userId || response.grade == 'admin') {
                modifyText = 'Modifier';
                deletePost = 'Supprimer'
            }
             /* Vérifie l'userId et le grade de l'user */

              /* Crée un bloc de code HTML si image */
            if (response.imageUrl != "") {
                let articleCreate = document.createElement('article');
                articleCreate.className = 'cart__post';
                articleCreate.id = 'article__' + response._id + '';
                articleCreate.dataset.id = response._id;
                articleCreate.innerHTML = `
                <div class="cart__nav-div">
                    <img class="imgUserGet"  src="${response.imageUrlUser}" alt="image de profil">
                    <h2 class="namePostGet">${response.NameUser} ${response.FirstNameUser}</h2>
                    <button class="modifyPostGet" >${modifyText}</button>
                    <button class="deletePost" id="delete__${response._id}" >${deletePost}</button>

                </div>

                <img class="imgPostGet" src="${response.imageUrl}" alt="image du post">

                <div class="cart__foot-div">
                    <h4 class="titlePostGet">${response.Title}</h4>
                    <p class="contentPostGet">${response.Content}</p>
                </div>`
                document.getElementById('post').appendChild(articleCreate);

                /* Gére la suppresion du post avec une requête*/
                let deleteValide = '';
                if (response.userId == this.user._id || this.user.Grade == 'admin') {
                    deleteValide = 'http://localhost:3000/api/post/';
                } else {
                    deleteValide = 'error';
                }
                let deletePostLet = document.querySelector("#delete__" + response._id + "");
                deletePostLet.addEventListener("click", function(e) {
                    let dataSetId = e.target.closest('.cart__post').dataset.id;
                     if(dataSetId == response._id){
                    if (confirm('Voulez-vous supprimez le post ?')) {
                        axios.delete(`${deleteValide}` + response._id, {})
                            .then(() => (location.reload()))
                            .catch(error => error)
                    }
                     }
                });
            } else {

                /* Génere un bloc de code HTML si il y a  pas d'image */
                let articleCreate = document.createElement('article');
                articleCreate.className = 'cart__post';
                articleCreate.id = 'article__' + response._id + '';
                articleCreate.dataset.id = response._id;
                articleCreate.innerHTML = `
                <div class="cart__nav-div">
                    <img class="imgUserGet"  src="${response.imageUrlUser}" alt="image de profil">
                    <h2 class="namePostGet">${response.NameUser} ${response.FirstNameUser}</h2>
                    <button class="modifyPostGet">${modifyText}</button>
                    <button class="deletePost" id="delete__${response._id}" >${deletePost}</button>
                </div>
                <div class="cart__foot-div">
                    <h4 class="titlePostGet">${response.Title}</h4>
                    <p class="contentPostGet">${response.Content}</p>
                </div>`
                document.getElementById('post').appendChild(articleCreate);

                /* Gére la suppresion du post avec une requête*/
                let deleteValide = '';
                if (response.userId == this.user._id || this.user.Grade == 'admin') {
                    deleteValide = 'http://localhost:3000/api/post/';
                } else {
                    deleteValide = 'error';
                }
                let deletePostLet = document.querySelector("#delete__" + response._id + "");
                deletePostLet.addEventListener("click", function(e) {
                    let dataSetId = e.target.closest('.cart__post').dataset.id;
                     if(dataSetId == response._id){
                    if (confirm('Voulez-vous supprimez le post ?')) {
                        axios.delete(`${deleteValide}` + response._id, {})
                            .then(() => (location.reload()))
                            .catch(error => error)
                    }
                  }
                });
            }

        })

    })
    .catch((error) => {
        error
    })
},
   methods:{
  /* Function permettant de modifier un post */
        modifPost(e) {

      /* Requête l'api pour récuperer les valeurs de l'user  */
        axios.get(`http://localhost:3000/api/post/`, {})

         /* Réponse de l'api */
            .then(response => {
                let postdata = JSON.parse(response.data);

            /* Vérifie que le button cliquer est bien le bon post */
                if (e.target.className === 'modifyPostGet') {

                    /* Met un dataset sur l'article */
                    let dataSetId = e.target.closest('.cart__post').dataset.id;

                    /* Boucle sur le nombre de post */
                    postdata.forEach((post) => {

                     /* Vérifie le postId et le dataSet de l'article */
                        if (post._id == dataSetId) {

                              /* Vérifie qu'une image est renvoyée */
                            if (post.imageUrl != "") {
                                axios.get(`http://localhost:3000/api/auth/` + post.userId, {
                                        headers: {
                                            'Authorization': 'Bearer ' + sessionUser.token,
                                        },
                                    })
                                    .then(postdataNew => {
                                        let userDataNew = postdataNew.data;
                                        if (post.imageUrl != null) {

                                         /* Si l'image est null crée un bloc HTML */
                                            document.querySelector('#article__' + post._id + '').innerHTML = ` <div class="cart__nav-div">
                    <img class="imgUserGet"  src="${userDataNew.imageUrl}" alt="image de profil">
                    <h2 class="namePostGet">${userDataNew.Name} ${userDataNew.FirstName}</h2>
                </div>

                <img id="img__${post._id}" class="imgPostGet" src="${post.imageUrl}" alt="image du post">

                <div class="cart__foot-div-modif">
                    <input type="file" id="button__${post._id}" class="modifButtonPostTest">Cliquer ici pour modifier l'image</input>
                    <button class="modifButtonPost">Cliquer ici pour modifier l'image</button>
                    <h3  class="titlePostGetModif">Titre du post</h3>
                    <input id="title__${post._id}" type='text' class="inputTextModif" value="${post.Title}"></input>
                    <h4 class="titlePostGet">Contenu du post</h4>
                    <textarea id="textarea__${post._id}" class="inputTextAreaModif">${post.Content}</textarea>
                </div>

                 <div class="cart__com-div-modif">

                   <a id="post__${post._id}" class="commPostGet" href="#">Confirmer</a>
                 </div>`

                                        } else {

                                             /* Si l'image n'est pas nul crée un bloc HTML ajoutant l'image */

                                            document.querySelector('#article__' + post._id + '').innerHTML = ` <div class="cart__nav-div">
                    <img class="imgUserGet"  src="${userDataNew.imageUrl}" alt="image de profil">
                    <h2 class="namePostGet">${userDataNew.Name} ${userDataNew.FirstName}</h2>
                </div>

                <div class="cart__foot-div-modif">
                <input type="file" id="button__${post._id}" class="modifButtonPostTest">Cliquer ici pour modifier l'image</input>
                    <button class="modifButtonPost">Cliquer ici pour ajouter une image</button>
                    <h3 class="titlePostGet">Titre du post</h3>
                    <input id="title__${post._id}"  type='text' class="inputTextModif" value="${post.Title}"></input>
                    <h4 class="titlePostGet">Contenu du post</h4>
                    <textarea id="textarea__${post._id}" class="inputTextAreaModif">${post.Content}</textarea>
                </div>

                 <div class="cart__com-div-modif">

                   <a id="post__${post._id}" class="commPostGet" href="#">Confirmer</a>
                 </div>`

                                        }
                                         /* Vérifie l'id du post et le dataSet de l'article */
                                        if (post._id == dataSetId) {
                      
                                           /* Ajoute un evement au button modifier une image */
                                            var imgInput = document.querySelector("#button__" + post._id + "");
                                            imgInput.addEventListener("change", function(e) {

                                                 /* Si il y a une image, delete l'img et la remplace par la nouvelle */
                                                if (document.getElementById("img__" + post._id + "")) {
                                                    const file = e.target.files[0];
                                                    this.url = URL.createObjectURL(file);
                                                    document.getElementById("img__" + post._id + "").src = "" + this.url + "";
                                                } else {

                                                    /* Pas d'image, ajoute une  image */
                                                    const file = e.target.files[0];
                                                    this.url = URL.createObjectURL(file);
                                                    let img = document.createElement('img');
                                                    img.className = "imgPostGet";
                                                    img.src = "" + this.url + "";
                                                    let parent = document.querySelector('#article__' + post._id + '');
                                                    let nodeBefore = document.querySelector('.cart__foot-div-modif');
                                                    parent.insertBefore(img, nodeBefore);

                                                }

                                            });
                                            /* Ajoute un evenement au button de modification */
                                            var sendModif = document.querySelector("#post__" + post._id + "");
                                            sendModif.addEventListener("click", function() {
                                                if (document.querySelector("#title__" + post._id + "").value === "" || document.querySelector("#textarea__" + post._id + "").value === "") {
                                                    alert('Erreur ! Les champs ne doivent pas être vide !')
                                                    return false;
                                                }
                                                  /* Enregistre les données text modifiées */
                                                let updatePost = {
                                                    Title: document.querySelector("#title__" + post._id + "").value,
                                                    Content: document.querySelector("#textarea__" + post._id + "").value,
                                                }

                                                 /* Si il y a une image, fait une requête et modifie l'image dans la BDD */
                                                if (document.getElementById("button__" + post._id + "").files[0]) {
                                                    let image = document.getElementById("button__" + post._id + "").files[0]
                                                    // Création d'un formData obligatoire pour envoi de l'image
                                                    let formData = new FormData()
                                                    formData.append('image', image)

                                                    // Envoi des données sur l'url du serveur (mettez la votre) en POST en envoyant le formData contenant notre image et notre texte
                                                    axios.put('http://localhost:3000/api/post/postImg/' + post._id, formData, {
                                                            headers: {
                                                                'Authorization': 'Bearer ' + sessionUser.token
                                                            }
                                                        })
                                                        .then((resp) => {
                                                            resp
                                                        })
                                                        .catch((err) => {
                                                            err.response
                                                        })
                                                }
                                                 /* Si il y a une image, fait une requête et modifie l'image dans la BDD */

                                                /* Envoie les données text à la BDD */
                                                fetch('http://localhost:3000/api/post/postText/' + post._id, {
                                                        method: "PUT",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-type': 'application/json',
                                                            'Authorization': 'Bearer ' + sessionUser.token,
                                                        },
                                                        body: JSON.stringify(updatePost),
                                                    })
                                                    .then(modify => modify)
                                                    .catch((error) => {
                                                        error
                                                    })

                                                location.reload();
                                                /* Envoie les données text à la BDD et recharge la page */
                                            });
                                        }
                                    })

                            }
                        }

                    })
                }
            })
    },
    UserValid() {
        let updateUser = {
            Name: document.querySelector('#Nom-modifUser').value,
            FirstName: document.querySelector('#FirstName-modifUser').value,
            Password: document.querySelector('#Password-modifUser').value,
            City: document.querySelector('#City-modifUser').value,
            Adress: document.querySelector('#Adress-modifUser').value,
        };


        fetch('http://localhost:3000/api/auth/' + this.userId, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',

                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + sessionUser.token,
                },
                body: JSON.stringify(updateUser),
            })
            .then(modify => modify)
            .catch((error) => {
                error
                return false;
            })
        this.buttonValidModifUser = true;
        setTimeout(() => {
            location.reload();
        }, 2000)


    },
    /* Vérifie les données avec un regexp */
    onEnter() {
        let nameSignup = document.getElementById('Nom-modifUser');
        let firstNameSignup = document.getElementById('FirstName-modifUser');
        let adressSignup = document.getElementById('Adress-modifUser');
        let citySignup = document.getElementById('City-modifUser');
        let passwordSignup = document.getElementById('Password-modifUser');

        if (this.lastNameRegExp.test(nameSignup.value.trim()) ? this.regexpBoolName = true : this.regexpBoolName = false);
        if (this.firstNameRegExp.test(firstNameSignup.value.trim()) ? this.regexpBoolFirstName = true : this.regexpBoolFirstName = false);
        if (this.regexAddress.test(adressSignup.value.trim()) ? this.regexpBoolAdress = true : this.regexpBoolAdress = false);
        if (this.cityRegExp.test(citySignup.value.trim()) ? this.regexpBoolCity = true : this.regexpBoolCity = false);
        if (this.passwordRegExp.test(passwordSignup.value.trim()) ? this.regexpBoolPassword = true : this.regexpBoolPassword = false);
        this.regexpBoolName = (this.lastNameRegExp.test(nameSignup.value.trim()) ? true : false);

        if (this.regexpBoolName === true && this.regexpBoolFirstName === true &&
            this.regexpBoolAdress === true && this.regexpBoolCity === true &&
            this.regexpBoolPassword === true) {
            this.buttonModifUser = true;
        }
        if (this.regexpBoolName === false || this.regexpBoolFirstName === false ||
            this.regexpBoolAdress === false || this.regexpBoolCity === false ||
            this.regexpBoolPassword === false) {
            this.buttonModifUser = false;
        }
    },
        /* Vérifie les données avec un regexp */


 /* Affiche le password */
    affichMsgConf() {
        if (this.numberAffichMsg === false) {
            this.numberAffichMsg = true;
            document.getElementById('Password-modifUser').setAttribute("type", "password");
        } else {
            this.numberAffichMsg = false;
            document.getElementById('Password-modifUser').setAttribute("type", "text");
        }
    },
  /* Affiche le password */

    /* Permet d'afficher l'image sélectionner à la modification de l'image de l'user et d'envoyée l'image à la BDD */
    onFileChange(e) {
        this.modifImg = true;
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);
        // Récupération de l'image
        let image = document.getElementById('Img-modifUser').files[0]
        // Création d'un formData obligatoire pour envoi de l'image
        let formData = new FormData()
        formData.append('image', image)
        formData.append('alt_text', this.alt_text)
        // Envoi des données sur l'url du serveur (mettez la votre) en POST en envoyant le formData contenant notre image et notre texte
        axios.put('http://localhost:3000/api/auth/img/' + this.userId, formData, {
                headers: {
                    'Authorization': 'Bearer ' + sessionUser.token
                }
            })
            .then((resp) => {
                if (confirm("Image modifié ! Voulez-vous retournée à l'accueil ?")) {
                    location.reload();

                }
                resp
            })
            .catch((err) => {
                err.response
            })
             /* Permet d'afficher l'image sélectionner à la modification de l'image de l'user et d'envoyée l'image à la BDD */
    },
   /* Met à jour l'user */
    updateUser() {
        this.modifUser = true;
    },
    /* Met à jour l'user */

     /* Supprime l'user */
    suppUser() {
        let suppConfirm = confirm("Voulez-vous supprimez votre compte ?")
        if (suppConfirm === true) {
            axios
                .delete(`http://localhost:3000/api/auth/` + this.userId, {
                    headers: {
                        'Authorization': 'Bearer ' + sessionUser.token,
                    },
                })
                .then(response => response)
            sessionStorage.clear();
            location.reload();
            window.location.assign(`http://localhost:8080/`)
        }
    }
}
 /* Supprime l'user */

}
</script>

<style>
.titlePost{font-size:2rem;margin-bottom:5%}#table-column{flex-direction:column}.mb-3{padding-top:0}.test8{width:25px;height:26px;color:green;position:absolute;top:38%;right:25%}.test9{cursor:grab}.test7{width:30px;height:26px;color:red;position:absolute;top:38%;right:25%}.test11{width:30px;height:26px;color:red;position:absolute;top:38%;right:29%}.test10{width:25px;height:26px;color:green;position:absolute;top:38%;right:29%}.buttonUpdateImg{color:#fff;border-radius:15px;background:green;position:absolute;width:49%;height:100%;font-family:Raleway,sans-serif;font-size:1.5rem;display:flex;align-content:center;align-items:center;justify-content:center}#Img-modifUser{z-index:1;opacity:0;padding-top:15px;margin-top:5px;cursor:grab}#fontTextImg{margin-top:3%;font-family:Raleway,sans-serif;font-size:1.2rem;margin-bottom:10px;margin-top:20px;object-fit:cover}.page2{font-family:Raleway,sans-serif}.imgUser{height:400px;width:100%;border-radius:0;border-top-left-radius:15px;border-top-right-radius:15px;image-rendering:auto;object-fit:cover}.imgUserUpdate{height:200px;width:100%;border-radius:0;border-top-left-radius:15px;border-top-right-radius:15px;image-rendering:auto}.nameUser{text-transform:uppercase;font-size:2rem;margin-bottom:4%;margin-top:5%}.paramsUser{font-size:1.1rem;margin-bottom:3%}.buttonUser{display:flex;flex-direction:column;flex-wrap:wrap}.modifButtonUser{padding:10%;color:#fff;background:green;border:0;cursor:grab;border-radius:15px;font-size:1rem;margin-bottom:5%;font-family:Raleway,sans-serif}.buttonUserUpdate{width:100%;display:flex;flex-direction:column;align-items:center}.updateButtonUser{color:#fff;background:green;border:0;cursor:grab;border-radius:15px;font-size:1.2rem;margin-bottom:5%;font-family:Raleway,sans-serif;margin-top:20px;padding-left:20%;padding-right:20%;padding-top:1.5%;padding-bottom:1.5%}.suppButtonUser{padding:5%;color:#fff;background:red;border:0;cursor:grab;border-radius:15px;font-size:1rem;font-family:Raleway,sans-serif}@media screen and (max-width:900px){.imgUserGet{width:10%!important}.deletePost,.modifyPostGet{font-size:1.2rem!important}.paramsUser{font-size:.9rem}.borderCreate{width:80%!important}}@media screen and (max-width:768px){.cart__post{width:90%!important}}@media screen and (max-width:600px){.mb-5{width:100%!important;border-radius:0!important}.deletePost,.modifyPostGet{font-size:.8rem!important}}@media screen and (max-width:425px){.titlePostGet{font-size:1.6rem!important}.contentPostGet{font-size:1rem!important}.borderCreate{width:95%!important}.titlePost{font-size:1.6rem!important}}@media screen and (max-width:375px){.mb-5{margin-top:0!important}.imgUser{height:250px}.buttonUpdateImg{font-size:1rem}}@media screen and (max-width:350px){.namePostGet{font-size:1.1rem!important}.imgUserGet{width:12%!important}}
</style>
