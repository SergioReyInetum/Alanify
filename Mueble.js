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
      var Nombre = "";
      var Fabricante = "";
      var Socket = "";
      var Gen = "";
      var Nomenclatura = "";

      // Extraer los datos de los procesadores
      const procesadores = data.procesadores.map(procesador => ({
        nombre: procesador.nombre,
        precio: procesador.precio,
        url: procesador.url,
        caracteristicas: procesador.caracteristicas
      }));

      // Imprimir los nombres y fabricantes de los procesadores en consola
      Nombre = "NULL";
      Fabricante = "NULL";
      procesadores.forEach((procesador, index) => {
        if(procesador.caracteristicas[0].includes("Intel")||procesador.caracteristicas[0].includes("AMD")||procesador.caracteristicas[0].includes("Ryzen")){
          Nombre = procesador.caracteristicas[0]
        } else{
          Nombre = procesador.nombre;
        }

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
        Socket = "NULL";
        for (let i = 0; i < procesador.caracteristicas.length; i++) {
          if (procesador.caracteristicas[i].includes("Socket") && !procesador.caracteristicas[i].includes("**Características**")) {
              Socket = procesador.caracteristicas[i].replace(new RegExp(`\\b${"Socket"}\\b`, "g"), "").replace(new RegExp(`${":"}`), "").trim();
              break;
          }
        }

        // Mirar la generación de los procesadores
        Gen = "NULL";

        // Intel Celeron
        var Nomenclatura = "";
        if(Fabricante == "Intel"){
          if(Nombre.includes("Core")){
            for (let i = 11; i < Nombre.length; i++) {
              Nomenclatura = Nomenclatura + Nombre[i];
              
            }
          }
          else if(Nombre.includes("Pentium")){
            for (let i = 14; i < Nombre.length; i++) {
              Nomenclatura = Nomenclatura + Nombre[i];
              
            }
          }
          else if(Nombre.includes("Celeron")){
            for (let i = 14; i < Nombre.length; i++) {
              Nomenclatura = Nomenclatura + Nombre[i];
              
            }
          }
          else if(Nombre.includes("Xeon")){
            for (let i = 11; i < Nombre.length; i++) {
              Nomenclatura = Nomenclatura + Nombre[i];
              
            }
          }
          else{
            Nomenclatura = "NULL";
          }
        }

        else if(Fabricante == "AMD"){
          for (let i = 0; i < Nombre.length; i++) {
            if(Nombre[i] == " " && !isNaN(Nombre[i-1])){
              switch (Nombre[i+1]) {
                case "1":
                  Gen = "Zen";
                  break;
                case "2":
                  Gen = "Zen+";
                  break;
                case "3":
                  Gen = "Zen 2";
                  break;
                case "5":
                  Gen = "Zen 3";
                  break;
                case "7":
                  Gen = "Zen 4";
                  break;  
                case "8":
                  Gen = "Zen 5";
                  break;                    
                default:
                  Gen = "NULL";
                  break;
            }
              break;
            }
            
          }
        }
        
        console.log("Fabricante: " + Fabricante);
        console.log("Nombre: " + Nombre);
        console.log("Nomenclatura: " + Nomenclatura);
        console.log("Socket: " + Socket);
        console.log("Gen: " + Gen);
        console.log();
      });

    } else {
      console.error('El archivo JSON no contiene un arreglo "procesadores".');
    }
  } catch (parseError) {
    console.error('Error al analizar el JSON:', parseError);
  }
});
