export async function getProductData() {
  const singleReviewHTML = ({ rating, text }) => `<div class="space-x-7 flex">
    <div class="flex space-x-1 h-6 rating rating-${rating}">
      <svg>
        <use xlink:href="#star" />
      </svg>
      <svg>
        <use xlink:href="#star" />
      </svg>
      <svg>
        <use xlink:href="#star" />
      </svg>
      <svg>
        <use xlink:href="#star" />
      </svg>
      <svg>
        <use xlink:href="#star" />
      </svg>
    </div>
    <div class="text-lg text-[#858585] font-medium">
      <span class="font-bold text-black"> ${rating} </span>
      , ${text}
    </div>
  </div>`

  const header = ({ avgRating, name }) => `<h1
  class="
    text-heading-1
    font-bold
    text-gray-900
    leading-heading-1
  "
>
  ${name}
</h1>
<div class="flex justify-between">
  <div class="flex space-x-6 items-center">
    <div class="text-heading-1 leading-heading-1">${Math.round((avgRating + Number.EPSILON) * 10) / 10}</div>
    <div class="flex space-x-1 h-6 rating rating-${Math.round(avgRating)}">
      <svg>
        <use xlink:href="#star" />
      </svg>
      <svg>
        <use xlink:href="#star" />
      </svg>
      <svg>
        <use xlink:href="#star" />
      </svg>
      <svg>
        <use xlink:href="#star" />
      </svg>
      <svg>
        <use xlink:href="#star" />
      </svg>
    </div>
  </div>
  <button
    class="
      px-4
      py-3.5
      w-36
      font-bold
      leading-5
      text-secondary
      border border-solid border-[#ccc]
      rounded
      shadow-btn
      modal-open-btn
    "
  >
    Add review
  </button>`

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const result = await (await fetch("http://localhost:4000/product/the-minimalist-entrepreneur", requestOptions)).json()

    const productOverviewHTML = header(result);
    $("#product-overview")?.html(productOverviewHTML)

    const reviewsHTML = result?.reviews?.map(singleReviewHTML).join('\n')
    $("#reviews-list")?.html(reviewsHTML)

  } catch (error) {
    console.log('error', error)
  };
}

export async function createReview(data) {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      "rating": data["star-rating"],
      "review": data["review-text"]
    }),
    redirect: 'follow'
  };
  try {

    const result = await (await fetch("http://localhost:4000/product/the-minimalist-entrepreneur/review", requestOptions)).json()
    if (result) {
      await getProductData()
    }
  } catch (error) {
    console.log(error)
  }
}