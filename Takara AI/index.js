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

const player_colours = [
	COLOR.white,
	COLOR.black
];

const random_player_colours = player_colours[Math.floor(Math.random() * player_colours.length)];

const game = new Chessboard(document.getElementById("chessgame"), {
	position: "start", // set as fen, "start" or "empty"
	orientation: random_player_colours, //this would be "random_player_colours" for random colours
	style: {
		cssClass: "default",
		showCoordinates: true, // show ranks and files
		borderType: BORDER_TYPE.frame, // thin: thin border, frame: wide border with coordinates in it, none: no border
		aspectRatio: 1,
		moveFromMarker: MARKER_TYPE.markerDot,
		moveToMarker: MARKER_TYPE.markerDot
	},
	responsive: true,
	animationDuration: 300, // pieces animation duration in milliseconds
	sprite: {
		// url: "./assets/images/chessboard-sprite-staunty.svg",
		url: "./assets/images/chessboard-sprite.svg",
		size: 40,
		cache: true
	}
});

game.enableMoveInput((event) => {

	switch (event.type) {

		case INPUT_EVENT_TYPE.moveStart:

			log_text.innerHTML = `Move captured: ${event.square}`;
			return true;

		case INPUT_EVENT_TYPE.moveDone:

			console.log(game.getPiece(event.squareTo))

			if (random_player_colours === COLOR.white) {

				if ((game.getPiece(event.squareTo)) == undefined) {

					log_text.innerHTML = `Move accepeted: ${event.squareFrom}-${event.squareTo}`;

					return true;

				} else if (game.getPiece(event.squareTo) === "wb") {

					log_text.innerHTML = `Cant beat white as white - bishop`;

					return false;

				} else if (game.getPiece(event.squareTo).includes("b")) {

					if (game.getPiece(event.squareTo) === "bk") {

						log_text.innerHTML = `Checkmate: White won`;
						game.disableMoveInput();
						return true;

					};

					log_text.innerHTML = `Move accepeted: ${event.squareFrom}-${event.squareTo}`;

					return true;

				} else if ((game.getPiece(event.squareTo)).includes("w")) {

					log_text.innerHTML = `Cant beat white as white`;

					return false;

				};

			} else if (random_player_colours === COLOR.black) {

				if ((game.getPiece(event.squareTo)) == undefined) {

					log_text.innerHTML = `Move accepeted: ${event.squareFrom}-${event.squareTo}`;

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

					log_text.innerHTML = `Cant beat black as black`;

					return false;

				};

			}

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