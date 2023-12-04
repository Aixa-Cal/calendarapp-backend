const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const password = encodeURIComponent('Daer@7232@');
    const dbURI = `mongodb+srv://mern_user:${password}@calendardb.8fw8ewf.mongodb.net/`;
    
    await mongoose.connect(dbURI);
    console.log('DB Online');
    
  } catch (error) {
    console.error('Error a la hora de inicializar BD:', error.message);
    throw new Error('Error a la hora de inicializar BD');
  }
};

module.exports = {
  dbConnection,
};
