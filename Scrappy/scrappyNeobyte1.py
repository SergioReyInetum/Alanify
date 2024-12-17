import requests
from bs4 import BeautifulSoup
import json
import time

# Headers para simular un navegador
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
}

# URL base
url_base = "https://www.neobyte.es"

# Diccionario de categorías y sus URLs
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

# Función para procesar una categoría
def procesar_categoria(nombre_categoria, url_categoria):
    print(f"Procesando categoría: {nombre_categoria}")
    respuesta = requests.get(url_categoria, headers=headers)
    if respuesta.status_code != 200:
        print(f"Error al cargar la página de la categoría {nombre_categoria}: {url_categoria}")
        return []

    soup = BeautifulSoup(respuesta.text, "html.parser")
    productos = []
    urls_procesadas = set()

    # Encontrar todos los enlaces en el bloque principal de productos
    bloque_principal = soup.find("div", class_="products")
    if not bloque_principal:
        print(f"No se encontró el bloque principal de productos para la categoría {nombre_categoria}.")
        return []

    enlaces_productos = bloque_principal.find_all("a", href=True)
    contador = 0

    for enlace in enlaces_productos:
        #if contador >= limite_productos:
            #break  # Detener después de alcanzar el límite

        href = enlace['href']
        if href.startswith("#") or "neobyte.es#" in href or not href.startswith(("/", "http")):
            # Ignorar enlaces no válidos o que no son productos
            continue

        if href.startswith("http"):
            url_producto = href
        else:
            url_producto = url_base + href

        # Evitar procesar enlaces duplicados
        if url_producto not in urls_procesadas:
            urls_procesadas.add(url_producto)
            contador += 1

            try:
                # Hacer la petición a la página del producto
                respuesta_detalle = requests.get(url_producto, headers=headers)
                if respuesta_detalle.status_code == 200:
                    soup_detalle = BeautifulSoup(respuesta_detalle.text, "html.parser")

                    # Extraer nombre
                    titulo_h1 = soup_detalle.find("h1", class_="h1 page-title")
                    if titulo_h1 and titulo_h1.span:
                        nombre_completo = titulo_h1.span.text.strip()
                    else:
                        nombre_completo = "Nombre no encontrado"

                    # Extraer precio
                    precio_span = soup_detalle.find("span", class_="product-price", content=True)
                    if precio_span:
                        precio = precio_span['content']
                    else:
                        precio = "Precio no encontrado"

                    # Extraer descripción corta
                    descripcion_corta = soup_detalle.find("div", class_="rte-content product-description")
                    if descripcion_corta:
                        descripcion = descripcion_corta.get_text(strip=True)
                    else:
                        descripcion = "Descripción corta no disponible"

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
                            p_elements = rte_content.find_all("p")
                            for p in p_elements:
                                # Extraer texto de <p> si no tiene <ul> dentro (cabeceras o párrafos sin listas)
                                if not p.find("ul"):
                                    texto = p.get_text(strip=True)
                                    if texto:
                                        caracteristicas.append(f"**{texto}**")
                                else:
                                    ul_in_p = p.find("ul")
                                    for li in ul_in_p.find_all("li"):
                                        texto = li.get_text(strip=True)
                                        if texto:
                                            caracteristicas.append(texto)
                                

                    # Añadir datos al producto
                    productos.append({
                        "nombre": nombre_completo,
                        "precio": precio,
                        "url": url_producto,
                        "descripcion": descripcion,
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

# Procesar todas las categorías
datos_todos = {}

for categoria, url in categorias.items():
    datos_todos[categoria] = procesar_categoria(categoria, url)

# Guardar los datos en un archivo JSON
with open('productos_Neobyte.json', 'w', encoding='utf-8') as file:
    json.dump(datos_todos, file, ensure_ascii=False, indent=4)

print("Los datos de prueba han sido guardados en 'productos_Neobyte.json'")
