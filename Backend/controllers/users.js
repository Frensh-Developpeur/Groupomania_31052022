//  Import de Bcrypt
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
// Import de JSONWEBTOKEN
var mysql = require('mysql');


var pool = mysql.createConnection({
  Host: 'localhost',
  user: 'admin',
  password: '',
  database: 'Groupomania',
});

// Controllers de l'inscription // Signup
exports.signup = (req, res) => {
    // Hash le MDP
    bcrypt.hash(req.body.Password, 10)
        .then(hash => {

            let Name = req.body.Name;
            let FirstName = req.body.FirstName;
            let City = req.body.City;
            let Adress = req.body.Adress;
            let Email = req.body.Email;
            let Grade = 'Utilisateur';
            let Birthday = req.body.Birthday;
            let Password = hash;     

                  pool.query("INSERT INTO User (_id, Name, FirstName, City, Adress, Email, Grade, Birthday, imageUrl, Password) VALUES(?,?,?,?,?,?,?,?,?,?)", 
                  [null, Name, FirstName, City, Adress, Email, Grade, Birthday, null, Password], 
                  (erreur) => {
                        if (erreur) {
                        console.log(erreur);
                        res.status(500).render("erreur", { erreur });
                        } else{
                            res.status(201).json({message: "Compte crée"});
                        }
         });
}) 
        .then(res.status(200))
        .catch(error => res.status(500).json({ error }));
};


// Controllers de connexion // Login
exports.login = (req, res) => {
                  let email = req.body.Email; 
                  pool.query("SELECT `Password`, `_id` FROM User WHERE Email = "+ pool.escape(email) +" ",
                  (erreur, result) => {
                     if (erreur) {
                        res.status(500).render("erreur", { erreur });
                        pool.release();
                        } else{
                            let Password = result[0].Password;
                            let id = result[0]._id;
                         bcrypt.compare(req.body.Password, Password)
                              .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: id,
                        token: jwt.sign(
                            { userId: id},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                
                    })
                })
            }
      });
    
};

exports.espaceUserOne = (req, res) => {

                  let userId = req.params.id; 
                  pool.query("SELECT DATE_FORMAT(Birthday, '%d/%m/%Y') as `Birthday`, `_id`, `Name`, `FirstName`, `City`,`Adress`,`Email`, `Grade`, `imageUrl`, `Password` FROM User WHERE _id = " + pool.escape(userId) + "",
                  (erreur, result) => {
                     if (erreur) {
                          res.release();
                        res.status(500).render("erreur", { erreur });
                        } else{
                            let user = {
                                _id: result[0]._id,
                                Name: result[0].Name,
                                FirstName: result[0].FirstName,
                                City: result[0].City,
                                Adress: result[0].Adress,
                                Email: result[0].Email,
                                Grade: result[0].Grade,
                                Birthday: result[0].Birthday,
                                imageUrl: result[0].imageUrl,
                                Password: result[0].Password
                            }
                            res.status(200).json(user);
                             
            }
      });
     
}
exports.deleteUserOne = (req, res) => {

                  let userId = req.params.id; 
                  pool.query("SELECT `imageUrl` FROM User WHERE _id = " + pool.escape(userId) + "",
                  (erreur, result) => {
                     if (erreur) {
                        res.status(500).release();
                        
                        } else{
                            let imgDelete = result[0].imageUrl;
                            if(imgDelete != null){
                                const filename = imgDelete.split('/images/')[1];
                                fs.unlink(`images/${filename}`, () => {})
                            }
                       pool.query("DELETE FROM `User` WHERE _id = " + pool.escape(userId) + "", (erreur) => {
                        if (erreur) {
                        res.status(500).render("erreur", { erreur });
                        pool.release();
                        } else{

                             pool.query("DELETE FROM `Post` WHERE userId = " + pool.escape(userId) + "", (erreur) => {
                        if (erreur) {
                        res.status(500).render("erreur", { erreur });
                        pool.release();
                        } else{
                         res.end();
                        }
                  })    
                      
                        }
                  }) 
                             
        }
     })
}



exports.modifyUser = (req, res) => {


   bcrypt.hash(req.body.Password, 10)
   .then(hash => {

            let userId = req.params.id;
            let Name = req.body.Name;
            let FirstName = req.body.FirstName;
            let City = req.body.City;
            let Adress = req.body.Adress;
            let Password = hash;
            
             pool.query("UPDATE `User` SET `Name` = "+ pool.escape(Name) +", `FirstName` = "+ pool.escape(FirstName) +", `City` = "+ pool.escape(City) +", `Adress` = "+ pool.escape(Adress) +", `Password` = "+ pool.escape(Password) +" WHERE _id = "+ pool.escape(userId) +" ",
                  (erreur) => {
                     if (erreur) {
                        console.log(erreur);
                        res.status(500).render("erreur", { erreur });
                        } else{
                              pool.query("UPDATE `Post` SET `NameUser` = "+ pool.escape(Name) +", `FirstNameUser` = "+ pool.escape(FirstName) +" WHERE userId = "+ pool.escape(userId) +" ",
                  (erreur) => {
                     if (erreur) {
                        console.log(erreur);
                        res.status(500).render("erreur", { erreur });
                        } else{
                            res.status(200).json({message: 'Contenu modifié'});
            }
      });
            }
      });
   })
};





exports.modifyUserImg = (req, res) => {

                    let userId = req.params.id; 
                    let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

                 pool.query("SELECT `imageUrl` FROM User WHERE _id = "+ pool.escape(userId) +"",
                  (erreur, result) => {
                       if (erreur) {
                        res.status(500).render("erreur", { erreur });
                        pool.release();
                        } else{
                            let imgDelete = result[0].imageUrl;
                            if(imgDelete != null){
                              const filename = imgDelete.split('/images/')[1];
                             fs.unlink(`images/${filename}`, () => {})
                            } 
                        }
                  })
                  pool.query("UPDATE `User` SET `imageUrl` = "+ pool.escape(imageUrl) +" WHERE _id = "+ pool.escape(userId) +" ",
                  (erreur) => {
                     if (erreur) {
                        res.status(500).render("erreur", { erreur });
                        pool.release();
                        } else{
                              pool.query("UPDATE `Post` SET `imageUrlUser` = "+ pool.escape(imageUrl) +" WHERE userId = "+ pool.escape(userId) +" ",
                  (erreur) => {
                     if (erreur) {
                        res.status(500).render("erreur", { erreur });
                        pool.release();
                        } else{
                            res.status(200).json({message: 'Image modifié'});
            }
            
      });
            }
            
      });
};
