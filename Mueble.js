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
      var Nombre_Procesadores = "";
      var Fabricante_Procesadores = "";
      var Socket_Procesadores = "";
      var Nomenclatura_Procesadores = "";
      var Gen_Procesadores = "";
      var Nucleos_Procesadores = "";
      var NucleosEficiencia_Procesadores = "";
      var NucleosRendimiento_Procesadores = "";
      var Hilos_Procesadores = "";
      var FrecuenciaBaseEficiencia_Procesadores = "";
      var FrecuenciaBaseRendimiento_Procesadores = "";
      var FrecuenciaTurboEficiencia_Procesadores = "";
      var FrecuenciaTurboRendimiento_Procesadores = "";
      var Cache_Procesadores = "";
      var TDP_Procesadores = "";
      var GraficaIntegrada_Procesadores = "";
      var Precio_Procesadores = "";

      // Extraer los datos de los procesadores
      const procesadores = data.procesadores.map(procesador => ({
        nombre: procesador.nombre,
        precio: procesador.precio,
        url: procesador.url,
        caracteristicas: procesador.caracteristicas
      }));

      // Imprimir los nombres y fabricantes de los procesadores en consola
      Nombre_Procesadores = "Null";
      Fabricante_Procesadores = "Null";
      procesadores.forEach((procesador, index) => {
        if(procesador.caracteristicas[0].includes("Intel")||procesador.caracteristicas[0].includes("AMD")||procesador.caracteristicas[0].includes("Ryzen")){
          Nombre_Procesadores = procesador.caracteristicas[0]
        } else{
          Nombre_Procesadores = procesador.nombre;
        }

        // Mirar de forma ordenada si el procesador es Intel, AMD u Otro
        Fabricante_Procesadores = "";
        if (procesador.nombre.split(/\s+/).includes("Intel")) {
          Fabricante_Procesadores = "Intel";
        }
        else if (procesador.nombre.split(/\s+/).includes("AMD") || procesador.nombre.split(/\s+/).includes("Ryzen")) {
          Fabricante_Procesadores = "AMD";
        }
        else{
          for (let i = 0; i < procesador.nombre.length; i++) {
            if (procesador.nombre[i] == " ") {
                break;                
            }
          Fabricante_Procesadores = Fabricante_Procesadores + procesador.nombre[i];
          }
        }

        // Mirar la nomenclatura de los procesadores
        Nomenclatura_Procesadores = "";
        if(Fabricante_Procesadores == "Intel"){
          let listaCategoria = ["Core","Pentium","Celeron","Xeon"];
          let num;
          if(Nombre_Procesadores.includes(" " + listaCategoria[0] + " ")){
            num = 0;
          }
          else if(Nombre_Procesadores.includes(" " + listaCategoria[1] + " ")){ 
            num = 1;
          }
          else if(Nombre_Procesadores.includes(" " + listaCategoria[2] + " ")){
            num = 2;
          }
          else if(Nombre_Procesadores.includes(" " + listaCategoria[3] + " ")){
            num = 3;
          }
          else{
            num = 4;
            Nomenclatura_Procesadores = "Null";
            exit;
          }
          if(num!=4){
            for (let a = (6 + listaCategoria[num].length + 1); a < Nombre_Procesadores.length; a++) {
            Nomenclatura_Procesadores = Nomenclatura_Procesadores + Nombre_Procesadores[a];
            }
          }
        }

        else if(Fabricante_Procesadores == "AMD" && Nombre_Procesadores.includes("Ryzen")){
          for (let a = 10; a < Nombre_Procesadores.length; a++) {
            if(Nombre_Procesadores[a] != "-"){
              Nomenclatura_Procesadores = Nomenclatura_Procesadores + Nombre_Procesadores[a];
            }
            else{
              break;
            }
          }
        }

        else{
          Nomenclatura_Procesadores = "Null";
        }

        // Mirar la gen_Procesadoreseración de los procesadores
        Gen_Procesadores = "Null";
        if(Fabricante_Procesadores == "Intel" && Nomenclatura_Procesadores[0] == "i"){
          if (Nomenclatura_Procesadores[1] != 1) {
            Gen_Procesadores = Nomenclatura_Procesadores[0] + Nomenclatura_Procesadores[1];
          } else{
            Gen_Procesadores = Nomenclatura_Procesadores[0] + Nomenclatura_Procesadores[1] + Nomenclatura_Procesadores[2];
          }
        }
        else if(Fabricante_Procesadores == "AMD"){
          for (let i = 0; i < Nomenclatura_Procesadores.length; i++) {
            if(Nomenclatura_Procesadores[i] == " " && !isNaN(Nomenclatura_Procesadores[i-1])){
              switch (Nomenclatura_Procesadores[i+1]) {
                case "1":
                  Gen_Procesadores = "Zen";
                  break;
                case "2":
                  Gen_Procesadores = "Zen+";
                  break;
                case "3":
                  Gen_Procesadores = "Zen 2";
                  break;
                case "5":
                  Gen_Procesadores = "Zen 3";
                  break;
                case "7":
                  Gen_Procesadores = "Zen 4";
                  break;  
                case "8":
                  Gen_Procesadores = "Zen 5";
                  break;                    
                default:
                  Gen_Procesadores = "Null";
                  break;
            }
              break;
            }
            
          }
        }

        Socket_Procesadores = "Null";
        Nucleos_Procesadores = "Null";
        NucleosRendimiento_Procesadores = "Null";
        NucleosEficiencia_Procesadores = "Null";
        Hilos_Procesadores = "Null";
        FrecuenciaBaseEficiencia_Procesadores = "Null";
        FrecuenciaBaseRendimiento_Procesadores = "Null";
        FrecuenciaTurboEficiencia_Procesadores = "Null";
        FrecuenciaTurboRendimiento_Procesadores = "Null";
        Cache_Procesadores = "Null";
        TDP_Procesadores = "Null";
        GraficaIntegrada_Procesadores = "Null";
        for (let i = 0; i < procesador.caracteristicas.length; i++) {
          let linea = procesador.caracteristicas[i];
          // Mirar el socket del procesador
          if (procesador.caracteristicas[i].includes("Socket_Procesadores") && !procesador.caracteristicas[i].includes("**Características**")) {
            Socket_Procesadores = procesador.caracteristicas[i].replace(new RegExp(`\\b${"Socket_Procesadores"}\\b`, "g"), "").replace(new RegExp(`${":"}`), "").trim();
            continue;
          }

          // Mirar los Nucleos e Hilos del procesador
          if ((procesador.caracteristicas[i].includes("núcleos")||procesador.caracteristicas[i].includes("CPU")||procesador.caracteristicas[i].includes("Núcleos")) && !procesador.caracteristicas[i].includes("**Características**")) {
            Nucleos_Procesadores = procesador.caracteristicas[i].replace(new RegExp(`\\b(?:Cantidad de núcleos|Número de núcleos|Núcleos CPU)\\b`, "g"), "").replace(new RegExp(`${":"}`), "").trim();
            if(!isNaN(Nucleos_Procesadores[1])){
              Nucleos_Procesadores = Nucleos_Procesadores[0] + Nucleos_Procesadores[1];
            } else{
              Nucleos_Procesadores = Nucleos_Procesadores[0];
            }
            continue;
          }
          // Mirar en los nucleos sus nucleos destinados a Eficiencia y Rendimiento
          if(Nucleos_Procesadores != "Null" && (procesador.caracteristicas[i].includes("Rendimiento +") && !procesador.caracteristicas[i].includes("**Características**"))){
            if(!isNaN(linea[26])){
              NucleosRendimiento_Procesadores = linea[25]+linea[26];
            } else{
              NucleosRendimiento_Procesadores = linea[25];
            }
            if(!isNaN(linea[44])){
              NucleosEficiencia_Procesadores = linea[43]+linea[44];
            } else{
              NucleosEficiencia_Procesadores = linea[43];
            }
            continue;
          }
          if ((procesador.caracteristicas[i].includes("hilos_Procesadores")||procesador.caracteristicas[i].includes("subprocesos")||procesador.caracteristicas[i].includes("Hilos_Procesadores")) && !procesador.caracteristicas[i].includes("**Características**")) {
            Hilos_Procesadores = procesador.caracteristicas[i].replace(new RegExp(`\\b(?:Cantidad de hilos_Procesadores|Número de hilos_Procesadores|Cantidad de subprocesos|N.° de subprocesos)\\b`, "g"), "").replace(new RegExp(`${":"}`), "").trim();
            if(!isNaN(Hilos_Procesadores[1])){
              Hilos_Procesadores = Hilos_Procesadores[0] + Hilos_Procesadores[1];
            } else{
              Hilos_Procesadores = Hilos_Procesadores[0];
            }
            continue;
          }
          
          // Mirar la Frecuencia base y la Frecuencia turbo
          if (procesador.caracteristicas[i].includes("Frecuencia base") && !procesador.caracteristicas[i].includes("**Características**")) {
            let caracteristica = procesador.caracteristicas.find(item => item.includes("Frecuencia base (Eficiencia / Rendimiento)"));
            if (caracteristica) {
              let valores = caracteristica.split(":")[1].trim();
              let [eficiencia, rendimiento] = valores.split(" / ");
              FrecuenciaBaseEficiencia_Procesadores = eficiencia.replace(new RegExp("GHz"),"");
              FrecuenciaBaseRendimiento_Procesadores = rendimiento.replace(new RegExp("GHz"),"");
            }
            continue;
          }
          if (procesador.caracteristicas[i].includes("Frecuencia turbo") && !procesador.caracteristicas[i].includes("**Características**")) {
            let caracteristica = procesador.caracteristicas.find(item => item.includes("Frecuencia turbo (Eficiencia / Rendimiento)"));
            if (caracteristica) {
              let valores = caracteristica.split(":")[1].trim();
              let [eficiencia, rendimiento] = valores.split(" / ");
              FrecuenciaTurboEficiencia_Procesadores = eficiencia.replace(new RegExp("GHz"),"");
              FrecuenciaTurboRendimiento_Procesadores = rendimiento.replace(new RegExp("GHz"),"");
            }
            continue;
          }

          // Mirar la caché
          if (procesador.caracteristicas[i].includes("Caché") && !procesador.caracteristicas[i].includes("**Características**")){
            let match = linea.match(/(\d+)MB/);
            if (match) {
              Cache_Procesadores = match[1];
            } else {
              Cache_Procesadores = "";
            }
            continue;
          }

          // Buscar el TDP_Procesadores
          if (linea.includes("TDP_Procesadores") && !linea.includes("**Características**")) {
            TDP_Procesadores = linea.replace(new RegExp(`\\b${"TDP_Procesadores"}\\b`, "g"), "")
                        .replace(new RegExp(`${":"}`), "")
                        .replace(new RegExp("W"), "")
                        .trim();
            continue;
          }

          // Buscar el nombre_Procesadores de la gráfica integrada
          if (linea.includes("Gráficos") && !linea.includes("**Características**")) {
            GraficaIntegrada_Procesadores = linea.replace(new RegExp(`\\b${"Gráficos"}\\b`, "g"), "").replace(new RegExp(`${":"}`), "").trim();
            continue;
          }
        }

        // Mirar el precio_Procesadores del procesador
        Precio_Procesadores = procesador.precio;
        
        console.log("Fabricante: " + Fabricante_Procesadores);
        console.log("Nombre: " + Nombre_Procesadores);
        console.log("Nomenclatura: " + Nomenclatura_Procesadores);
        console.log("Socket: " + Socket_Procesadores);
        console.log("Gen: " + Gen_Procesadores);
        console.log("Nucleos: " + Nucleos_Procesadores);
        console.log("Nucleos Rendimiento: " + NucleosRendimiento_Procesadores);
        console.log("Nucleos Eficiencia: " + NucleosEficiencia_Procesadores);
        console.log("Hilos: " + Hilos_Procesadores);
        console.log("Frecuencia Base Eficiencia: " + FrecuenciaBaseEficiencia_Procesadores);
        console.log("Frecuencia Base Rendimiento: " + FrecuenciaBaseRendimiento_Procesadores);
        console.log("Frecuencia Turbo Eficiencia: " + FrecuenciaTurboEficiencia_Procesadores);
        console.log("Frecuencia Turbo Rendimiento: " + FrecuenciaTurboRendimiento_Procesadores);
        console.log("Caché: " + Cache_Procesadores);
        console.log("TDP:", TDP_Procesadores);
        console.log("Gráfica Integrada:", GraficaIntegrada_Procesadores);
        console.log("Precio: " + Precio_Procesadores)
        console.log();
      });

    } else {
      console.error('El archivo JSON no contiene un arreglo "procesadores".');
    }
    if (Array.isArray(data.placas_base)) {
      // Crear todas las variables necesarias
      var Nombre_Placa_Base = "";
      var Fabricante_Placa_Base = "";
      var Socket_Placa_Base = "";
      var Forma_Placa_Base = "";
      var DDR_Placa_Base = "";
      var NumRAM_Placa_Base = "";
      var MHz_Placa_Base = "";
      var ConectorAlmacenamiento_Placa_Base = "";
      var NumPCI_Placa_Base = "";
      var NumPCIE_Placa_Base = "";
      var USB_Placa_Base = "";
      var NumUSB_Placa_Base = "";
      var Audio_Placa_Base = "";
      var PuertosVideo_Placa_Base = "";
      var Wifi_Placa_Base = "";
      var Bluetooth_Placa_Base = "";
      var Ethernet_Placa_Base = "";
      var RGB_Placa_Base = false;
      var Precio_Placa_Base = "";

      // Extraer los datos de las placas base
      const PlacasBase = data.placas_base.map(placa_base => ({
        nombre: placa_base.nombre,
        precio: placa_base.precio,
        url: placa_base.url,
        caracteristicas: placa_base.caracteristicas
      }));

      PlacasBase.forEach((PB, index) => {
        Nombre_Placa_Base = PB.nombre;
        if(Nombre_Placa_Base.toLowerCase().includes("asus")){
          Fabricante_Placa_Base = "Asus";
        } else if(Nombre_Placa_Base.toLowerCase().includes("msi")){
          Fabricante_Placa_Base = "MSI";
        } else if(Nombre_Placa_Base.toLowerCase().includes("gigabyte")){
          Fabricante_Placa_Base = "Gigabyte";
        } else if(Nombre_Placa_Base.toLowerCase().includes("asrock")){
          Fabricante_Placa_Base = "Asrock";
        } else if(Nombre_Placa_Base.toLowerCase().includes("asus")){
          Fabricante_Placa_Base = "Asus";
        }
        else{
          Fabricante_Placa_Base = "Null";
        }

        console.log(Nombre_Placa_Base);
        console.log(Fabricante_Placa_Base);
        console.log();
      });      
    } else {
      console.error('El archivo JSON no contiene un arreglo "placas base".');
    }
  } catch (parseError) {
    console.error('Error al analizar el JSON:', parseError);
  }
});
