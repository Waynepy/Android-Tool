from adb_devices import check_connected_devices
import subprocess
from colorama import Fore, Style, init
import urllib.request
import os
import lzma
import sys

def download_frida_server(architecture):
    frida_versions = {
        "armeabi-v7a": "frida-server-16.3.3-android-arm.xz",
        "arm64-v8a": "frida-server-16.3.3-android-arm64.xz",
        "x86": "frida-server-16.3.3-android-x86.xz",
        "x86_64": "frida-server-16.3.3-android-x86_64.xz"
    }
    frida_url = f"https://github.com/frida/frida/releases/download/16.3.3/{frida_versions.get(architecture)}"
    output_file = frida_versions.get(architecture)

    print(f"{Fore.MAGENTA}Downloading Frida server for {architecture} architecture{Style.RESET_ALL}...")
    urllib.request.urlretrieve(frida_url, output_file)
    print(f"{Fore.MAGENTA}Frida server downloaded as {output_file}{Style.RESET_ALL}")

    return output_file

def extract_frida_server(archive_file):
    output_file = "frida-server"
    with lzma.open(archive_file) as file_in:
        with open(output_file, "wb") as file_out:
            file_out.write(file_in.read())
    print(f"{Fore.MAGENTA}Frida server extracted as {output_file}")
    return output_file

def upload_frida_server(device_id, frida_server_file):
    adb_command = f'adb -s {device_id} push {frida_server_file} /data/local/tmp/'
    subprocess.run(adb_command, shell=True)
    print(f"{Fore.MAGENTA}Frida server uploaded to /data/local/tmp/ on device {device_id}{Style.RESET_ALL}")
    print(f"{Fore.GREEN}Frida Install has Successfully{Style.RESET_ALL}...")


def print_android_version():
    try:
        connected_devices = check_connected_devices()

        if connected_devices:
            for device in connected_devices:
                print(f"{Fore.GREEN}Device Connected: {device}{Style.RESET_ALL}")
                adb_command = f'adb -s {device} shell "getprop ro.product.cpu.abi"'
                process = subprocess.Popen(adb_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
                output, error = process.communicate()
                if error:
                    print(f"{Fore.RED}Error occurred: {error.decode()} {Style.RESET_ALL}")
                    continue
                android_version = output.decode().strip()
                print(f"{Fore.GREEN}Android Architecture: {android_version}{Style.RESET_ALL}")

                if android_version in ["armeabi-v7a", "arm64-v8a", "x86", "x86_64"]:
                    archive_file = download_frida_server(android_version)
                    frida_server_file = extract_frida_server(archive_file)
                    upload_frida_server(device, frida_server_file)
                    os.remove(archive_file) 
                    os.remove(frida_server_file) 
                else:
                    print(f"{Fore.RED}Unsupported architecture: {android_version} {Style.RESET_ALL}")

        else:
            print(f"{Fore.YELLOW}No Devices Connected{Style.RESET_ALL}")
            input(f"{Fore.GREEN}Type Enter to go back...{Style.RESET_ALL}")
    except KeyboardInterrupt:
        print(f"{Fore.YELLOW}User interruption{Style.RESET_ALL}.")
        sys.exit()

print_android_version()
