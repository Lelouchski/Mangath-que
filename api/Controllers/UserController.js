module.exports = {

    get: (req, res) => {
        res.render('Login')
    },

    create: async(req,res) =>{
            const result = validationResult(req) 
            const user = await User.findOne({ 
                where: {
                    [Op.or]: [
                        { username: req.body.username },
                        { email: req.body.email }
                    ]
                }
            })
    
            if (!result.isEmpty()) { // Si des erreurs de validation existent
                // Rendu de la vue user_create avec les données saisies et les erreurs de validation
                res.render('user_create', { email, username, password, 'errors': result.errors })
    
            } else { // Si aucune erreur de validation
                // Création d'un nouvel utilisateur avec les données saisies
                User.create({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                })
                res.redirect('/') // Redirection vers la page d'accueil
            }
        },
    }
