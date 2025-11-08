# gunicorn.conf.py

import multiprocessing

# Número de processos de trabalho (workers)
workers = multiprocessing.cpu_count() * 2 + 1

# Tipo de worker que suporta WebSockets
worker_class = 'eventlet'

# Endereço e porta que o Gunicorn vai ouvir
bind = '10.229.34.5:5001'

# Nome do processo
proc_name = 'flask_socketio_app'

# Timeout (em segundos)
timeout = 120

# # Log de acesso
# accesslog = '/var/log/flask_socketio_access.log'
# errorlog = '/var/log/flask_socketio_error.log'
# loglevel = 'info'
