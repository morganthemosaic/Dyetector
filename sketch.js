const dots = [];
const numberOfRounds = 10;
let round = 1;
let score = 0;

function setup() {
	createCanvas(displayWidth, displayHeight);

	for (let i = 0; i < 3; i++) {
		const x = (displayWidth * (i + 1)) / 4;
		const y = displayHeight / 2;
		const diameter = displayWidth * 0.2;

		dots[i] = new Dot(x, y, diameter);
	}

	colorCircles();
}

function draw() {
	background(220);

	for (const dot of dots) {
		dot.draw();
	}

	textSize(64);
	fill(0);
	text(`Round: ${round}`, displayWidth * 0.025, displayWidth * 0.05);

	textSize(64);
	fill(0);
	text(score, displayWidth * 0.925, displayWidth * 0.05);
}

function colorCircles() {
	// Create random RGB color
	const r = random(255);
	const g = random(255);
	const b = random(255);

	/**
	 * Each round technically gets more difficult
	 * Because the range of possible values is reduced
	 */
	const roundVariance = 255 - (255 / numberOfRounds) * (round - 1);

	// Each round one dot is a different shade that the other two
	let differentDotIndex = Math.floor(random(dots.length));
	dots[differentDotIndex].setIsDifferent(true);

	// Represents which RGB value (so either r, g, or b) to adjust
	let differentValue = Math.floor(random(3));

	for (let i = 0; i < dots.length; i++) {
		if (i === differentDotIndex) {
			/**
			 * For the outlier dot,
			 * one of the RGB values is changed
			 * depending on the value of differentValue
			 */
			switch (differentValue) {
				case 0:
					const redRange = getRange(r, roundVariance);
					const randomR = random(redRange[0], redRange[1] + 1);
					dots[i].setColor(randomR, g, b);

					break;
				case 1:
					const greenRange = getRange(g, roundVariance);
					const randomG = random(greenRange[0], greenRange[1] + 1);
					dots[i].setColor(r, randomG, b);

					break;
				case 2:
					const blueRange = getRange(b, roundVariance);
					const randomB = random(blueRange[0], blueRange[1]);
					dots[i].setColor(r, g, randomB);

					break;
			}
		} else {
			dots[i].setColor(r, g, b);
		}
	}
}

function getRange(rgbValue, roundVariance) {
	const range = [];

	if (rgbValue - roundVariance < 0) {
		range[0] = 0;
	} else {
		range[0] = rgbValue - roundVariance;
	}

	if (rgbValue + roundVariance > 255) {
		range[1] = 255;
	} else {
		range[1] = rgbValue + roundVariance;
	}

	return range;
}

function mousePressed() {
	if (round < 10) {
		for (let i = 0; i < dots.length; i++) {
			const distanceFromRadius = Math.sqrt(
				(mouseX - dots[i].getX()) ** 2 + (mouseY - dots[i].getY()) ** 2
			);
			if (
				distanceFromRadius <= dots[i].getRadius() &&
				dots[i].getIsDifferent()
			) {
				score += 10;
			}
		}

		round++;
		colorCircles();
	}
}
