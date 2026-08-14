const officialService = require("../services/officialService");

exports.getAllOfficials = async (req, res, next) => {
  try {
    const data = await officialService.findAll();
    res.json({ 
      success: true, 
      message: "Daftar official berhasil diambil", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.getOfficialById = async (req, res, next) => {
  try {
    const data = await officialService.findById(req.params.id);
    res.json({ 
      success: true, 
      message: "Detail official berhasil diambil", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.createOfficial = async (req, res, next) => {
  try {
    const data = await officialService.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: "Official berhasil dibuat", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.updateOfficial = async (req, res, next) => {
  try {
    const data = await officialService.update(req.params.id, req.body);
    res.json({ 
      success: true, 
      message: "Official berhasil diupdate", 
      data 
    });
  } catch (error) { 
    next(error); 
  }
};

exports.deleteOfficial = async (req, res, next) => {
  try {
    await officialService.delete(req.params.id);
    res.json({ 
      success: true, 
      message: "Official berhasil dihapus" 
    });
  } catch (error) { 
    next(error); 
  }
};