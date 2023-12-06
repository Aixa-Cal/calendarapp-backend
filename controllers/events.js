const {response} = require ('express');
const Event = require('../models/Events');

const getEvents = async (req, res = response) => {

    const events = await Event.find();
                                  

    res.json({
        ok: true,
        events
    }) 
}

const createEvents = async (req, res = response) => {
    try {
        // Verificar si req.uid tiene un valor
        if (!req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User ID is missing'
            });
        }

        // Crear un nuevo evento con req.body y asignarle el usuario
        const event = new Event({
            ...req.body,
            user: req.uid
        });

        // Guardar el evento en la base de datos
        const eventSaved = await event.save();

        res.json({
            ok: true,
            event: eventSaved
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact with the administrator'
        });
    }
}

const updateEvents = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event){
           return res.status(404).json({
                ok:false,
                msg: 'Event does not match ID inserted'
            });
        }
//

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to edit this event'
            });

        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent);
        
        res.json({
            ok:true,
            event: eventUpdated
        });
        
    } catch (error) {
        console.log(error)
       return res.status(500).json({
            ok:false,
            msg:'Contact with the administrator'
        });
        
    }

    res.json({
        ok: true,
        eventId,
    }) 
}

const deleteEvents = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event){
          return res.status(404).json({
                ok: false,
                msg: 'Event does not match ID inserted'
            });
        }
//

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to delete this event'
            });

        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

       await Event.findByIdAndDelete(eventId);
        
        res.json({
            ok:true,
            
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Contact with the administrator'
        });
        
    }

    res.json({
        ok: true,
        eventId,
    }) 
}

   





module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}

