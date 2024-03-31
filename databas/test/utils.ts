import { connectDatabase, closeDatabase } from "../config/connection";


function configureDatabaseConnection(descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
  
    descriptor.value = async function (...args: any[]) {
      try {
        connectDatabase();
        console.log('Database connected successfully.');
  
        const result = await originalMethod.apply(this, args);
  
        await closeDatabase();
        console.log('Database disconnected successfully.');
  
        return result;
      } catch (error) {
        console.error('Error with database connection:', error);
        throw error; // Rethrow or handle as needed
      }
    };
}

export {
    configureDatabaseConnection
}