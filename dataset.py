from transformers import pipeline

# Crear un pipeline de clasificación de texto
classifier = pipeline('text-classification', model=model, tokenizer=tokenizer)

# Texto de entrada para la predicción
texto_entrada = "Quiero un ordenador para editar videos profesionales."

# Realizar la predicción
prediccion = classifier(texto_entrada)

# Mostrar la predicción
print(prediccion)
