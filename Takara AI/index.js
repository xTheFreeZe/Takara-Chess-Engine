import {
	Chessboard,
	COLOR,
	BORDER_TYPE,
	MARKER_TYPE,
	INPUT_EVENT_TYPE,
	SQUARE_SELECT_TYPE,
	PIECE,
} from "./src/cm-chessboard/Chessboard.js"

// import Chess from "./node_modules/chess.js/chess.js"

const log_text = document.getElementById("log_text");
const turns_white_text = document.getElementById("turns_white");
const turns_black_text = document.getElementById("turns_black");
var white_counter = 0;
var black_counter = 0;

turns_white_text.innerHTML = `WMSLC: ${white_counter}`;
turns_black_text.innerHTML = `BMSLC: ${black_counter}`;

const player_colours = [
	COLOR.white,
	COLOR.black
];

const random_player_colours = player_colours[Math.floor(Math.random() * player_colours.length)];

const game = new Chessboard(document.getElementById("chessgame"), {
	position: "start",
	orientation: random_player_colours,
	style: {
		cssClass: "default",
		showCoordinates: true,
		borderType: BORDER_TYPE.frame,
		aspectRatio: 1,
		moveFromMarker: MARKER_TYPE.markerDot,
		moveToMarker: MARKER_TYPE.markerDot
	},
	responsive: true,
	animationDuration: 300,
	sprite: {
		url: "./assets/images/chessboard-sprite-staunty.svg",
		// url: "./assets/images/chessboard-sprite.svg",
		size: 40,
		cache: true
	}
});

game.enableMoveInput((event) => {

	switch (event.type) {

		case INPUT_EVENT_TYPE.moveStart: //start dragging

			return true;

		case INPUT_EVENT_TYPE.moveDone: //put down piece

			console.log('Moved piece:', game.getPiece(event.squareFrom));

			console.log("Player on moved square:", game.getPiece(event.squareTo));

			console.log("Current position:", event.squareTo);

			let SquareMoveFromLetter = event.squareFrom.charAt(0);
			let SquareMoveToLetter = event.squareTo.charAt(0);
			let SquareMoveFromInt = (event.squareFrom).match(/\d+/)[0];
			let SquareMoveToInt = (event.squareTo).match(/\d+/)[0];

			console.log("SquareFrom:", SquareMoveFromLetter);
			console.log("SquareTo:", SquareMoveToLetter);
			console.log("SquareFrom", SquareMoveFromInt);
			console.log("SquareTo", SquareMoveToInt);
			console.log("Difference:", SquareMoveFromInt - SquareMoveToInt);

			if (random_player_colours === COLOR.white) { // if white

				if (game.getPiece(event.squareFrom).includes("p")) { // if piece is pawn

					if (SquareMoveFromInt != 2) { //TODO: Make sure you can only move 2 squares if you are on start, its possible to skip any on the same row rn.

						if (SquareMoveFromInt - SquareMoveToInt != -1) {

							console.log("Illegal pawn movement");
							return false;

						};

					};

					if (SquareMoveFromLetter !== SquareMoveToLetter) { //so you cant move sideways with a pawn with no enemy on that square

						if ((game.getPiece(event.squareTo)) == undefined) {

							console.log("Illegal pawn movement");
							return false;

						} else if (!(game.getPiece(event.squareTo)).includes("b")) {

							console.log("Illegal pawn movement");
							return false;

						};

					};

				};

				if ((game.getPiece(event.squareTo)) == undefined) {

					log_text.innerHTML = `Move accepeted: ${event.squareFrom}-${event.squareTo}`;

					if (game.getPiece(event.squareFrom).includes("wp")) { //set counter to 0 if you move a pawn or +1 if any other piece

						turns_white_text.innerHTML = `WMSLC: ${white_counter = 0}`;

					} else {

						turns_white_text.innerHTML = `WMSLC: ${white_counter += 1}`;

					};

					if (white_counter > 50) { //50 moves rule

						log_text.innerHTML = `Stalemate - 50-move  rule`;
						game.disableMoveInput();

					};

					return true;

				} else if (game.getPiece(event.squareTo) === "wb") { //so you cant beat a white bishop

					return false;

				} else if (game.getPiece(event.squareTo).includes("b")) { //if enemy on square

					if (game.getPiece(event.squareTo) === "bk") {

						log_text.innerHTML = `Checkmate: White won`;
						game.disableMoveInput();
						return true;

					};

					log_text.innerHTML = `Move accepeted: ${event.squareFrom}-${event.squareTo}`;
					turns_white_text.innerHTML = `WMSLC: ${white_counter = 0}`;
					return true;

				} else if ((game.getPiece(event.squareTo)).includes("w")) {

					return false;

				};

			} else if (random_player_colours === COLOR.black) { // same thing with black

				if (game.getPiece(event.squareFrom).includes("p")) {

					let SquareMoveFromLetter = event.squareFrom.charAt(0);
					let SquareMoveToLetter = event.squareTo.charAt(0);
					let SquareMoveFromInt = (event.squareFrom).match(/\d+/)[0];
					let SquareMoveToInt = (event.squareTo).match(/\d+/)[0];

					console.log("SquareFrom:", SquareMoveFromLetter);
					console.log("SquareTo:", SquareMoveToLetter);
					console.log("SquareFrom", SquareMoveFromInt);
					console.log("SquareTo", SquareMoveToInt);

					if (SquareMoveFromInt != 7) { //TODO: Make sure you can only move 2 squares if you are on start, its possible to skip any on the same row rn.

						if (SquareMoveFromInt - SquareMoveToInt != 1) {

							console.log("Illegal pawn movement");
							return false;

						};

					};

					if (SquareMoveFromLetter !== SquareMoveToLetter) {

						if ((game.getPiece(event.squareTo)) == undefined) {

							console.log("Illegal pawn movement");
							return false;

						} else if (!(game.getPiece(event.squareTo)).includes("w")) {

							console.log("Illegal pawn movement");
							return false();

						};

					};

				};

				if ((game.getPiece(event.squareTo)) == undefined) {

					log_text.innerHTML = `Move accepeted: ${event.squareFrom}-${event.squareTo}`;

					if (game.getPiece(event.squareFrom).includes("bp")) {

						turns_black_text.innerHTML = `BMSLC: ${black_counter = 0}`;

					} else {

						turns_black_text.innerHTML = `BMSLC: ${black_counter += 1}`;

					};

					if (black_counter > 5) {

						log_text.innerHTML = `Stalemate - 50-move  rule`;
						game.disableMoveInput();

					};

					return true;

				} else if (game.getPiece(event.squareTo).includes("w")) {

					if (game.getPiece(event.squareTo) === "wk") {

						log_text.innerHTML = `Checkmate: Black won`;
						game.disableMoveInput()
						return true;

					};

					log_text.innerHTML = `Move accepeted: ${event.squareFrom}-${event.squareTo}`;
					return true;

				} else if ((game.getPiece(event.squareTo)).includes("b")) {

					return false;

				};

			};

		case INPUT_EVENT_TYPE.moveCanceled:

			log_text.innerHTML = `Canceled move`;
	};

}, random_player_colours);

// game.enableSquareSelect((event) => {
// 	log_text.innerHTML = `Placed marker on ${event.square}`;
// 	let markerType

// 	if (event.type === SQUARE_SELECT_TYPE.secondary) {

// 		markerType = MARKER_TYPE.circle;

// 	} else {

// 		return;

// 	};


// 	const markersOnSquare = game.getMarkers(event.square, markerType)

// 	if (markersOnSquare.length > 0) {

// 		game.removeMarkers(event.square, markerType)

// 	} else {

// 		game.addMarker(event.square, markerType)

// 	};
// })