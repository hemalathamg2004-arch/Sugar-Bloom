import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = 'http://127.0.0.1:8000/'
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, context=ctx) as response:
        data = json.loads(response.read().decode())
        
        print(f'Total items: {len(data)}')
        
        broken_count = 0
        for item in data:
            img_url = item['ImageName']
            try:
                img_req = urllib.request.Request(img_url, method='HEAD')
                with urllib.request.urlopen(img_req, context=ctx) as img_resp:
                    if img_resp.status != 200:
                        print(f'BROKEN [{img_resp.status}] for {item["FoodName"]}: {img_url}')
                        broken_count += 1
            except Exception as e:
                print(f'ERROR for {item["FoodName"]}: {img_url} - {str(e)}')
                broken_count += 1
                
        print(f'Total broken images: {broken_count}')
except Exception as e:
    print(f'Failed to fetch API: {e}')
