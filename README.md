ihtml
=====

servidor html para node.js permite visualizar paginas en html incluyendo sus imagenes, hojas de estilo y codigo javascript. Ademas permite hacer "include" de otros html


Es una aplicacion realizada para la plataforma node.js
Esta aplicacion permite servir multiples archivos, tales como:

- Documentos html, xml, txt y archivos en formato json
- Hojas de estilo css
- Codigo javascript js
- Imagenes (jpg,png,gif)
- Otros documentos (zip,rar,pdf)

Las páginas servidas por la aplicación reconocen sus hojas de estilos y código javascript.

La carpeta donde se copie la aplicación debe tener en su mismo nivel una carpeta llamada www la cual se comportara como la carpeta publica donde copiaremos nuestras carpetas de sitios (como htdocs de xampp)

Este no es un servidor de php ni asp, solamente html.

¿Pero como incluir html dentro de html dinámicamente?

Es sencillo simplemente se usa un par de símbolos para indicar que se incluirá un archivo en esa ubicación:

**************************
index.html
**************************
<html>
<head>
<title></title>
</head>
<body>

  <h1>Debajo se incluirá un archivo html diferente</h1>

  <|i contenido.html |>

  <p>Tan sencillo como eso</p>

</body>
</html>

**************************
contenido.html
**************************
<h3>Producto A</h3>
<p>Esta es una descripcion del primer producto</p>


Si usamos plantillas entonces nos sera facil usar moldes o datos dummy:

**************************
contenido.html  (modificado para plantilla)
**************************
  <h3>{producto}</h3>
  <p>{descripcion}</p>


con este codigo:

<|i contenido.html@{"repetir":4, "data":"contenido.json"} |>

significa que el archivo contenido.html se incluira 4 veces y usara los datos del archivo json referido.
**************************
contenido.json
**************************
[
  { "titulo"     : "Producto A",
    "descripcion": "Esta es una descripcion del primer producto." },
  { "titulo"     : "Producto B",
    "descripcion": "Esta es una descripcion del segundo producto." },
  { "titulo"     : "Producto C",
    "descripcion": "Esta es una descripcion del tercer producto." }
]

El resultado sera:

**************************
index.html (aplicando el cambio)
**************************
<html>
<head>
<title></title>
</head>
<body>

  <h1>Debajo se incluirá un archivo html diferente</h1>

  <h3>Producto A</h3>
  <p>Esta es una descripcion del primer producto.</p>

  <h3>Producto B</h3>
  <p>Esta es una descripcion del segundo producto.</p>

  <h3>Producto C</h3>
  <p>Esta es una descripcion del tercer producto.</p>

  <p>Tan sencillo como eso</p>

</body>
</html>

