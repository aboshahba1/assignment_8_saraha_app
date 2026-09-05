import { Sequelize } from'sequelize';


export const sequelize = new Sequelize('seq_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});
export const connectDb = async()=>{
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}}
export const syncDb = async()=>{
    try {
  console.log(Object.keys(sequelize.models));
  await sequelize.sync({alter :false});
  console.log('sync has been established successfully.');
} catch (error) {
  console.error('Unable to sync to the database:', error);
}
}