const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
	return res.render('index');
});
router.get('/chat', (req, res) => {
	return res.render('chat');
});

// rutas 404
router.use(function(req, res ) {
	res.status(404).render('erros/404');
});

// manejador de errores en general
router.use(function(error, req, res, next) {
	res.status(500).render('erros/500');
});

module.exports = router;
