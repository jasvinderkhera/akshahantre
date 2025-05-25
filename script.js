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

  // Get form values relative to the submitted form
  const full_name = $form.find("#full_name").val().trim();
  const phone = $form.find("#phone").val().trim();
  const email = $form.find("#email").val().trim();
  const trip_type = $form.find("#trip_type").val();
  const from_location = $form.find("#from_location").val().trim();
  const to_location = $form.find("#to_location").val().trim();
  const from_date_val = $form.find("#from_date").val();
  const to_date_val = $form.find("#to_date").val();
  const message = $form.find("#message").val().trim();

  // Date validations
  const from_date = new Date(from_date_val);
  const to_date = new Date(to_date_val);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (
    !full_name ||
    !phone ||
    !email ||
    !trip_type ||
    !from_location ||
    !to_location ||
    !from_date_val ||
    !to_date_val ||
    !message
  ) {
    alert("Please fill all required fields.");
    return;
  }

  if (from_date < today) {
    alert("From Date cannot be earlier than today.");
    return;
  }

  if (to_date < from_date) {
    alert("To Date cannot be earlier than From Date.");
    return;
  }

  // Send form data via AJAX to send.php
  $.ajax({
    url: "send.php",
    method: "POST",
    data: {
      full_name,
      phone,
      email,
      trip_type,
      from_location,
      to_location,
      from_date: from_date_val,
      to_date: to_date_val,
      message,
    },
    success: function (result) {
      // Try to parse JSON if result is string
      let res = typeof result === "string" ? JSON.parse(result) : result;

      if (res.type === true) {
        // Show success alert inside the form
        const $alert = $form.find(".successAlert");
        if ($alert.length) {
          $alert.fadeIn();

          setTimeout(() => {
            $alert.fadeOut();
          }, 5000);
        } else {
          // fallback alert
          alert("Your message has been sent successfully!");
        }

        // Reset the submitted form only
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
