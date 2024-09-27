import subprocess
import signal
import sys
import os
from colorama import Fore, Style, init
from adb_devices import check_connected_devices

init(autoreset=True)

def handler(signum, frame):
    print(f"{Fore.YELLOW}Ending ADB Conection...{Style.RESET_ALL}")
    if process:
        process.terminate()
    sys.exit(0)

package = input(f"{Fore.GREEN}Type Package Name: {Style.RESET_ALL}")

signal.signal(signal.SIGINT, handler)

try:
    connected_devices = check_connected_devices()

    if connected_devices:
        print(f"{Fore.GREEN}Device Connected: {connected_devices}{Style.RESET_ALL}")

        adb_command = f"adb -s {connected_devices[0]} shell pm path {package}"

        process = subprocess.Popen(adb_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        stdout, stderr = process.communicate()

        if stderr:
            print(Fore.RED + stderr.decode('utf-8') + Style.RESET_ALL)

        apk_paths = [line.split(':')[1].strip() for line in stdout.decode('utf-8').strip().split('\n') if line]

        if apk_paths:
            os.makedirs(package, exist_ok=True)
            for apk_path in apk_paths:
                pull_command = f"adb -s {connected_devices[0]} pull {apk_path} {package}/"
                pull_process = subprocess.Popen(pull_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                pull_stdout, pull_stderr = pull_process.communicate()

                if pull_stdout:
                    print(f"{Fore.MAGENTA}Success -> {pull_stdout.decode('utf-8').strip()}  {Style.RESET_ALL}")
                if pull_stderr:
                    print(f"{Fore.RED}Failure -> {pull_stderr.decode('utf-8').strip()}  {Style.RESET_ALL}")
            input(f"{Fore.GREEN}Type Enter to go back...{Style.RESET_ALL}")            
        else:
            print(Fore.RED + "Não foi possível encontrar os caminhos dos APKs." + Style.RESET_ALL)
    else:
        print(Fore.RED + "Nenhum dispositivo Android conectado." + Style.RESET_ALL)

except Exception as e:
    print(Fore.RED + f"Erro: {str(e)}" + Style.RESET_ALL)
