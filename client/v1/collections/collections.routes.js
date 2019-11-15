const path = require("path");
const logger = require("../../../logger")(path.basename(__filename));

const express = require('express');
const router = express.Router();

const mntPt = "/collections";

const fs = require('fs-extra');


////////////////////////////////////////////////////////////////////////////////////////////////
// GET

router.get(mntPt, (req, res) => {
	logger.debug("get enter");
	//res.json({msg:"GET not implemented"});
	return res.sendFile(__dirname + '/form.html'); //TODO: temporary, for development
});




router.mntPt = mntPt;

module.exports = router;
