from adb_devices import check_connected_devices
import subprocess
from colorama import Fore, Style, init

def init_frida():
    try:
        connected_devices = check_connected_devices()

        if connected_devices:
            for device in connected_devices:
                print(f"{Fore.GREEN}Device Connected: {device}{Style.RESET_ALL}")
                adb_command = f'adb -s {device} shell "cd /data/local/tmp && chmod 777 frida-server && ./frida-server &"'
                process = subprocess.Popen(adb_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
                process.communicate()
                process.kill()

                frida_ps_command = 'frida-ps -U'
                frida_ps_process = subprocess.Popen(frida_ps_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
                frida_ps_output, frida_ps_error = frida_ps_process.communicate()

                if b'PID' in frida_ps_output and b'Name' in frida_ps_output:
                    print(f"{Fore.GREEN}Frida successfully initialized in: {device}{Style.RESET_ALL}")
                    input(f"{Fore.GREEN}Type Enter to go back...{Style.RESET_ALL}")
                else:
                    print(f"{Fore.RED}Failure to initialize frida in: {device}{Style.RESET_ALL}")
        else:
            print(f"{Fore.YELLOW}No Devices Connected{Style.RESET_ALL}")
            input(f"{Fore.YELLOW}Type Enter to back...{Style.RESET_ALL}")

    except KeyboardInterrupt:
        print(f"{Fore.YELLOW}Frida successfully initialized in: {device}{Style.RESET_ALL}.")

if __name__ == "__main__":
    init_frida()