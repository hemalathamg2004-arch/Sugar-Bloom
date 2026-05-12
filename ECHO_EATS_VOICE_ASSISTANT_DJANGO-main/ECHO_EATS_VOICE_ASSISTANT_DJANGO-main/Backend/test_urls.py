import urllib.request, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Round 2 candidates for the 3 that failed
candidates = {
    "Strawberry Pink Sundae": [
        "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1570197788417-0e82375c9ca7?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=600&auto=format&fit=crop",
    ],
    "Pink Sugar Churros": [
        
        
        "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?q=80&w=600&auto=format&fit=crop",
    ],
    "Rose Mochi": [
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=600&auto=format&fit=crop",
        
    ],
}

for name, urls in candidates.items():
    for url in urls:
        try:
            req = urllib.request.Request(url, method='HEAD')
            with urllib.request.urlopen(req, context=ctx) as resp:
                print(f"OK  [{resp.status}] {name}: {url}")
                break
        except Exception as e:
            print(f"FAIL {name}: {url}")
