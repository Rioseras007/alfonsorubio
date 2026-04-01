
import re
import json
import os

def get_movie_data():
    try:
        # data.js seems to be UTF-16LE
        with open('data.js', 'rb') as f:
            raw = f.read()
            content = raw.decode('utf-16')
            
        # Fallback to regex is safer given the JS structure
        titles = re.findall(r'\"title\": \"(.*?)\"', content)
        years = re.findall(r'\"year\": (.*?),', content)
        actors = re.findall(r'\"actor\": \"(.*?)\"', content)
        thumbs = re.findall(r'\"thumb\": \"(.*?)\"', content)
        
        movies = []
        for i in range(len(titles)):
            movies.append({
                "title": titles[i],
                "year": int(years[i]) if i < len(years) else 0,
                "actor": actors[i] if i < len(actors) else "",
                "thumb": thumbs[i] if i < len(thumbs) else ""
            })
        return movies
    except Exception as e:
        return [{"error": str(e)}]

if __name__ == "__main__":
    movies = get_movie_data()
    with open('movies_data.json', 'w', encoding='utf-8') as f:
        json.dump(movies, f, indent=4, ensure_ascii=False)
    print(f"Successfully saved {len(movies)} movies to movies_data.json")
