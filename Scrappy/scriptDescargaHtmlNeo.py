import requests

# Headers para simular un navegador
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
}

# URL de la página que deseas descargar
url = "https://www.neobyte.es/asus-tuf-gaming-b650-e-wifi-placa-base-am5-atx-20524.html"  # Cambia esta URL según la página

# Realizar la petición
response = requests.get(url, headers=headers)

# Verificar si la petición fue exitosa
if response.status_code == 200:
    # Guardar el HTML en un archivo
    with open("NeoPlacaBase.html", "w", encoding="utf-8") as file:
        file.write(response.text)
    print("El HTML de la página se ha guardado en 'NeoPlacaBase.html'.")
else:
    print(f"Error al descargar la página: {response.status_code}")
