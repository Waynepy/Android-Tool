import frida

# Substitua 'process_id' pelo ID do processo de destino
process_id = 11633

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] Received:", message['payload'])

device = frida.get_usb_device()
pid = device.attach(process_id)

with open("your_script.js", "r") as js_file:
    script_code = js_file.read()

script = pid.create_script(script_code)
script.on('message', on_message)
script.load()
frida.resume(pid)
sys.stdin.read()
