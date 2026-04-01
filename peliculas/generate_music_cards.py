songs = [
    ("James Bond Theme", "John Barry Orchestra", "Dr. No (1962)"),
    ("From Russia with Love", "Matt Monro", "From Russia with Love (1963)"),
    ("Goldfinger", "Shirley Bassey", "Goldfinger (1964)"),
    ("Thunderball", "Tom Jones", "Thunderball (1965)"),
    ("You Only Live Twice", "Nancy Sinatra", "You Only Live Twice (1967)"),
    ("On Her Majesty's Secret Service", "John Barry Orchestra", "On Her Majesty's Secret Service (1969)"),
    ("Diamonds Are Forever", "Shirley Bassey", "Diamonds Are Forever (1971)"),
    ("Live and Let Die", "Paul McCartney & Wings", "Live and Let Die (1973)"),
    ("The Man with the Golden Gun", "Lulu", "The Man with the Golden Gun (1974)"),
    ("Nobody Does It Better", "Carly Simon", "The Spy Who Loved Me (1977)"),
    ("Moonraker", "Shirley Bassey", "Moonraker (1979)"),
    ("For Your Eyes Only", "Sheena Easton", "For Your Eyes Only (1981)"),
    ("All Time High", "Rita Coolidge", "Octopussy (1983)"),
    ("A View to a Kill", "Duran Duran", "A View to a Kill (1985)"),
    ("The Living Daylights", "a-ha", "The Living Daylights (1987)"),
    ("Licence to Kill", "Gladys Knight", "Licence to Kill (1989)"),
    ("GoldenEye", "Tina Turner", "GoldenEye (1995)"),
    ("Tomorrow Never Dies", "Sheryl Crow", "Tomorrow Never Dies (1997)"),
    ("The World Is Not Enough", "Garbage", "The World Is Not Enough (1999)"),
    ("Die Another Day", "Madonna", "Die Another Day (2002)"),
    ("You Know My Name", "Chris Cornell", "Casino Royale (2006)"),
    ("Another Way to Die", "Jack White & Alicia Keys", "Quantum of Solace (2008)"),
    ("Skyfall", "Adele", "Skyfall (2012)"),
    ("Writing's on the Wall", "Sam Smith", "Spectre (2015)"),
    ("No Time to Die", "Billie Eilish", "No Time to Die (2021)"),
]

def create_youtube_search_url(song_title, artist):
    # Clean up special characters
    search_query = f"{artist} {song_title} James Bond official music video".replace(" & ", " ")
    search_query = search_query.replace("'", "")
    return f"https://www.youtube.com/results?search_query={search_query.replace(' ', '+')}"

print("Song cards with YouTube buttons:\n")
for title, artist, year in songs:
    youtube_url = create_youtube_search_url(title, artist)
    html = f'''                    <div class="song-card">
                        <div class="song-title">{title}</div>
                        <div class="song-artist">{artist}</div>
                        <div class="song-year">{year}</div>
                        <a href="{youtube_url}" target="_blank" rel="noopener" class="youtube-btn">
                            ▶️ Ver en YouTube
                        </a>
                    </div>'''
    print(html)
    print()
