import zmq

context = zmq.Context()


print("Connecting to server…")
socket = context.socket(zmq.REQ)
socket.connect("tcp://127.0.0.1:5502")

for request in range(10):
    message = socket.recv()
    print(f"Received reply {request} [ {message} ]")