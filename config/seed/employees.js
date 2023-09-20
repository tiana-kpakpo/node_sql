exports.seed = function (knex){
    //delete all existing entries
return knex ('employees')
.del()
.then(function () {
    // inserting seed entries
    return knex ('employees').insert([
        {name: 'Tiana', email: 'titis@mail.com', job_title: 'Network Operations Engineer'},
        {name: 'Mark', email: 'marks@mail.com', job_title: 'Civil Engineer'},
        {name: 'Emmanuel', email: 'emma@mail.com', job_title: 'Operations Manager'},
    ])
})

}