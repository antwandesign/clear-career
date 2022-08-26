import { html } from "../lib.js";
import { getUserData } from "../util.js";
import { getOfferById,deleteOffer } from "../api/offers.js";
import { getAllApplications,createApplication,getMyApplication } from "../api/applications.js";


const offerTemplate = (offer,isOwner,isAuth, onDelete ,applications,onApply) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span
                  >${offer.description}</span
                >
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >${offer.requirements}</span
                >
              </div>
            </div>
            <p>Applications: <strong id="applications">${applications}</strong></p>
            
            <div id="action-buttons">
            ${isOwner
				? html` <a href=${"/offer/edit/"+offer._id} id="edit-btn">Edit</a>
              <a @click=${onDelete} href="#" id="delete-btn">Delete</a>`
				: ""}
            
              

              <!--Bonus - Only for logged-in users ( not authors )-->
              ${isAuth && !isOwner ? html`<a @click=${onApply} href="" id="apply-btn">Apply</a>` : null}
            </div>
          </div>
        </section>
`;


export async function offerView(ctx) {
    
  const offer = await getOfferById(ctx.params.id)
  const userData = getUserData()


  const applications = await getAllApplications(ctx.params.id)
  const myApplications = await getMyApplication(ctx.params.id,userData?.id)
  

  const isOwner = offer._ownerId == userData?.id
  const isAuth = userData?.id

		ctx.render(offerTemplate(offer,isOwner,isAuth,onDelete,applications,onApply));

    async function onDelete(e) {
    e.preventDefault()
		const choice = confirm("Are you sure you want to delete this meme?");

		if (choice) {
			await deleteOffer(ctx.params.id);
			ctx.page.redirect("/dashboard");
		}
    
	}
  async function onApply(e){
    e.preventDefault()

    const count = document.querySelector('#applications')
    const value = count.innerText


    count.innerHTML = Number(value)+1

    e.target.style.display = "none"
    const id = ctx.params.id
    await createApplication({id})
  }
}

