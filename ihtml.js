/* ihtml

   ()   **                          ***
        ||        //                 ||
  ***   ****\\  ******   *******\\   ||
   ||   ||   ||  ||      ||  ||  ||  ||
   ||   ||   ||  ||      ||  ||  ||  ||
   ||   ||   ||  ||  //  ||  ||  ||  ||
 ****** **   **   ****   **  **  ** ******
Creado por : Luis Cornejo Silva
Email : contacto@luiscornejo.cl
Sitio web: http://www.luiscornejo.cl
*/
fs = require('fs');
http = require('http');
url = require('url');
var PATH_LOCAL='./www/';

http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var action = request.pathname;
  var archivo = getArchivoFromRuta(action);
  var miContenido='';
    
    PATH_LOCAL='./www' + archivo.ruta + '/';

    if(archivo.tipo=='html'){
      if(archivo.nombre.substr(0,3)=='404'){
        miContenido = fs.readFileSync('./www/' + archivo.nombre,"utf8");
      }else{
        miContenido = fs.readFileSync(PATH_LOCAL + archivo.nombre,"utf8");
      }
      if(miContenido!=''){

        var iResult = miContenido.match(/(\<\|i\s)[0-9a-zA-Z_]+(\.?)(html|js|css|htm|inc|txt)?@?.*(\s\|\>)/g);

        if(iResult){
            var n;
            for(n = 0; n < iResult.length; n++){
              var miArchivo=iResult[n].replace('<|i ','').replace(' |>','');
              var misParam={"repetir":1, "data":[]};

              if(iResult[n].indexOf('@')>3){
                var partRes = parsearInclusion(iResult[n]);
                miArchivo=partRes[0];
                misParam=partRes[1];
              }

              miContenido = incluir(miArchivo, miContenido, misParam, iResult[n]);
              
            }
        }
      }
    }else{
      if(archivo.nombre.substr(0,3)=='404'){
        miContenido = fs.readFileSync('./www/' + archivo.nombre);
      }else{
        miContenido = fs.readFileSync(PATH_LOCAL + archivo.nombre);
      }
    }

  res.writeHead(200, {'Content-Type': archivo.contentType + '/' + archivo.mime });
  res.end(miContenido, archivo.encoding);

}).listen(80, '127.0.0.1');

function incluir(archinc, contBase, param, oldString) {
    console.log("Incluir archivo " + PATH_LOCAL + archinc);
    var miContenido = "";

    miContenido = fs.readFileSync(PATH_LOCAL + archinc, "utf8");
    if(miContenido){

      var iResult = miContenido.match(/(\<\|i\s)[0-9a-zA-Z_]+(\.?)(html|js|css|htm|inc|txt)?@?.*(\s\|\>)/g);

      if(iResult){
          var n;
          for(n = 0; n < iResult.length; n++){
            var miArchivo=iResult[n].replace('<|i ','').replace(' |>','');
            var misParam={"repetir":1, "data":[]};
            if(iResult[n].indexOf('@') > 3){
              var partRes=parsearInclusion(iResult[n]);
              miArchivo = partRes[0];
              misParam = partRes[1];
            }

            miContenido = incluir(miArchivo, miContenido, misParam, iResult[n]);
          }
      }
      var cadContenido="";
      var miData=[];
      if(param.data!=''){
        var miData = cargarJSON(param.data);
      }
      var pdl = miData.length;

      for(v=0; v<param.repetir;v++){
          var miMolde = miContenido;
          if(pdl>0){
            for(var llave in miData[v % pdl]){
              miMolde = miMolde.replace('{'+llave+'}', miData[v % pdl][llave]);
            }
          }
          cadContenido = cadContenido + miMolde;
      }
      miContenido = contBase.replace(oldString, cadContenido);
    }else{
       miContenido = "";
    }

    return miContenido;
}
function parsearInclusion(iCadena){
  var pRes = iCadena.split('@');
  eval('var oResp=' + pRes[1].replace(" |>","") + ';');
  var resp = new Array(pRes[0].replace("<|i ",""),oResp);
  return resp;
}

function separarArchivoCarpeta(arcsep){
  var retAC={"archivo":arcsep,"carpeta":""};
  if(arcsep.indexOf('/')>0){
    //arcsep=arcsep.replace('//','/'); //evitar slash dobles
    var partsep2 = arcsep.split('/');
    parc = partsep2.pop();
    retAC={"archivo":parc,"carpeta":'/' + partsep2.join('/') + '/'};
  }
  return retAC
}

function getArchivoFromRuta(miurl){
  console.log("Analizando "+miurl);
  var url = '';
  var vars = '';
  var archivo = '';
  var tipo = '';
  var ruta = '';
  var mime = 'html';
  if(miurl.indexOf('?')>0){
    partUrl = miurl.split('?');
    url = partUrl[0]
    vars = partUrl[1];
  }else{
    url=miurl;
  }
  if(url.lastIndexOf("/")>0){
    var partRuta=url.split('/');
    archivo=partRuta.pop();
    ruta=partRuta.join('/');
  }else{
    archivo=url;
  }
  if(archivo.lastIndexOf('.')>0){
    var partTipo=archivo.split('.');
    var tipo = partTipo.pop();
    mime=tipo;
  }else{
    tipo='';
    mime='plain';
  }
  var encoding='utf8';
  var contenttype='text';
  switch(tipo){
    case 'pdf':
      encoding='binary';
      contenttype='application';
      break;
    case 'ico':
      encoding='binary';
      contenttype='image';
      mime='x-icon';
      break;
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'png':
      encoding='binary';
      contenttype='image';
      break;
    case 'js':
      mime='javascript';
      break;
    case 'txt':
      mime='plain';
      break;      
    case 'html':
    case 'css':
    case 'xml':
    case 'json':
      break;
    case '':
      break;
    case 'error':
    default:
      archivo = '404.html';
      tipo='html';
      mime='html';
      encoding='utf8';
  }
  if((archivo.substr(0,1)=='{')||(archivo.substr(0,3)=='%7B')){
      if(contenttype=='image'){
        archivo = '404.jpg';
        tipo='jpg';
        mime='jpeg';
        encoding='binary';
      }else{
        archivo = '404.html';
        tipo='html';
        mime='html';
        encoding='utf8';
      }
  }
  return {"ruta"        : ruta, 
          "nombre"      : archivo, 
          "tipo"        : tipo.toLowerCase(), 
          "vars"        : vars,
          "mime"        : mime,
          "encoding"    : encoding,
          "contentType" :contenttype};
}
function cargarJSON(miArcJson){
    var miContenidoJSON='';
    console.log("Cargar JSON "+ PATH_LOCAL + miArcJson);
    miContenidoJSON = fs.readFileSync(PATH_LOCAL + miArcJson, "utf8");
    var oRet=[];
    if(miContenidoJSON!=''){
      eval('oRet = ' + miContenidoJSON + ';');
    }
    return oRet;
}
