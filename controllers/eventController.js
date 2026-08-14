const eventService = require("../services/eventService");

exports.getAllEvents = async (req, res, next) => {
  try {
    const data = await eventService.findAll();
    res.json({ 
      success: true, 
      message: "Daftar event berhasil diambil", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const data = await eventService.findById(req.params.id);
    res.json({ 
      success: true, 
      message: "Detail event berhasil diambil", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const data = await eventService.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: "Event berhasil dibuat", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const data = await eventService.update(req.params.id, req.body);
    res.json({ 
      success: true, 
      message: "Event berhasil diupdate", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    await eventService.delete(req.params.id);
    res.json({ 
      success: true, 
      message: "Event berhasil dihapus" 
    });
  } catch (error) { 
    next(error); 
  }
};