"""
SmartRateCalcs - High-Res OG Image and Favicon Generator
Generates:
- public/og-image.png (1200x630)
- public/icon.png (512x512)
- public/apple-icon.png (180x180)
- public/favicon.ico
"""

import os
from PIL import Image, ImageDraw, ImageFont

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public")
APP_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "app")

def get_font(size, bold=False):
    # Try system fonts on Windows
    font_names = [
        "C:\\Windows\\Fonts\\segoeuib.ttf" if bold else "C:\\Windows\\Fonts\\segoeui.ttf",
        "C:\\Windows\\Fonts\\arialbd.ttf" if bold else "C:\\Windows\\Fonts\\arial.ttf",
    ]
    for font_path in font_names:
        if os.path.exists(font_path):
            try:
                return ImageFont.truetype(font_path, size)
            except Exception:
                pass
    return ImageFont.load_default()

def generate_icons():
    # 512x512 icon
    size = 512
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Dark rounded background
    draw.rounded_rectangle([16, 16, size - 16, size - 16], radius=110, fill=(15, 23, 42, 255), outline=(51, 65, 85, 255), width=8)

    # Emerald calculator screen
    draw.rounded_rectangle([100, 90, size - 100, 160], radius=24, fill=(5, 150, 105, 255))
    
    # Grid of keypad keys
    key_size = 64
    gap = 26
    start_x = 100
    start_y = 195

    rows = [
        [(71, 85, 105), (71, 85, 105), (16, 185, 129)],
        [(71, 85, 105), (71, 85, 105), (5, 150, 105)],
        [(71, 85, 105), (71, 85, 105), (4, 120, 87)],
    ]

    for r_idx, row in enumerate(rows):
        y = start_y + r_idx * (key_size + gap)
        for c_idx, color in enumerate(row):
            x = start_x + c_idx * (key_size + gap + 44)
            width = key_size + 44
            draw.rounded_rectangle([x, y, x + width, y + key_size], radius=18, fill=color)

    # Save 512x512
    icon_png_path = os.path.join(PUBLIC_DIR, "icon.png")
    img.save(icon_png_path, "PNG")
    print(f"Saved: {icon_png_path}")

    # Save 180x180 apple icon
    apple_img = img.resize((180, 180), Image.Resampling.LANCZOS)
    apple_path = os.path.join(PUBLIC_DIR, "apple-icon.png")
    apple_img.save(apple_path, "PNG")
    print(f"Saved: {apple_path}")

    # Save app/icon.png
    app_icon_path = os.path.join(APP_DIR, "icon.png")
    img.resize((64, 64), Image.Resampling.LANCZOS).save(app_icon_path, "PNG")

    # Save favicon.ico
    ico_img = img.resize((32, 32), Image.Resampling.LANCZOS)
    ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")
    ico_img.save(ico_path, format="ICO")
    print(f"Saved: {ico_path}")

def generate_og_image():
    W, H = 1200, 630
    img = Image.new("RGBA", (W, H), (7, 11, 18, 255))
    draw = ImageDraw.Draw(img)

    # Ambient glow
    for r in range(300, 0, -10):
        alpha = int(35 * (1 - r / 300))
        draw.ellipse([850 - r, 80 - r, 850 + r, 80 + r], fill=(5, 150, 105, alpha))

    # Top Header: Logo box
    draw.rounded_rectangle([64, 50, 116, 102], radius=14, fill=(15, 23, 42, 255), outline=(5, 150, 105, 255), width=2)
    # Calculator glyph inside box
    draw.rounded_rectangle([76, 62, 104, 72], radius=3, fill=(16, 185, 129, 255))
    draw.rounded_rectangle([76, 78, 86, 84], radius=2, fill=(71, 85, 105, 255))
    draw.rounded_rectangle([94, 78, 104, 84], radius=2, fill=(5, 150, 105, 255))
    draw.rounded_rectangle([76, 88, 86, 94], radius=2, fill=(71, 85, 105, 255))
    draw.rounded_rectangle([94, 88, 104, 94], radius=2, fill=(16, 185, 129, 255))

    font_logo = get_font(28, bold=True)
    draw.text((130, 60), "SmartRate", fill=(255, 255, 255), font=font_logo)
    draw.text((270, 60), "Calcs", fill=(52, 211, 153), font=font_logo)

    # 2026 EDITION badge
    font_badge = get_font(12, bold=True)
    draw.rounded_rectangle([360, 64, 465, 90], radius=8, fill=(30, 41, 59, 255), outline=(51, 65, 85, 255), width=1)
    draw.text((372, 70), "2026 EDITION", fill=(203, 213, 225), font=font_badge)

    # Right badge
    font_pill = get_font(14, bold=True)
    draw.rounded_rectangle([820, 58, 1136, 96], radius=20, fill=(6, 78, 59, 120), outline=(5, 150, 105, 255), width=1)
    draw.ellipse([838, 73, 846, 81], fill=(52, 211, 153, 255))
    draw.text((856, 68), "Zero Hidden Spreads • Live Rates", fill=(110, 231, 183), font=font_pill)

    # Main Heading
    font_h1 = get_font(44, bold=True)
    draw.text((64, 136), "Stop losing money to hidden exchange rate markups.", fill=(255, 255, 255), font=font_h1)

    # Subtitle
    font_sub = get_font(18, bold=False)
    draw.text((64, 196), "Independent mathematical fee & payout intelligence for remote engineers, freelancers, and e-com brands.", fill=(148, 163, 184), font=font_sub)

    # 3 Comparison Cards (Wise, Payoneer, SWIFT Wire)
    cards = [
        {
            "name": "Wise (TransferWise)",
            "pill": "RECOMMENDED",
            "val": "Rs 554,294",
            "desc": "Mid-market rate • 0.45% transparent fee",
            "featured": True
        },
        {
            "name": "Payoneer to Bank",
            "pill": "-Rs 9,039",
            "val": "Rs 545,255",
            "desc": "2.0% currency conversion markup",
            "featured": False
        },
        {
            "name": "Bank SWIFT Wire",
            "pill": "-Rs 19,850",
            "val": "Rs 534,444",
            "desc": "$25 intermediary fee + 2.8% bank margin",
            "featured": False
        }
    ]

    card_w = 345
    card_h = 210
    start_y = 255

    for idx, c in enumerate(cards):
        x = 64 + idx * (card_w + 20)
        
        if c["featured"]:
            # Emerald glow border
            draw.rounded_rectangle([x, start_y, x + card_w, start_y + card_h], radius=20, fill=(6, 78, 59, 90), outline=(5, 150, 105, 255), width=3)
        else:
            draw.rounded_rectangle([x, start_y, x + card_w, start_y + card_h], radius=20, fill=(15, 23, 42, 180), outline=(51, 65, 85, 255), width=1)

        # Card header
        font_cname = get_font(16, bold=True)
        draw.text((x + 20, start_y + 20), c["name"], fill=(255, 255, 255), font=font_cname)

        # Card pill
        font_cpill = get_font(11, bold=True)
        if c["featured"]:
            draw.rounded_rectangle([x + card_w - 130, start_y + 18, x + card_w - 20, start_y + 40], radius=6, fill=(16, 185, 129, 60), outline=(52, 211, 153, 200), width=1)
            draw.text((x + card_w - 120, start_y + 23), c["pill"], fill=(52, 211, 153), font=font_cpill)
        else:
            draw.rounded_rectangle([x + card_w - 95, start_y + 18, x + card_w - 20, start_y + 40], radius=6, fill=(244, 63, 94, 40), outline=(244, 63, 94, 150), width=1)
            draw.text((x + card_w - 88, start_y + 23), c["pill"], fill=(251, 113, 133), font=font_cpill)

        # Value
        font_val = get_font(32, bold=True)
        val_color = (52, 211, 153) if c["featured"] else (255, 255, 255)
        draw.text((x + 20, start_y + 75), c["val"], fill=val_color, font=font_val)

        # Net in hand label
        font_label = get_font(11, bold=False)
        draw.text((x + 20, start_y + 120), "Net Take-Home Value ($2,000 Payout)", fill=(148, 163, 184), font=font_label)

        # Desc
        font_desc = get_font(11, bold=False)
        draw.text((x + 20, start_y + 160), c["desc"], fill=(100, 116, 139), font=font_desc)

    # Footer
    draw.line([64, 520, 1136, 520], fill=(30, 41, 59, 255), width=1)
    
    font_ftr = get_font(14, bold=False)
    draw.text((64, 545), "Engineered by Muhammad Naveed • 100% Free Open Utility • Zero Sponsored Bias", fill=(148, 163, 184), font=font_ftr)

    font_url = get_font(16, bold=True)
    draw.text((950, 543), "smartratecalcs.com", fill=(52, 211, 153), font=font_url)

    # Save OG image
    og_path = os.path.join(PUBLIC_DIR, "og-image.png")
    img.convert("RGB").save(og_path, "PNG")
    print(f"Saved: {og_path}")

if __name__ == "__main__":
    generate_icons()
    generate_og_image()
