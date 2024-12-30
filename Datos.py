from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

# Nombre del modelo en Hugging Face
modelo_nombre = "SergioInetum/autotrain-advanced"

def cargar_modelo():
    print("Cargando el modelo y el tokenizador desde Hugging Face...")
    tokenizer = AutoTokenizer.from_pretrained(modelo_nombre)
    modelo = AutoModelForSequenceClassification.from_pretrained(modelo_nombre)
    return pipeline("text-classification", model=modelo, tokenizer=tokenizer)

def clasificar_frase(clasificador, frase):
    print(f"Clasificando la frase: '{frase}'")
    resultado = clasificador(frase)
    return resultado

if __name__ == "__main__":
    # Cargar el modelo y el tokenizador
    clasificador = cargar_modelo()

    # Ejemplo de frases a clasificar
    frases = [
        "Quiero un ordenador para jugar a videojuegos exigentes.",
        "Necesito un PC para estudiar ingeniería.",
        "Solo quiero un ordenador para ver videos y navegar en casa.",
        "Busco una computadora para diseñar objetos 3D.",
        "Quiero un ordenador para jugar Counter-Strike",
        "Quiero un ordenador para estar en casa y hacer algun programita en el cual también pueda jugar a juegos casuales",
        "Ordenador para hacer videos",
        "Quiero un ordenador par ajugar al solitario y la Candy Crash",
        "Quiero un ordenador para jugar fortnite, ver videos y hablar con amigos por discord",
        "Quiero jugar al vrchat",
        "Quiero un ordenador para el niño",
        "Quiero un ordenador para oficina barato"
    ]

    # Clasificar cada frase
    for frase in frases:
        resultado = clasificar_frase(clasificador, frase)
        print("Resultado:", resultado)
