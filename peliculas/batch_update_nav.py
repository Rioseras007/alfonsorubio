
import os

def update_navigation():
    # The new link to inject
    new_nav_item = '<a href="sean_connery.html" data-i18n="nav_agents">Agentes</a>'
    
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for filename in html_files:
        if filename in ['template_movie.html', 'template_actor.html']:
            continue
            
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'data-i18n="nav_agents"' in content:
            continue
            
        # Target: insert after nav_movies
        if 'data-i18n="nav_movies">Misiones</a>' in content:
            new_content = content.replace(
                'data-i18n="nav_movies">Misiones</a>',
                'data-i18n="nav_movies">Misiones</a>\n                <a href="sean_connery.html" data-i18n="nav_agents">Agentes</a>'
            )
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated navigation in {filename}")
        elif 'data-i18n="nav_movies">Missions</a>' in content: # In case some are English hardcoded
            new_content = content.replace(
                'data-i18n="nav_movies">Missions</a>',
                'data-i18n="nav_movies">Missions</a>\n                <a href="sean_connery.html" data-i18n="nav_agents">Agents</a>'
            )
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated navigation in {filename}")

if __name__ == "__main__":
    update_navigation()
