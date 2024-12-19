const fs = require('fs');

fs.readFile('./data.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);

    // Verifica si el campo "procesadores" es un arreglo
    if (Array.isArray(data.procesadores)) {
      // Extraer los datos de los procesadores
      let Fabricante = "";
      const procesadores = data.procesadores.map(procesador => ({
        nombre: procesador.nombre,
        precio: procesador.precio,
        url: procesador.url
      }));

      // Imprimir los nombres de los procesadores en consola
      procesadores.forEach((procesador, index) => {
        for (let i = 0; i < procesador.nombre.length; i++) {

            if (procesador.nombre[i] == " ") {
                console.log(Fabricante);
                Fabricante = "";
                break;                
            }

            Fabricante = Fabricante + procesador.nombre[i];
            
        }
      });
    } else {
      console.error('El archivo JSON no contiene un arreglo "procesadores".');
    }
  } catch (parseError) {
    console.error('Error al analizar el JSON:', parseError);
  }
});
