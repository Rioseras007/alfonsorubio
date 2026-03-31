import re
import sys

def add_missing_icons(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Function to replace matched links
    def replace_link(match):
        full_a_tag = match.group(0)
        a_tag_open = match.group(1)
        href_match = re.search(r'href=[\'"]([^\'"]+)[\'"]', a_tag_open, re.IGNORECASE)
        href_content = href_match.group(1).lower() if href_match else ""
        inner_content = match.group(2)

        # Skip anchor links without text
        inner_text = re.sub(r'<[^>]+>', '', inner_content).strip()
        if not inner_text:
            return full_a_tag

        # Skip links that already have <i> or <img>
        if '<i ' in inner_content or '<img ' in inner_content:
            return full_a_tag
            
        # Determine best icon
        icon = 'bi-link'
        if 'youtube' in href_content: icon = 'bi-youtube'
        elif 'twitter' in href_content or 'x.com' in href_content: icon = 'bi-twitter-x'
        elif 'facebook' in href_content: icon = 'bi-facebook'
        elif 'instagram' in href_content: icon = 'bi-instagram'
        elif 'github' in href_content: icon = 'bi-github'
        elif 'amazon' in href_content: icon = 'bi-amazon'
        elif 'pc' in inner_text.lower() or 'ordenador' in inner_text.lower() or 'computertparts' in href_content: icon = 'bi-pc-display'
        elif 'juego' in inner_text.lower() or 'game' in href_content: icon = 'bi-controller'
        elif 'tiempo' in inner_text.lower() or 'weather' in href_content: icon = 'bi-cloud-sun'
        elif 'hora' in inner_text.lower() or 'city' in href_content or 'country' in href_content or 'zeit' in href_content: icon = 'bi-clock'
        elif 'noticia' in inner_text.lower() or 'marca.com' in href_content or 'as.com' in href_content or 'diario' in inner_text.lower() or 'mundo' in inner_text.lower() or 'pais' in inner_text.lower() or 'kiosko' in href_content: icon = 'bi-newspaper'
        elif 'pelicula' in inner_text.lower() or 'cine' in inner_text.lower(): icon = 'bi-film'
        elif 'musica' in inner_text.lower() or 'mp3' in inner_text.lower() or 'audio' in inner_text.lower(): icon = 'bi-music-note'
        elif 'compra' in inner_text.lower() or 'shop' in href_content or 'store' in href_content or 'fnac' in href_content: icon = 'bi-cart'
        elif 'correo' in inner_text.lower() or 'mail' in href_content: icon = 'bi-envelope'
        elif 'radio' in inner_text.lower() or 'emisora' in href_content: icon = 'bi-broadcast'
        elif 'impresion' in inner_text.lower() or '3d' in inner_text.lower(): icon = 'bi-printer'
        elif 'app' in inner_text.lower() or 'apk' in inner_text.lower(): icon = 'bi-app-indicator'
        elif 'cv' in inner_text.lower() or 'curriculum' in inner_text.lower() or 'trabajo' in inner_text.lower() or 'empleo' in inner_text.lower() or 'linkedin' in href_content: icon = 'bi-person-badge'
        elif 'descarga' in inner_text.lower() or 'torrent' in href_content or 'archive' in href_content or 'mega.nz' in href_content: icon = 'bi-download'
        elif 'banco' in inner_text.lower() or 'bank' in href_content or 'bbva' in href_content or 'ing.es' in href_content or 'paypal' in href_content or 'revolut' in href_content: icon = 'bi-bank'
        else: icon = 'bi-box-arrow-up-right'

        if inner_content.strip().startswith('<span'):
            # insert before the <span> tag
            parts = inner_content.split('<span', 1)
            new_inner = f'{parts[0]}<i class="bi {icon}"></i> <span{parts[1]}'
        else:
            new_inner = f'<i class="bi {icon}"></i> {inner_content.strip()}'
            
        full = f'<{a_tag_open}>{new_inner}</a>'
        return full

    # Replace links
    new_content = re.sub(r'<a\s+([^>]*)>(.*?)</a>', replace_link, content, flags=re.IGNORECASE | re.DOTALL)

    def replace_tag(match):
        full_tag = match.group(0)
        tag_name = match.group(1)
        tag_attrs = match.group(2)
        inner_content = match.group(3)
        
        inner_text = re.sub(r'<[^>]+>', '', inner_content).strip()
        if not inner_text:
            return full_tag

        if '<i ' in inner_content or '<img ' in inner_content or '<a ' in inner_content:
            return full_tag
            
        # specifically block elements with icons next to toggles like "▼"
        if '▼' in inner_content or '▲' in inner_content:
            return full_tag
            
        icon = 'bi-info-circle'
        if 'meteorológica' in inner_text.lower(): icon = 'bi-cloud-sun'
        elif 'reproductor' in inner_text.lower(): icon = 'bi-music-player'
        
        new_inner = f'<i class="bi {icon}"></i> {inner_content.strip()}'
        return f'<{tag_name}{tag_attrs}>{new_inner}</{tag_name}>'
        
    # Correct regex for paragraphs and headers
    new_content = re.sub(r'<(p|h[1-6])([^>]*)>(.*?)</\1>', replace_tag, new_content, flags=re.IGNORECASE | re.DOTALL)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    add_missing_icons(sys.argv[1])
