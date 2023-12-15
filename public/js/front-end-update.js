
          //const updateProduct = document.getElementById("edit-product-form");
          // document.getElementById("edit-product-form").addEventListener('submit', function(e) {
          //           e.preventDefault();
          //           const formData = new FormData(this);
          //           const url = this.action; 
          //           fetch(url, {
          //              _method: 'PUT',
          //              body: formData
          //           })
          //           .then(response => response.json())
          //           .then(data => {
          //               console.log(data);
          //           })
          //           .catch(error => console.error('Error:', error));
          //       });

              
document.getElementById('edit-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/editProduct/{{productId}}', {
        method: 'PUT',
        body: formData
    })
    .then(response => {
        if (response) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log(data);
        // 处理成功后的逻辑
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});
document.getElementById('delete-product').addEventListener('submit', function(e) {
          e.preventDefault();
          const formData = new FormData(this);
          fetch('/editProduct/{{productId}}', {
              method: 'DELETE',
              body: formData
          })
          .then(response => {
              if (response) {
                  return response.json();
              }
              throw new Error('Network response was not ok.');
          })
          .then(data => {
              console.log(data);
              // 处理成功后的逻辑
          })
          .catch(error => {
              console.error('There has been a problem with your fetch operation:', error);
          });
      });
