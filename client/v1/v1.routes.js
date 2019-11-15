const path = require("path");
const logger = require("../../logger")(path.basename(__filename));

const express = require('express');
const router = express.Router();

const collectionsRouter = require('./collections/collections.routes');

const mntPt = "/v1";

router.get(mntPt, (req, res) => {
  	res.json({
		desc: 'V1 goes here',
		links: [
			req.getHostURL() + req.baseUrl + mntPt + "/collections",
		]
	});
});

router.use(mntPt, collectionsRouter);

router.mntPt = mntPt;


module.exports = router;
