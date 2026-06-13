from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
import qrcode


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "business-card"
OUTPUT.mkdir(parents=True, exist_ok=True)

CARD_W = 1050
CARD_H = 600
GAP = 80
URL = "https://untitled.stream/library/project/BLOFn9DKWVuxdQJdgGInU"

INK = "#101010"
PAPER = "#f7f1e7"
ACCENT = "#d86c54"
GOLD = "#d4a84f"
MUTED = "#5b544d"
WHITE = "#ffffff"


def load_font(name: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts") / name,
        Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


NAME_FONT = load_font("arialbd.ttf", 68)
TITLE_FONT = load_font("arialbd.ttf", 58)
BODY_FONT = load_font("arial.ttf", 30)
SMALL_FONT = load_font("arial.ttf", 22)
SCRIPT_FONT = load_font("segoesc.ttf", 64)


def fitted_font(name: str, text: str, max_width: int, start_size: int, min_size: int = 18) -> ImageFont.ImageFont:
    size = start_size
    while size > min_size:
        font = load_font(name, size)
        bbox = font.getbbox(text)
        if bbox[2] - bbox[0] <= max_width:
            return font
        size -= 2
    return load_font(name, min_size)


def draw_fit_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    font_name: str,
    start_size: int,
    max_width: int,
    fill: str,
    min_size: int = 18,
) -> None:
    draw.text(xy, text, font=fitted_font(font_name, text, max_width, start_size, min_size), fill=fill)


def make_qr(data: str) -> Image.Image:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=14,
        border=3,
    )
    qr.add_data(data)
    qr.make(fit=True)
    return qr.make_image(fill_color=INK, back_color=WHITE).convert("RGB")


def draw_frame(draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle((30, 30, CARD_W - 30, CARD_H - 30), outline=INK, width=4)
    draw.rectangle((52, 52, CARD_W - 52, CARD_H - 52), outline=GOLD, width=3)


def draw_telephone(draw: ImageDraw.ImageDraw, x: int, y: int, scale: float = 1.0) -> None:
    def s(v: int) -> int:
        return int(v * scale)

    draw.rectangle((x + s(28), y + s(94), x + s(238), y + s(132)), fill=INK)
    draw.pieslice((x + s(44), y + s(28), x + s(222), y + s(126)), 180, 360, fill=INK)
    draw.rectangle((x + s(82), y + s(118), x + s(184), y + s(156)), fill=INK)
    draw.ellipse((x + s(98), y + s(64), x + s(170), y + s(136)), fill=PAPER, outline=INK, width=max(2, s(4)))
    draw.ellipse((x + s(120), y + s(86), x + s(148), y + s(114)), fill=INK)
    for dx, dy in [(20, 102), (226, 102), (58, 150), (200, 150)]:
        draw.rectangle((x + s(dx), y + s(dy), x + s(dx + 34), y + s(dy + 14)), fill=INK)


def build_cover_art(size: tuple[int, int]) -> Image.Image:
    cover = Image.new("RGB", size, PAPER)
    draw = ImageDraw.Draw(cover)
    w, h = size
    draw.rectangle((0, 0, w - 1, h - 1), outline=INK, width=4)
    draw.line((46, 126, w - 62, 82), fill=INK, width=3)
    draw.line((54, 178, w - 74, 130), fill=INK, width=2)
    draw.line((70, 262, w - 44, 204), fill=INK, width=3)
    draw_fit_text(draw, (52, 104), "Nathan", "segoesc.ttf", 64, 260, INK)
    draw_fit_text(draw, (252, 198), "Somevi", "segoesc.ttf", 64, 310, INK)
    draw_fit_text(draw, (360, 304), "Call you Later", "segoesc.ttf", 36, 230, INK, min_size=24)
    draw_telephone(draw, 92, 284, 0.78)
    return cover


def build_front() -> Image.Image:
    card = Image.new("RGB", (CARD_W, CARD_H), PAPER)
    draw = ImageDraw.Draw(card)
    draw_frame(draw)

    cover = build_cover_art((640, 420))
    card.paste(cover, (74, 90))
    draw.rectangle((748, 90, 958, 510), fill=INK)
    draw_fit_text(draw, (778, 132), "CALL", "arialbd.ttf", 58, 154, PAPER)
    draw_fit_text(draw, (778, 200), "YOU", "arialbd.ttf", 58, 154, PAPER)
    draw_fit_text(draw, (778, 268), "LATER", "arialbd.ttf", 58, 154, PAPER)
    draw.line((778, 350, 930, 350), fill=ACCENT, width=6)
    draw_fit_text(draw, (780, 390), "EP SAMPLE", "arial.ttf", 22, 150, PAPER)
    draw_fit_text(draw, (780, 436), "Scan to listen", "arial.ttf", 22, 150, GOLD)
    return card


def build_back() -> Image.Image:
    card = Image.new("RGB", (CARD_W, CARD_H), PAPER)
    draw = ImageDraw.Draw(card)
    draw_frame(draw)

    qr = make_qr(URL).resize((330, 330), Image.Resampling.NEAREST)
    qr_x = 92
    qr_y = 118
    draw.rectangle((qr_x - 18, qr_y - 18, qr_x + 348, qr_y + 348), fill=WHITE, outline=INK, width=4)
    card.paste(qr, (qr_x, qr_y))

    draw_fit_text(draw, (492, 144), "CALL YOU LATER", "arialbd.ttf", 58, 460, INK)
    draw.text((496, 220), "EP SAMPLE", font=BODY_FONT, fill=MUTED)
    draw.line((496, 276, 850, 276), fill=ACCENT, width=6)
    draw_fit_text(draw, (496, 330), "Untitled stream preview", "arial.ttf", 30, 420, INK)
    draw_fit_text(draw, (496, 438), "untitled.stream", "arial.ttf", 30, 420, INK)
    draw_fit_text(draw, (496, 488), "Scan the QR code", "arial.ttf", 22, 420, MUTED)
    return card


def build_sheet(front: Image.Image, back: Image.Image) -> Image.Image:
    sheet = Image.new("RGB", (CARD_W * 2 + GAP * 3, CARD_H + GAP * 2), PAPER)
    sheet.paste(front, (GAP, GAP))
    sheet.paste(back, (CARD_W + GAP * 2, GAP))
    return sheet


def main() -> None:
    front = build_front()
    back = build_back()
    sheet = build_sheet(front, back)

    front_path = OUTPUT / "call-you-later-ep-sample-card-front.png"
    back_path = OUTPUT / "call-you-later-ep-sample-card-back.png"
    sheet_path = OUTPUT / "call-you-later-ep-sample-card-front-back.png"

    front.save(front_path)
    back.save(back_path)
    sheet.save(sheet_path)

    print(front_path)
    print(back_path)
    print(sheet_path)


if __name__ == "__main__":
    main()
