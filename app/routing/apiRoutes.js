var express = require("express");
var router = express.Router()
var path = require("path");

var friends = [{
	routeName: "eneida",
	name: "Eneida",
	img: "http://i.dailymail.co.uk/i/pix/2016/03/18/15/324D202500000578-3498922-image-a-33_1458315465874.jpg",
	scores: [1, 3, 4, 5, 2, 3, 1, 4, 2, 3]
}, {
	routeName: "andrew",
	name: "Andrew",
	img: "https://i.pinimg.com/736x/56/c1/36/56c136c15d62a3d87979cd8df29b1eb8--nerdy.jpg",
	scores: [1, 4, 1, 2, 5, 5, 2, 1, 5, 5]
}, {
	routeName: "willow",
	name: "Willow",
	img: "https://vignette2.wikia.nocookie.net/darkcrystal/images/c/cf/Aughra_photo.jpg/revision/latest?cb=20080528154506",
	scores: [4, 1, 2, 4, 5, 5, 5, 5, 5, 1]
}];

function findSmallestDiff(listOfScores, scores) {

	var smallestDiff = Number.MAX_SAFE_INTEGER
	var smallestDiffPerson

	for (var i = 0; i < listOfScores.length; i++) {
		if (compLogic(listOfScores[i].scores, scores) < smallestDiff) {
			smallestDiff = compLogic(listOfScores[i].scores, scores)
			smallestDiffPerson = listOfScores[i]
		}
	}
	return smallestDiffPerson
}

function compLogic(scores1, scores2) {
	var diff = 0
	for (var i = 0; i < scores1.length; i++) {
		diff += Math.abs(scores1[i] - scores2[i])
	}
	return diff
}

router.get("/friends", function(req, res) {
	return res.json(friends);
});

router.get("/:friends?", function(req, res) {
	var chosen = req.params.friends;

	if (chosen) {


		for (var i = 0; i < friends.length; i++) {
			if (chosen === friends[i].routeName) {
				return res.json(friends[i]);
			}
		}
		return res.json(false);
	}
	return res.json(friends);
});

router.post("/friends", function(req, res) {
	var newFriend = req.body;
	
	newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
	var match = findSmallestDiff(friends, newFriend.scores)
	friends.push(newFriend);
	res.json(match);
});

module.exports = router