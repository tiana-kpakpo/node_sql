const knex = require('knex')
const knexfile = require('./knexfile')

const db = knex(knexfile.development)

// async function create_users_table() {
//     const tableExists = await db.schema.hasTable('users');
    
//         if(!tableExists) {
    
//            return db.schema.createTable('users', (table) => {
//                 table.increments('id').primary();
//                 table.string('name').notNullable();
//                 table.string('email').notNullable().unique();
//                 table.string('password');
//                 }).then(() => {
//                 console.log('"users" table created');
//                 });
//                 }
//     }

    // async function create_employees_table() {
    //     const tableExists = await db.schema.hasTable('employees');
        
    //         if(!tableExists) {
        
    //            return db.schema.createTable('employees', (table) => {
    //                 table.increments('id').primary();
    //                 table.string('name');
    //                 table.string('email');
    //                 table.string('job_title');
    //                 }).then(() => {
    //                 console.log(' "employees" table created');
    //                 });
    //                 }
    //     }


    // async function create_shopping_table() {
    //     const tableExists = await db.schema.hasTable('shopping');
        
    //         if(!tableExists) {
        
    //            return db.schema.createTable('shopping',  (table) => {
                            
    //                 }).then(() => {
    //                 console.log(' "shopping" table created');
    //                 });
    //                 }
    //     }

    // db.raw('CREATE DATABASE shopping').then(function () {
    //     console.log('database created successfully')
    //     db.destroy()    
    // })

// create_shopping_table();
// create_users_table();
// create_employees_table();




module.exports = db;