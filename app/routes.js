//create new express router
const express = require('express'),
	router = express.Router(),
	mainController = require('./controllers/main.controller'),
	eventsController = require('./controllers/events.controller');


//export router
module.exports = router;

//define routes
router.get('/', mainController.showHome);
router.get('/events', eventsController.showEvents);
router.get('/events/seed', eventsController.seedEvents);

router.get('/events/create', eventsController.showCreate);
router.post('/events/create', eventsController.processCreate);
router.get('/events/:slug/edit', eventsController.showEdit);
router.post('/events/:slug', eventsController.processEdit);

router.get('/events/:slug', eventsController.showSingle);
