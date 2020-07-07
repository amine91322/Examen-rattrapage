let express = require('express'),
    app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
    let bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

// ------ Resources ------ //
    var ingredients= [{
        "nom" : "sel",
        "mesure" : "m",
        "description" : "épice",
        "temps_cuisson" : "0"
        }   
    ]

    var pizzas= [{
    "nom":"orientale",
    "description" : "description",
    "ingredients" :  ["poivron vert","poivron rouge","oignon", "steak haché", "oeuf", "sauce tomate","sel", "poivre"],
    "quantiteIngredient" : ["0.5","0.5","0.5","1","1"]
        }
    ]


// ******* ROUTES *******  //
   // Page d'accueil //
   app.get('/',(req,res)=>{
    res.status(200).json("Hello");
});

//  PIZZAS  //

//  Obtention d'une ou de toutes les pizzas //
    app.get('/pizzas',(req, res)=>{
            res.status(200).json(pizzas);
        }
    );

//  Obtention d'une pizza   //
    app.get('/pizza/:nom',(req, res)=>{
        console.log("salut");
        var pizza = pizzas.find(element => element.nom == req.params.nom);
        console.log(pizza);

        res.status(200).json(pizza);
        }
    );

//  Ajout d'une pizza    //
    app.post('/pizza/:nom/:description/:ingredients/:quantiteIngredient', (req, res)=>{
        pizzas.push(req.params);
        res.status(200).json(pizzas);
    });

// Suppression d'une pizza //
    app.delete('/pizza/:nom', (req, res)=>{
        var pizza = {"nom" : req.params.nom };
        var index = temp.findIndex(element => (element.nom == pizza.nom));
        temp.splice(index, 1);
        res.status(200).json(pizzas);
    });

//  Ingrédients  //

    //  Obtention de tous les ingrédients //
        app.get('/ingredients',(req, res)=>{
            res.status(200).json(ingredients);
            }
        );

    //  Obtention d'un ingrédient  //
        app.get('/ingredient/:nom',(req, res)=>{
            var ingredient = ingredients.find(element => element.nom == req.params.nom);
            res.status(200).json(ingredients);
            }
        );

    //  Ajout d'un ingrédient  //
        app.post('/ingredient/:nom/:mesure/:description/:temps_cuisson', (req, res)=>{
            ingredients.push(req.params);
            res.status(200).json(ingredients);
        });

    // Suppression d'un ingrédient//
        app.delete('/ingredient/:nom', (req, res)=>{
            var ingredient = {"nom" : req.params.nom };
            var index = ingredients.findIndex(element => (element.nom == ingredient.nom));
            ingredients.splice(index, 1);
            res.status(200).json(ingredients);
        });

// ******* LANCER LE SERVEUR ******* //
    app.listen(3000,function(){
        console.info('HTTP server started on port 3000');
        }
    )