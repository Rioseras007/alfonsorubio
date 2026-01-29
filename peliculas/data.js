const movies = [
    {
        "src": "MKV/Agente 007 contra el Dr. No (1962).mkv",
        "title": "Agente 007 contra el Dr. No (1962)",
        "thumb": "miniaturas/Agente 007 contra el Dr. No (1962).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MP4/Agente 007 contra el Dr. No (1962).mp4",
        "title": "Agente 007 contra el Dr. No (1962)",
        "thumb": "miniaturas/Agente 007 contra el Dr. No (1962).jpg",
        "era": "classic",
        "format": "mp4"
    },
    {
        "src": "MKV/Al Servicio Secreto de su Majestad (1969).mkv",
        "title": "Al Servicio Secreto de su Majestad (1969)",
        "thumb": "miniaturas/Al Servicio Secreto de su Majestad (1969).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MP4/Al servicio secreto de su Majestad (1969).mp4",
        "title": "Al servicio secreto de su Majestad (1969)",
        "thumb": "miniaturas/Al servicio secreto de su Majestad (1969).jpg",
        "era": "classic",
        "format": "mp4"
    },
    {
        "src": "MKV/Alta tension (1987).mkv",
        "title": "Alta tension (1987)",
        "thumb": "miniaturas/Alta tension (1987).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/Casino Royale (1967).mkv",
        "title": "Casino Royale (1967)",
        "thumb": "miniaturas/Casino Royale (1967).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/Casino Royale (2006).mkv",
        "title": "Casino Royale (2006)",
        "thumb": "miniaturas/Casino Royale (2006).jpg",
        "era": "modern",
        "format": "mkv"
    },
    {
        "src": "MP4/Desde Rusia con amor (1963).mp4",
        "title": "Desde Rusia con amor (1963)",
        "thumb": "miniaturas/Desde Rusia con amor (1963).jpg",
        "era": "classic",
        "format": "mp4"
    },
    {
        "src": "MKV/Diamantes para La Eternidad (1971).mkv",
        "title": "Diamantes para La Eternidad (1971)",
        "thumb": "miniaturas/Diamantes para La Eternidad (1971).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/El Mañana nunca Muere (1997).mkv",
        "title": "El Mañana nunca Muere (1997)",
        "thumb": "miniaturas/El Mañana nunca Muere (1997).jpg",
        "era": "modern",
        "format": "mkv"
    },
    {
        "src": "MKV/El Mundo nunca es Suficiente (1999).mkv",
        "title": "El Mundo nunca es Suficiente (1999)",
        "thumb": "miniaturas/El Mundo nunca es Suficiente (1999).jpg",
        "era": "modern",
        "format": "mkv"
    },
    {
        "src": "MKV/El hombre de la pistola de oro (1974).mkv",
        "title": "El hombre de la pistola de oro (1974)",
        "thumb": "miniaturas/El hombre de la pistola de oro (1974).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/Goldeneye (1995).mkv",
        "title": "Goldeneye (1995)",
        "thumb": "miniaturas/Goldeneye (1995).jpg",
        "era": "modern",
        "format": "mkv"
    },
    {
        "src": "MKV/James Bond Contra Goldfinger (1964).mkv",
        "title": "James Bond Contra Goldfinger (1964)",
        "thumb": "miniaturas/James Bond Contra Goldfinger (1964).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/La Espia Que Me Amo (1977).mkv",
        "title": "La Espia Que Me Amo (1977)",
        "thumb": "miniaturas/La Espia Que Me Amo (1977).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/Licencia para Matar (1985).mkv",
        "title": "Licencia para Matar (1985)",
        "thumb": "miniaturas/Licencia para Matar (1985).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/Moonraker (1979).mkv",
        "title": "Moonraker (1979)",
        "thumb": "miniaturas/Moonraker (1979).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MP4/Muere Otro Dia (2002).mp4",
        "title": "Muere Otro Dia (2002)",
        "thumb": "miniaturas/Muere otro Dia (2002).jpg",
        "era": "modern",
        "format": "mp4"
    },
    {
        "src": "MKV/Muere otro Dia (2002).mkv",
        "title": "Muere otro Dia (2002)",
        "thumb": "miniaturas/Muere otro Dia (2002).jpg",
        "era": "modern",
        "format": "mkv"
    },
    {
        "src": "MKV/Nunca digas nunca Jamas (1983).mkv",
        "title": "Nunca digas nunca Jamas (1983)",
        "thumb": "miniaturas/Nunca digas nunca Jamas (1983).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/Octopussy (1983).mkv",
        "title": "Octopussy (1983)",
        "thumb": "miniaturas/Octopussy (1983).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/Operacion Trueno (1965).mkv",
        "title": "Operacion Trueno (1965)",
        "thumb": "miniaturas/Operacion Trueno (1965).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "name": "Panorama para Matar (1985).mkv",
        "src": "MKV/Panorama para Matar (1985).mkv",
        "title": "Panorama para Matar (1985)",
        "thumb": "miniaturas/Panorama para Matar (1985).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/Quantum Of Solace (2008).mkv",
        "title": "Quantum Of Solace (2008)",
        "thumb": "miniaturas/Quantum Of Solace (2008).jpg",
        "era": "modern",
        "format": "mkv"
    },
    {
        "src": "MKV/Skyfall (2012).mkv",
        "title": "Skyfall (2012)",
        "thumb": "miniaturas/Skyfall (2012).jpg",
        "era": "modern",
        "format": "mkv"
    },
    {
        "src": "MKV/Solo Se Vive Dos Veces (1967).mkv",
        "title": "Solo Se Vive Dos Veces (1967)",
        "thumb": "miniaturas/Solo Se Vive Dos Veces (1967).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/Solo para sus Ojos (1981).mkv",
        "title": "Solo para sus Ojos (1981)",
        "thumb": "miniaturas/Solo para sus Ojos (1981).jpg",
        "era": "classic",
        "format": "mkv"
    },
    {
        "src": "MKV/Spectre (2015).mkv",
        "title": "Spectre (2015)",
        "thumb": "miniaturas/Spectre (2015).jpg",
        "era": "modern",
        "format": "mkv"
    },
    {
        "src": "MP4/Vive Y Deja Morir (1973).mp4",
        "title": "Vive Y Deja Morir (1973)",
        "thumb": "miniaturas/Vive y deja Morir (1973).jpg",
        "era": "classic",
        "format": "mp4"
    },
    {
        "src": "MKV/Vive y deja Morir (1973).mkv",
        "title": "Vive y deja Morir (1973)",
        "thumb": "miniaturas/Vive y deja Morir (1973).jpg",
        "era": "classic",
        "format": "mkv"
    }
];
