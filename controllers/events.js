import {Event} from '../models/Event.js';

export const getEvents = async(req, res) => {

  const events = await Event.find().populate('user','name'); // populate filtra el find del user -> 'user', 'name password etc...'

  return res.status(201).json({
    ok: true,
    events
  })
}

export const createEvent = async(req, res) => {

  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save()
    res.json({
      ok: true,
      event: savedEvent
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'An error has occurred'
    })
  }
}

export const updateEvent = async(req, res) => {

  const eventID = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID)
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'The event does not exist'
      })
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You can't edit this event"
      })
    }
    const newEvent = {
      ...req.body,
      user: uid
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, {new:true}); // new true return the updated event, by default return the previus

    return res.status(201).json({
      ok: true,
      event: updatedEvent
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'An error has ocurred'
    })
  }
}

export const deleteEvent =  async(req, res) => {
  
  const eventID = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID)
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'The event does not exist'
      })
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You can't delete this event"
      })
    }

    await Event.findByIdAndDelete(eventID); // new true return the updated event, by default return the previus

    return res.status(201).json({
      ok: true
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'An error has ocurred'
    })
  }
}