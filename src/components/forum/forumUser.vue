<template>
<!-- Affiche l'image sélectionner à la création d'un post -->
  <div class="principalForumDiv">
    <div class="divImgPost" v-if="url">
      <label id="fontTextImgPost" class="form-label" for="Img-modifUser"
        >Image Sélectionner</label
      >
      <img class="imgPost" :src="url" />
    </div>
    <!-- Affiche l'image sélectionner à la création d'un post -->

    <!-- Affiche l'image de profil de l'user -->
    <div class="borderCreate">
      <img
        class="imgProfilCreate"
        v-if="user.imageUrl"
        :src="user.imageUrl"
        alt=""
      />
      <img
        class="imgProfilCreate"
        v-if="!user.imageUrl"
        src="../../assets/test4.jpeg"
        alt="image de profil"
      />
      <!-- Affiche l'image de profil de l'user -->

      <!-- Affiche le text rentrée par l'user lors de la création d'un post -->
      <div class="inputDiv">
        <input
          class="inputTitle"
          id="inputTitle"
          enctype="text/html"
          type="text"
          placeholder="Titre du Post"
        />
        <textarea
          resize="none"
          class="inputText"
          enctype="text/html"
          id="inputText"
          placeholder="Contenu du post"
        ></textarea>
      </div>
         <!-- Affiche le text rentrer à la création d'un post -->

         <!-- Input qui gère l'image sélectionner à la création d'un -->
      <input
        type="file"
        encType="mutipart/form-data"
        accept=".jpg, .png, .gif"
        id="imgPostUserInput"
        @change="onFileChangePost"
      />
       <!-- Input qui gère l'image sélectionner à la création d'un -->

      <!-- Button add img & send le post -->
      <button id="imgPostUser">Ajoutez une image</button>
      <button @click="PostValid" id="postUser">Poster</button>
       <!-- Button add img & send le post -->

    </div>

    <!-- Message de confirmation création d'un post -->
    <div v-show="this.validPost != null" class="mb-3 page2">
      <p class="validColor" v-show="this.validPost === true">
        Création du post en cours..
      </p>
    <!-- Message de confirmation création d'un post -->
    
     <!-- Message d'erreur création d'un post -->
      <p class="errorColor" v-show="this.validPost === false">
        Les champs titre et contenu sont requis !
      </p>
      <!-- Message d'erreur création d'un post -->

    </div>

    <!-- Div qui gère les post -->
    <div id="post" v-on:click="function(e){modifPost(e)}" class="mb-5 page2">
      <h2 class="titlePost">Fil d'actualité</h2>
    </div>
     <!-- Div qui gère les post -->

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

    data() {
        return {
            /* Data */

            /* Stock les données de l'user de l'api */
            user: '',
            /* Stock les données de l'user de l'api */

            url: null,
            alt_text: 'test',
            post_id: '',
            modifPostData: false,
            validPost: null,
            /* Data */
        }
    },
    methods: {
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

                             /* Change le chemin en fonction du grade */
                                let userGrade = '';
                                if (this.user.Grade == 'admin') {
                                    userGrade = `http://localhost:3000/api/auth/admin/`;
                                } else {
                                    userGrade = `http://localhost:3000/api/auth/`;
                                }
                             /* Change le chemin en fonction du grade */
                             
                             /* Requête l'api en fonction du grade et de l'id */
                                axios.get(`${userGrade}` + post.userId, {
                                        headers: {
                                            'Authorization': 'Bearer ' + sessionUser.token,
                                        },
                                    })

                                    /* Réponse de l'api */
                                    .then(postdataNew => {
                                        let userDataNew = postdataNew.data;

                                        /* Si l'image est null crée un bloc HTML */
                                        if (post.imageUrl != null) {

                                            document.querySelector('#article__' + post._id + '').innerHTML = ` <div class="cart__nav-div">
                    <img class="imgUserGet"  src="${userDataNew.imageUrl}" alt="image de profil">
                    <h2 class="namePostGet">${userDataNew.Name} ${userDataNew.FirstName}</h2>
                </div>

                <img id="img__${post._id}" class="imgPostGet" src="${post.imageUrl}" alt="image du post">

                <div class="cart__foot-div-modif">
                    <input type="file" accept=".jpg, .png, .gif" id="button__${post._id}" class="modifButtonPostTest">Cliquer ici pour modifier l'image</input>
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
                <input type="file" accept=".jpg, .png, .gif" id="button__${post._id}" class="modifButtonPostTest">Cliquer ici pour modifier l'image</input>
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
                                                /* Si les champs sont vide, affiche une erreur */
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

    /* Permet d'afficher l'image sélectionner à la création d'un post */
    onFileChangePost(e) {
        this.modifImg = true;
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);
    },
        /* Permet d'afficher l'image sélectionner à la création d'un post */

    /* Permet d'envoyée les données à la BDD lors de la création d'un post */
    PostValid() {

        /* Enregistre la date du post */
        var d = new Date();
        var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        /* Enregistre la date du post */

       /* Met une erreur si tout les champs de la création du post ne sont pas remplie */
        if (document.querySelector('#inputTitle').value === '' || document.querySelector('#inputText').value === '') {
            this.validPost = false;
            setTimeout(() => {
                this.validPost = null;
            }, 2000)
            return false;
        }
        /* Met une erreur si tout les champs de la création du post ne sont pas remplie */

      /* Enregistre les données rentrée par l'user ainsi que sont userID, la date, son name, son FirstName, et son imageUrl */
        let updatePost = {
            Title: document.querySelector('#inputTitle').value,
            Content: document.querySelector('#inputText').value,
            userId: sessionUser.userId,
            date: date,
            hours: hours,
            imageUrlUser: this.user.imageUrl,
            NameUser: this.user.Name,
            FirstNameUser: this.user.FirstName
        };
         /* Enregistre les données rentrée par l'user ainsi que sont userID, la date, son name, son FirstName, et son imageUrl */


      /* Enregistre l'image sélectionner et l'envoie à la BDD */
        let image = document.getElementById('imgPostUserInput').files[0];
        let formData = new FormData()
        formData.append('image', image)

        axios.post(`http://localhost:3000/api/post/`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + sessionUser.token,
                },
            }) 
            /* Enregistre l'image sélectionner et l'envoie à la BDD */

            .then((res) => {
                let responsePost = JSON.parse(res.data);

                /* Envoie les données text à la BDD de la création du post */
                fetch(`http://localhost:3000/api/post/` + responsePost, {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                            'Authorization': 'Bearer ' + sessionUser.token,
                        },

                        body: JSON.stringify(updatePost),

                    })
                    .then(() => {})

                    .catch((error) => {
                        error
                    })
            })

            .catch((error) => {
                error
            })
            /* Envoie les données text à la BDD de la création du post */

            /* Met un message de confirmation */
        this.validPost = true;
        setTimeout(() => {
            this.validPost = null;
            location.reload();
        }, 3000)
        /* Met un message de confirmation */

    }

},
mounted() {
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

     /* Requete l'api des post */
    axios.get(`http://localhost:3000/api/post/`, {

        })
        .then(response => {
            let postdata = JSON.parse(response.data);

        /* Boucle sur le nombre de post */
            postdata.forEach((response) => {

        /* Vérifie qu'il y a une image sur le Post */
                if (!response.imageUrl) {
                    response.imageUrl = ""
                }
        /* Vérifie qu'il y a une image sur le Post */

        /* Initalise deux variables */
                let modifyText = '';
                let deletePost = '';
        /* Initalise deux variables */

        /* Vérifie l'userId et le grade de l'user */
                if (response.userId == sessionUser.userId || this.user.Grade == 'admin') {
                    modifyText = 'Modifier';
                    deletePost = 'Supprimer'
                }
        /* Vérifie l'userId et le grade de l'user */
        
       /* Ajoute une image par défaut si pas d'image recu */
                if (response.imageUrl != "") {
                    let imageUser = ''
                    if (response.imageUrlUser != null) {
                        imageUser = response.imageUrlUser;
                    } else {
                        imageUser = '../../assets/test4.jpeg'
                    }
                      /* Ajoute une image par défaut si pas d'image recu */

                      /* Crée un bloc de code HTML si image */
                    let articleCreate = document.createElement('article');
                    articleCreate.className = 'cart__post';
                    articleCreate.id = 'article__' + response._id + '';
                    articleCreate.dataset.id = response._id;
                    articleCreate.innerHTML = `

                <div class="cart__nav-div">
                    <img class="imgUserGet"  src="${imageUser}" alt="image de profil">
                    <h2 class="namePostGet">${response.NameUser} ${response.FirstNameUser}</h2>
                    <button class="modifyPostGet" href="#">${modifyText}</button>
                    <button class="deletePost" id="delete__${response._id}" >${deletePost}</button>
                </div>

                <img class="imgPostGet" src="${response.imageUrl}" alt="image du post">

                <div class="cart__foot-div">
                    <h4  class="titlePostGet">${response.Title}</h4>
                    <p class="contentPostGet">${response.Content}</p>
                </div>`
                    document.getElementById('post').appendChild(articleCreate);
                    /* Crée un bloc de code HTML si image */

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
                     /* Gére la suppresion du post avec une requête*/

                } else {
                     /* Génere un bloc de code HTML si il y a  pas d'image */
                    let imageUser = ''
                    if (response.imageUrlUser != null) {
                        imageUser = response.imageUrlUser;
                    } else {
                        imageUser = '../../assets/test4.jpeg'
                    }
                    let articleCreate = document.createElement('article');
                    articleCreate.className = 'cart__post';
                    articleCreate.id = 'article__' + response._id + ''
                    articleCreate.dataset.id = response._id;
                    articleCreate.innerHTML = `
                <div class="cart__nav-div">
                    <img class="imgUserGet"  src="${imageUser}" alt="image de profil">
                    <h2 class="namePostGet">${response.NameUser} ${response.FirstNameUser}</h2>
                    <button class="modifyPostGet" >${modifyText}</button>
                    <button class="deletePost" id="delete__${response._id}" >${deletePost}</button>
                </div>
                <div class="cart__foot-div">
                    <h4 class="titlePostGet">${response.Title}</h4>
                    <p class="contentPostGet">${response.Content}</p>
                </div>`
                    document.getElementById('post').appendChild(articleCreate);
                    /* Génere un bloc de code HTML si il y a  pas d'image */

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
                      /* Gére la suppresion du post avec une requête*/

                    });


                }
            })
        })
        .catch((error) => {
            error
        })
}
}
</script>

<style>
.deletePost{color:#000;font-size:1.3rem;right:1%;top:50%;cursor:-webkit-grab;cursor:grab;position:absolute;border:0;background:0 0;font-family:Raleway}.modifButtonPost{padding:2%;width:45%;height:14.8%;color:#fff;background:green;border:0;cursor:-webkit-grab;cursor:grab;border-radius:15px;font-size:1rem;font-family:Raleway,sans-serif;margin-top:2%;position:absolute}.modifButtonPostTest{z-index:1;opacity:0;background:#000;padding:2%;color:#fff;border:0;cursor:-webkit-grab;cursor:grab;border-radius:15px;font-size:1rem;font-family:Raleway,sans-serif;margin-top:2%}.titlePostGetModif{font-size:2rem;font-family:Raleway,sans-serif;color:#000;padding-top:3%}.cart__foot-div-modif{position:relative;background:#fff;display:flex;height:100%;flex-direction:column;align-items:center;background:#fff}.cart__com-div-modif{width:100%;height:60px;background:#fff;border-top:1px solid grey;display:flex;flex-direction:row;align-items:center;justify-content:center}.inputTextModif{font-family:Raleway,sans-serif;font-size:2rem;height:8%;width:70%;margin-bottom:2%;margin-top:2%;margin-left:.5%;resize:none}.inputTextAreaModif{font-family:Raleway,sans-serif;font-size:1.2rem;height:8%;width:70%;margin-bottom:2%;margin-top:2%;margin-left:.5%;resize:none}.modifyPostGet{color:#000;font-size:1.4rem;right:2%;top:10%;cursor:-webkit-grab;cursor:grab;position:absolute;border:0;background:0 0;font-family:Raleway}.affichCommPost{color:#000;font-size:1.2rem;right:2%;cursor:grab;position:absolute}.numberLikePostGet{font-size:1.5rem;margin-left:2%;color:#fff;padding:1%;padding-top:.5%;padding-bottom:.5%;border-radius:50%;background:green}.numberDislikePostGet{font-size:1.5rem;margin-left:2%;color:#fff;padding:1%;padding-top:.5%;padding-bottom:.5%;border-radius:50%;background:red}.div-like{padding-top:3%;display:flex;flex-direction:row;position:relative}.likePostGet{color:#000;margin-left:4%;margin-top:1.3%;font-size:1.3rem;cursor:grab}.fa-solid.fa-heart{font-size:2rem;background:#000}.cart__com-div{width:100%;height:60px;background:#fff;border-top:1px solid grey;display:flex;flex-direction:row;align-items:center}.commPostGet{color:#000;font-size:1.2rem;padding-left:1.5%}.textareaPostGet{width:84%;border:0;height:57px;padding-left:5%;font-size:1.1rem;font-family:Raleway,sans-serif}.contentPostGet{font-size:1.2rem;font-family:Raleway,sans-serif;color:#000;padding-top:2%;padding-left:4%;width:80%;padding-bottom:10%;padding-top:5%}.cart__foot-div{background:#fff;height:100%}.titlePostGet{font-size:2rem;font-family:Raleway,sans-serif;color:#000;padding-top:3%;padding-left:4%}.namePostGet{color:#000;font-size:1.2rem;font-family:Raleway,sans-serif;font-weight:700;margin-left:3%}.imgPostGet{border-radius:0;width:100%;height:400px;object-fit:cover}.imgUserGet{border-radius:50%;width:6%;height:40px;object-fit:cover;margin-left:4%}.cart__post{width:65%;height:100%;border:1px solid #a89999;margin-bottom:5%}.cart__nav-div{display:flex;flex-direction:row;background:#fff;height:80px;align-items:center;position:relative}.mb-5{color:#fff;padding-top:5%;width:75%;padding-bottom:5%;margin-top:3%;border-radius:15px;display:flex;flex-direction:column;align-items:center;background-size:2000%;background-image:url("../../assets/background-login.webp")}.divImgPost{border:1px solid #00000059;width:49.8%;background-image:url("../../assets/background-login.webp");display:flex;flex-direction:column;align-items:center}#fontTextImgPost{font-family:Raleway,sans-serif;font-size:1.5rem;color:#fff;padding-top:5px;text-transform:uppercase}.imgPost{width:90%;height:175px;object-fit:cover;padding-top:10px;border-radius:21px;margin-bottom:30px}#imgPostUser{height:29.5%;width:50%;position:absolute;bottom:0;left:0;border-radius:15px;border:0;background:green;color:#fff;font-family:Raleway,sans-serif;font-size:1.2rem;border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:0;border:1px solid #00000059;cursor:grab}#imgPostUserInput{height:29.5%;width:50%;position:absolute;bottom:0;left:0;border-radius:15px;border:0;background:green;color:#fff;font-family:Raleway,sans-serif;font-size:1.2rem;border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:0;border:1px solid #00000059;cursor:grab;z-index:1;opacity:0}#postUser{height:29.5%;width:50%;position:absolute;bottom:0;right:0;border-radius:15px;border:0;background:green;color:#fff;font-family:Raleway,sans-serif;font-size:1.2rem;border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;border:1px solid #00000059;cursor:grab}.borderCreate{margin-top:3%;width:50%;height:170px;background-image:url("../../assets/background-login.webp");border-radius:15px;display:flex;position:relative;flex-direction:row;font-family:Raleway,sans-serif;margin-bottom:2%}.imgProfilCreate{object-fit:cover;height:69.5%;padding-top:.5px;border-radius:0;object-fit:cover;border-top-left-radius:15px;border-right:1px solid #00000059}.inputText{width:100%;height:67%;border:0;border-top:1px solid #00000059;border-right:1px solid #00000059;font-family:Raleway,sans-serif;font-size:1rem;resize:none}.inputTitle{width:100%;height:25%;border:0;border-top:1px solid #00000059;border-right:1px solid #00000059;font-family:Raleway,sans-serif;font-size:1.7rem;border-top-right-radius:15px}.principalForumDiv{width:100%;display:flex;flex-direction:column;align-items:center}.inputDiv{width:82.3%;height:70%}@media screen and (max-width:900px){.fontTextImgPost{font-size:1.2rem!important}.divImgPost{width:90%}}@media screen and (max-width:1024px){.inputTextModif{font-size:1.1rem!important}.inputTextAreaModif{font-size:.9rem!important}.modifButtonPostTest{font-size:2rem!important}.modifButtonPost{font-size:.8rem!important}}
</style>
