import { editOffer, getOfferById} from "../api/offers.js";
import { html } from "../lib.js";


const editTemplate = (offer,onSubmit) => html` <section id="edit">
<div class="form">
  <h2>Edit Offer</h2>
  <form @submit=${onSubmit} class="edit-form">
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
      value=${offer.title}
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
      value=${offer.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
      value=${offer.category}
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
      
    >${offer.description}</textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
      
    >${offer.requirements}</textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
      value=${offer.salary}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function editView(ctx) {
    const offer = await getOfferById(ctx.params.id);

	ctx.render(editTemplate(offer,onSubmit));
    
	async function onSubmit(event) {
		event.preventDefault();

        
		const fromData = new FormData(event.target);

		const offer = {
			title: fromData.get("title").trim(),
            imageUrl:fromData.get("imageUrl").trim(),
            category:fromData.get("category").trim(),
			description: fromData.get("description").trim(),
            requirements:fromData.get("requirements").trim(),
			salary: fromData.get("salary").trim(),
		};

		if (offer.title == "" || offer.imageUrl == "" || offer.category == "" || offer.description == "" || offer.requirements == "" || offer.salary == "") {
			return alert("All fields are required!");
		}

		await editOffer(ctx.params.id,offer);
		event.target.reset();
		ctx.page.redirect("/dashboard");
	}


}
