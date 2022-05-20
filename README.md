# Proyecto final integrador

## Buscador de obras de arte

El proyecto final es una aplicación que busca obras de arte a partir de una palabra que funciona como query para una API del Metropolitan Museum of Art.

### Un usuario debe poder ingresar como visitante o mediante un login y navegar por 
los componentes.

La autenticación se implementó utilizando Auth0. Se debe estar autenticado para acceder a cualquier parte de la aplicación.

### Si hay productos o imágenes, se debe poder ver la descripción, foto y precio e 
ingresarlo al carrito si se puede comprar.

En este caso los productos serían las obras de artes. Las obras de arte pueden ser agregadas a nuestra colección de obras de arte favoritas.
Y el carrito sería entonces la sección de obras favoritas. Los usuarios pueden agregar y remover obras de sus colecciones.

## Sobre la API

La API utilizada es entonces The Metropolitan Museum of Art Collection API @ https://metmuseum.github.io/

Los endpoints que se usaron principalmente son:

- https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkID}
Que se encarga de obtener una obra de arte

- https://collectionapi.metmuseum.org/public/collection/v1/search?q=${aQuery}
Que devuelve una lista de IDs de obras de arte que cumplen con el query
