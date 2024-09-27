import sys
import subprocess
from colorama import Fore, Style, init
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

base_dir = os.path.dirname(os.path.dirname(script_dir))

adb_commands_dir = os.path.join(base_dir, "commands", "adb_commands")

sys.path.append(adb_commands_dir)

from adb_devices import check_connected_devices

print(f"{Fore.MAGENTA}")

def logcat():
    try:
        connected_devices = check_connected_devices()
        if connected_devices:
            for device in connected_devices:
                # Verifica se o dispositivo possui IP e porta definidos
                if ":" in device:
                    ip, port = device.split(":")
                    # Executa o comando adb shell com o dispositivo que está conectado através de IP e porta
                    subprocess.run(["adb", "-s", f"{ip}:{port}", "shell", "logcat"])
                else:
                    # Se o dispositivo não possui IP e porta definidos, executa o logcat normalmente
                    subprocess.run(["adb", "-s", device, "shell", "logcat"])
        else:
            print(f"{Fore.YELLOW}No Devices Connected{Style.RESET_ALL}")
            input(f"{Fore.GREEN}Type Enter to go back...{Style.RESET_ALL}")                    
    except KeyboardInterrupt:
        print(f"{Fore.YELLOW}User interruption{Style.RESET_ALL}.")
        sys.exit()

logcat()
print(f"{Style.RESET_ALL}")