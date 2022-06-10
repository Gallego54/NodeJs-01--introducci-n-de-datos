const http = require('http')
const fs = require('fs')

const PORT = 8000;


http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    if ('/update' == req.url) {

        const HTML = getHTML ('src/view/action.html');
        GetParams(req, function(Params){
            const Pyramid = MakePyramid( Params.get('total') )
            const  INDEX = HTML.search('body')+6;

            //Total = addStr(HTML, INDEX, Pyramid);

            return res.end(HTML.substring(0, INDEX)+
            Pyramid+HTML.substring(INDEX, HTML.length))
        });

        
        //return res.end(HTML);

    } else {

        const HTML = getHTML ('src/view/form.html');
        return res.end(HTML);

    }
}).listen(PORT, _ => {

    console.log("PORT: " + PORT)
})


const getHTML = PATH => {
    return fs.readFileSync(PATH, 
    {
        encoding:'utf8', 
        flag:'r'
    })
};

const GetParams = function(req, callback){
    let Params = ''; 
    req.on('data', D => {
        Params += D;
    })

    
    req.on('end', _ => {
        const FormParams = new URLSearchParams(Params);
        callback(FormParams);
    })
    
}

const MakePyramid = (  MAX ) => {
    
   
    let HTMLAux = '';

    for (let i=0 ; i <=  MAX ; i++) {
        for (let y=0 ; y<=MAX-i ; y++) {
            HTMLAux += '&nbsp;&nbsp;';
        }

        HTMLAux += '*';

        for (let j=0 ; j<i ; j++) {
            HTMLAux += 'o*';
        }

        HTMLAux += '<br>';
    }

    return HTMLAux;
}