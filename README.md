ihtml
=====

servidor html para node.js permite visualizar paginas en html incluyendo sus imagenes, hojas de estilo y codigo javascript. Ademas permite hacer "include" de otros html


ihtml

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
&lt;html&gt;<br>
&lt;head&gt;<br>
&lt;title&gt;&lt;/title&gt;<br>
&lt;/head&gt;<br>
&lt;body&gt;<br>
<br>
  &lt;h1&gt;Debajo se incluirá un archivo html diferente&lt;/h1&gt;<br>
<br>
  &lt;|i contenido.html |&gt;<br>
<br>
  &lt;p&gt;Tan sencillo como eso&lt;/p&gt;<br>
<br>
&lt;/body&gt;<br>
&lt;/html&gt;<br>

**************************
contenido.html
**************************
&lt;h3&gt;Producto A&lt;/h3&gt;<br>
&lt;p&gt;Esta es una descripcion del primer producto&lt;/p&gt;<br>


Si usamos plantillas entonces nos sera facil usar moldes o datos dummy:

**************************
contenido.html  (modificado para plantilla)
**************************
  &lt;h3&gt;{producto}&lt;/h3&gt;<br>
  &lt;p&gt;{descripcion}&lt;/p&gt;<br>


con este codigo:

&lt;|i contenido.html@{"repetir":4, "data":"contenido.json"} |&gt;<br>

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
&lt;html&gt;<br>
&lt;head&gt;<br>
&lt;title&gt;&lt;/title&gt;<br>
&lt;/head&gt;<br>
&lt;body&gt;<br>
<br>
  &lt;h1&gt;Debajo se incluirá un archivo html diferente&lt;/h1&gt;<br>
<br>
  &lt;h3&gt;Producto A&lt;/h3&gt;<br>
  &lt;p&gt;Esta es una descripcion del primer producto.&lt;/p&gt;<br>
<br>
  &lt;h3&gt;Producto B&lt;/h3&gt;<br>
  &lt;p&gt;Esta es una descripcion del segundo producto.&lt;/p&gt;<br>
<br>
  &lt;h3&gt;Producto C&lt;/h3&gt;<br>
  &lt;p&gt;Esta es una descripcion del tercer producto.&lt;/p&gt;<br>
<br>
  &lt;p&gt;Tan sencillo como eso&lt;/p&gt;<br>
<br>
&lt;/body&gt;<br>
&lt;/html&gt;<br>

