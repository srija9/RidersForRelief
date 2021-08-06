const requesters = require("../models/requesters");
const request = require("../models/request");
const { sendError, sendResponse } = require("./common");

async function getRequesterProfile(phoneNumber) {
	return new Promise((resolve, reject) => {

		requesters.findOne({ phoneNumber: phoneNumber }, { phoneNumber: 1, name: 1, defaultAddress: 1, yearOfBirth: 1 })
			.then((temp) => {
				const doc = temp.toObject();
				if (doc.defaultAddress == undefined) {
					doc.defaultAddress = {
						address: null,
						city: null,
						area: null
					};
				}
				resolve(sendResponse(doc));
			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Error"));
			})
	})
}

async function updateRequesterProfile(phoneNumber, newDetails) {
	return new Promise((resolve, reject) => {

		requesters.findOneAndUpdate({ phoneNumber: phoneNumber }, { $set: { name: newDetails.name, yearOfBirth: newDetails.yearOfBirth, defaultAddress: newDetails.defaultAddress } }, { new: true }, function (err, doc) {
			if (err) {
				resolve(sendError("Unable to retrieve rider data, Internal Server Error"));
				console.error(err);
			}
			else {
				resolve(sendResponse("Requester Profile Update successful"));
			}
		})
	})
}

async function confirmRequest(phone, requestID) {
	return new Promise((resolve, reject) => {

		request.findOne({ requestNumber: requestID })
			.populate('requesterID')
			.then(doc => {
				if (doc == null) {
					resolve(sendError("No such request found"));
				}
				else {
					if (phone != doc.requesterID.phoneNumber)
						resolve(sendError("You are unauthorized to access this request"));
					//request is made by this person only.
					//Now check if the status is "Rider Confirmed or not."
					if (doc.requestStatus != "RIDER CONFIRMED")
						resolve(sendError("Cannot confirm this request, status is not RIDER CONFIRMED"));
					else {
						doc.requestStatus = "DELIVERED";
						rider.findOne({ _id : doc.riderID})
						 .then(result => {
							 result.numberOfDeliveriesCompleted = result.numberOfDeliveriesCompleted + 1;
							 result.save();
						 })
						 .catch(error => {
			 				console.log(error);
			 				resolve(sendError("Internal Server Error"));
			 			})
					}
					return doc.save();
				}
			})
			.then(() => {
				resolve(sendResponse("Confirm Successful"));
			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Error"));
			})
	});
}
async function cancelRequest(phone, requestID) {
	return new Promise((resolve, reject) => {

		request.findOne({ requestNumber: requestID })
			.populate('requesterID')
			.then(doc => {
				if (doc == null) {
					resolve(sendError("No such request found!"));
				}
				else {
					if (phone != doc.requesterID.phoneNumber)
						resolve(sendError("You are unauthorized to access this request"));
					//request is made by this person only.
					//Now check if the status is "PENDING"
					if (doc.requestStatus != "PENDING")
						resolve(sendError("Cannot cancel this request, status is not PENDING"));

					else
						doc.requestStatus = "CANCELLED";
					return doc.save();
				}
			})
			.then(() => {
				resolve(sendResponse("Cancel Successful"));
			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Response"));
			})
	})
}

async function fetchMyRequests(phoneNumber) {
	return new Promise((resolve, reject) => {

		requesters.findOne({ phoneNumber: phoneNumber })
			.then(doc => {
				if (!doc)
					resolve(sendError("Invalid User"));
				else
					return request.find({ requesterID: doc._id });
			})
			.then(docs => {
				resolve(sendResponse(docs));
			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Error"));
			})
	})
}


module.exports = {
	fetchMyRequests,
	getRequesterProfile,
	updateRequesterProfile,
	confirmRequest,
	cancelRequest
};
