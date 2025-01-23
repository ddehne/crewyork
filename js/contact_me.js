$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour

            // Captcha validation
            const captchaFailure = function() {
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-danger').append("<strong>Please provide proof of humanity!</strong>");
                $('#success > .alert-danger').append('</div>');
            }
            const form = document.getElementById('contactForm');
            const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;
            if (!hCaptcha) {
                captchaFailure()
                return
            }
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            const successFunc = function() {
                // Success message
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Your message has been sent. </strong>");
                $('#success > .alert-success')
                    .append('</div>');
        
                //clear all fields
                hcaptcha.reset("captcha-el")
                $('#contactForm').trigger("reset");
            }
        
            const errorFunc = function() {
                // Fail message
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                $('#success > .alert-danger').append('</div>');
                //clear all fields
                hcaptcha.reset("captcha-el")
                $('#contactForm').trigger("reset");
            }
            
            const url = "https://api.web3forms.com/submit";
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            fetch(url, {
            method: "POST",
            body: JSON.stringify({ 
                name: name,
                phone: phone,
                email: email,
                message: message,
                access_key: 'd950d18e-3a7f-42e9-8dce-6575a502c997',
             }),
            headers: myHeaders,
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    successFunc();
                } else {
                    errorFunc();
                }

    
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
