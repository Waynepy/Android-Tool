from adb_devices import check_connected_devices
import subprocess
from colorama import Fore, Style, init
import urllib.request
import os
import lzma
import sys

def get_packages():

    connected_devices = check_connected_devices()

    if connected_devices:
         for device in connected_devices:
            print(f"{Fore.GREEN}Device Connected: {device}{Style.RESET_ALL}")
            chave = input(f"{Fore.GREEN}Type the APK name{Style.RESET_ALL}: ")
            adb_command = f'adb -s {device} shell "pm list packages | grep {chave}"'
            process = subprocess.Popen(adb_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
            output, error = process.communicate()
            if error:
                print(f"{Fore.RED}Error occurred: {error.decode()} {Style.RESET_ALL}")
                continue
            android_packages = output.decode().strip()
            print(f"{Fore.GREEN}Packages found: ")
            print(f"{android_packages}{Style.RESET_ALL}")
            input(f"{Fore.GREEN}Type Enter to go back...{Style.RESET_ALL}")

get_packages()
