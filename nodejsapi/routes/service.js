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
        const serviceCollection = database.collection("customer_service");

        console.log("/ Query:"+JSON.stringify(query));

        const cursor = await serviceCollection.find(query);
        
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
    console.log("root Post is going")
    try{
        await client.connect();
        const customerDoc = req.body;

        const database = client.db(databasename);
        const serviceCollection = database.collection("customer_service");
        
        await serviceCollection.insertOne(
            customerDoc
          );

        console.log("POST log");
        res.status(201).json(customerDoc);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
});


router.route('/:customer/:service/').get( async(req, res, next) => {
    try{
        let query = "";
        let _service = req.params.service;
        let _customer = parseInt(req.params.customer);

        query = {u_customer_no:_customer, service_code: _service };

        await client.connect();
        const database = client.db(databasename);
        const serviceCollection = database.collection("customer_service");

        console.log("/ Query:"+JSON.stringify(query));

        const cursor = await serviceCollection.find(query);
        
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
    console.log("POST Update Existing")
    try{
        let query = "";
        let _service = req.params.service;
        let _customer = parseInt(req.params.customer);
        //let _projection = {_id:0,u_customer_no:1,customer_name:1,request_customer_destroy_id:1,request_customer_destroy_date:1,request_customer_destroy_channel:1,request_customer_destroy_process:1};
        //let _projection = {_id:0};
        query = {u_customer_no:_customer, service_code: _service };
        const exampleDocument = req.body;

        await client.connect();
        
        let _update_contract = {$push: {service_detail: exampleDocument} };
        
        const database = client.db(databasename);
        const customerCollection = database.collection("customer_service");
        
        await customerCollection.updateOne(
            query,_update_contract
          );

        console.log("POST log");
        res.status(201).json(query);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
});


router.route('/:customer/:service/detail/').get( async(req, res, next) => {
    try{
        let query = "";
        let _service = req.params.service;
        let _customer = parseInt(req.params.customer);
        let _date = req.query.date;

        query = {u_customer_no:_customer, service_code: _service, "service_detail.detail_date":_date };

        await client.connect();
        const database = client.db(databasename);
        const serviceCollection = database.collection("customer_service");

        console.log("/ Query:"+JSON.stringify(query));

        const cursor = await serviceCollection.find(query);
        
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
    console.log("Update Existing")
    try{
        let query = "";
        let _service = req.params.service;
        let _customer = parseInt(req.params.customer);
        let _date = req.query.date;
        //let _projection = {_id:0,u_customer_no:1,customer_name:1,request_customer_destroy_id:1,request_customer_destroy_date:1,request_customer_destroy_channel:1,request_customer_destroy_process:1};
        let _projection = {_id:0};
        query = {u_customer_no:_customer, instrument_no: _instrument };
        const exampleDocument = req.body;

        await client.connect();
        
        let _update_contract = {$set: exampleDocument};
        
        const database = client.db(databasename);
        const customerCollection = database.collection("customer_service");
        
        await customerCollection.updateOne(
            query,_update_contract
          );

        console.log("POST log");
        res.status(201).json(query);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
})
.put(async (req, res, next) => {
    console.log("Update Existing")
    try{
        let query = "";
        let _service = req.params.service;
        let _customer = parseInt(req.params.customer);
        let _date = req.query.date;
        //let _projection = {_id:0,u_customer_no:1,customer_name:1,request_customer_destroy_id:1,request_customer_destroy_date:1,request_customer_destroy_channel:1,request_customer_destroy_process:1};
        let _projection = {_id:0};
        query = {u_customer_no:_customer, instrument_no: _instrument };
        const exampleDocument = req.body;

        await client.connect();
        
        let _update_contract = {$set: exampleDocument};
        
        const database = client.db(databasename);
        const customerCollection = database.collection("customer_service");
        
        await customerCollection.updateOne(
            query,_update_contract
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

        let query = "";
        let _service = req.params.service;
        let _customer = parseInt(req.params.customer);
        let _date = req.query.date;

        query = {u_customer_no:_customer, service_code: _service, "service_detail.detail_date":_date };

        await client.connect();
        
        const database = client.db(databasename);
        const customerCollection = database.collection("customer_service");


        let delete_query = {$pull: {service_detail: {detail_date:_date}}};

          query = {u_customer_no: _customer};
          
          await customerCollection.updateOne(
              query,_delete_address
            );

        console.log("DELETE log");
        res.status(201).json(query);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
});


module.exports = router;