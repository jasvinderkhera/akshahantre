$('.testimonial-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows:true,
    autoplay:true,
    autoplaySpeed:4000,
  });



// Form
$(document).on("submit", ".contact-form", function (e) {
  e.preventDefault();

  const $form = $(this);

  // Get form values
  const full_name = $form.find("#full_name").val().trim();
  const phone = $form.find("#phone").val().trim();
  const email = $form.find("#email").val().trim();
  const subject = $form.find("#subject").val().trim();
  const message = $form.find("#message").val().trim();

  // Basic validation
  if (!full_name || !phone || !email || !message) {
    alert("Please fill all required fields.");
    return;
  }

  // Send form data via AJAX
  $.ajax({
    url: "send.php",
    method: "POST",
    data: {
      full_name,
      phone,
      email,
      subject,
      message,
    },
    success: function (result) {
      let res = typeof result === "string" ? JSON.parse(result) : result;

      if (res.type === true) {
        const $alert = $form.find(".successAlert");
        if ($alert.length) {
          $alert.fadeIn();
          setTimeout(() => $alert.fadeOut(), 5000);
        } else {
          alert("Your message has been sent successfully!");
        }

        $form[0].reset();
      } else {
        alert(res.error || "An unknown error occurred.");
      }
    },
    error: function () {
      alert("An error occurred while sending your message. Please try again.");
    },
  });
});






$(document).ready(function () {
  setTimeout(function () {
    $("#contactModal").modal("show");
  }, 5000);
});
