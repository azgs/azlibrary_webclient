"use strict";

const path = require("path");
const logger = require("../logger")(path.basename(__filename));

const express = require('express');
const router = express.Router();

const mntPt = "/client";

//const APIRouter = require('../APIRouter.class');
//const router = new APIRouter("/api", "Top level of azlib API");

const v1Router = require('./v1/v1.routes');


router.get(mntPt, (req, res) => {
  	res.json({
		desc: 'client goes here',
		links: [
			req.getHostURL() + req.baseUrl + mntPt + v1Router.mntPt
		]
	});
});

//router.routes.push(v1Router);
//console.log(router.routes);
router.use(mntPt, v1Router);

router.mntPt = mntPt;


module.exports = router;//._router;
