import re
import sys

def replace_icons(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements for FontAwesome and Hex codes
    replacements = {
        r"<i class='far fa-compass'([^>]*)>": r"<i class='bi bi-compass'\1>",
        r"<i style='([^']*)' class='fas'>&#xf002;</i>": r"<i class='bi bi-circle-half' style='\1'></i>",
        r"<i style='([^']*)' class='fab'>&#xf1a0;</i>": r"<i class='bi bi-google' style='\1'></i>",
        r"<i style='([^']*)' class='fab'>&#xf19e;</i>": r"<i class='bi bi-envelope' style='\1'></i>",
        r"<i style='([^']*)' class='fab'>&#xf17a;</i>": r"<i class='bi bi-windows' style='\1'></i>",
        r"<i style='([^']*)' class='fab'>&#xf3aa;</i>": r"<i class='bi bi-google-play' style='\1'></i>",
        r"<i style='([^']*)' class='fas'>&#xf381;</i>": r"<i class='bi bi-cloud' style='\1'></i>",
        r"<i style='([^']*)' class='fab fa-dropbox'>": r"<i class='bi bi-dropbox' style='\1'>",
        r"<i style='([^']*)' class='fab fa-amazon'>": r"<i class='bi bi-amazon' style='\1'>",
        r"<i style='([^']*)' class='fas fa-shopping-bag'>": r"<i class='bi bi-bag' style='\1'>",
        r"<i style='([^']*)' class='fas fa-box-open'>": r"<i class='bi bi-box-seam' style='\1'>",
        r"<i style='([^']*)' class='fab fa-playstation'>": r"<i class='bi bi-playstation' style='\1'>",
        r"<i style='([^']*)' class='fab fa-xbox'>": r"<i class='bi bi-xbox' style='\1'>",
        r"<i style='([^']*)' class='fas fa-gamepad'>": r"<i class='bi bi-controller' style='\1'>",
        r"<i style='([^']*)' class='fab fa-facebook-f'>": r"<i class='bi bi-facebook' style='\1'>",
        r"<i style='([^']*)' class='fab fa-twitter'>": r"<i class='bi bi-twitter' style='\1'>",
        r"<i style='([^']*)' class='fab fa-twitch'>": r"<i class='bi bi-twitch' style='\1'>",
        r"<i style='([^']*)' class='fab fa-instagram'>": r"<i class='bi bi-instagram' style='\1'>",
        r"<i style='([^']*)' class='fab fa-snapchat-ghost'>": r"<i class='bi bi-snapchat' style='\1'>",
        r"<i style='([^']*)'[\n\s]*class=\"fa\">&#xf19c;</i>": r"<i class='bi bi-bank' style='\1'></i>",
        r"<i\n\s*style='([^']*)' class='far'>&#xf09d;</i>": r"<i class='bi bi-paypal' style='\1'></i>",
        r"<i\n\s*style='([^']*)' class='fas'>&#xf4d3;</i>": r"<i class='bi bi-credit-card' style='\1'></i>",
        r"<i class='far fa-address-card' style='([^']*)'>": r"<i class='bi bi-person-vcard' style='\1'>",
        r"<i class='fab fa-linkedin'[\n\s]*style='([^']*)'>": r"<i class='bi bi-linkedin' style='\1'>",
        r"<i class='fas fa-university'[\n\s]*style='([^']*)'>": r"<i class='bi bi-bank' style='\1'>",
        r'<i class="fab fa-facebook-f">': r'<i class="bi bi-facebook">',
        r'<i class="fab fa-instagram">': r'<i class="bi bi-instagram">',
        r'<i class="fab fa-x-twitter">': r'<i class="bi bi-twitter-x">',
        r'<i class="fab fa-youtube">': r'<i class="bi bi-youtube">',
        r'<i class="fab fa-tiktok">': r'<i class="bi bi-tiktok">',
        r'<i class="fab fa-discord">': r'<i class="bi bi-discord">',
        r'<i class="fab fa-whatsapp">': r'<i class="bi bi-whatsapp">',
        r'<i class="fab fa-linkedin-in">': r'<i class="bi bi-linkedin">',
        r'<i class="fab fa-github">': r'<i class="bi bi-github">',
        r'<i class="fab fa-pinterest">': r'<i class="bi bi-pinterest">',
    }

    for pattern, repl in replacements.items():
        content = re.sub(pattern, repl, content)

    # Emojis replacements (simple replace)
    emoji_map = {
        '👿': '<i class="bi bi-emoji-angry"></i>',
        '🔫': '<i class="bi bi-crosshair"></i>',
        '🤖': '<i class="bi bi-robot"></i>',
        '😇': '<i class="bi bi-emoji-smile"></i>',
        '👨‍💼': '<i class="bi bi-person-badge"></i>',
        '🐶': '<i class="bi bi-box-fill"></i>',
        '🎞️': '<i class="bi bi-film"></i>',
        '🎮': '<i class="bi bi-controller"></i>',
        '🎵': '<i class="bi bi-music-note"></i>',
        '🌐': '<i class="bi bi-globe"></i>',
        '📆': '<i class="bi bi-calendar"></i>',
        '🔝': '<i class="bi bi-arrow-up-circle"></i>',
        '🕒': '<i class="bi bi-clock"></i>',
        '👨‍🔬': '<i class="bi bi-flask"></i>',
        '🎥': '<i class="bi bi-camera-video"></i>',
        '💓': '<i class="bi bi-heart-fill"></i>',
        '📻': '<i class="bi bi-radio"></i>',
        '💾': '<i class="bi bi-floppy"></i>',
        '🎹': '<i class="bi bi-music-player"></i>',
        '👨‍🎤': '<i class="bi bi-mic"></i>',
        '🎙': '<i class="bi bi-mic-fill"></i>',
        '📡': '<i class="bi bi-broadcast"></i>',
        '🎶': '<i class="bi bi-music-note-list"></i>',
        '📺': '<i class="bi bi-tv"></i>',
        '📹': '<i class="bi bi-camera-reels"></i>',
        '🎬': '<i class="bi bi-clapperboard"></i>',
        '📽': '<i class="bi bi-projector"></i>',
        '🎞': '<i class="bi bi-film"></i>',
        '🐭': '<i class="bi bi-mouse"></i>',
        '🪐': '<i class="bi bi-planet"></i>',
        '🟦': '<i class="bi bi-square-fill" style="color:blue"></i>',
        '🟩': '<i class="bi bi-square-fill" style="color:green"></i>',
        '🟥': '<i class="bi bi-square-fill" style="color:red"></i>',
        '🟪': '<i class="bi bi-square-fill" style="color:purple"></i>',
        '🥶': '<i class="bi bi-snow"></i>',
        '😺': '<i class="bi bi-emoji-heart-eyes"></i>',
        '✏️': '<i class="bi bi-pencil"></i>',
        '📰': '<i class="bi bi-newspaper"></i>',
        '🔴': '<i class="bi bi-circle-fill" style="color:red"></i>',
        '🟡': '<i class="bi bi-circle-fill" style="color:yellow"></i>',
        '🟣': '<i class="bi bi-circle-fill" style="color:purple"></i>',
        '🔵': '<i class="bi bi-circle-fill" style="color:blue"></i>',
        '🟢': '<i class="bi bi-circle-fill" style="color:green"></i>',
        '🟤': '<i class="bi bi-circle-fill" style="color:brown"></i>',
        '🏠': '<i class="bi bi-house"></i>',
        '📔': '<i class="bi bi-book"></i>',
        '🖋️': '<i class="bi bi-pen"></i>',
        '🚢': '<i class="bi bi-water"></i>',
        '🆓': '<i class="bi bi-freebsd"></i>',
        '<i class=\'bi bi-music-note\'></i> ': '<i class="bi bi-music-note"></i>' # Cleanup double spaces
    }

    for emoji, repl in emoji_map.items():
        content = content.replace(emoji, repl)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    replace_icons(sys.argv[1])
