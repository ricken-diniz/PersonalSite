import { useEffect, useRef, useContext } from 'react';
import './chess.css';
import bK from '../../../../assets/chess_pieces/bK.png';
import bQ from '../../../../assets/chess_pieces/bQ.png';
import bP from '../../../../assets/chess_pieces/bP.png';
import bB from '../../../../assets/chess_pieces/bB.png';
import bN from '../../../../assets/chess_pieces/bN.png';
import bR from '../../../../assets/chess_pieces/bR.png';
import wK from '../../../../assets/chess_pieces/wK.png';
import wQ from '../../../../assets/chess_pieces/wQ.png';
import wP from '../../../../assets/chess_pieces/wP.png';
import wB from '../../../../assets/chess_pieces/wB.png';
import wN from '../../../../assets/chess_pieces/wN.png';
import wR from '../../../../assets/chess_pieces/wR.png';
import { io } from "socket.io-client"
const socket = io('http://10.0.0.112:5001');
import { TriggerCContext } from '../FirstProjectsBlock';

function Chess() {

    let room: string;
    const trigger = useContext(TriggerCContext);

    const piecesDict = {
        'k': bK,
        'q': bQ,
        'p': bP,
        'b': bB,
        'n': bN,
        'r': bR,
        'K': wK,
        'Q': wQ,
        'P': wP,
        'B': wB,
        'N': wN,
        'R': wR
    };

    const chessboardRef = useRef<HTMLDivElement | null>(null);

    const initGame = () => {
        room = 'room' + Math.floor(Math.random() * 1000);
        const selector = document.getElementById(`gameMod`) as HTMLSelectElement | null;
        const gamemode = selector?.value;
        alert(gamemode);
        socket.emit('create_room', { room: room, gamemode: gamemode });
    }

    const show_chessboard = (data: any) => {
        
        let chessList = data['chessboard'];

        for (let i = 1; i <= chessList.length; i++) {
            for (let j = 1; j <= chessList[i - 1].length; j++) {
                const piece = document.getElementById(`${i}${j}`);
                piece?.replaceChildren();

                if (chessList[i - 1][j - 1] !== '.') {
                    const img = document.createElement('img');
                    img.src = piecesDict[chessList[i - 1][j - 1] as keyof typeof piecesDict];
                    img.style.width = '85%';
                    img?.addEventListener('click', () => {see_moves(i-1, j-1)});
                    piece?.appendChild(img);
                }
            
            }
        }

    }
    const show_moves = (data: any) => {
        const moves = data['moves'];
        const x = data['i'];
        const y = data['j'];
        
        document.querySelectorAll('div.dot').forEach(div => div.remove());

        for (let i = 0; i < moves.length; i++) {
            for (let j = 0; j < moves[i].length; j++) {
                
                if (moves[i][j] === 1 || moves[i][j] === 4 || moves[i][j] === 3) {
                    const square = document.getElementById(`${i+1}${j+1}`);
                    const dot = document.createElement('div');
                    dot.className = 'dot';
                    square?.appendChild(dot);
                    dot?.addEventListener('click', () => {
                        send_move(`${x}${y}${i}${j}`);
                    });
                }

            }
        }
    }
    const showRoom = (room: string) => {

            const div = document.getElementById(`game-settings`);
            const roomh4 = document.createElement('h4');
            const turnIndicator = document.createElement('h5');
            turnIndicator.innerText = `Waiting for opponent to join...`;
            turnIndicator.id = 'turn-indicator';
            roomh4.id = 'room-id';
            roomh4.innerText = `Room ID: ${room}`;
            const initGame = document.getElementById(`initGame`);
            const enterGame = document.getElementById(`enterGame`);
            const gameMod = document.getElementById(`gameMod`);
            gameMod?.style.setProperty('display', 'none');
            initGame?.style.setProperty('display', 'none');
            enterGame?.style.setProperty('display', 'none');
            div?.appendChild(roomh4);
            div?.appendChild(turnIndicator);

    }

    const see_moves = (x: number, y: number) => {
        socket.emit('see_moves', { room: room, position: [x, y] });
    }
    const send_move = (move: string) => {
        socket.emit('send_move', { room: room, move: move });
    }

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        socket.on('error', (data) => {
            console.log(data['message']);
        });
        socket.on('room_created', (data) => {
            console.log(data['message']);
            showRoom(data['room']);
            show_chessboard(data);
        });
        socket.on('received_move', (data) => {
            const turnIndicator = document.getElementById('turn-indicator');
            let turn: string;
            if (data['turn'] === -1) {turn = 'White';} else {turn = 'Black';}
            if (turnIndicator != null){
                turnIndicator.innerText = `Current Turn: ${turn}`;
            }
            
            show_chessboard(data);
        });
        socket.on('user_joined', (data) => {
            console.log(data['message']);
            showRoom(data['room']);
            show_chessboard(data);
        });
        socket.on('possible_moves', (data) => {
            show_moves(data);
        });
        socket.on('start_game', (data) => {
            let turn: string;
            if (data['turn'] === -1) {turn = 'White';} else {turn = 'Black';}
            const turnIndicator = document.getElementById(`turn-indicator`);
            if (turnIndicator != null){
                turnIndicator.innerText = `Current Turn: ${turn}`;
            }
            const room = document.getElementById(`room-id`);
            if (room != null){
                room.style.setProperty('display', 'none');
            }
        });
        socket.on('end_game', (data) => {
            show_chessboard(data);
            const turnIndicator = document.getElementById('turn-indicator');
            if (turnIndicator != null){
                turnIndicator.innerText = `${data['winner']} wins!`;
            }
            const chessboard = document.getElementById('chessboard');
            const overlay = document.createElement('div');
            overlay.id = 'overlay';
            const message = document.createElement('h4');
            const reset = document.createElement('button');
            message.id = 'endgame-message';
            message.innerText = `${data['winner']} wins!`;
            reset.innerText = 'Play Again';
            reset.onclick = () => {
                trigger();
            };
            overlay.appendChild(message);
            overlay.appendChild(reset);
            chessboard?.appendChild(overlay);
        });


        return () => {
            socket.off('error');
            socket.off('room_created');
            socket.off('received_move');
            socket.off('user_joined');
            socket.off('possible_moves');
            socket.off('start_game');
            socket.off('end_game');
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        // Initialize chessboard or any other setup logic here
        const chessboard = chessboardRef.current;
        if (chessboard && chessboard.children.length === 0) {
            let controller: number = 1;
            for (let i = 1; i <= 8; i++) {
                for (let j = 1; j <= 8; j++) {
                    const square = document.createElement('div');
                    square.className = 'square';
                    if (j % 2 === controller) { square.className += ' white'; } else { square.className += ' black'; }
                    square.id = `${i}${j}`;
                    chessboard.appendChild(square);
                }
                if (controller === 1) { controller = 0; } else { controller = 1; }
            }
        }
    }, []);

    return (
        <>
        <h5>Chess Game</h5>
        <div id='game-settings'>
            <select name="Game Mod" id="gameMod">
                <option value="normal">Normal Chess</option>
                <option value="atomic">Atomic Chess</option>
                <option value="crazy">Crazy Chess</option>
                <option value="duck">Duck Chess</option>
            </select>
            <button id='initGame' onClick={ initGame }>Start Game</button>
            <button id='enterGame' onClick={ () => {
                room = prompt("Enter Room ID") as string;
                if (room === null || room === '') {
                    return;
                }
                socket.emit('join_room', { room: room });
            } }>Join Game</button>
        </div>
        <div className='chessboard-container'>
            <div id='chessboard' ref={chessboardRef}></div>
        </div>
        </>
    )
}

export default Chess;