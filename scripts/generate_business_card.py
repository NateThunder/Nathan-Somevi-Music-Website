from pathlib import Path

from PIL import Image, ImageColor, ImageDraw, ImageFilter, ImageFont
import qrcode


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "business-card"
OUTPUT.mkdir(parents=True, exist_ok=True)

CARD_W = 1050
CARD_H = 600
GAP = 80
CANVAS_W = CARD_W * 2 + GAP * 3
CANVAS_H = CARD_H + GAP * 2

BLACK = "#05070b"
BLACK_SOFT = "#0b1018"
AMBER = "#e7a43c"
AMBER_SOFT = "#ffc768"
MINT = "#dce6c6"
INDIGO = "#2b2e4a"
RED = "#d86c54"
GOLD = "#d4b15a"
WHITE = "#f7f3eb"
MUTED = "#cfc6b8"


def load_font(name: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts") / name,
        Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


NAME_FONT = load_font("arialbd.ttf", 74)
SUB_FONT = load_font("arial.ttf", 28)
BODY_FONT = load_font("arial.ttf", 30)
SMALL_FONT = load_font("arial.ttf", 22)


def vertical_gradient(size: tuple[int, int], top: str, bottom: str) -> Image.Image:
    width, height = size
    image = Image.new("RGB", size, top)
    draw = ImageDraw.Draw(image)
    top_rgb = ImageColor.getrgb(top)
    bottom_rgb = ImageColor.getrgb(bottom)
    for y in range(height):
        t = y / max(height - 1, 1)
        rgb = tuple(int(top_rgb[i] * (1 - t) + bottom_rgb[i] * t) for i in range(3))
        draw.line((0, y, width, y), fill=rgb)
    return image


def add_film_grain(image: Image.Image, opacity: int = 22) -> Image.Image:
    noise = Image.effect_noise(image.size, 12).convert("L")
    noise = noise.point(lambda p: opacity if p > 128 else 0)
    grain = Image.new("RGBA", image.size, (255, 255, 255, 0))
    grain.putalpha(noise)
    base = image.convert("RGBA")
    return Image.alpha_composite(base, grain)


def draw_pattern(card: Image.Image) -> None:
    draw = ImageDraw.Draw(card, "RGBA")
    w, h = card.size

    draw.rounded_rectangle((24, 24, w - 24, h - 24), radius=18, outline=(231, 164, 60, 65), width=2)
    draw.polygon([(0, 195), (280, 145), (438, 315), (118, 402)], fill=MINT)
    draw.polygon([(508, 0), (w, 0), (w, h), (610, h), (538, 318), (610, 122)], fill=INDIGO)
    draw.polygon([(162, 255), (190, 230), (220, 260), (190, 290)], fill=RED)

    for y in range(160, 520, 54):
        draw.line([(78, y), (392, y - 26)], fill=(216, 108, 84, 150), width=3)

    gold_polys = [
        [(710, 110), (750, 98), (785, 128), (742, 141)],
        [(760, 145), (800, 133), (835, 164), (790, 177)],
        [(140, 470), (180, 458), (215, 488), (172, 500)],
        [(195, 504), (235, 492), (270, 523), (225, 536)],
    ]
    for poly in gold_polys:
        draw.polygon(poly, fill=GOLD)

    shimmer = Image.new("RGBA", card.size, (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shimmer, "RGBA")
    for x in range(-100, 480, 16):
        sdraw.line([(x, 30), (x + 140, h - 40)], fill=(255, 255, 255, 18), width=6)
    shimmer = shimmer.filter(ImageFilter.GaussianBlur(1.4))
    card.alpha_composite(shimmer)


def draw_pattern_band(card: Image.Image) -> None:
    draw = ImageDraw.Draw(card, "RGBA")
    w, h = card.size

    draw.rounded_rectangle((24, 24, w - 24, h - 24), radius=18, outline=(231, 164, 60, 42), width=2)
    draw.rectangle((748, 0, w, h), fill=(34, 37, 70, 210))
    draw.rectangle((780, 184, 934, 338), fill=(223, 232, 203, 245))
    draw.polygon([(846, 250), (868, 228), (890, 250), (868, 272)], fill=RED)
    draw.line((802, 224, 912, 208), fill=(216, 108, 84, 130), width=2)
    draw.line((802, 294, 912, 278), fill=(216, 108, 84, 130), width=2)
    draw.polygon([(882, 190), (918, 178), (950, 206), (910, 218)], fill=GOLD)


def build_front() -> Image.Image:
    front = vertical_gradient((CARD_W, CARD_H), BLACK, BLACK_SOFT).convert("RGBA")
    front = add_film_grain(front, opacity=4)
    draw_pattern_band(front)

    draw = ImageDraw.Draw(front)
    draw.text((92, 112), "NATHAN", font=NAME_FONT, fill=WHITE)
    draw.text((92, 188), "SOMEVI", font=NAME_FONT, fill=WHITE)
    draw.line((96, 294, 328, 294), fill=AMBER, width=5)
    draw.text((96, 326), "Future Afro-Jazz", font=SUB_FONT, fill=AMBER_SOFT)
    draw.text((96, 440), "manager@nathansomevi.com", font=SUB_FONT, fill=WHITE)
    draw.text((96, 486), "nathansomevi.com", font=BODY_FONT, fill=(244, 233, 219))
    return front


def make_qr(data: str) -> Image.Image:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=12,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    return img


def build_back() -> Image.Image:
    back = vertical_gradient((CARD_W, CARD_H), BLACK_SOFT, BLACK).convert("RGBA")
    back = add_film_grain(back, opacity=4)
    draw = ImageDraw.Draw(back, "RGBA")

    draw.rounded_rectangle((24, 24, CARD_W - 24, CARD_H - 24), radius=18, outline=(231, 164, 60, 42), width=2)
    draw.rectangle((676, 0, CARD_W, CARD_H), fill=(34, 37, 70, 120))
    draw.rectangle((674, 132, 910, 368), fill=(248, 244, 235, 255))

    draw.text((118, 136), "Listen - Watch - Book", font=BODY_FONT, fill=WHITE)
    draw.line((120, 180, 344, 180), fill=AMBER, width=4)
    draw.text((118, 226), "nathansomevi.com", font=BODY_FONT, fill=WHITE)
    draw.text((118, 272), "manager@nathansomevi.com", font=SUB_FONT, fill=MUTED)
    draw.text((118, 452), "Scan for site", font=SMALL_FONT, fill=AMBER_SOFT)

    qr = make_qr("https://nathansomevi.com")
    qr = qr.resize((220, 220), Image.Resampling.NEAREST)
    qr_x = 682
    qr_y = 140
    back.paste(qr, (qr_x, qr_y))

    return back


def build_sheet(front: Image.Image, back: Image.Image) -> Image.Image:
    sheet = Image.new("RGBA", (CANVAS_W, CANVAS_H), "#e9e3d9")
    sheet_draw = ImageDraw.Draw(sheet, "RGBA")
    sheet_draw.rounded_rectangle((0, 0, CANVAS_W - 1, CANVAS_H - 1), radius=28, fill="#ece6dd")

    front_pos = (GAP, GAP)
    back_pos = (CARD_W + GAP * 2, GAP)
    for pos in (front_pos, back_pos):
        x, y = pos
        sheet_draw.rounded_rectangle(
            (x + 14, y + 20, x + CARD_W + 14, y + CARD_H + 20),
            radius=26,
            fill=(0, 0, 0, 24),
        )

    sheet.alpha_composite(front, front_pos)
    sheet.alpha_composite(back, back_pos)
    return sheet


def main() -> None:
    front = build_front()
    back = build_back()
    sheet = build_sheet(front, back)

    front_path = OUTPUT / "nathan-somevi-card-front.png"
    back_path = OUTPUT / "nathan-somevi-card-back.png"
    sheet_path = OUTPUT / "nathan-somevi-card-front-back.png"

    front.save(front_path)
    back.save(back_path)
    sheet.save(sheet_path)

    print(front_path)
    print(back_path)
    print(sheet_path)


if __name__ == "__main__":
    main()
