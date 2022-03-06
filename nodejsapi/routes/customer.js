const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
const router = express.Router();
const fs = require('fs');

dotenv.config();
const mongodb = process.env.MONGODB;
const databasename = process.env.DATABASE;
const connectionString = mongodb;
      

const client = new MongoClient(connectionString);


router.route('/').get( async(req, res, next) => {
    try{
        let query = "";
        if (req.query.customer != null) {
            let _customer = parseInt(req.query.customer);
            query = {u_customer_no:_customer};
        }
        else
        {
            query = {};
        }

        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("customers");


        console.log("Query:"+JSON.stringify(query));

        const cursor = await customerCollection.find(query);
        
        const results = await cursor.toArray();

        let outcomes = '';
        if (results.length > 0) {
            results.forEach((result, i) => {
                outcomes += JSON.stringify(result);
                //console.log(result);
            });
        } else {
            console.log('No Data');
        }

        res.status(200).json(results);

    } catch(e)
    {
        console.log("Error");
        console.error(e);
        res.status(404).json({});

    }
    finally{
        await client.close();
    }   
})
.post(async (req, res, next) => {
    console.log("Customer Post is going")
    try{
        console.log("Request:"+ JSON.stringify(req.body));
    
        await client.connect();
        const exampleDocument = req.body;

        const database = client.db(databasename);
        const customerCollection = database.collection("customers");
     
        await customerCollection.insertOne(
            exampleDocument
          );

        console.log("POST log");
        res.status(201).json(exampleDocument);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
});


router.route('/:customer/address').get( async(req, res, next) => {
    try{
        let _customer = parseInt(req.params.customer);
        
        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("customers");
        const _projection = {_id:0, u_customer_no:1, address:1, customer_name:1};

        query = {u_customer_no: _customer};

        console.log("MQL Find:"+JSON.stringify(query)+","+JSON.stringify(_projection));

        const cursor = await customerCollection.find(query).project( _projection);
        
        const results = await cursor.toArray();

        let outcomes = '';
        if (results.length > 0) {
            results.forEach((result, i) => {
                outcomes += JSON.stringify(result);
                //console.log(result);
            });
        } else {
            console.log('No Data');
        }
        res.status(200).json(results);

    } catch(e)
    {
        console.log("Error");
        console.error(e);
        res.status(404).json({});

    }
    finally{
        await client.close();
    }    
})
.post(async (req, res, next) => {
    console.log("Post is going")
    try{
        console.log("Request:"+ JSON.stringify(req.body));
    
        let _customer = parseInt(req.params.customer);
        await client.connect();
        const exampleDocument = req.body;

        const database = client.db(databasename);
        const customerCollection = database.collection("customers");

        query = {u_customer_no: _customer};
        
        await customerCollection.updateOne(
            query,
            { $push:  {address: exampleDocument }}
          );

        console.log("POST log");
        res.status(201).json(exampleDocument);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
})
.patch(async (req, res, next) => {
    console.log("Update Existing")
    try{

        let _customer = parseInt(req.params.customer);
        await client.connect();
        let _address_type = req.query.address_type;
        const exampleDocument = req.body;
        
        let _update_address = {$set: {'address.$': exampleDocument}};
        
        const database = client.db(databasename);
        const customerCollection = database.collection("customers");

        query = {u_customer_no: _customer, 'address.address_type' : _address_type};
        
        await customerCollection.updateOne(
            query,_update_address
          );

        console.log("POST log");
        res.status(201).json(query);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
})
.delete(async (req, res, next) => {
    console.log("Delete is going")
    try{

        let _customer = parseInt(req.params.customer);
        await client.connect();
        let _address_type = req.query.address_type;
        let _delete_address = {$pull: {address: {address_type:_address_type}}};

        const database = client.db(databasename);
        const customerCollection = database.collection("customers");

        query = {u_customer_no: _customer};
        
        await customerCollection.updateOne(
            query,_delete_address
          );

        console.log("POST log");
        res.status(201).json(query);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
});



router.route('/:customer/history').get( async(req, res, next) => {
    try{
        let _customer = parseInt(req.params.customer);
        
        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("customers");
        const _projection = {_id:0, u_customer_no:1, customer_manage_history:1, customer_name:1};

        query = {u_customer_no: _customer};

        console.log("MQL Find:"+JSON.stringify(query)+","+JSON.stringify(_projection));

        const cursor = await customerCollection.find(query).project( _projection);
        
        const results = await cursor.toArray();

        let outcomes = '';
        if (results.length > 0) {
            results.forEach((result, i) => {
                outcomes += JSON.stringify(result);
                //console.log(result);
            });
        } else {
            console.log('No Data');
        }
        res.status(200).json(results);

    } catch(e)
    {
        console.log("Error");
        console.error(e);
        res.status(404).json({});

    }
    finally{
        await client.close();
    }    
})
.post(async (req, res, next) => {
    console.log("Post is going")
    try{
        console.log("Request:"+ JSON.stringify(req.body));
    
        let _customer = parseInt(req.params.customer);
        await client.connect();
        const exampleDocument = req.body;

        const database = client.db(databasename);
        const customerCollection = database.collection("customers");

        query = {u_customer_no: _customer};
        
        await customerCollection.updateOne(
            query,
            { $push:  {customer_manage_history: exampleDocument }}
          );

        console.log("POST log");
        res.status(201).json(exampleDocument);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
})
.patch(async (req, res, next) => {
    console.log("Update Existing")
    try{

        let _customer = parseInt(req.params.customer);
        await client.connect();
        let _customer_manage_type = req.query.manage_type;
        const exampleDocument = req.body;
        
        let _update_history = {$set: {'customer_manage_history.$': exampleDocument}};
        
        const database = client.db(databasename);
        const customerCollection = database.collection("customers");

        query = {u_customer_no: _customer, 'customer_manage_history.customer_manage_type' : _customer_manage_type};
        //customer_manage_history
        await customerCollection.updateOne(
            query,_update_history
          );

        console.log("POST log");
        res.status(201).json(query);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
})
.delete(async (req, res, next) => {
    console.log("Delete is going")
    try{

        let _customer = parseInt(req.params.customer);
        await client.connect();
        let _customer_manage_type = req.query.manage_type;
        let _delete_address = {$pull: {customer_manage_history: {customer_manage_type:_customer_manage_type}}};

        const database = client.db(databasename);
        const customerCollection = database.collection("customers");

        query = {u_customer_no: _customer};
        
        await customerCollection.updateOne(
            query,_delete_address
          );

        console.log("POST log");
        res.status(201).json(query);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
});

router.route('/:customer').get( async(req, res, next) => {
    try{
        let query = "";
        let _customer = parseInt(req.params.customer);
        let _projection = {_id:0,u_customer_no:1,person_group_coode:1,customer_name:1,address:1, group_customer_relation:1,u_customer_identity:1,customerBasic:1};
        query = {u_customer_no:_customer};

        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("customers");


        console.log("Query:"+JSON.stringify(query));

        const cursor = await customerCollection.find(query).project(_projection);
        
        const results = await cursor.toArray();

        let outcomes = '';
        if (results.length > 0) {
            results.forEach((result, i) => {
                outcomes += JSON.stringify(result);
                //console.log(result);
            });
        } else {
            console.log('No Data');
        }

        res.status(200).json(results);

    } catch(e)
    {
        console.log("Error");
        console.error(e);
        res.status(404).json({});

    }
    finally{
        await client.close();
    }   
})
.patch(async (req, res, next) => {
    console.log("Patch is going")
    try{
        console.log("Request:"+ JSON.stringify(req.body));
    
        let _customer = parseInt(req.params.customer);
        await client.connect();
        const exampleDocument = req.body;

        const database = client.db(databasename);
        const customerCollection = database.collection("customers");

        query = {u_customer_no: _customer};
        
        await customerCollection.updateOne(
            query,
            { $set: exampleDocument}
          );

        console.log("POST log");
        res.status(201).json(exampleDocument);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
});


module.exports = router;