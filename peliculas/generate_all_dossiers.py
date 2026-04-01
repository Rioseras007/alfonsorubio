
import os
import json
import re

# Database of detailed info for the generator
# Using the structure: { "slug": { "director": "", "music": "", "runtime": "", "box_office": "", "awards": "", "imdb": "", "plot": "", "cast": [], "trivia": [] } }
EXTRA_DATA = {
    "desde_rusia_con_amor": {
        "director": "Terence Young",
        "music": "John Barry / Lionel Bart",
        "runtime": "115 min",
        "box_office": "$78.9M",
        "awards": "BAFTA Winner: Best Cinematography",
        "imdb": "https://www.imdb.com/title/tt0057012/",
        "plot": "Bond es enviado a Estambul para ayudar a una desertora soviética a escapar con una máquina decodificadora Lektor, cayendo en una trampa de SPECTRE.",
        "cast": ["Sean Connery (James Bond)", "Daniela Bianchi (Tatiana Romanova)", "Robert Shaw (Red Grant)", "Lotte Lenya (Rosa Klebb)"],
        "trivia": ["Lotte Lenya tenía miedo de que sus zapatos con cuchilla fueran confiscados por la aduana.", "Primera aparición de Blofeld (aunque solo se ven sus manos y gato)."]
    },
    "james_bond_contra_goldfinger": {
        "director": "Guy Hamilton",
        "music": "John Barry / Shirley Bassey",
        "runtime": "110 min",
        "box_office": "$124.9M",
        "awards": "Oscar Winner: Best Sound Effects",
        "imdb": "https://www.imdb.com/title/tt0058150/",
        "plot": "Bond investiga al magnate del oro Auric Goldfinger y descubre su plan para contaminar la reserva de oro de Fort Knox.",
        "cast": ["Sean Connery (James Bond)", "Gert Fröbe (Goldfinger)", "Honor Blackman (Pussy Galore)", "Harold Sakata (Oddjob)"],
        "trivia": ["Primer Bond en ganar un Oscar.", "El coche Aston Martin DB5 debutó aquí con todos sus gadgets."]
    },
    "operacion_trueno": {
        "director": "Terence Young",
        "music": "John Barry / Tom Jones",
        "runtime": "130 min",
        "box_office": "$141.2M",
        "awards": "Oscar Winner: Best Visual Effects",
        "imdb": "https://www.imdb.com/title/tt0059800/",
        "plot": "SPECTRE secuestra dos bombas nucleares de la OTAN y pide un rescate masivo. Bond viaja a las Bahamas para recuperarlas.",
        "cast": ["Sean Connery (James Bond)", "Adolfo Celi (Largo)", "Claudine Auger (Domino)", "Luciana Paluzzi (Fiona Volpe)"],
        "trivia": ["La batalla submarina fue una de las producciones más complejas de la época.", "Sean Connery estaba rodeado de tiburones reales en la piscina."]
    },
    "solo_se_vive_dos_veces": {
        "director": "Lewis Gilbert",
        "music": "John Barry / Nancy Sinatra",
        "runtime": "117 min",
        "box_office": "$111.6M",
        "awards": "Nominated: BAFTA Best Art Direction",
        "imdb": "https://www.imdb.com/title/tt0062512/",
        "plot": "Cápsulas espaciales desaparecen en órbita. Bond viaja a Japón para descubrir quién está intentando provocar una guerra mundial.",
        "cast": ["Sean Connery (James Bond)", "Donald Pleasence (Blofeld)", "Akiko Wakabayashi (Aki)", "Tetsurō Tamba (Tiger Tanaka)"],
        "trivia": ["El decorado del volcán fue el más grande jamás construido en Pinewood.", "Roald Dahl escribió el guion."]
    },
    "al_servicio_secreto_de_su_majestad": {
        "director": "Peter R. Hunt",
        "music": "John Barry / Louis Armstrong",
        "runtime": "142 min",
        "box_office": "$82M",
        "awards": "Golden Globe Nominee (George Lazenby)",
        "imdb": "https://www.imdb.com/title/tt0064757/",
        "plot": "Bond se enamora y se casa, mientras persigue a Blofeld a los Alpes suizos, donde este planea un ataque bacteriológico.",
        "cast": ["George Lazenby (James Bond)", "Diana Rigg (Tracy di Vicenzo)", "Telly Savalas (Blofeld)"],
        "trivia": ["Única película de George Lazenby.", "El final es considerado el más trágico de toda la saga."]
    },
    "diamantes_para_la_eternidad": {
        "director": "Guy Hamilton",
        "music": "John Barry / Shirley Bassey",
        "runtime": "120 min",
        "box_office": "$116M",
        "awards": "Oscar Nominee: Best Sound",
        "imdb": "https://www.imdb.com/title/tt0066995/",
        "plot": "Bond investiga el contrabando de diamantes y termina en Las Vegas, donde descubre que Blofeld está usando las joyas para un satélite láser.",
        "cast": ["Sean Connery (James Bond)", "Jill St. John (Tiffany Case)", "Charles Gray (Blofeld)"],
        "trivia": ["Regreso de Sean Connery tras el paréntesis de Lazenby.", "La persecución del coche lunar fue real en el desierto."]
    },
    "vive_y_deja_morir": {
        "director": "Guy Hamilton",
        "music": "George Martin / Paul McCartney",
        "runtime": "121 min",
        "box_office": "$161.8M",
        "awards": "Oscar Nominee: Best Original Song",
        "imdb": "https://www.imdb.com/title/tt0070328/",
        "plot": "Bond investiga la muerte de agentes en Nueva York y termina en el Caribe enfrentándose al Dr. Kananga y el vudú.",
        "cast": ["Roger Moore (James Bond)", "Yaphet Kotto (Mr. Big)", "Jane Seymour (Solitaire)"],
        "trivia": ["Debut de Roger Moore.", "El salto sobre los cocodrilos fue una acrobacia real realizada por Ross Kananga."]
    },
    "el_hombre_de_la_pistola_de_oro": {
        "director": "Guy Hamilton",
        "music": "John Barry / Lulu",
        "runtime": "125 min",
        "box_office": "$97.6M",
        "awards": "Golden Screen (Germany)",
        "imdb": "https://www.imdb.com/title/tt0071852/",
        "plot": "Bond es el objetivo del asesino a sueldo mejor pagado del mundo, Francisco Scaramanga, que usa una pistola de oro.",
        "cast": ["Roger Moore (James Bond)", "Christopher Lee (Scaramanga)", "Britt Ekland (Mary Goodnight)"],
        "trivia": ["Christopher Lee era primo de Ian Fleming.", "El salto del coche en espiral se calculó por computadora."]
    },
    "la_espia_que_me_amo": {
        "director": "Lewis Gilbert",
        "music": "Marvin Hamlisch / Carly Simon",
        "runtime": "125 min",
        "box_office": "$185.4M",
        "awards": "3 Oscar Nominations (Music, Art)",
        "imdb": "https://www.imdb.com/title/tt0076752/",
        "plot": "Bond colabora con una agente soviética para investigar la desaparición de submarinos nucleares británicos y rusos.",
        "cast": ["Roger Moore (James Bond)", "Barbara Bach (Anya Amasova)", "Richard Kiel (Jaws)"],
        "trivia": ["Debut del Lotus Esprit sumergible.", "Considerada la mejor película de la era de Roger Moore."]
    },
    "moonraker": {
        "director": "Lewis Gilbert",
        "music": "John Barry / Shirley Bassey",
        "runtime": "126 min",
        "box_office": "$210.3M",
        "awards": "Oscar Nominee: Best Visual Effects",
        "imdb": "https://www.imdb.com/title/tt0079574/",
        "plot": "Bond investiga el robo de un transbordador espacial y termina en una estación orbital para detener el genocidio planeado por Hugo Drax.",
        "cast": ["Roger Moore (James Bond)", "Lois Chiles (Holly Goodhead)", "Michael Lonsdale (Drax)"],
        "trivia": ["Se hizo para aprovechar el éxito de Star Wars.", "El salto inicial sin paracaídas tardó semanas en filmarse."]
    },
    "solo_para_sus_ojos": {
        "director": "John Glen",
        "music": "Bill Conti / Sheena Easton",
        "runtime": "127 min",
        "box_office": "$195.3M",
        "awards": "Oscar/Golden Globe Nominee (Song)",
        "imdb": "https://www.imdb.com/title/tt0082398/",
        "plot": "Bond intenta recuperar un sistema de comunicación de submarinos antes de que caiga en manos rusas.",
        "cast": ["Roger Moore (James Bond)", "Carole Bouquet (Melina)", "Chaim Topol (Columbo)"],
        "trivia": ["Estilo más serio tras los excesos de Moonraker.", "El coche Citroën 2CV tuvo que ser reforzado para la persecución."]
    },
    "octopussy": {
        "director": "John Glen",
        "music": "John Barry / Rita Coolidge",
        "runtime": "131 min",
        "box_office": "$187.5M",
        "awards": "Golden Screen (Germany)",
        "imdb": "https://www.imdb.com/title/tt0086034/",
        "plot": "Bond investiga la muerte de 009 en Berlín y descubre un plan soviético para usar un circo como cobertura para un ataque nuclear.",
        "cast": ["Roger Moore (James Bond)", "Maud Adams (Octopussy)", "Louis Jourdan (Kamal Khan)"],
        "trivia": ["Maud Adams es la única actriz en ser 'chica Bond' principal dos veces.", "Roger Moore se disfrazó de payaso en una escena crítica."]
    },
    "panorama_para_matar": {
        "director": "John Glen",
        "music": "John Barry / Duran Duran",
        "runtime": "131 min",
        "box_office": "$152.6M",
        "awards": "Golden Globe Nominee (Song)",
        "imdb": "https://www.imdb.com/title/tt0090264/",
        "plot": "Max Zorin planea destruir Silicon Valley para controlar el mercado de microchips. Bond debe detenerlo en San Francisco.",
        "cast": ["Roger Moore (James Bond)", "Christopher Walken (Max Zorin)", "Grace Jones (May Day)"],
        "trivia": ["Última película de Roger Moore.", "Duran Duran llegó al nº1 en listas con el tema principal."]
    },
    "alta_tension": {
        "director": "John Glen",
        "music": "John Barry / a-ha",
        "runtime": "130 min",
        "box_office": "$191.2M",
        "awards": "BMI Film Music Award",
        "imdb": "https://www.imdb.com/title/tt0093428/",
        "plot": "Bond ayuda a un general soviético a desertar, pero pronto descubre un complot de armas y diamantes en Afganistán.",
        "cast": ["Timothy Dalton (James Bond)", "Maryam d'Abo (Kara Milovy)", "Joe Don Baker (Whitaker)"],
        "trivia": ["Timothy Dalton trajo un James Bond más apegado a los libros.", "La secuencia del avión es una de las más peligrosas de la saga."]
    },
    "licencia_para_matar": {
        "director": "John Glen",
        "music": "Michael Kamen / Gladys Knight",
        "runtime": "133 min",
        "box_office": "$156.1M",
        "awards": "Edgar Allan Poe Nominee",
        "imdb": "https://www.imdb.com/title/tt0097742/",
        "plot": "Bond abandona el MI6 para vengarse del narcotraficante Franz Sanchez, quien atacó a su amigo Felix Leiter.",
        "cast": ["Timothy Dalton (James Bond)", "Robert Davi (Sanchez)", "Carey Lowell (Pam Bouvier)"],
        "trivia": ["Primera película en tener una calificación de violencia más alta.", "Bond no actúa bajo órdenes de M por primera vez."]
    },
    "goldeneye": {
        "director": "Martin Campbell",
        "music": "Éric Serra / Tina Turner",
        "runtime": "130 min",
        "box_office": "$352.2M",
        "awards": "2 BAFTA Nominations",
        "imdb": "https://www.imdb.com/title/tt0113189/",
        "plot": "Bond debe evitar que un exagente del MI6 use un satélite electromagnético para colapsar la economía mundial.",
        "cast": ["Pierce Brosnan (James Bond)", "Sean Bean (Alec Trevelyan)", "Izabella Scorupco (Natalya)"],
        "trivia": ["Primer Bond tras la caída de la URSS.", "El salto de la presa de Verzasca ganó premios a la mejor acrobacia."]
    },
    "el_manana_nunca_muere": {
        "director": "Roger Spottiswoode",
        "music": "David Arnold / Sheryl Crow",
        "runtime": "119 min",
        "box_office": "$333M",
        "awards": "Golden Globe Nominee (Song)",
        "imdb": "https://www.imdb.com/title/tt0120347/",
        "plot": "Un magnate de la prensa intenta provocar una guerra entre China y Reino Unido para obtener primicias exclusivas.",
        "cast": ["Pierce Brosnan (James Bond)", "Jonathan Pryce (Elliot Carver)", "Michelle Yeoh (Wai Lin)"],
        "trivia": ["Se usaron 15 coches BMW 750iL durante la producción.", "Pierce Brosnan fue herido en la cara durante una pelea."]
    },
    "el_mundo_nunca_es_suficiente": {
        "director": "Michael Apted",
        "music": "David Arnold / Garbage",
        "runtime": "128 min",
        "box_office": "$361.8M",
        "awards": "Empire Award: Best Actor",
        "imdb": "https://www.imdb.com/title/tt0143145/",
        "plot": "Bond debe proteger a la heredera de un imperio petrolero mientras un terrorista incapaz de sentir dolor planea una explosión nuclear.",
        "cast": ["Pierce Brosnan (James Bond)", "Sophie Marceau (Elektra King)", "Robert Carlyle (Renard)"],
        "trivia": ["Última aparición de Desmond Llewelyn como Q.", "La persecución por el Támesis tardó 7 semanas en filmarse."]
    },
    "muere_otro_dia": {
        "director": "Lee Tamahori",
        "music": "David Arnold / Madonna",
        "runtime": "133 min",
        "box_office": "$431.9M",
        "awards": "Golden Globe Nominee (Song)",
        "imdb": "https://www.imdb.com/title/tt0246460/",
        "plot": "Tras pasar un tiempo capturado en Corea del Norte, Bond investiga la conexión de un diamante de sangre con un satélite láser.",
        "cast": ["Pierce Brosnan (James Bond)", "Halle Berry (Jinx)", "Rosamund Pike (Miranda Frost)"],
        "trivia": ["Película del 40 aniversario con referencias a todas las anteriores.", "El coche invisible (Vanquish) es el gadget más polémico."]
    },
    "casino_royale_2006": {
        "director": "Martin Campbell",
        "music": "David Arnold / Chris Cornell",
        "runtime": "144 min",
        "box_office": "$606.1M",
        "awards": "BAFTA Winner: Best Sound",
        "imdb": "https://www.imdb.com/title/tt0381061/",
        "plot": "Un Bond novato debe ganar una partida de póker de altas apuestas en Montenegro para desmantelar una red terrorista.",
        "cast": ["Daniel Craig (James Bond)", "Eva Green (Vesper Lynd)", "Mads Mikkelsen (Le Chiffre)"],
        "trivia": ["Reboot de la franquicia.", "Daniel Craig realizó gran parte de la persecución de parkour inicial."]
    },
    "quantum_of_solace": {
        "director": "Marc Forster",
        "music": "David Arnold / Jack White",
        "runtime": "106 min",
        "box_office": "$589.6M",
        "awards": "Empire Award: Best Actress",
        "imdb": "https://www.imdb.com/title/tt0830515/",
        "plot": "Bond busca venganza por Vesper mientras descubre una organización que intenta controlar el suministro de agua en Bolivia.",
        "cast": ["Daniel Craig (James Bond)", "Olga Kurylenko (Camille)", "Mathieu Amalric (Greene)"],
        "trivia": ["Película más corta de Bond.", "Grabada durante la huelga de guionistas de 2007."]
    },
    "skyfall": {
        "director": "Sam Mendes",
        "music": "Thomas Newman / Adele",
        "runtime": "143 min",
        "box_office": "$1,108.6M",
        "awards": "2 Oscar Winners (Song, Sound)",
        "imdb": "https://www.imdb.com/title/tt1074638/",
        "plot": "La lealtad de Bond hacia M es puesta a prueba cuando el pasado de ella vuelve para atormentarla a través de un ciberterrorista.",
        "cast": ["Daniel Craig (James Bond)", "Javier Bardem (Silva)", "Judi Dench (M)", "Javier Bardem (Silva)"],
        "trivia": ["Primera película Bond en superar los mil millones.", "Regreso de Q y Moneypenny tras el reboot."]
    },
    "spectre": {
        "director": "Sam Mendes",
        "music": "Thomas Newman / Sam Smith",
        "runtime": "148 min",
        "box_office": "$880.7M",
        "awards": "Oscar Winner: Best Original Song",
        "imdb": "https://www.imdb.com/title/tt2379713/",
        "plot": "Un mensaje del pasado de Bond lo lleva a descubrir una organización siniestra llamada SPECTRE y su conexión personal con ella.",
        "cast": ["Daniel Craig (James Bond)", "Christoph Waltz (Blofeld)", "Léa Seydoux (Madeleine)"],
        "trivia": ["La explosión en Marruecos posee el récord Guinness a la mayor explosión cinematográfica.", "Regreso de la organización SPECTRE tras años de pleitos legales."]
    },
    "sin_tiempo_para_morir": {
        "director": "Cary Joji Fukunaga",
        "music": "Hans Zimmer / Billie Eilish",
        "runtime": "163 min",
        "box_office": "$774M",
        "awards": "Oscar Winner: Best Original Song",
        "imdb": "https://www.imdb.com/title/tt2382320/",
        "plot": "Bond ha dejado el servicio secreto pero es reclutado de nuevo para rescatar a un científico secuestrado, enfrentándose a un villano con nanotecnología.",
        "cast": ["Daniel Craig (James Bond)", "Rami Malek (Safin)", "Léa Seydoux (Madeleine)", "Ana de Armas (Paloma)"],
        "trivia": ["Despedida de Daniel Craig.", "Película más larga de toda la franquicia."]
    }
}

SLUG_MAP = {
    "Agente 007 contra el Dr. No (1962)": "dr_no", # Corrected title
    "Desde Rusia con amor (1963)": "desde_rusia_con_amor",
    "James Bond Contra Goldfinger (1964)": "james_bond_contra_goldfinger",
    "Operacion Trueno (1965)": "operacion_trueno",
    "Solo Se Vive Dos Veces (1967)": "solo_se_vive_dos_veces",
    "Al Servicio Secreto de su Majestad (1969)": "al_servicio_secreto_de_su_majestad",
    "Diamantes para La Eternidad (1971)": "diamantes_para_la_eternidad",
    "Vive y deja Morir (1973)": "vive_y_deja_morir",
    "El hombre de la pistola de oro (1974)": "el_hombre_de_la_pistola_de_oro",
    "La Espia Que Me Amo (1977)": "la_espia_que_me_amo",
    "Moonraker (1979)": "moonraker",
    "Solo para sus Ojos (1981)": "solo_para_sus_ojos",
    "Octopussy (1983)": "octopussy",
    "Panorama para Matar (1985)": "panorama_para_matar",
    "Alta tension (1987)": "alta_tension",
    "Licencia para Matar (1989)": "licencia_para_matar",
    "Goldeneye (1995)": "goldeneye",
    "El Mañana nunca Muere (1997)": "el_manana_nunca_muere",
    "El Mundo nunca es Suficiente (1999)": "el_mundo_nunca_es_suficiente",
    "Muere otro Dia (2002)": "muere_otro_dia",
    "Casino Royale (2006)": "casino_royale_2006",
    "Quantum Of Solace (2008)": "quantum_of_solace",
    "Skyfall (2012)": "skyfall",
    "Spectre (2015)": "spectre",
    "Sin tiempo para morir (2022)": "sin_tiempo_para_morir"
}

def generate():
    with open('generator_log.txt', 'w', encoding='utf-8') as log:
        with open('movies_data.json', 'r', encoding='utf-8') as f:
            movies = json.load(f)
        
        with open('template_movie.html', 'r', encoding='utf-8') as f:
            template = f.read()
        
        for i, m in enumerate(movies):
            title = m['title']
            log.write(f"Processing title from JSON: [{title}]\n")
            if title not in SLUG_MAP:
                log.write(f"  -> Title [{title}] NOT in SLUG_MAP. Skipping.\n")
                continue
                
            slug = SLUG_MAP[title]
            filename = f"{slug}.html"
            log.write(f"  -> Slug: {slug}, Filename: {filename}\n")
            
            # Merge basic data with extra data
            extra = EXTRA_DATA.get(slug, {})
            
            # Prepare replacements
            mid = str(i + 1).zfill(3)
            replaces = {
                "{{MISSION_ID}}": mid,
                "{{TITLE}}": title,
                "{{YEAR}}": str(m['year']),
                "{{BOND_ACTOR}}": m['actor'],
                "{{THUMBNAIL}}": m['thumb'],
                "{{DIRECTOR}}": extra.get("director", "Desconocido"),
                "{{RUNTIME}}": extra.get("runtime", "N/A"),
                "{{BOX_OFFICE}}": extra.get("box_office", "N/A"),
                "{{MUSIC}}": extra.get("music", "Desconocido"),
                "{{AWARDS}}": extra.get("awards", "Ninguno registrado"),
                "{{IMDB_LINK}}": extra.get("imdb", "#"),
                "{{PLOT}}": extra.get("plot", "Informe clasificado no disponible."),
                "{{CAST_LIST}}": "".join([f'<li><span class="character">{c.split("(")[1].replace(")","") if "(" in c else "Personaje"}</span> <span class="actor">{c.split("(")[0].strip()}</span></li>' for c in extra.get("cast", [])]),
                "{{TRIVIA_LIST}}": "".join([f"<li>{t}</li>" for t in extra.get("trivia", [])])
            }
            
            # Apply replacements
            html = template
            for k, v in replaces.items():
                html = html.replace(k, v)
            
            # Save file
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(html)
            log.write(f"  -> Successfully generated: {filename}\n")

if __name__ == "__main__":
    generate()
