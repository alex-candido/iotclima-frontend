# -*- coding: utf-8 -*-
"""
Script para gerar dados de estações meteorológicas e salvar em um arquivo JSON.

Para usar em um Jupyter Notebook:
1. Certifique-se de ter as bibliotecas necessárias instaladas (a primeira parte do código tenta fazer isso).
2. Copie e cole todo o conteúdo deste arquivo em uma única célula do seu notebook.
3. Execute a célula.
4. O arquivo 'stations_data.json' será criado no diretório 'data/'.
"""

# Importando as bibliotecas necessárias
import json
import random
import time
import re
import os

# Tenta importar as dependências e as instala se não existirem
try:
    from faker import Faker
    from geopy.geocoders import Nominatim
    from geopy.exc import GeocoderTimedOut, GeocoderServiceError
except ImportError:
    print("Instalando dependências necessárias: geopy, faker...")
    # A linha abaixo funciona em ambientes como Jupyter e Google Colab.
    # Se estiver executando como um script puro, pode ser necessário usar 'pip install ...' no terminal.
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "geopy", "faker"])
    
    from faker import Faker
    from geopy.geocoders import Nominatim
    from geopy.exc import GeocoderTimedOut, GeocoderServiceError

print("Dependências carregadas com sucesso!")

# --- Configuração ---
print("Iniciando configuração...")
fake = Faker('pt_BR')
geolocator = Nominatim(user_agent="iotclima_json_generator_v3")
OUTPUT_DIR = 'data'
OUTPUT_FILE = os.path.join(OUTPUT_DIR, 'stations_data.json')

# --- Dados das Cidades ---
def get_cities_data():
    return {
        "Vale do Jaguaribe": {
            "state": "Ceará", "country": "Brazil", "cities": ["Alto Santo", "Ereré", "Iracema", "Jaguaretama", "Jaguaribara", "Jaguaribe", "Limoeiro do Norte", "Morada Nova", "Palhano", "Pereiro", "Potiretama", "Quixeré", "Russas", "São João do Jaguaribe", "Tabuleiro do Norte"]
        },
        "Sertão dos Inhamuns": {"state": "Ceará", "country": "Brazil", "cities": ["Aiuaba", "Arneiroz", "Parambu", "Quiterianópolis", "Tauá"] },
        "Sertão de Canindé": {"state": "Ceará", "country": "Brazil", "cities": ["Boa Viagem", "Canindé", "Caridade", "Itatira", "Madalena", "Paramoti"] },
        "Maciço do Baturité": {"state": "Ceará", "country": "Brazil", "cities": ["Acarape", "Aracoiaba", "Aratuba", "Barreira", "Baturité", "Capistrano", "Guaramiranga", "Itapiúna", "Mulungu", "Ocara", "Pacoti", "Palmácia", "Redenção"] },
        "Litoral Oeste/Vale do Curu": {"state": "Ceará", "country": "Brazil", "cities": ["Apuiarés", "General Sampaio", "Irauçuba", "Itapajé", "Miraíma", "Pentecoste", "Tejuçuoca", "Tururu", "Umirim", "Uruburetama"] },
        "Litoral Norte": {"state": "Ceará", "country": "Brazil", "cities": ["Acaraú", "Barroquinha", "Bela Cruz", "Camocim", "Chaval", "Cruz", "Granja", "Jijoca de Jericoacoara", "Marco", "Morrinhos", "Uruoca", "Martinópole"] },
        "Serra da Ibiapaba": {"state": "Ceará", "country": "Brazil", "cities": ["Carnaubal", "Croatá", "Guaraciaba do Norte", "Ibiapina", "Ipu", "São Benedito", "Tianguá", "Ubajara", "Viçosa do Ceará"] },
        "Grande Fortaleza": {"state": "Ceará", "country": "Brazil", "cities": ["Chorozinho", "São Luís do Curu"] }
    }

# --- Funções Auxiliares ---
def get_geocoded_data(city_name, state, country, geolocator):
    query = f"{city_name}, {state}, {country}"
    try:
        location = geolocator.geocode(query, timeout=10)
        if location:
            raw_address = location.raw.get('address', {})
            canonical_city = raw_address.get('city') or raw_address.get('town') or city_name
            return location.latitude, location.longitude, canonical_city
        print(f"Aviso: Não foi possível obter geolocalização para '{query}'.")
        return None, None, None
    except GeocoderTimedOut:
        print(f"Erro de timeout para '{query}'. Tentando novamente em 1s.")
        time.sleep(1)
        return get_geocoded_data(city_name, state, country, geolocator)
    except (GeocoderServiceError, Exception) as e:
        print(f"Erro ao geolocalizar '{query}': {e}. Pulando cidade.")
        return None, None, None

# --- Geração dos Dados ---
def generate_all_station_data():
    stations_list = []
    station_id_counter = 1
    all_cities_data = get_cities_data()

    print(f"Iniciando geração de dados para {len(all_cities_data)} regiões...")
    total_cities = sum(len(data['cities']) for data in all_cities_data.values())
    city_count = 0

    for region, data in all_cities_data.items():
        for city_name_full in data['cities']:
            city_count += 1
            print(f"Processando cidade {city_count}/{total_cities}: {city_name_full}...")
            latitude, longitude, canonical_city_name = get_geocoded_data(city_name_full, data['state'], data['country'], geolocator)
            time.sleep(1.1)  # Pausa para não sobrecarregar a API

            if latitude is None:
                continue

            station_data = {
                "id": station_id_counter,
                "uuid": f"uuid-{station_id_counter}",
                "name": f"Estação {canonical_city_name[:3].upper()} {station_id_counter}",
                "description": f"Estação de monitoramento em {canonical_city_name}",
                "status": random.choice([0, 1]),
                "info": {"model": random.choice(["Model X", "Model Y"]), "firmware": f"1.{random.randint(0,9)}", "installed_at": fake.iso8601()},
                "place": {
                    "id": station_id_counter,
                    "uuid": f"place-uuid-{station_id_counter}",
                    "name": f"Local {station_id_counter}",
                    "description": f"Localização da Estação {station_id_counter}",
                    "info": {"address": fake.address().replace('\n', ', '), "city": canonical_city_name, "state": data['state'], "country": data['country']},
                    "geometry": {"type": "Point", "coordinates": [longitude, latitude]},
                    "status": 1,
                    "latitude": latitude,
                    "longitude": longitude,
                    "created_at": fake.iso8601(),
                    "updated_at": fake.iso8601()
                },
                "records": [{
                    "id": station_id_counter,
                    "uuid": f"record-uuid-{station_id_counter}",
                    "sensors": [
                        {"sensor_type": 1, "value": round(random.uniform(15, 40), 1), "unit": 1},
                        {"sensor_type": 2, "value": round(random.uniform(30, 90), 1), "unit": 3},
                        {"sensor_type": 4, "value": round(random.uniform(0, 20), 1), "unit": 7}
                    ],
                    "created_at": fake.iso8601(), "updated_at": fake.iso8601()}
                ],
                "created_at": fake.iso8601(), "updated_at": fake.iso8601()
            }
            stations_list.append(station_data)
            station_id_counter += 1
            
    return stations_list

# --- Salvar em JSON ---
def save_data_to_json(data):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"\nProcesso concluído. Total de registros: {len(data)}. Salvo em: {OUTPUT_FILE}")

# --- Execução Principal ---
if __name__ == '__main__':
    # Este bloco é executado quando o script é chamado diretamente.
    # Ao copiar para um notebook, você pode chamar as funções diretamente.
    final_data = generate_all_station_data()
    save_data_to_json(final_data)

print("\nPara executar em um notebook, copie o código e chame as funções:\nfinal_data = generate_all_station_data()\nsave_data_to_json(final_data)")
