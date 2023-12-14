(function () {
    const registerStaticForm = document.getElementById('registration-form');

    if (registerStaticForm) {
        const userNameInput = document.getElementById('userName')
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const emailAddressInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const roleInput = document.getElementById('role');
        const errorContainer = document.getElementById('errorContainer');

        registerStaticForm.addEventListener('submit', (event) => {
            let errors = [];
            errorContainer.innerHTML = '';

            const trimmedUserName = userNameInput.value.trim();
            const trimmedFirstName = firstNameInput.value.trim();
            const trimmedLastName = lastNameInput.value.trim();
            const trimmedEmail = emailAddressInput.value.trim();
            const trimmedPassword = passwordInput.value.trim();
            const trimmedConfirmPassword = confirmPasswordInput.value.trim();

            userNameInput.value = trimmedUserName;
            firstNameInput.value = trimmedFirstName;
            lastNameInput.value = trimmedLastName;
            emailAddressInput.value = trimmedEmail;
            passwordInput.value = trimmedPassword;
            confirmPasswordInput.value = trimmedConfirmPassword;

            if (!/^[a-zA-Z]+$/.test(trimmedUserName)) errors.push("User name must only contain letters");
            if (trimmedUserName.length < 2 || trimmedUserName.length > 25) errors.push("User name should have 2 - 25 characters");

            if (!/^[a-zA-Z]+$/.test(trimmedFirstName)) errors.push("First name must only contain letters");
            if (trimmedFirstName.length < 2 || trimmedFirstName.length > 25) errors.push("First name should have 2 - 25 characters");

            if (!/^[a-zA-Z]+$/.test(trimmedLastName)) errors.push("Last name must only contain letters");
            if (trimmedLastName.length < 2 || trimmedLastName.length > 25) errors.push("Last name should have 2 - 25 characters");

            if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
                errors.push("Email address should be a valid email address format. example@example.com");
            }

            if (trimmedPassword.includes(' ')) {
                errors.push("Password should not contain any space");
            } else {
                const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,}$/;
                if (!passwordRegex.test(trimmedPassword)) {
                    errors.push("Password must have at least 8 characters, with at least 1 uppercase letter, 1 number, and 1 symbol");
                }
            }

            if (trimmedPassword !== trimmedConfirmPassword) {
                errors.push("Password is not the same");
            }

            if (roleInput.value !== 'admin' && roleInput.value !== 'user') {
                errors.push("The role should be admin or user");
            }

            if (errors.length > 0) {
                event.preventDefault();
                for (let i = 0; i < errors.length; i++) {
                    const addLi = document.createElement('li');
                    addLi.textContent = errors[i];
                    errorContainer.appendChild(addLi);
                }
            }
        });
    }

    const loginStaticForm = document.getElementById('login-form');
    if (loginStaticForm) {
        const emailAddressInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorContainer = document.getElementById('errorContainer');

        loginStaticForm.addEventListener('submit', (event) => {
            let errors = [];
            errorContainer.innerHTML = '';

            const trimmedEmail = emailAddressInput.value.trim();
            const trimmedPassword = passwordInput.value.trim();

            emailAddressInput.value = trimmedEmail;
            passwordInput.value = trimmedPassword;

            if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
                errors.push("Email address should be a valid email address format. example@example.com");
            }

            if (trimmedPassword.includes(' ')) {
                errors.push("Password should not contain any space");
            } else {
                const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,}$/;
                if (!passwordRegex.test(trimmedPassword)) {
                    errors.push("Password must have at least 8 characters, with at least 1 uppercase letter, 1 number, and 1 symbol");
                }
            }

            if (errors.length > 0) {
                event.preventDefault();
                for (let i = 0; i < errors.length; i++) {
                    const addLi = document.createElement('li');
                    addLi.textContent = errors[i];
                    errorContainer.appendChild(addLi);
                }
            }
        });
    }
    const profileStaticForm = document.getElementById('profile-form');

    if (profileStaticForm) {
        const userNameInput = document.getElementById('userName')
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const emailAddressInput = document.getElementById('email');
        const errorContainer = document.getElementById('errorContainer');

        profileStaticForm.addEventListener('submit', (event) => {
            let errors = [];
            errorContainer.innerHTML = '';

            const trimmedUserName = userNameInput.value.trim();
            const trimmedFirstName = firstNameInput.value.trim();
            const trimmedLastName = lastNameInput.value.trim();
            const trimmedEmail = emailAddressInput.value.trim();

            userNameInput.value = trimmedUserName;
            firstNameInput.value = trimmedFirstName;
            lastNameInput.value = trimmedLastName;
            emailAddressInput.value = trimmedEmail;

            if (!/^[a-zA-Z]+$/.test(trimmedUserName)) errors.push("User name must only contain letters");
            if (trimmedUserName.length < 2 || trimmedUserName.length > 25) errors.push("User name should have 2 - 25 characters");

            if (!/^[a-zA-Z]+$/.test(trimmedFirstName)) errors.push("First name must only contain letters");
            if (trimmedFirstName.length < 2 || trimmedFirstName.length > 25) errors.push("First name should have 2 - 25 characters");

            if (!/^[a-zA-Z]+$/.test(trimmedLastName)) errors.push("Last name must only contain letters");
            if (trimmedLastName.length < 2 || trimmedLastName.length > 25) errors.push("Last name should have 2 - 25 characters");

            if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
                errors.push("Email address should be a valid email address format. example@example.com");
            }

            if (errors.length > 0) {
                event.preventDefault();
                for (let i = 0; i < errors.length; i++) {
                    const addLi = document.createElement('li');
                    addLi.textContent = errors[i];
                    errorContainer.appendChild(addLi);
                }
            }
        });
    }

    const passwordStaticForm = document.getElementById('password-change-form');

    if (passwordStaticForm) {
        const originalPasswordInput = document.getElementById('originalPassword');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        passwordStaticForm.addEventListener('submit', (event) => {
            let errors = [];
            errorContainer.innerHTML = '';

            const originalPassword = originalPasswordInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            originalPasswordInput.value = originalPassword;
            passwordInput.value = password;
            confirmPasswordInput.value = confirmPassword;

            if (originalPassword.includes(' ')) {
                errors.push("Original password entered is wrong");
            } else {
                const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,}$/;
                if (!passwordRegex.test(originalPassword)) {
                    errors.push("Original password entered is wrong");
                }
            }

            if (password.includes(' ')) {
                errors.push("Password should not contain any space");
            } else {
                const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,}$/;
                if (!passwordRegex.test(password)) {
                    errors.push("Password must have at least 8 characters, with at least 1 uppercase letter, 1 number, and 1 symbol");
                }
            }
            if (password === originalPassword) {
                errors.push("New password should not be same as the old one")
            }
            if (password !== confirmPassword) {
                errors.push("Password doesn't match");
            }

            if (errors.length > 0) {
                event.preventDefault();
                for (let i = 0; i < errors.length; i++) {
                    const addLi = document.createElement('li');
                    addLi.textContent = errors[i];
                    errorContainer.appendChild(addLi);
                }
            }
        });
    }

    const storecommentStaticForm = document.getElementById('storecomment-form');
    if (storecommentStaticForm) {
        const commentInput = document.getElementById("commentInput");
        storecommentStaticForm.addEventListener('submit', (event) => {
            let errors = [];
            errorContainer.innerHTML = '';

            const comment = commentInput.value.trim();
            if (!comment) errors.push( `You must provide a comment`);
            if (typeof comment !== "string") errors.push( `Error:comment must be a string`);
            if (comment.length === 0){
                errors.push( `comment cannot be an empty string or just spaces`);
            }

            if (errors.length > 0) {
                event.preventDefault();
                for (let i = 0; i < errors.length; i++) {
                    const addLi = document.createElement('li');
                    addLi.textContent = errors[i];
                    errorContainer.appendChild(addLi);
                }
            }
        })
    }//addComment Page；

    const commentdetailStaticForm = document.getElementById('commentdetail-form');
    if (commentdetailStaticForm) {
        const commentInput = document.getElementById("answerInput");
        commentdetailStaticForm.addEventListener('submit', (event) => {
            let errors = [];
            errorContainer.innerHTML = '';

            const answer = answerInput.value.trim();
            if (!answer) throw `You must provide a answer`;
            if (typeof answer !== "string") throw `Error:answer must be a string`;
            string = string.trim();
            if (string.length === 0) throw `answer cannot be an empty string or just spaces`;
            errors.push(e)
        })
    }
})();
