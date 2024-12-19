import requests

url = "https://www.neobyte.es/procesadores-107?order=product.position.asc&resultsPerPage=9999999"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
}

respuesta = requests.get(url, headers=headers)

if respuesta.status_code == 200:
    with open('neobyte_html.html', 'w', encoding='utf-8') as file:
        file.write(respuesta.text)
    print("El HTML de la página ha sido guardado en 'neobyte_html.html'")
else:
    print("Hubo un error al hacer la petición")