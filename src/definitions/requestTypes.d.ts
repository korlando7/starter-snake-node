export interface Snake {
	id: string;
	name: string;
	health: number;
	body: Point[];
	head: Point;
	length: number;
	shout: string;
	squad: string;
}

export interface Board {
	height: number;
	width: number;
	food: Point[];
	hazards: Point[];
	snakes: Snake[];
}

export interface Point {
	x: number;
	y: number;
}

export interface Game {
	id: string;
	timeout: number;
}

export type Move = 'up' | 'right' | 'left' | 'down'

export interface Directions {
	[direction: string]: Point
}

export interface BattleSnakeRequest {
	game: Game;
	turn: number;
	board: Board;
	you: Snake;
}

export interface BattleSnakeResponse {
	move: Move;
	shout?: string;
}