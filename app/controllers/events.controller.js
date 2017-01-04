const Event = require('../models/event');

module.exports = {
	deleteEvent: (req, res) => {
  Event.remove({ slug: req.params.slug }, (err) => {
    // set flash data
    // redirect back to the events page
    req.flash('success', 'Event deleted!');
    res.redirect('/events');
  });
	},
	showEdit: (req, res) => {
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    res.render('pages/edit', {
      event: event,
      errors: req.flash('errors')
    });
  });
	},
	processEdit: (req, res) => {
  // validate information
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/events/${req.params.slug}/edit`);
  }

  // finding a current event
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    // updating that event
    event.name        = req.body.name;
    event.description = req.body.description;

    event.save((err) => {
      if (err)
        throw err;

      // success flash message
      // redirect back to the /events
      req.flash('success', 'Successfully updated event.');
      res.redirect('/events');
    });
  });
	},
	showCreate: (req, res) => {
		res.render('pages/create', {
			errors: req.flash('errors')
		});
	},
	processCreate: (req, res) => {

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('description','Description is required').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		return res.redirect('/events/create');
	}
  const event = new Event({
    name: req.body.name,
    description: req.body.description
  });

  // save event
  event.save((err) => {
    if (err)
      throw err;
		//set a successful flash message
		req.flash('success', 'Successfully created event!');
    // redirect to the newly created event
    res.redirect(`/events/${event.slug}`);
  });	
	},
	showEvents: (req, res) => {
	

  Event.find({}, (err, events) => {
    if (err) {
      res.status(404);
      res.send('Events not found!');
    }

    // return a view with data
    res.render('pages/events', { events: events, success: req.flash('success') });
  });
	
	},
  showSingle: (req, res) => {
    // get a single event
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    if (err) {
      res.status(404);
      res.send('Event not found!');
    }

    res.render('pages/single', { 
			event: event,
			success: req.flash('success')
			});
  });
	},
  seedEvents: (req, res) => {
    // create some events
    const events = [
      { name: 'Basketball', description: 'Throwing into a basket.' },
      { name: 'Swimming', description: 'Michael Phelps is the fast fish.' },
      { name: 'Weightlifting', description: 'Lifting heavy things up' },
			{ name: 'Ping Pong', description: 'Super fast paddles' }
    ];

    // use the Event model to insert/save
    for (event of events) {
      var newEvent = new Event(event);
      newEvent.save();
    }

    // seeded!
    res.send('Database seeded!');
  }
}
