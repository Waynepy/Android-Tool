import subprocess
import signal
import sys
from colorama import Fore, Style, init

def handler(signum, frame):
    print(f"{Fore.YELLOW}Closing Frida session{Style.RESET_ALL}...")
    # Encerrar o processo do Frida
    process.terminate()
    sys.exit(0)

package = input(f"{Fore.GREEN}Type Package: {Style.RESET_ALL}")
# Registre o manipulador para o sinal SIGINT (Ctrl + C)
signal.signal(signal.SIGINT, handler)

# Comando Frida para listar logs
frida_command = f"frida -U -f {package} -l list-logs.js"

# Execute o comando usando subprocess
process = subprocess.Popen(frida_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# Leia e imprima a saída do processo em tempo real
for line in iter(process.stdout.readline, b''):
    print(Fore.MAGENTA)
    print(line.decode('utf-8'), end='')
    print(Style.RESET_ALL)

# Aguarde o processo finalizar e capture a saída de erro, se houver
stdout, stderr = process.communicate()

# Imprima a saída de erro, se houver
if stderr:
    print(stderr.decode('utf-8'))