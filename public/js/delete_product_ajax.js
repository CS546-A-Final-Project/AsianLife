(function ($) {
    let deleteProductForm = $('#delete-product-form'),
        errorContainer = $('#errorContainer');

    errorContainer.hide();
    deleteProductForm.submit(async (event) => {
        event.preventDefault()
        const currentLink = window.location.href;
        let requestConfig = {
            method: 'DELETE',
            url: currentLink,
        }
        await $.ajax(requestConfig).then((responseMessage) => {
            if (responseMessage.deleteReview) {
                console.log(responseMessage.deleteReview);
                window.location.href = `/store/${responseMessage.store_id}`;
                return;
            }
            errorContainer.empty();
            errorContainer.append('Delete product fail');
            errorContainer.show();
        })
    });

})(window.jQuery);