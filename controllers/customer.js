const Customer = require('../model/customer')

exports.getCustomer = async (req, res) => {
    //get customer
    
    try {
            // let id = req.params.id;
     const {id } = req.params;
     const customer = await Customer.query().findById(id);
     if(!customer){
        throw new Error("failed to get customer, id not found");
     }
     res.status(200).json(customer)
    }catch (error) {
        console.log(error);
        res.status(500).send('Server error'); //error
      }
}

exports.getCustomers = async (req, res) => {

    //get customers
    try {
        
           const customers = await Customer.query();
           if(!customers){
            throw new Error("check db connection, customer table doesn't exit")
           }
         res.status(200).json(customers)

        }catch (error) {
            console.log(error);
            res.status(500).send('Server error'); //error
          }
}



exports.CreateCustomer = async (req, res) => {
    try {
        // const {name , city} = req.body;
        if(req.body.name != '' || req.body.city != ''){
            //create
            const customer = await Customer.query().insertGraph({
                name: req.body.name,
                city: req.body.city
            });
            if(!customer){
                throw new Error("check db connection, customer table doesn't exit")
            }
           return res.status(200).json(customer)
        }// if condition ends here
        
          return  res.status(409).json({message: "please fill all fields"})
            
        }catch (error) {
            console.log(error);
            res.status(500).send('Server error'); //error
        }
        
}

exports.deleteCustomer = async (req, res) => {
    try {
        
 
    //delete customer
    const id = req.params.id;

    const customer = await Customer.query().findById(id);
        if(!customer){
            return res.status(204).json({message: "customer already deleted"})
        }

    const deleted = await Customer.query().deleteById(id);
    if(!deleted){
        throw new Error("check db connection, failed to delete customer")
    }
          return  res.status(200).json({message: "customers deleted"})
          
        }catch (error) {
            console.log(error);
            res.status(500).send('Server error'); //error
        }
}

    exports.updateCustomer = async (req, res) => {

        //

   }
