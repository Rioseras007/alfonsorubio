
import json
import os

def generate_actors():
    try:
        with open('actors_data.json', 'r', encoding='utf-8') as f:
            actors = json.load(f)
    except Exception as e:
        print(f"Error loading actors_data.json: {e}")
        return

    try:
        with open('template_actor.html', 'r', encoding='utf-8') as f:
            template = f.read()
    except Exception as e:
        print(f"Error loading template_actor.html: {e}")
        return

    for i, actor in enumerate(actors):
        slug = actor['slug']
        filename = f"{slug}.html"
        
        # Navigation logic
        prev_actor = actors[i-1] if i > 0 else None
        next_actor = actors[i+1] if i < len(actors) - 1 else None
        
        prev_html = f'<a href="{prev_actor["slug"]}.html" class="nav-btn">← Agente Anterior</a>' if prev_actor else '<div></div>'
        next_html = f'<a href="{next_actor["slug"]}.html" class="nav-btn">Siguiente Agente →</a>' if next_actor else '<div></div>'
        
        # Build filmography list
        film_list_html = ""
        for film in actor.get('filmography', []):
            film_list_html += f'<li><span class="film-title">{film["title"]}</span> <span class="film-role">{film["role"]}</span></li>'
            
        # Prepare replacements
        replaces = {
            "{{ID}}": actor['id'],
            "{{NAME}}": actor['name'],
            "{{IMAGE}}": actor['image'],
            "{{NATIONALITY}}": actor['nationality'],
            "{{YEARS_ACTIVE}}": actor['years_active'],
            "{{AWARDS}}": actor['awards'],
            "{{BIOGRAPHY}}": actor['biography'],
            "{{FILM_LIST}}": film_list_html,
            "{{PREV_ACTOR}}": prev_html,
            "{{NEXT_ACTOR}}": next_html
        }
        
        # Apply replacements
        html = template
        for k, v in replaces.items():
            html = html.replace(k, v)
            
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Generated: {filename}")

if __name__ == "__main__":
    generate_actors()
