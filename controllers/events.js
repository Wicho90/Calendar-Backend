const { request, response } = require('express');
const Event = require('../models/Event');


const findAllEvents = async( req = request, res = response ) => {

    try {
        
        const events = await Event.find()
                                    .populate('user', 'name');

        res.status(200).json({
            ok: true,
            events
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const createEvent = async ( req = request, res = response ) => {
    
    const event = new Event( req.body );

    try {
        
        event.user = req.uid;
        const eventDb = await event.save();
        
        res.status(201).json({
            ok: true,
            event: eventDb
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
}

const updateEvent = async( req = request, res = response ) => {
    const { id } = req.params;
    const { uid } = req;

    try {
        
        const event = await Event.findById( id );
        
        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ese id'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }
        
        const  nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( id, nuevoEvento, { new: true} );
        res.status(201).json({
            ok: true,
            event: eventUpdated
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
}

const deleteEvent = async( req = request, res = response ) => {
    const { id } = req.params;
    const { uid } = req; 
    try {
        
        const eventDb = await Event.findById(id);

        if ( !eventDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'El id no existe en la base de datos',
            });
        }

        if (eventDb.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene el permiso para remover este elemento'
            })
        }

        await Event.deleteOne(eventDb);

        res.status(200).json({
            ok: true,
            msg: 'Removido',
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
}



module.exports = {
    findAllEvents,
    createEvent,
    updateEvent,
    deleteEvent
}