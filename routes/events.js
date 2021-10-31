import Router from 'express';
import { check } from 'express-validator';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/events.js';
import { isDate } from '../helpers/isDate.js';
import { fieldValidator } from '../middlewares/field-validators.js';
import {jwtValidator} from '../middlewares/jwt-validator.js'
const router = Router();

//  Events Routes
//  /api/events

// Get events
router.get('/', jwtValidator, getEvents)

// Create event
router.post('/',
  [
    check('title', 'Title is mandatory').not().isEmpty(),
    check('start', 'You must add a start date').custom(isDate),
    check('end', 'You must add a end date').custom(isDate),
    fieldValidator
],  jwtValidator, createEvent)

// Update event
router.put('/:id', jwtValidator, updateEvent)

// Delete event
router.delete('/:id', jwtValidator, deleteEvent)


export default router;