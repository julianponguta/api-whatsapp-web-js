import sys

def leer_archivo(archivo):
    try:
        with open(archivo, 'r') as file:
            contenido = file.read()
        return contenido
    except FileNotFoundError:
        return f"El archivo {archivo} no se encontró."
    except Exception as e:
        return f"Ocurrió un error al leer {archivo}: {str(e)}"

def main():
    if len(sys.argv) < 2:
        print("Por favor, proporciona al menos un archivo como argumento.")
        return

    archivos = sys.argv[1:]

    for archivo in archivos:
        contenido = leer_archivo(archivo)
        print(f"Contenido de {archivo}:")
        print(contenido)
        print("\n" + "-" * 50 + "\n")

if __name__ == "__main__":
    main()
