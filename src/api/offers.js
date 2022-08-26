import { del, get, post, put } from "./api.js";

export async function getAllOffers() {
	return get("/data/offers?sortBy=_createdOn%20desc");
}

export async function getOfferById(id) {
	return get("/data/offers/" + id);
}

export async function getMemeByUser(userId) {
	return get(
		`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
	);
}

export async function createOffer(offer) {
	return post("/data/offers", offer);
}

export async function deleteOffer(id) {
	return del("/data/offers/" + id);
}

export async function editOffer(id, offer) {
	return put("/data/offers/" + id, offer);
}
