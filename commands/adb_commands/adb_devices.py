import subprocess

def check_connected_devices():
    try:
        result = subprocess.run([f"adb", 'devices'], capture_output=True, text=True, check=True)
        
        output = result.stdout
        
        devices = output.strip().split('\n')[1:]
        
        connected_devices = []
        
        if devices:
            for device in devices:
                device_info = device.split()[0]
                connected_devices.append(device_info)
        return connected_devices
            
    except subprocess.CalledProcessError as e:
        print("Erro ao executar adb devices:", e)
        return []
check_connected_devices()   