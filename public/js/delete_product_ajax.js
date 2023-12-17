(function ($) {
          let  deleteReviewForm = $('#delete-review-form');
          errorContainer.hide();
          deleteReviewForm.submit(async (event) => {
                    const currentLink = window.location.href;
                    let requestConfig = {
                        method: 'DELETE',
                        url: currentLink,
                    }
                    await $.ajax(requestConfig).then((responseMessage) => {
                        if (responseMessage.deleteReview) {
                            window.location.href = '/store';
                            return;
                        }
                        errorContainer.empty();
                        errorContainer.append('Delete product fail');
                        errorContainer.show();
                    })
                });

})(window.jQuery);