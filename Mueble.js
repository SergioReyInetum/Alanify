const fs = require('fs');

fs.readFile('./data.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);

    // Verifica si el campo "procesadores" es un array
    if (Array.isArray(data.procesadores)) {
      // Crear todas las variables necesarias
      let Nombre = "";
      let Fabricante = "";
      let Socket = "";


      // Extraer los datos de los procesadores
      const procesadores = data.procesadores.map(procesador => ({
        nombre: procesador.nombre,
        precio: procesador.precio,
        url: procesador.url,
        caracteristicas: procesador.caracteristicas
      }));

      // Imprimir los nombres y fabricantes de los procesadores en consola
      procesadores.forEach((procesador, index) => {
        Nombre = procesador.caracteristicas[0]
        // Mirar de forma ordenada si el procesador es Intel, AMD u Otro
        Fabricante = "";
        if (procesador.nombre.split(/\s+/).includes("Intel")) {
          Fabricante = "Intel";
      }
      
        else if (procesador.nombre.split(/\s+/).includes("AMD") || procesador.nombre.split(/\s+/).includes("Ryzen")) {
          Fabricante = "AMD";
        }
        else{
          for (let i = 0; i < procesador.nombre.length; i++) {
            if (procesador.nombre[i] == " ") {
                break;                
            }
          Fabricante = Fabricante + procesador.nombre[i];
          }
        }

        // Mirar el socket del procesador
        for (let i = 0; i < procesador.caracteristicas.length; i++) {
          if (procesador.caracteristicas[i].includes("Socket") && !procesador.caracteristicas[i].includes("**Características**")) {
              Socket = procesador.caracteristicas[i].replace(new RegExp(`\\b${"Socket"}\\b`, "g"), "").replace(new RegExp(`${":"}`), "").trim();
              break;
          }
        }
        
        console.log(Fabricante);
        console.log(Nombre);
        console.log(Socket);
        console.log();
      });

    } else {
      console.error('El archivo JSON no contiene un arreglo "procesadores".');
    }
  } catch (parseError) {
    console.error('Error al analizar el JSON:', parseError);
  }
});
