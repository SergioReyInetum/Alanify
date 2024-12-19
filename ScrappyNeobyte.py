import requests
from bs4 import BeautifulSoup
import json
import time

# Headers para simular un navegador (esto ayuda a evitar ser bloqueado por el servidor web)
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
}

# URL base del sitio web
url_base = "https://www.neobyte.es"

# # Diccionario que contiene las categorías de productos y sus URLs respectivas
categorias = {
    "procesadores": "https://www.neobyte.es/procesadores-107?utm_source=componentes&utm_medium=landing&utm_campaign=Neobyte&order=product.position.asc&resultsPerPage=9999999",
    "placas_base": "https://www.neobyte.es/placas-base-106?utm_source=componentes&utm_medium=landing&utm_campaign=Neobyte&order=product.position.asc&resultsPerPage=9999999",
    "memoria_ram": "https://www.neobyte.es/memorias-ram-108?utm_source=componentes&utm_medium=landing&utm_campaign=Neobyte&order=product.position.asc&resultsPerPage=9999999",
    "tarjetas_graficas": "https://www.neobyte.es/tarjetas-graficas-111?utm_source=componentes&utm_medium=landing&utm_campaign=Neobyte&order=product.position.asc&resultsPerPage=9999999",
    "discos_duros": "https://www.neobyte.es/discos-duros-110?utm_source=componentes&utm_medium=landing&utm_campaign=Neobyte&order=product.position.asc&resultsPerPage=9999999",
    "fuentes_alimentacion": "https://www.neobyte.es/fuentes-de-alimentacion-113?utm_source=componentes&utm_medium=landing&utm_campaign=Neobyte&order=product.position.asc&resultsPerPage=9999999",
    "cajas_ordenador": "https://www.neobyte.es/cajas-de-ordenador-112?utm_source=componentes&utm_medium=landing&utm_campaign=Neobyte&order=product.position.asc&resultsPerPage=9999999",
    "ventilacion": "https://www.neobyte.es/ventilacion-109?utm_source=componentes&utm_medium=landing&utm_campaign=Neobyte&order=product.position.asc&resultsPerPage=9999999",
}

# Limitar la cantidad de productos a extraer por categoría
#limite_productos = 2  # Puedes ajustar este valor según tus necesidades

# Función para procesar una categoría específica
# Esta función extrae información sobre productos desde la página de una categoría
def procesar_categoria(nombre_categoria, url_categoria):
    print(f"Procesando categoría: {nombre_categoria}")
    
    respuesta = requests.get(url_categoria, headers=headers)
    if respuesta.status_code != 200:
        print(f"Error al cargar la página de la categoría {nombre_categoria}: {url_categoria}")
        return []
    # Realiza una solicitud GET para obtener el HTML de la página de la categoría
    soup = BeautifulSoup(respuesta.text, "html.parser")
    productos = [] # Lista para almacenar los productos extraídos
    urls_procesadas = set() # Conjunto para evitar URLs duplicadas

    # Encontrar todos los enlaces en el bloque principal de productos
    bloque_principal = soup.find("div", class_="products")
    if not bloque_principal:
        print(f"No se encontró el bloque principal de productos para la categoría {nombre_categoria}.")
        return []
    
    # Extrae todos los enlaces a productos dentro del bloque
    enlaces_productos = bloque_principal.find_all("a", href=True)
    contador = 0 # Contador para llevar el registro de los productos procesados

    for enlace in enlaces_productos:
        #if contador >= limite_productos:
            #break  # Detener después de alcanzar el límite
        
        # Obtiene el enlace del producto
        href = enlace['href']
        if href.startswith("#") or "neobyte.es#" in href or not href.startswith(("/", "http")):
            # Ignorar enlaces no válidos o que no son productos
            continue
        
        # Ignora enlaces inválidos o que no corresponden a productos
        if href.startswith("http"):
            url_producto = href
        else:
            url_producto = url_base + href

        # Evitar procesar enlaces duplicados
        if url_producto not in urls_procesadas:
            urls_procesadas.add(url_producto)
            contador += 1

            try:
                # Realiza una solicitud GET para obtener el HTML de la página del producto
                respuesta_detalle = requests.get(url_producto, headers=headers)
                if respuesta_detalle.status_code == 200:
                    soup_detalle = BeautifulSoup(respuesta_detalle.text, "html.parser")

                    # Extraer nombre del producto
                    titulo_h1 = soup_detalle.find("h1", class_="h1 page-title")
                    if titulo_h1 and titulo_h1.span:
                        nombre_completo = titulo_h1.span.text.strip()
                    else:
                        nombre_completo = "NULL"

                    # Extraer precio
                    precio_span = soup_detalle.find("span", class_="product-price", content=True)
                    if precio_span:
                        precio = precio_span['content']
                    else:
                        precio = "NULL"

                    # Extraer características
                    caracteristicas = []
                    caracteristicas_section = soup_detalle.find_all("div", class_="product-description")
                    for section in caracteristicas_section:
                        rte_content = section.find("div", class_="rte-content")
                        if rte_content:
                            # Para estructuras tipo <ul><li>
                            ul_element = rte_content.find("ul")
                            if ul_element:
                                for li in ul_element.find_all("li"):
                                    texto = li.get_text(strip=True)
                                    if texto:
                                        caracteristicas.append(texto)
                            
                            # Para estructuras tipo <p><ul><li>
                            current_title = None  # Variable para almacenar el título actual
                            for elem in rte_content.children:  # Iterar directamente por los hijos de rte_content
                                if elem.name == "p" and elem.find("b"):  # Si es un <p> que contiene un <b>
                                    current_title = elem.get_text(strip=True)  # Obtener el título
                                elif elem.name == "ul" and current_title:  # Si es una lista <ul> y hay un título definido
                                    for li in elem.find_all("li"):  # Iterar por los <li> dentro del <ul>
                                        texto = li.get_text(strip=True)
                                        if texto:
                                            caracteristicas.append(f"**{current_title}**: {texto}")
                                    current_title = None  # Reiniciar el título después de procesar la lista

                                

                    # Agrega el producto a la lista
                    productos.append({
                        "nombre": nombre_completo,
                        "precio": precio,
                        "url": url_producto,
                        "caracteristicas": caracteristicas
                    })

                    # Mostrar progreso
                    print(f"Producto {contador}: {nombre_completo} procesado.")
                else:
                    print(f"Error al cargar la página del producto {contador}: {url_producto}")
            except Exception as e:
                print(f"Error al procesar el producto {contador}: {str(e)}")

            # Pausa para no sobrecargar el servidor
            time.sleep(0.5)

    return productos

# Procesa todas las categorías del diccionario
# Los resultados se almacenarán en un diccionario con el nombre de la categoría como clave
datos_todos = {}

for categoria, url in categorias.items():
    datos_todos[categoria] = procesar_categoria(categoria, url)

# Guardar los datos en un archivo JSON
with open('productos_Neobyte.json', 'w', encoding='utf-8') as file:
    json.dump(datos_todos, file, ensure_ascii=False, indent=4)

print("Los datos de prueba han sido guardados en 'productos__Neobyte.json'")
