
import os
import json

def inject_navigation():
    # Order of missions
    order = [
        "dr_no", "desde_rusia_con_amor", "james_bond_contra_goldfinger",
        "operacion_trueno", "solo_se_vive_dos_veces", "al_servicio_secreto_de_su_majestad",
        "diamantes_para_la_eternidad", "vive_y_deja_morir", "el_hombre_de_la_pistola_de_oro",
        "la_espia_que_me_amo", "moonraker", "solo_para_sus_ojos", "octopussy",
        "panorama_para_matar", "alta_tension", "licencia_para_matar", "goldeneye",
        "el_manana_nunca_muere", "el_mundo_nunca_es_suficiente", "muere_otro_dia",
        "casino_royale_2006", "quantum_of_solace", "skyfall", "spectre", "sin_tiempo_para_morir"
    ]
    
    navigation_style = """
        .mission-navigation {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid rgba(212, 175, 55, 0.2);
        }
        .nav-link {
            text-decoration: none;
            color: var(--accent-gold);
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s;
        }
        .nav-link:hover {
            color: #fff;
            transform: translateX(10px);
        }
        .nav-link.prev:hover {
            transform: translateX(-10px);
        }
    """
    
    for i, slug in enumerate(order):
        filename = f"{slug}.html"
        if not os.path.exists(filename):
            continue
            
        prev_slug = order[i-1] if i > 0 else None
        next_slug = order[i+1] if i < len(order)-1 else None
        
        prev_html = f'<a href="{prev_slug}.html" class="nav-link prev">← MISIÓN ANTERIOR</a>' if prev_slug else '<div></div>'
        next_html = f'<a href="{next_slug}.html" class="nav-link next">SIGUIENTE MISIÓN →</a>' if next_slug else '<div></div>'
        
        nav_html = f"""
            <div class="mission-navigation">
                {prev_html}
                {next_html}
            </div>
        """
        
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Add style if not present
        if navigation_style[:50] not in content:
            content = content.replace('</style>', navigation_style + '\n    </style>')
            
        # Add navigation before the back button or end of container
        if '<div class="mission-navigation">' not in content:
            content = content.replace('<a href="peliculas.html" class="back-button">', nav_html + '\n            <a href="peliculas.html" class="back-button">')
            
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Navigation injected into {filename}")

if __name__ == "__main__":
    inject_navigation()
