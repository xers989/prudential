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

router.route('/:event').get( async(req, res, next) => {
    try{
        let _event = req.params.event;
        let _frdate = req.query.frdate;
        
        //let _projection = {_id:0,contact_year:1,u_customer_no:1,customer_name:1,contact_information:1,contact_start_date:1, contact_count:1};
        let matchpipe = {$match:{"contact_start_date": {$gte:_frdate}}};
        let match = "";

        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("contact");

        if (_event == "A")
            match = {$match:{"contact_information.contact_type":"민원정보","contact_information.occur_date":{$gte:_frdate}}}
        else if (_event == "B")
            match = {$match:{"contact_information.contact_type":"실시간이벤트정보","contact_information.occur_date":{$gte:_frdate}}}
        else if (_event == "C")
            match = {$match:{"contact_information.contact_type":"고객정보제공통지","contact_information.occur_date":{$gte:_frdate}}}
        else if (_event == "D")
            match = {$match:{"contact_information.contact_type":"디지털로그정보","contact_information.occur_date":{$gte:_frdate}}}
        else if (_event == "E")
            match = {$match:{"contact_information.contact_type":"상담접촉정보","contact_information.occur_date":{$gte:_frdate}}}
        else if (_event == "F")
            match = {$match:{"contact_information.contact_type":"안내장발송정보","contact_information.occur_date":{$gte:_frdate}}}

        let pipeline = [
            matchpipe,
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
        let _projection = {_id:0,contact_year:1,u_customer_no:1,customer_name:1,contact_information:1,contact_start_date:1, contact_count:1};
        query = {u_customer_no:_customer, contact_count: {$lte:1000}};

        await client.connect();
        const database = client.db(databasename);
        const customerCollection = database.collection("contact");

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
});

module.exports = router;