const fs = require('fs');
const { exit } = require('process');

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
      var Nomenclatura = "";
      var Gen = "";
      var Nucleos = "";
      var NucleosEficiencia = "";
      var NucleosRendimiento = "";
      var Hilos = "";
      var FrecuenciaBaseEficiencia = "";
      var FrecuenciaBaseRendimiento = "";
      var FrecuenciaTurboEficiencia = "";
      var FrecuenciaTurboRendimiento = "";
      var Cache = "";
      var TDP = "";
      var GraficaIntegrada = "";
      var Precio = "";

      // Extraer los datos de los procesadores
      const procesadores = data.procesadores.map(procesador => ({
        nombre: procesador.nombre,
        precio: procesador.precio,
        url: procesador.url,
        caracteristicas: procesador.caracteristicas
      }));

      // Imprimir los nombres y fabricantes de los procesadores en consola
      Nombre = "Null";
      Fabricante = "Null";
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

        // Mirar la nomenclatura de los procesadores
        Nomenclatura = "";
        if(Fabricante == "Intel"){
          let listaCategoria = ["Core","Pentium","Celeron","Xeon"];
          let num;
          if(Nombre.includes(" " + listaCategoria[0] + " ")){
            num = 0;
          }
          else if(Nombre.includes(" " + listaCategoria[1] + " ")){ 
            num = 1;
          }
          else if(Nombre.includes(" " + listaCategoria[2] + " ")){
            num = 2;
          }
          else if(Nombre.includes(" " + listaCategoria[3] + " ")){
            num = 3;
          }
          else{
            num = 4;
            Nomenclatura = "Null";
            exit;
          }
          if(num!=4){
            for (let a = (6 + listaCategoria[num].length + 1); a < Nombre.length; a++) {
            Nomenclatura = Nomenclatura + Nombre[a];
            }
          }
        }

        else if(Fabricante == "AMD" && Nombre.includes("Ryzen")){
          for (let a = 10; a < Nombre.length; a++) {
            if(Nombre[a] != "-"){
              Nomenclatura = Nomenclatura + Nombre[a];
            }
            else{
              break;
            }
          }
        }

        else{
          Nomenclatura = "Null";
        }

        // Mirar la generación de los procesadores
        Gen = "Null";
        if(Fabricante == "Intel" && Nomenclatura[0] == "i"){
          if (Nomenclatura[1] != 1) {
            Gen = Nomenclatura[0] + Nomenclatura[1];
          } else{
            Gen = Nomenclatura[0] + Nomenclatura[1] + Nomenclatura[2];
          }
        }
        else if(Fabricante == "AMD"){
          for (let i = 0; i < Nomenclatura.length; i++) {
            if(Nomenclatura[i] == " " && !isNaN(Nomenclatura[i-1])){
              switch (Nomenclatura[i+1]) {
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
                  Gen = "Null";
                  break;
            }
              break;
            }
            
          }
        }

        Socket = "Null";
        Nucleos = "Null";
        NucleosRendimiento = "Null";
        NucleosEficiencia = "Null";
        Hilos = "Null";
        FrecuenciaBaseEficiencia = "Null";
        FrecuenciaBaseRendimiento = "Null";
        FrecuenciaTurboEficiencia = "Null";
        FrecuenciaTurboRendimiento = "Null";
        Cache = "Null";
        TDP = "Null";
        GraficaIntegrada = "Null";
        for (let i = 0; i < procesador.caracteristicas.length; i++) {
          let linea = procesador.caracteristicas[i];
          // Mirar el socket del procesador
          if (procesador.caracteristicas[i].includes("Socket") && !procesador.caracteristicas[i].includes("**Características**")) {
            Socket = procesador.caracteristicas[i].replace(new RegExp(`\\b${"Socket"}\\b`, "g"), "").replace(new RegExp(`${":"}`), "").trim();
            continue;
          }

          // Mirar los Nucleos e Hilos del procesador
          if ((procesador.caracteristicas[i].includes("núcleos")||procesador.caracteristicas[i].includes("CPU")||procesador.caracteristicas[i].includes("Núcleos")) && !procesador.caracteristicas[i].includes("**Características**")) {
            Nucleos = procesador.caracteristicas[i].replace(new RegExp(`\\b(?:Cantidad de núcleos|Número de núcleos|Núcleos CPU)\\b`, "g"), "").replace(new RegExp(`${":"}`), "").trim();
            if(!isNaN(Nucleos[1])){
              Nucleos = Nucleos[0] + Nucleos[1];
            } else{
              Nucleos = Nucleos[0];
            }
            continue;
          }
          // Mirar en los nucleos sus nucleos destinados a Eficiencia y Rendimiento
          if(Nucleos != "Null" && (procesador.caracteristicas[i].includes("Rendimiento +") && !procesador.caracteristicas[i].includes("**Características**"))){
            if(!isNaN(linea[26])){
              NucleosRendimiento = linea[25]+linea[26];
            } else{
              NucleosRendimiento = linea[25];
            }
            if(!isNaN(linea[44])){
              NucleosEficiencia = linea[43]+linea[44];
            } else{
              NucleosEficiencia = linea[43];
            }
            continue;
          }
          if ((procesador.caracteristicas[i].includes("hilos")||procesador.caracteristicas[i].includes("subprocesos")||procesador.caracteristicas[i].includes("Hilos")) && !procesador.caracteristicas[i].includes("**Características**")) {
            Hilos = procesador.caracteristicas[i].replace(new RegExp(`\\b(?:Cantidad de hilos|Número de hilos|Cantidad de subprocesos|N.° de subprocesos)\\b`, "g"), "").replace(new RegExp(`${":"}`), "").trim();
            if(!isNaN(Hilos[1])){
              Hilos = Hilos[0] + Hilos[1];
            } else{
              Hilos = Hilos[0];
            }
            continue;
          }
          
          // Mirar la Frecuencia base y la Frecuencia turbo
          if (procesador.caracteristicas[i].includes("Frecuencia base") && !procesador.caracteristicas[i].includes("**Características**")) {
            let caracteristica = procesador.caracteristicas.find(item => item.includes("Frecuencia base (Eficiencia / Rendimiento)"));
            if (caracteristica) {
              let valores = caracteristica.split(":")[1].trim();
              let [eficiencia, rendimiento] = valores.split(" / ");
              FrecuenciaBaseEficiencia = eficiencia.replace(new RegExp("GHz"),"");
              FrecuenciaBaseRendimiento = rendimiento.replace(new RegExp("GHz"),"");
            }
            continue;
          }
          if (procesador.caracteristicas[i].includes("Frecuencia turbo") && !procesador.caracteristicas[i].includes("**Características**")) {
            let caracteristica = procesador.caracteristicas.find(item => item.includes("Frecuencia turbo (Eficiencia / Rendimiento)"));
            if (caracteristica) {
              let valores = caracteristica.split(":")[1].trim();
              let [eficiencia, rendimiento] = valores.split(" / ");
              FrecuenciaTurboEficiencia = eficiencia.replace(new RegExp("GHz"),"");
              FrecuenciaTurboRendimiento = rendimiento.replace(new RegExp("GHz"),"");
            }
            continue;
          }

          // Mirar la caché
          if (procesador.caracteristicas[i].includes("Caché") && !procesador.caracteristicas[i].includes("**Características**")){
            let match = linea.match(/(\d+)MB/);
            if (match) {
              Cache = match[1];
            } else {
              Cache = "";
            }
            continue;
          }

          // Buscar el TDP
          if (linea.includes("TDP") && !linea.includes("**Características**")) {
            TDP = linea.replace(new RegExp(`\\b${"TDP"}\\b`, "g"), "")
                        .replace(new RegExp(`${":"}`), "")
                        .replace(new RegExp("W"), "")
                        .trim();
            continue;
          }

          // Buscar el nombre de la gráfica integrada
          if (linea.includes("Gráficos") && !linea.includes("**Características**")) {
            GraficaIntegrada = linea.replace(new RegExp(`\\b${"Gráficos"}\\b`, "g"), "").replace(new RegExp(`${":"}`), "").trim();
            continue;
          }
        }

        // Mirar el precio del procesador
        Precio = procesador.precio;
        
        console.log("Fabricante: " + Fabricante);
        console.log("Nombre: " + Nombre);
        console.log("Nomenclatura: " + Nomenclatura);
        console.log("Socket: " + Socket);
        console.log("Gen: " + Gen);
        console.log("Nucleos: " + Nucleos);
        if (NucleosRendimiento != "Null"){
          console.log("Nucleos Rendimiento: " + NucleosRendimiento);
          console.log("Nucleos Eficiencia: " + NucleosEficiencia);
        }
        console.log("Hilos: " + Hilos);
        if(FrecuenciaBaseEficiencia != "Null"){
          console.log("Frecuencia Base Eficiencia: " + FrecuenciaBaseEficiencia);
          console.log("Frecuencia Base Rendimiento: " + FrecuenciaBaseRendimiento);
          console.log("Frecuencia Turbo Eficiencia: " + FrecuenciaTurboEficiencia);
          console.log("Frecuencia Turbo Rendimiento: " + FrecuenciaTurboRendimiento);
        }
        console.log("Caché: " + Cache);
        console.log("TDP:", TDP);
        console.log("Gráfica Integrada:", GraficaIntegrada);
        console.log();
      });

    } else {
      console.error('El archivo JSON no contiene un arreglo "procesadores".');
    }
  } catch (parseError) {
    console.error('Error al analizar el JSON:', parseError);
  }
});
