
  $('.testimonial-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows:true,
    autoplay:true,
    autoplaySpeed:4000,
  });


$("#contactForm").submit(function(e){
    e.preventDefault();

    const full_name = $("#full_name").val();
    const phone = $("#phone").val();
    const email = $("#email").val();
    const trip_type = $("#trip_type").val();
    const from_location = $("#from_location").val();
    const to_location = $("#to_location").val();
    const from_date_val = $("#from_date").val();
    const to_date_val = $("#to_date").val();
    const message = $("#message").val();

    const from_date = new Date(from_date_val);
    const to_date = new Date(to_date_val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validate dates
    if (from_date < today) {
        alert("From Date cannot be earlier than today.");
        return;
    }

    if (to_date < from_date) {
        alert("To Date cannot be earlier than From Date.");
        return;
    }

    $.ajax({
        url: 'send.php',
        method: 'POST',
        data: {
            full_name, phone, email, trip_type, from_location, to_location, from_date: from_date_val, to_date: to_date_val, message
        },
        success: function(result) {
            console.log(result);
            result = JSON.parse(result);
            if (result.type == true) {
                $('.dialog').show();
                $('.dialog h1').html(result.msg);
            } else {
                alert(result.error || "An unknown error occurred.");
            }
        }
    });
});

$(document).ready(function () {
  setTimeout(function () {
    $("#contactModal").modal("show");
  }, 5000);
});
