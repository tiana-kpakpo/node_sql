exports.seed = function (knex){
    //delete all existing entries
return knex ('users')
.del()
.then(function () {
    // inserting seed entries
    return knex ('users').insert([
        {name: 'Tiana', email: 'titis@mail.com', password: 'admin4321'},
        {name: 'Mark', email: 'marks@mail.com', password: 'admin1234'},
    ])
})

}
