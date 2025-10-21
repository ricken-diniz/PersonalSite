from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room

from gamemods.chess import Chess
from gamemods.atomic_chess import AtomicChess
from gamemods.crazy_chess import CrazyChess
from gamemods.duck_chess import DuckChess

from utils import get_arrange,show_chessboard,stalemate

def create_game_instance(gamemode):
    print(gamemode)
    if gamemode == 'normal':
        return Chess()
    elif gamemode == 'atomic':
        return AtomicChess()
    elif gamemode == 'crazy':
        return CrazyChess()
    elif gamemode == 'duck':
        return DuckChess()
    else:
        raise ValueError('Invalid game mode')

socketio = SocketIO(cors_allowed_origins=["http://10.0.0.112:8000"])
rooms = {}
games = {}
users = []

app = Flask(__name__)
socketio.init_app(app)


@socketio.on('connect')
def handle_connect():
    user = request.sid
    users.append(user)
    print(f'Usuário conectado com SID: {user}')


@socketio.on('create_room')
def on_create_room(data):
    user = request.sid
    room = data['room']
    gamemode = data['gamemode']
    
    if room not in rooms:
        rooms[room] = [-1,-1,-1]
    else:
        socketio.emit('error', {'message': 'Room already exists!'}, to=user)
        return

    rooms[room][-1] = user

    game = create_game_instance(gamemode)

    games[room] = {
        'game': game,
        'turn': -1
    }

    chessList = show_chessboard(games[room]['game'].chessboard)
    join_room(room)
    socketio.emit('room_created', {'message': f'Room {room} created by {user}', 'chessboard': chessList, 'room':room}, room=room)

@socketio.on('join_room')
def on_join_room(data):
    user = request.sid
    room = data['room']
    
    if not room in rooms:
        socketio.emit('error', {'message': 'Room does not exist!'}, to=user)
        return

    if user in rooms[room]:
        socketio.emit('error', {'message': 'User already in this room!'}, to=user)
        return

    if rooms[room][1] != -1:
        socketio.emit('error', {'message': 'Room is full!'}, to=user)
        return

    rooms[room][1] = user
    chessList = show_chessboard(games[room]['game'].chessboard)
    join_room(room)
    socketio.emit('user_joined', {'message': f'{rooms[room][0]} joined the room {room}', 'chessboard': chessList, 'room':room}, to=user)
    socketio.emit('start_game', {'message': 'Both players have joined. The game is starting!', 'turn': games[room]['turn']}, room=room)

@socketio.on('delete_room')
def on_delete_room(data):
    user = request.sid
    room = data['room']
    if room not in rooms:
        socketio.emit('error', {'message': 'Room does not exist!'}, to=user)
        return

    del rooms[room]
    socketio.emit('room_deleted', {'message': f'Room {room} has been deleted.'}, room=room)

@socketio.on('see_moves')
def on_see_moves(data):
    user = request.sid
    room = data['room']
    i = int(data['position'][0])
    j = int(data['position'][1])

    if room not in rooms:
        socketio.emit('error', {'message': 'Room does not exist!'}, to=user)
        return
    
    if user not in rooms[room]:
        socketio.emit('error', {'message': 'User is not in the room!'}, to=user)
        return
    
    game = games[room]['game']
    piece = game.chessboard[i][j]
    turn = piece.piece_color

    
    if rooms[room][turn] == user:
        moves = piece.piece_map
        socketio.emit('possible_moves', {'moves': moves, 'i': i, 'j': j}, to=user)
    
@socketio.on('send_move')
def on_send_move(data):
    user = request.sid
    room = data['room']

    if room not in rooms:
        socketio.emit('error', {'message': 'Room does not exist!'}, to=user)
        return

    if user not in rooms[room]:
        socketio.emit('error', {'message': 'User is not in the room!'}, to=user)
        return

    game = games[room]['game']
    move = data['move']
    piece_arrange = (int(move[0]), int(move[1]))
    movement = (int(move[2]), int(move[3]))



    turn = games[room]['turn']
    if rooms[room][turn] == user and not (log := game.move_piece(piece_arrange, movement, turn)) is False:
        
        chessList = show_chessboard(game.chessboard)

        if log == 'End Game':
            winner = 'White' if turn == -1 else 'Black'
            socketio.emit('end_game', {'winner': winner, 'chessboard': chessList}, room=room)
            return

        elif log == 'Você não pode mover para essa casa, seu rei ficará em xeque!':
            socketio.emit('invalid_move', {'motive': 'check'}, room=room)
            return

        games[room]['turn'] = -games[room]['turn']
        socketio.emit('received_move', {'chessboard': chessList, 'turn': games[room]['turn']}, room=room)

@socketio.on('disconnect')
def handle_disconnect():
    user = request.sid
    users.remove(user)
    print(f'Usuário desconectado com SID: {user}')
    rooms_to_delete = []
    for room, participants in rooms.items():
        if user in participants:
            turn = 1 if participants[1] == user else -1
            chessList = show_chessboard(games[room]['game'].chessboard)
            winner = 'White' if turn == 1 else 'Black'
            socketio.emit('end_game', {'winner': winner, 'chessboard': chessList}, room=room)
            rooms_to_delete.append(room)
    for room in rooms_to_delete:
        del rooms[room]
        del games[room]
        leave_room(room)


if __name__ == '__main__':
    socketio.run(app, debug=True)