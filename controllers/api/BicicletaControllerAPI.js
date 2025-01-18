let Bicicleta = require("../../models/Bicicleta");



/**
 * @swagger
 * /api/bicicletas:
 *   get:
 *     summary: Obtiene una lista de bicicletas
 *     description: Obtiene una lista de bicicletas
 *     responses:
 *       200:
 *         description: Lista de bicicletas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bicicleta'
 */
exports.bicicleta_list = function(req, res) {
    res.status(200).json ({
        bicicletas: Bicicleta.allBicis
    });    
};


/**
 * @swagger
 * /api/bicicletas/create:
 *   post:
 *     summary: Crear una nueva bicicleta
 *     description: Añade una nueva bicicleta al sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 3
 *               color:
 *                 type: string
 *                 example: "Azul"
 *               modelo:
 *                 type: string
 *                 example: "Specialized"
 *               latitud:
 *                 type: number
 *                 format: float
 *                 example: 28.497123
 *               longitud:
 *                 type: number
 *                 format: float
 *                 example: -13.862847
 *     
 */
exports.bicicleta_create = function(req,res){
    let bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.latitud, req.body.longitud];

    Bicicleta.add(bici);

    res.status(201).json({
        bicicleta: bici
    })
}

/**
 * @swagger
 * /api/bicicletas/update:
 *   put:
 *     summary: Actualiza una bicicleta
 *     description: Actualiza una bicicleta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 3
 *               color:
 *                 type: string
 *                 example: "Marron"
 *               modelo:
 *                 type: string
 *                 example: "UltraBike"
 *               latitud:
 *                 type: number
 *                 format: float
 *                 example: 28.777777
 *               longitud:
 *                 type: number
 *                 format: float
 *                 example: -13.333333
 *     responses:
 *       200:
 *         description: Bicicleta actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bicicleta'
 */
exports.bicicleta_update = function(req,res){
    let bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.latitud, req.body.longitud];

    Bicicleta.updateById(bici);

    res.status(200).json({
        bicicleta: bici
    })
}


/**
 * @swagger
 * /api/bicicletas/delete:
 *   delete:
 *     summary: Elimina una bicicleta
 *     description: Elimina una bicicleta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Bicicleta eliminada con éxito
 */
exports.bicicleta_delete = function(req,res){
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
};

