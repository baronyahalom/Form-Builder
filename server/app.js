const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var morgan = require('morgan');


const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.listen(3000, ()=>{
    console.log(`Server listening on port 3000`);
});

const dbSql = new sqlite.Database('formBuilderDB.db', (err) => {
    if(err){
        console.error(err.message);
    }
    console.log('connected to forms builder db');
});


//this function creats new form and update it to the Form table wich contains all the forms
app.post('/forms/add',function (req, res)  {
    var FormName = req.body.form;
    var inputName = req.body.name;
    var field = req.body.field;
    var type = req.body.type;
    var inputName_query = "";
    var inputName_query2 = "";
    var field_query = "";
    var type_query = "";
    for(var i=0; i< inputName.length ; i++)
    {
        inputName_query =inputName_query+ inputName[i] + " TEXT"
         field_query = field_query+`'`+ field[i] +`'` 
        type_query = type_query+`'`+ type[i] +`'` 
        inputName_query2 =inputName_query2+ inputName[i]
        if(i!=inputName.length-1)
        {
            inputName_query = inputName_query+ ","
            inputName_query2 = inputName_query2+ ","
            field_query =field_query + ","
            type_query =type_query + ","
            
        }
    }
    dbSql.all('CREATE TABLE ' + FormName + ' (' + inputName_query +')' ,[] , (err, results) => {
        if(err){
            return res.send("table exist");
        }
        else{
            console.log(field_query)
            dbSql.all(`INSERT INTO Forms (formName,fieldLbl,inputName,type,amount)` + ` VALUES ('`+ FormName + `', "`+field_query + `", '`+inputName_query2 + `', "`+ type_query + `",0)` ,[] , (err, results) => {
                if(err){
                    return res.send(err + "the second");
                }
                else{
                    return res.send('successfully added form');
                }
            });
        }
    });
 
});

app.get('/forms', (req, res) => {
    var allFormsQ = 'SELECT ID,formName,amount FROM Forms';
    dbSql.all(allFormsQ,[], (err, results) => {
        if(err){
            return res.send("there is no tables yet");
        }
        else{
            res.send(results);
        }
    });
});

app.get('/forms/:id', (req, res) => {
    let id = req.params.id;
    var allFormsQ = 'SELECT fieldLbl,inputName,type FROM Forms WHERE ID =' + id;
    dbSql.all(allFormsQ,[], (err, results) => {
        if(err){
            return res.send(err);
        }
        else{
            var resf = results[0].fieldLbl.substring(1,results[0].fieldLbl.length-1)
            var resfi = resf.split(/','|`'`/);
            var resNam = results[0].inputName.split(',');
            var rest = results[0].type.substring(1,results[0].type.length-1)
            var resty = rest.split(/','|`'`/);
            var resFinal = [];
            for(var i=0; i<resfi.length;i++)
            {
                var a = '';
                
                if(resty[i]=="color")
                {
                    
                    a='#000000e5'
                }
                let data={
                    feild:resfi[i],
                    type: resty[i],
                    inputName:a
                }
                resFinal.push(data)
                
            }
            res.send(resFinal);
        }
    });
});

app.get('/formSub/:id', (req, res) => {
    let id = req.params.id;
    var formName ="";
    
    var allFormsQ = 'SELECT formName,fieldLbl FROM Forms WHERE ID =' + id;
    dbSql.all(allFormsQ,[], (err, results) => {
        if(err){
            return res.send("error1");
        }
        else{
            var resf = results[0].fieldLbl.substring(1,results[0].fieldLbl.length-1)
            var resfi = resf.split(/','|`'`/);
        
            formName = results[0].formName;
            
            var formsQ = 'SELECT * FROM '+formName;
            dbSql.all(formsQ,[], (err, results) => {
                if(err){
                   
                    return res.send("error");
                }
                else{
                 
                    res.send(({fields: resfi, values: results}) );
                }
            });
            
        }
    });


});

app.get('/forms/name/:id', (req, res) => {
    let id = req.params.id;
    var allFormsQ = 'SELECT formName FROM Forms WHERE ID =' + id;
    dbSql.all(allFormsQ,[], (err, results) => {
        if(err){
            return res.send(err);
        }
        else{
            res.send(results);
        }
    });
});

app.post('/forms/addUser',function (req, res)  {
    var FormName = req.body.formName;
    var query = req.body.feilds;
            dbSql.all(`INSERT INTO ` + FormName + ` VALUES (`+ query +`)` ,[] , (err, results) => {
                if(err){
                    return res.send(err + "the seccccond");
                }
                else{
                    dbSql.all(`UPDATE Forms`  + ` SET amount=amount+1 WHERE formName = '`+FormName+`'` ,[] , (err, results) => {
                        if(err){
                            return res.send(err + " the sccccd");
                        }
                        else{
                            
                            return res.send('successfully added form');
                        }
                    });
                }
            });
});

