import socket

sock = socket.socket()
ip = input("Введите свой IP-адрес: \n")
port = input("Введите свой порт: \n")
sock.bind((ip, int(port)))
ipServer = input("Введите IP-адрес сервера: \n")
portServer = input("Введите порт сервера: \n")

def tryConnect():
    return True

print("Сервер в настоящий момент занят, пожалуйста, подождите…")
