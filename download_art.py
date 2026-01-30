import requests
from bs4 import BeautifulSoup
import os
import time
import re
from urllib.parse import urljoin
from pathlib import Path

BASE_URL = "https://www.janabayerova.cz"
GALLERY_URL = "https://www.janabayerova.cz/art/"
OUTPUT_DIR = Path(__file__).parent / "photos" / "art-photos"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}


def get_artwork_links():
    """Get all artwork detail page links from all gallery pages."""
    artwork_links = []
    page = 1
    
    while True:
        if page == 1:
            url = GALLERY_URL
        else:
            url = f"{GALLERY_URL}?start={page}"
        
        print(f"Fetching page {page}: {url}")
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        page_links = []
        for link in soup.find_all("a", href=True):
            href = link["href"]
            if href.startswith("/art/") and href.endswith(".html"):
                full_url = urljoin(BASE_URL, href)
                if full_url not in artwork_links:
                    artwork_links.append(full_url)
                    page_links.append(full_url)
        
        print(f"  Found {len(page_links)} new artwork links")
        
        if len(page_links) == 0:
            break
        
        page += 1
        time.sleep(0.5)
    
    print(f"\nTotal: {len(artwork_links)} artwork links found")
    return artwork_links


def get_image_url_from_detail(detail_url):
    """Extract the high-resolution image URL from artwork detail page."""
    response = requests.get(detail_url, headers=HEADERS)
    response.raise_for_status()
    
    soup = BeautifulSoup(response.text, "html.parser")
    
    for link in soup.find_all("a", href=True):
        href = link["href"]
        if "i.ck.cz/f/" in href and ".webp" in href:
            return href
    
    for img in soup.find_all("img", src=True):
        src = img["src"]
        if "i.ck.cz/f/" in src:
            clean_src = re.sub(r"\?.*$", "", src)
            return clean_src
    
    return None


def sanitize_filename(name):
    """Create safe filename from artwork name."""
    name = re.sub(r"[<>:\"/\\|?*]", "", name)
    name = name.strip()
    return name[:100]


def download_image(image_url, artwork_name, index):
    """Download image and save to output directory."""
    try:
        response = requests.get(image_url, headers=HEADERS, stream=True)
        response.raise_for_status()
        
        extension = ".webp"
        if ".jpg" in image_url.lower():
            extension = ".jpg"
        elif ".png" in image_url.lower():
            extension = ".png"
        
        safe_name = sanitize_filename(artwork_name)
        filename = f"{index:03d}_{safe_name}{extension}"
        filepath = OUTPUT_DIR / filename
        
        with open(filepath, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return filepath
    except Exception as e:
        print(f"  Error downloading: {e}")
        return None


def get_artwork_name_from_url(url):
    """Extract artwork name from URL."""
    match = re.search(r"/art/(.+)-\d+\.html", url)
    if match:
        name = match.group(1).replace("-", " ").title()
        return name
    return "unknown"


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    print("Fetching artwork links from gallery...")
    artwork_links = get_artwork_links()
    
    if not artwork_links:
        print("No artwork links found!")
        return
    
    print(f"\nStarting download of {len(artwork_links)} artworks...")
    
    successful = 0
    failed = 0
    
    for i, detail_url in enumerate(artwork_links, 1):
        artwork_name = get_artwork_name_from_url(detail_url)
        print(f"[{i}/{len(artwork_links)}] {artwork_name}")
        
        image_url = get_image_url_from_detail(detail_url)
        
        if image_url:
            filepath = download_image(image_url, artwork_name, i)
            if filepath:
                print(f"  Downloaded: {filepath.name}")
                successful += 1
            else:
                failed += 1
        else:
            print(f"  No image URL found")
            failed += 1
        
        time.sleep(0.3)
    
    print(f"\nDone! Downloaded {successful} images, {failed} failed.")


if __name__ == "__main__":
    main()
