
var mysql = require('mysql');
const fs = require('fs');

var pool = mysql.createConnection({
  Host: 'localhost',
  user: 'admin',
  password: '',
  database: 'Groupomania',
});

exports.createPost = (req, res) => {
    let post = {};
    if(req.file){
            post = {
                Title:'tes',
                Content:'test',
                userId:'test',
                imageUrlUser: 'test',
                NameUser: 'test',
                FirstNameUser: 'test',
                imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            };
             pool.query("INSERT INTO Post (_id, Date, Hours, Title, Content, imageUrlUser, NameUser, FirstNameUser, imageUrl, userId) VALUES(?,?,?,?,?,?,?,?,?,?)", 
                  [null, null, null, post.Title, post.Content, post.imageUrlUser, post.NameUser, post.FirstNameUser, post.imageUrl, post.userId], 
                  (erreur, result) => {
                        if (erreur) {
                        console.log(erreur);
                        res.status(500).render("erreur", { erreur });
                        } else{
                            let lastId = result.insertId;
                            res.status(201).json(lastId);
                        }
         });

        } else{
             post = {
                Title:'tes',
                Content:'test',
                userId:'test',
                imageUrlUser: 'test',
                NameUser: 'test',
                FirstNameUser: 'test'

                
            };
              pool.query("INSERT INTO Post (_id,Date,Hours, Title, Content, imageUrlUser, NameUser, FirstNameUser, userId) VALUES(?,?,?,?,?,?,?,?,?)", 
                  [null, null, null, post.Title, post.Content, post.imageUrlUser, post.NameUser, post.FirstNameUser, post.userId], 
                  (erreur, result) => {
                        if (erreur) {
                        console.log(erreur);
                        res.status(500).render("erreur", { erreur });
                        } else{
                            let lastId = result.insertId;
                            res.status(201).json(lastId);
                        }
                    
                        
         });




              }
           
        };

        exports.createPostText = (req, res) => {


            let _id = req.params.id;
            let Title = req.body.Title;
            let Content = req.body.Content;
            let userId = req.body.userId;
            let Date = req.body.date;
            let Hours = req.body.hours;
            let imageUrlUser =  req.body.imageUrlUser;
            let NameUser =  req.body.NameUser;
            let FirstNameUser =  req.body.FirstNameUser;
            
             pool.query("UPDATE `Post` SET `Title` = "+ pool.escape(Title) +",`Hours`= "+ pool.escape(Hours) +", `Date`= "+ pool.escape(Date) +", `Content` = "+ pool.escape(Content) +", `userId` = "+ pool.escape(userId) +",`imageUrlUser` = "+ pool.escape(imageUrlUser) +",`NameUser` = "+ pool.escape(NameUser) +",`FirstNameUser` = "+ pool.escape(FirstNameUser) +" WHERE _id = "+ pool.escape(_id) +" ",
                  (erreur) => {
                     if (erreur) {
                        console.log(erreur);
                        res.status(500).render("erreur", { erreur });
                        } else{
                            res.status(200).json({message: 'Contenu modifié'});
         }
      });
    };

     exports.modifTextpost = (req, res) => {

            let _id = req.params.id;
            let Title = req.body.Title;
            let Content = req.body.Content;
            
             pool.query("UPDATE `Post` SET `Title` = "+ pool.escape(Title) +", `Content` = "+ pool.escape(Content)+" WHERE _id = "+ pool.escape(_id) +" ",
                  (erreur) => {
                     if (erreur) {
                        console.log(erreur);
                        res.status(500).render("erreur", { erreur });
                        } else{
                            res.status(200).json({message: 'Contenu modifié'});
         }
      });
    };

     exports.modifImgpost = (req, res) => {

           let _id = req.params.id;
           let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

           pool.query("SELECT `imageUrl` FROM Post WHERE _id = "+ pool.escape(_id) +"",
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
            
             pool.query("UPDATE `Post` SET `imageUrl` = "+ pool.escape(imageUrl) +" WHERE _id = "+ pool.escape(_id) +" ",
                  (erreur) => {
                     if (erreur) {
                        console.log(erreur);
                        res.status(500).render("erreur", { erreur });
                        } else{
                            res.status(200).json({message: 'Contenu modifié'});
         }
      });
    };

        exports.getAllPost = (req, res, next) => {

   pool.query("SELECT * FROM Post ORDER BY Date DESC, Hours DESC ",
                  (erreur, post) => {
                     if (erreur) {
                        res.status(500).render("erreur", { erreur });
                        } else{
                        
                            post.forEach((data,i) => {
                               post[i] = data;             
                            })
                               res.status(200).json(JSON.stringify(post));
                            }
            });
};

   exports.getOnePost = (req, res, next) => {
       let userId = req.params.id;

   pool.query("SELECT * FROM Post WHERE userId ="+ pool.escape(userId) +" ORDER BY Date DESC, Hours DESC",
                  (erreur, post) => {
                     if (erreur) {
                        res.status(500).render("erreur", { erreur });
                        } else{
                            post.forEach((data,i) => {
                               post[i] = data;             
                            })
                               res.status(200).json(JSON.stringify(post));
                            }
            });
};

exports.deleteOnePost = (req, res) => {

                  let userId = req.params.id; 

                  pool.query("SELECT `imageUrl` FROM Post WHERE _id = " + pool.escape(userId) + "",
                  (erreur, result) => {
                     if (erreur) {
                          pool.query("DELETE FROM `Post` WHERE _id = " + pool.escape(userId) + "", (erreur) => {
                        if (erreur) {
                        res.status(500).render("erreur", { erreur });
                        pool.release();
                        } else{
                         res.end();
                        }          
                  }) 
                        res.status(500).release();
                        
                        } else{
                            let imgDelete = result[0].imageUrl;
                            if(imgDelete != null){
                                const filename = imgDelete.split('/images/')[1];
                                fs.unlink(`images/${filename}`, () => {})
                            }
                             pool.query("DELETE FROM `Post` WHERE _id = " + pool.escape(userId) + "", (erreur) => {
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



