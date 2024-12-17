import requests
from bs4 import BeautifulSoup
import json
import time

# Headers para simular un navegador
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
}

# URL base y página principal
url_base = "https://www.neobyte.es"
url_inicial = f"{url_base}/procesadores-107?order=product.position.asc&resultsPerPage=9999999"

# Hacer la petición inicial
respuesta = requests.get(url_inicial, headers=headers)

if respuesta.status_code == 200:
    soup = BeautifulSoup(respuesta.text, "html.parser")
    procesadores = []
    urls_procesadas = set()  # Para almacenar URLs únicas

    # Identificar bloques de categorías y checkboxes para excluir
    enlaces_categorias = set()
    bloque_categorias = soup.find("div", class_="block-categories")
    if bloque_categorias:
        enlaces_categorias = {a['href'] for a in bloque_categorias.find_all("a", href=True)}

    # Encontrar todos los enlaces en el bloque principal de productos
    bloque_principal = soup.find("div", class_="products")
    if not bloque_principal:
        print("No se encontró el bloque principal de productos.")
        exit()

    enlaces_procesadores = bloque_principal.find_all("a", href=True)

    contador = 0
   

    for enlace in enlaces_procesadores:
        href = enlace['href']

        # Excluir enlaces de categorías y checkboxes
        if href not in enlaces_categorias and 'custom-checkbox' not in enlace.get('class', []):
            if href.startswith("http"):
                url_procesador = href
            else:
                url_procesador = url_base + href

            # Evitar procesar enlaces duplicados
            if url_procesador not in urls_procesadas:
                urls_procesadas.add(url_procesador)
                contador += 1

                try:
                    # Hacer la petición a la página del procesador
                    respuesta_detalle = requests.get(url_procesador, headers=headers)
                    if respuesta_detalle.status_code == 200:
                        soup_detalle = BeautifulSoup(respuesta_detalle.text, "html.parser")

                        # Extraer el nombre del procesador y el socket del título
                        titulo_h1 = soup_detalle.find("h1", class_="h1 page-title")
                        if titulo_h1 and titulo_h1.span:
                            nombre_completo = titulo_h1.span.text.strip()
                        else:
                            nombre_completo = "Nombre no encontrado"

                        # Extraer el precio
                        precio_span = soup_detalle.find("span", class_="product-price", content=True)
                        if precio_span:
                            precio = precio_span['content']
                        else:
                            precio = "Precio no encontrado"

                        # Extraer la descripción corta (antes de las características)
                        descripcion_corta = soup_detalle.find("div", class_="rte-content product-description")
                        if descripcion_corta:
                            descripcion = descripcion_corta.get_text(strip=True)
                        else:
                            descripcion = "Descripción corta no disponible"

                        # Extraer las características buscando en bloques específicos
                        caracteristicas = []
                        caracteristicas_section = soup_detalle.find_all("div", class_="product-description")
                        
                        for section in caracteristicas_section:
                            rte_content = section.find("div", class_="rte-content")
                            if rte_content:
                                ul_element = rte_content.find("ul")
                                if ul_element:
                                    for li in ul_element.find_all("li"):
                                        texto = li.get_text(strip=True)
                                        if texto:
                                            caracteristicas.append(texto)

                        # Si no encontramos las características en el primer lugar, buscamos más ampliamente
                        if not caracteristicas:
                            print(f"No se encontraron características directamente en el bloque esperado para {nombre_completo}.")
                            # Revisamos si hay más secciones con características

                        # Añadir datos al procesador
                        procesadores.append({
                            "nombre_procesador": nombre_completo,
                            "precio": precio,
                            "url": url_procesador,
                            "descripcion": descripcion,
                            "caracteristicas": caracteristicas
                        })

                        # Mostrar progreso
                        print(f"Procesador {contador}: {nombre_completo} procesado.")
                    else:
                        print(f"Error al cargar la página del procesador {contador}: {url_procesador}")
                except Exception as e:
                    print(f"Error al procesar el procesador {contador}: {str(e)}")

                # Pausa para no sobrecargar el servidor
                time.sleep(0.5)

    # Guardar los datos en un archivo JSON
    if procesadores:
        with open('scrappingComponentes.json', 'w', encoding='utf-8') as file:
            json.dump(procesadores, file, ensure_ascii=False, indent=4)
        print("Los datos de los procesadores han sido guardados en 'scrappingComponentes.json'")
    else:
        print("No se encontraron procesadores para guardar.")
else:
    print("Hubo un error al hacer la petición inicial")
