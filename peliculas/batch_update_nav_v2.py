
import os

def update_navigation_complete():
    # Items to inject
    nav_agents = '<a href="sean_connery.html" data-i18n="nav_agents">Agentes</a>'
    nav_reviews = '<a href="criticas.html" data-i18n="nav_reviews">Críticas</a>'
    
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for filename in html_files:
        if filename in ['template_movie.html', 'template_actor.html']:
            continue
            
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        changed = False
        
        # Add Agents if missing
        if 'data-i18n="nav_agents"' not in content and 'data-i18n="nav_movies"' in content:
             content = content.replace(
                'data-i18n="nav_movies">Misiones</a>',
                'data-i18n="nav_movies">Misiones</a>\n                <a href="sean_connery.html" data-i18n="nav_agents">Agentes</a>'
            ).replace(
                'data-i18n="nav_movies">Missions</a>',
                'data-i18n="nav_movies">Missions</a>\n                <a href="sean_connery.html" data-i18n="nav_agents">Agents</a>'
            )
             changed = True

        # Add Reviews if missing
        if 'data-i18n="nav_reviews"' not in content:
            if 'data-i18n="nav_agents">Agentes</a>' in content:
                content = content.replace(
                    'data-i18n="nav_agents">Agentes</a>',
                    'data-i18n="nav_agents">Agentes</a>\n                <a href="criticas.html" data-i18n="nav_reviews">Críticas</a>'
                )
                changed = True
            elif 'data-i18n="nav_agents">Agents</a>' in content:
                content = content.replace(
                    'data-i18n="nav_agents">Agents</a>',
                    'data-i18n="nav_agents">Agents</a>\n                <a href="criticas.html" data-i18n="nav_reviews">Reviews</a>'
                )
                changed = True

        if changed:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated navigation in {filename}")

if __name__ == "__main__":
    update_navigation_complete()
