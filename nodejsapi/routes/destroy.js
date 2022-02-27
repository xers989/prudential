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



router.route('/:customer/restore').get( async(req, res, next) => {
    try{
        let query = "";
        let _customer = parseInt(req.params.customer);
        let _destroy_id = req.query.destroy_id;
        let _projection = {_id:0,u_customer_no:1,customer_name:1,request_customer_destroy_id:1,request_customer_destroy_date:1,request_customer_destroy_channel:1,request_customer_destroy_process:1,request_customer_destroy_process:1,restore_customer:1};
        //let _projection = {_id:0};
        //query = {u_customer_no:_customer};
        //query = {n_customer_no:_customer, request_customer_destroy_id: _destroy_id};


        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("customer_destroy");

        query = {u_customer_no:_customer, request_customer_destroy_id : _destroy_id};

        console.log("/customer/restore Query:"+JSON.stringify(query));

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
.post(async (req, res, next) => {
    console.log("/customer/restore Post is going")
    try{
        console.log("Request:"+ JSON.stringify(req.body));
    
        let _customer = parseInt(req.params.customer);
        let _destroy_id = req.query.destroy_id;
        await client.connect();
        const exampleDocument = req.body;

        const database = client.db(databasename);
        const customerCollection = database.collection("customer_destroy");
        query = {u_customer_no:_customer, request_customer_destroy_id : _destroy_id};

        console.log("/customer/restore Query:"+JSON.stringify(query));
        
        console.log("POST query"+  JSON.stringify(query));
        await customerCollection.updateOne(
            query,
            { $push:  {restore_customer: exampleDocument }}
          );

        console.log("POST log");
        res.status(201).json(exampleDocument);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
});


router.route('/:customer/restore/process').get( async(req, res, next) => {
    try{
        let query = "";
        let _customer = parseInt(req.params.customer);
        let _destroy_id = req.query.destroy_id;
        let _restore_id = req.query.restore_id;
        let _projection = {_id:0,u_customer_no:1,customer_name:1,request_customer_destroy_id:1,request_customer_destroy_date:1,request_customer_destroy_channel:1,request_customer_destroy_process:1,request_customer_destroy_process:1,restore_customer:1};
        //let _projection = {_id:0};
        //query = {u_customer_no:_customer};
        //query = {n_customer_no:_customer, request_customer_destroy_id: _destroy_id};


        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("customer_destroy");

        query = {u_customer_no:_customer, request_customer_destroy_id : _destroy_id, "restore_customer.request_restore_customer": _restore_id};

        console.log("/customer/restore/process Query:"+JSON.stringify(query));

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
.post(async (req, res, next) => {
    console.log("/customer/restore/process Post is going")
    try{
        console.log("Request:"+ JSON.stringify(req.body));
    
        let _customer = parseInt(req.params.customer);
        let _destroy_id = req.query.destroy_id;
        let _restore_id = req.query.restore_id;
        await client.connect();
        const exampleDocument = req.body;

        const database = client.db(databasename);
        const customerCollection = database.collection("customer_destroy");
        query = {u_customer_no:_customer, request_customer_destroy_id : _destroy_id, "restore_customer.request_restore_customer": _restore_id};

        console.log("/customer/restore Query:"+JSON.stringify(query));
        
        console.log("POST query"+  JSON.stringify(query));
        await customerCollection.updateOne(
            query,
            { $push:  {"restore_customer.$.restore_customer_process": [exampleDocument] }}
          );

        console.log("POST log");
        res.status(201).json(exampleDocument);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
});

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
        const customerCollection = database.collection("customer_destroy");

        console.log("/ Query:"+JSON.stringify(query));

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
    console.log("Post is going")
    try{
        console.log("Request:"+ JSON.stringify(req.body));
    
        let _customer = parseInt(req.params.customer);
        await client.connect();
        const exampleDocument = req.body;

        const database = client.db(databasename);
        const customerCollection = database.collection("customer_destroy");

        query = {u_customer_no: _customer};

        await customerCollection.insertOne(exampleDocument);
        
        console.log("POST log");
        res.status(201).json(exampleDocument);
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
        
        if (req.query.destroy_id != null) {
            let _destroy_id = req.query.destroy_id;
            query = {u_customer_no:_customer, request_customer_destroy_id: _destroy_id};
        }
        else
        {
            query = {u_customer_no:_customer};
        }

        //let _projection = {_id:0,u_customer_no:1,customer_name:1,request_customer_destroy_id:1,request_customer_destroy_date:1,request_customer_destroy_channel:1,request_customer_destroy_process:1};
        let _projection = {_id:0};
        //query = {u_customer_no:_customer, request_customer_destroy_id: _destroy_id};

        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("customer_destroy");


        console.log("/customer Query:"+JSON.stringify(query));

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
});


router.route('/:customer/process').get( async(req, res, next) => {
    try{
        let query = "";
        let _customer = parseInt(req.params.customer);
        if (req.query.destroy_id != null) {
            let _destroy_id = req.query.destroy_id;
            query = {u_customer_no:_customer, request_customer_destroy_id: _destroy_id};
        }
        else
        {
            query = {u_customer_no:_customer};
        }

        let _projection = {_id:0,u_customer_no:1,customer_name:1,request_customer_destroy_id:1,request_customer_destroy_date:1,request_customer_destroy_channel:1,request_customer_destroy_process:1,request_customer_destroy_process:1};
        //let _projection = {_id:0};
        //query = {u_customer_no:_customer};
        //query = {n_customer_no:_customer, request_customer_destroy_id: _destroy_id};


        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("customer_destroy");

        //query = {u_customer_no:_customer, request_customer_destroy_id: _destroy_id};

        console.log("/customer/process Query:"+JSON.stringify(query));

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
.post(async (req, res, next) => {
    console.log("/customer/process Post is going")
    try{
        console.log("Request:"+ JSON.stringify(req.body));
    
        let _customer = parseInt(req.params.customer);
        let _destroy_id = req.query.destroy_id;
        await client.connect();
        const exampleDocument = req.body;

        const database = client.db(databasename);
        const customerCollection = database.collection("customer_destroy");

        query = {u_customer_no:_customer, request_customer_destroy_id: _destroy_id};
        console.log("POST query"+  JSON.stringify(query));
        await customerCollection.updateOne(
            query,
            { $push:  {request_customer_destroy_process: exampleDocument }}
          );

        console.log("POST log");
        res.status(201).json(exampleDocument);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
})


module.exports = router;