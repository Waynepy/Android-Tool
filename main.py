import fade
from colorama import Fore, Style, init
import os
import subprocess

base_dir = os.path.dirname(os.path.abspath(__file__))

base_dir = os.path.join(base_dir, "commands")

if not base_dir.endswith(os.path.sep):
    base_dir += os.path.sep

init(autoreset=True)
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def display_menu(menu):
    clear_screen()
    banner = """
_____________________________________________________________
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠟⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠀⠀⠈⠻⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣶⣦⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⡇⠀⠀⠀⠀⠈⠙⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠾⠋⠁⢸⣿⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⡇⠀⠀⠀⠀⠀⠀⠀⠙⢷⣆⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡾⠛⠁⠀⠀⠀⣿⣼⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡏⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡾⠛⠁⠀⠀⠀⠀⠀⣸⡿⣿⠂⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⣿⠀⠀⠀⠀⠀⠶⠶⠶⠶⠶⠶⠿⠷⠶⠶⠤⣤⣤⣀⣀⡀⢀⣤⡾⠛⠁⠀⠀⠀⠀⠀⠀⠀⢠⣿⢣⡟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⣽⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡷⣸⠇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⢣⡿⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣼⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠇⠀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣿⣿⡾⠛⠉⣉⣽⣿⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⠶⠛⢛⣿⣿⣷⣶⣤⣀⠀⠀⠀⠀⠀⠀⢸⣿⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢰⣾⠛⢉⣵⡟⣃⣤⣶⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⣠⣾⠏⣡⣴⣾⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⢈⡹⣇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣀⣀⣀⣀⣰⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠶⠖⠲⠾⣿⣿⣦⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⣴⡾⠋⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠈⠙⢿⣄⠀⠀⠀⠀
⠀⠀⣿⡛⠉⠁⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣄⠀⠀
⠀⠀⣾⣷⣦⣀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣧⠀
⠀⡀⠈⠻⢿⣿⣿⣷⠆⠀⠙⠻⠿⣿⣿⡿⢿⣿⠋⠀⠀⠀⣴⠇⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡆
⠀⠻⣟⠛⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠿⣿⣆⣀⣠⣼⢿⣧⠀⠀⠀⢀⣿⠿⢿⣿⣿⣿⣿⣿⣿⣿⠿⣛⠹⣮⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣷
⠀⠀⠈⠻⢦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢩⠿⠻⣯⢻⣷⣶⣿⡿⠋⠀⠀⠀⠉⠉⠉⠉⠁⠀⣐⣭⣾⡿⠋⢻⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿
⠀⠀⠀⢀⣰⣿⣻⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡿⠛⣍⠡⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡟
⠀⠀⠀⠛⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡿⠁
⠀⠀⠀⢐⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠟⠀⠀
⠀⠀⠀⣼⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠃⠀⠀⠀
⠀⠀⠀⣸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⡟⠀⠀⠀⠀⠀
⠀⠀⣰⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠛⠀⠀⠀⠀⠀⠀
⢠⣾⢿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡏⠀⠀⠀⠀⠀⠀⠀
⠀⣰⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⠀⠀⠀⠀⠀⠀⠀⠀
⣾⢿⣾⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠛⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⠀⠀⠀⠀⠀⠀⠀⠀⠀
       Just a helpful Tool ---> Wayne.py
       LDPlayer, Memu & Nox
_____________________________________________________________
"""
    banner_color = fade.greenblue(banner)
    print(banner_color)
    print(fade.greenblue(menu)) 

def start_frida():
    adb_commands_dir = os.path.join(base_dir, "adb_commands")
    start_frida_script = os.path.join(adb_commands_dir, "start_frida.py")
    try:
        os.system(f'python "{start_frida_script}"')
    except KeyboardInterrupt:
        print(f"{Fore.GREEN}Returned to the main menu{Style.RESET_ALL}...")
         
def install_frida():
    adb_commands_dir = os.path.join(base_dir, "adb_commands")
    start_frida_script = os.path.join(adb_commands_dir, "install_frida.py")
    try:
        os.system(f'python "{start_frida_script}"')
    except KeyboardInterrupt:
        print(f"{Fore.GREEN}Returned to the main menu{Style.RESET_ALL}...")

def get_apks():
    adb_commands_dir = os.path.join(base_dir, "adb_commands")
    start_frida_script = os.path.join(adb_commands_dir, "get_apps.py")
    try:
        os.system(f'python "{start_frida_script}"')
    except KeyboardInterrupt:
        print(f"{Fore.GREEN}Returned to the main menu{Style.RESET_ALL}...")

def adb_devices():
    result = subprocess.run([f"adb", 'devices'], capture_output=True, text=True, check=True)
        
    output = result.stdout
        
    devices = output.strip().split('\n')[1:]
        
    connected_devices = []
        
    if devices:
        for device in devices:
            device_info = device.split()[0]
            connected_devices.append(device_info)
    else:
        return None        
    return connected_devices
    
def verify_frida():
    frida_ps_command = 'frida-ps -U'
    frida_ps_process = subprocess.Popen(frida_ps_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    frida_ps_output, frida_ps_error = frida_ps_process.communicate()

    if b'PID' in frida_ps_output and b'Name' in frida_ps_output:
        return True
    else:
        return False    

def logcat1():
    adb_commands_dir = os.path.join(base_dir, "logcat")
    start_frida_script = os.path.join(adb_commands_dir, "logcat1.py")
    try:
        os.system(f'python "{start_frida_script}"')
    except KeyboardInterrupt:   
        print(f"{Fore.GREEN}Returned to the main menu{Style.RESET_ALL}...")

def list_logs():
    adb_commands_dir = os.path.join(base_dir, "execute_scripts")
    os.chdir(adb_commands_dir)  
    start_frida_script = os.path.join(adb_commands_dir, "list-logs.py")
    try:
        os.system(f'python "{start_frida_script}"')
    except KeyboardInterrupt:
        print(f"{Fore.GREEN}Returned to the main menu{Style.RESET_ALL}...")

def export_apk():
    adb_commands_dir = os.path.join(base_dir, "adb_commands")
    start_frida_script = os.path.join(adb_commands_dir, "export_apk.py")
    try:
        os.system(f'python "{start_frida_script}"')
    except KeyboardInterrupt:
        print(f"{Fore.GREEN}Returned to the main menu.{Style.RESET_ALL}...")

def listar_scripts_js(directory):
    scripts = [f for f in os.listdir(directory) if f.endswith('.js')]
    return scripts

def selecionar_script(scripts):
    print(f"{Fore.YELLOW}Select Bypass Script (Needed Initialized Frida):{Style.RESET_ALL}")
    for i, script in enumerate(scripts):
        print(f"{Fore.GREEN}{i + 1}{Style.RESET_ALL}: {Fore.MAGENTA}{script}{Style.RESET_ALL}")
    
    while True:
        try:
            escolha = int(input(f"{Fore.GREEN}->{Style.RESET_ALL} "))
            if 1 <= escolha <= len(scripts):
                return scripts[escolha - 1]
            else:
                print(f"{Fore.RED}Invalid Selection, Try Again..{Style.RESET_ALL}")
        except ValueError:
            print(f"{Fore.RED}Please Select A Number.{Style.RESET_ALL}")
            
def executar_comando_com_cor(comando):
    process = subprocess.Popen(comando, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    for line in process.stdout:
        print(Fore.MAGENTA + line, end='')

    for line in process.stderr:
        print(Fore.MAGENTA + line, end='')

    process.stdout.close()
    process.stderr.close()
    
    process.wait()

def ssl_bypass_1():
    base_dir = os.getcwd()  
    scripts_dir = os.path.join(base_dir, "commands", "Scripts", "SSL")  

    scripts = listar_scripts_js(scripts_dir)

    if not scripts:
        print(f"{Fore.RED}No .js scripts were found in the directory.. {scripts_dir}.{Style.RESET_ALL}")
        input(f"{Fore.GREEN}Press Enter To Go Back...{Style.RESET_ALL}")
        return

    while True:
        try:
            script_selecionado = selecionar_script(scripts)
            if script_selecionado is None:
                print(f"{Fore.GREEN}Retornando ao menu principal...{Style.RESET_ALL}")
                return
            
            frida_script_path = os.path.join(scripts_dir, script_selecionado)
            name_process = input(f"{Fore.GREEN}Package Name{Style.RESET_ALL} {Fore.GREEN}->{Style.RESET_ALL}  ")

            start_frida_script = f'frida -U -f {name_process} -l "{frida_script_path}"'

            print(f"{Fore.MAGENTA}")  
            executar_comando_com_cor(start_frida_script)
            print(f"{Style.RESET_ALL}")  

            input(f"{Fore.GREEN}Press Enter To Go Back...{Style.RESET_ALL}")
            break
        except KeyboardInterrupt:
            print(f"{Fore.GREEN}Returned to the main menu.{Style.RESET_ALL}...")
            break
        except ValueError:
            print(f"{Fore.RED}Invalid Selection, Try Again..{Style.RESET_ALL}")
            
def root_bypass_1():
    base_dir = os.getcwd()  
    scripts_dir = os.path.join(base_dir, "commands", "Scripts", "ROOT")  

    scripts = listar_scripts_js(scripts_dir)

    if not scripts:
        print(f"{Fore.RED}No .js scripts were found in the directory: {scripts_dir}.{Style.RESET_ALL}")
        input(f"{Fore.GREEN}Press Enter To Go Back...{Style.RESET_ALL}")
        return

    while True:
        try:
            script_selecionado = selecionar_script(scripts)
            if script_selecionado is None:
                print(f"{Fore.GREEN}Retornando ao menu principal...{Style.RESET_ALL}")
                return
            
            frida_script_path = os.path.join(scripts_dir, script_selecionado)
            name_process = input(f"{Fore.GREEN}Package Name{Style.RESET_ALL} {Fore.GREEN}->{Style.RESET_ALL}  ")

            start_frida_script = f'frida -U -f {name_process} -l "{frida_script_path}"'

            print(f"{Fore.MAGENTA}")  
            executar_comando_com_cor(start_frida_script)
            print(f"{Style.RESET_ALL}") 

            input(f"{Fore.GREEN}Press Enter To Go Back...{Style.RESET_ALL}")
            break
        except KeyboardInterrupt:
            print(f"{Fore.GREEN}Returned to the main menu.{Style.RESET_ALL}...")
            break
        except ValueError:
            print(f"{Fore.RED}Invalid Selection, Try Again..{Style.RESET_ALL}")

def root_bypass_2():

    base_dir = os.getcwd()  
    scripts_dir = os.path.join(base_dir, "commands", "Scripts", "custom")  

    scripts = listar_scripts_js(scripts_dir)

    if not scripts:
        print(f"{Fore.RED}No .js scripts were found in the directory.. {scripts_dir}.{Style.RESET_ALL}")
        input(f"{Fore.GREEN}Press Enter To Go Back...{Style.RESET_ALL}")
        return

    while True:
        try:
            script_selecionado = selecionar_script(scripts)
            if script_selecionado is None:
                print(f"{Fore.GREEN}Retornando ao menu principal...{Style.RESET_ALL}")
                return
            
            frida_script_path = os.path.join(scripts_dir, script_selecionado)
            name_process = input(f"{Fore.GREEN}Package Name{Style.RESET_ALL} {Fore.GREEN}->{Style.RESET_ALL}  ")

            start_frida_script = f'frida -U -f {name_process} -l "{frida_script_path}"'

            print(f"{Fore.MAGENTA}")  
            executar_comando_com_cor(start_frida_script)
            print(f"{Style.RESET_ALL}")  

            input(f"{Fore.GREEN}Press Enter To Go Back...{Style.RESET_ALL}")
            break
        except KeyboardInterrupt:
            print(f"{Fore.GREEN}Returned to the main menu.{Style.RESET_ALL}...")
            break
        except ValueError:
            print(f"{Fore.RED}Invalid Selection, Try Again..{Style.RESET_ALL}")            

def ListProcessFrida():
    Frida_ListProcess = subprocess.run("cmd.exe /c frida-ps -Uai > listProcess.txt")
    File_List = open("listProcess.txt","r")
    File_ListRead = File_List.readlines()
    for List_Process in File_ListRead:
        print(f"{Fore.MAGENTA}{List_Process}{Style.RESET_ALL}")
    input(f"{Fore.GREEN}Press Enter To Go Back...{Style.RESET_ALL}")

def crypto_algo():
    # Define o diretório base e o diretório onde os scripts estão localizados
    base_dir = os.getcwd()
    scripts_dir = os.path.join(base_dir, "commands", "Scripts", "hook")
    
    # Lista os arquivos .js no diretório
    scripts = listar_scripts_js(scripts_dir)

    # Verifica se há scripts disponíveis
    if not scripts:
        print(f"{Fore.RED}No .js scripts were found in the directory: {scripts_dir}.{Style.RESET_ALL}")
        input(f"{Fore.GREEN}Press Enter To Go Back...{Style.RESET_ALL}")
        return

    while True:
        try:
            # Seleciona o script
            script_selecionado = selecionar_script(scripts)
            if script_selecionado is None:
                print(f"{Fore.GREEN}Returning to the main menu...{Style.RESET_ALL}")
                return
            
            # Define o caminho completo do script selecionado
            frida_script_path = os.path.join(scripts_dir, script_selecionado)
            
            pid = input(f"{Fore.GREEN}Apk Pid ->{Style.RESET_ALL} ")

            # Monta o comando para executar o Frida com o script selecionado
            start_frida_script = f'frida -U -p {pid} -l "{frida_script_path}"'

            print(f"{Fore.MAGENTA}")  
            executar_comando_com_cor(start_frida_script)
            print(f"{Style.RESET_ALL}") 

            input(f"{Fore.GREEN}Press Enter To Go Back...{Style.RESET_ALL}")
            break
        except KeyboardInterrupt:
            print(f"{Fore.GREEN}Returned to the main menu.{Style.RESET_ALL}...")
            break
        except ValueError:
            print(f"{Fore.RED}Invalid Selection, Try Again..{Style.RESET_ALL}")

def main_menu():
    while True:
        output = adb_devices() 

        menu1 = f"""
Device Connected -> {output}

_____________________________________________________________
1 -> Frida Setup             6 -> Activities
2 -> Processes               7 -> Objection 
3 -> Bypasses JS             8 -> Hooks
4 -> Export/Import APK       9 -> Menu 2
5 -> LogCat                  0 -> Quit
_____________________________________________________________
"""
        menu1 = fade.greenblue(menu1)
        menu2_activities = """
_____________________________________________________________
1 -> List Activities  
2 -> List Running Activities     
0 -> Back     
_____________________________________________________________
"""
        menu2_activities = fade.greenblue(menu2_activities)
        menu3_Export_Import = """
_____________________________________________________________
1 -> Export APK  
2 -> Import APK    
0 -> Back  
_____________________________________________________________
"""
        menu3_Export_Import = fade.greenblue(menu3_Export_Import)
        menu4_logcat = """
_____________________________________________________________
1 -> Real Time Logcat  
2 -> Especific APK Logcat   
0 -> Back
_____________________________________________________________
"""
        menu4_logcat = fade.greenblue(menu4_logcat)
        menu5_java = """
_____________________________________________________________
1 -> Bypass SSL Detection  (Needed initialized Frida)
2 -> Bypass Root Detection  (Needed initialized Frida)
3 -> Execute Custom JS File  (Needed initialized Frida)
0 -> Back
_____________________________________________________________
"""
        menu5_java = fade.greenblue(menu5_java)
        menu6_processes = """
_____________________________________________________________
1 -> List APKs with custom name
2 -> List all Apks (Needed initialized Frida)
0 -> Back
_____________________________________________________________
"""
        menu6_processes = fade.greenblue(menu6_processes)
        menu7_frida_setup = """
_____________________________________________________________
1 -> Install Frida 
2 -> Run Frida
0 -> Back
_____________________________________________________________
"""
        menu7_frida_setup = fade.greenblue(menu7_frida_setup)
        menu8_objection = """
_____________________________________________________________
1 -> Run objection (Needed initialized Frida)
0 -> Back
_____________________________________________________________
"""

        menu8_objection = fade.greenblue(menu8_objection)    
        menu9_hooks = """
_____________________________________________________________
1 -> Cripto Algo Identifiers (Needed initialized Frida)
2 -> Custom hooks (Needed initialized Frida)
0 -> Back
_____________________________________________________________
"""

        menu9_hooks = fade.greenblue(menu9_hooks)   

        display_menu(menu1)

        selection = input(f"{Fore.GREEN}->{Style.RESET_ALL} ")
        
        if selection == "1":
            display_menu(menu7_frida_setup)
            selection = input(f"{Fore.GREEN}->{Style.RESET_ALL} ")
            if selection == "1":
                install_frida()

            elif selection == "2":
                start_frida()

        elif selection == "2":
            display_menu(menu6_processes)
            selection = input(f"{Fore.GREEN}->{Style.RESET_ALL} ")
            if selection == "1":
                get_apks()

            elif selection == "2":
                ListProcessFrida()

        elif selection == "3":
            display_menu(menu5_java)
            selection = input(f"{Fore.GREEN}->{Style.RESET_ALL} ")

            if selection == "1":
                ssl_bypass_1()

            elif selection == "2":
                root_bypass_1()

            elif selection == "3":
                root_bypass_2()
    

        elif selection == "4":
            display_menu(menu3_Export_Import)
            selection = input(f"{Fore.GREEN}->{Style.RESET_ALL} ")

            if selection == "1":
                export_apk()

            elif selection == "2":
                print("Starting option 2 from menu 4")

        elif selection == "5":
            display_menu(menu4_logcat) 
            selection = input(f"{Fore.GREEN}->{Style.RESET_ALL} ")

            if selection == "1":
                logcat1()

            elif selection == "2":
                print("Starting option 2 from menu 9")

        elif selection == "6":
            display_menu(menu2_activities)
            selection = input(f"{Fore.GREEN}->{Style.RESET_ALL} ")

            if selection == "1":
                print("Starting option 1 from menu 6")

            elif selection == "2":
                print("Starting option 2 from menu 6")

        elif selection == "7":
            display_menu(menu8_objection)
            selection = input(f"{Fore.GREEN}->{Style.RESET_ALL} ")
            if selection == "1":
                print("Starting option 1 from menu 6")

            elif selection == "2":
                print("Starting option 2 from menu 6")



        elif selection == "8":
            display_menu(menu9_hooks)
            selection = input(f"{Fore.GREEN}->{Style.RESET_ALL} ")
            if selection == "1":
                crypto_algo()




        elif selection == "9":
            selection = input(f"{Fore.GREEN}->{Style.RESET_ALL} ")

        elif selection == "0":
            print(f"{Fore.GREEN}tnhx for use{Style.RESET_ALL}")
            break
        else:
            print(f"{Fore.YELLOW}Invalid option. Please try again{Style.RESET_ALL}.")

if __name__ == "__main__":
    main_menu()