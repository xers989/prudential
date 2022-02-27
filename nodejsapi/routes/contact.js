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
        let _frdate = req.query.frdate;
        let _projection = {_id:0};
        query = {};

        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("contact");

        let pipeline = [
            {$match:{"contact_start_date": {$gte: _frdate}}},
            {$unwind:'$contact_information'},
            {'$sort':{'contact_information.occur_date':1}}
          ];
        
        console.log("pipeline:"+JSON.stringify(pipeline));

        const cursor = await customerCollection.aggregate(pipeline);
        
        
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
        await client.connect();
        const contactDoc = req.body;

        const database = client.db(databasename);
        const customerCollection = database.collection("contact");

        const today = new Date()
        const strToday = today.getFullYear()+"-"+('0' + (today.getMonth() + 1)).slice(-2)+"-"+('0' + today.getDate()).slice(-2);
        const contact_no = Math.floor(today.getTime() / 1000)

        query = {u_customer_no:contactDoc.u_customer_no, contact_count: {$lte:10}};
        
        await customerCollection.updateOne(
            query,
            {
                $push:  {contact_information: contactDoc.contact_information },
                $inc: {contact_count:1},
                $setOnInsert: {contact_start_date: strToday,contact_no:contact_no,customer_name: contactDoc.customer_name,u_customer_no: contactDoc.u_customer_no}
            },
            {upsert:true}
          );

        console.log("POST log");
        res.status(201).json(contactDoc);
    }catch (err)
    {
        console.error(err);
        next(err);
    } 
});


router.route('/all/:customer').get( async(req, res, next) => {
    try{
        let query = "";
        let _customer = parseInt(req.params.customer);
    

        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("contact");
        query = {"u_customer_no":_customer};

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
});

router.route('/:customer/:event').get( async(req, res, next) => {
    try{
        let query = "";
        let _customer = parseInt(req.params.customer);
        let _event = req.params.event;
        let _frdate = req.query.frdate;
        let _projection = {_id:0,contact_year:1,u_customer_no:1,customer_name:1,contact_information:1,contact_start_date:1, contact_count:1};
        query = {u_customer_no:_customer, contact_count: {$lte:1000}};
        let match = "";


        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("contact");

        if (_event == "A")
            match = {$match:{"contact_information.contact_type":"민원정보"}}
        else if (_event == "B")
            match = {$match:{"contact_information.contact_type":"실시간이벤트정보"}}
        else if (_event == "C")
            match = {$match:{"contact_information.contact_type":"고객정보제공통지"}}
        else if (_event == "D")
            match = {$match:{"contact_information.contact_type":"디지털로그정보"}}
        else if (_event == "E")
            match = {$match:{"contact_information.contact_type":"상담접촉정보"}}
        else if (_event == "F")
            match = {$match:{"contact_information.contact_type":"안내장발송정보"}}

        let pipeline = [
            {$match:{"u_customer_no":_customer,"contact_start_date": {$gte:_frdate}}},
            {$unwind:'$contact_information'},
            match,
            {'$sort':{'contact_information.occur_date':1}}
          ];
        
        console.log("pipeline:"+JSON.stringify(pipeline));

        const cursor = await customerCollection.aggregate(pipeline);
        
        
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


router.route('/:customer').get( async(req, res, next) => {
    try{
        let query = "";
        let _customer = parseInt(req.params.customer);
        
        let _frdate = req.query.frdate;
        //let _projection = {_id:0};
        query = {};

        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("contact");

        let pipeline = [
            {$match:{"u_customer_no":_customer,"contact_start_date": {$gte: _frdate}}},
            {$unwind:'$contact_information'},
            {'$sort':{'contact_information.occur_date':1}}
          ];
        
        console.log("pipeline:"+JSON.stringify(pipeline));

        const cursor = await customerCollection.aggregate(pipeline);
        
        
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

module.exports = router;