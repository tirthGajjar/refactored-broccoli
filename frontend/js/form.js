import { createReview } from './fetcher'
import { closeModal } from './modal';

const VALIDATION_TYPES = {
    NOT_EMPTY: "NOT_EMPTY",
    REQUIRED: "REQUIRED"
}

function setUpForm() {
    const $form = $("#add-rating-modal");
    const fields = [{
        name: "star-rating",
        selector: "input[name=star-rating]",
        type: "radio",
        validations: [VALIDATION_TYPES.NOT_EMPTY, VALIDATION_TYPES.REQUIRED],
        errorSelector: "#star-rating-error"
    }, {
        name: "review-text",
        selector: "textarea[name=review-text]",
        type: "textarea",
        validations: [VALIDATION_TYPES.NOT_EMPTY, VALIDATION_TYPES.REQUIRED],
        errorSelector: "#review-text-error"
    }]

    formBuilder($form, fields, async (data) => {
        await createReview(data)
        closeModal()
    })
}


function formBuilder($form, fields, onSubmit) {
    const isValid = {}
    const values = {}
    const $submitBtn = $form.find('[type="submit"]');
    $submitBtn?.prop('disabled', true);

    fields.map(({ name }) => isValid[name] = false)

    $form.on('submit', e => {
        e.preventDefault()
        fields.forEach(validateFields)
        onSubmit(values)
    })

    fields.forEach((field) => {
        const input = $(field.selector)

        input.on('input', event => {
            validateFields(field)
        })
    })

    function validateFields(field) {
        const { selector, name, validations } = field;

        const input = field.type === "radio" ? $(selector + ":checked") : $(selector);


        if (validations.includes(VALIDATION_TYPES.NOT_EMPTY)) {
            // Check presence of values
            if (input.val().trim() === "") {
                setStatus(field, `${name} cannot be blank`, "error")
            } else {
                values[name] = input.val()
                setStatus(field, null, "success")
            }
        }
    }

    function setStatus(field, message, status) {
        const { name, errorSelector } = field;
        const errorMessage = $(errorSelector)

        if (status === "success") {
            isValid[name] = true;
            if (errorMessage) {
                errorMessage.innerText = ""
                errorMessage.removeClass("hidden")
            }
            if (Object.values(isValid).every(val => val)) {
                $submitBtn?.prop('disabled', false);
            }
        }

        if (status === "error") {
            isValid[name] = false;
            if (errorMessage) {
                errorMessage.innerText = message
                errorMessage.addClass("hidden")
            }
            $submitBtn?.prop('disabled', true);
        }
    }
}


setUpForm()