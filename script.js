
  // Agency Theme JavaScript
  (function($) {
    "use strict"; // Start of use strict
    
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        if (!$anchor.attr('href')) return;
        if (!$anchor.attr('href').startsWith('#')) return;
        if (!$($anchor.attr('href')).length) return;
        $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top - 50)
          // scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
    
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });
    
    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
      $('.navbar-toggle:visible').click();
    });
    
    // Offset for Main Navigation
    $('#main-nav').affix({
      offset: {
        top: 100
      }
    });
  })(jQuery);

  function klarScript() {
    // Add 'klar-modal-open' CSS class, when modal is opened
    $('.modal').on('show.bs.modal', function (event) {
      var modal = this;
      modal.classList.add('klar-modal-open');
    });
    $('.modal').on('hide.bs.modal', function (event) {
      var modal = this;
      modal.classList.remove('klar-modal-open');
    });
  }
  klarScript();

var contact = {};
contact.init = function () {
  // Contact Form Scripts
  $('#contactForm input,#contactForm textarea').jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      $('#contact button').button('loading');
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $('input#name').val();
      var email = $('input#email').val();
      var phone = $('input#phone').val();
      var message = $('textarea#message').val();
      var firstName = name || ''; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
          firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $.ajax({
        url: location.hostname === 'localhost' ? 'http://localhost:14000/mail/contact-me' : 'https://klar.io/mail/contact-me',
        type: 'POST',
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message,
          notification_email: ''
        },
        cache: false,
        success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-success').append("<strong></strong>");
          $('#success > .alert-success').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
          $('#contact button').button('reset');
        },
        error: function(err) {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-danger').append($('<strong>').text(err.responseJSON.error));
          // $('#success > .alert-danger').append($('<strong>').text('Sorry ' + firstName + ', it seems that the mail server is not responding. Please try again later!'));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
          $('#contact button').button('reset');
        }
      });
    },
    filter: function() {
      return $(this).is(':visible');
    },
  });

  $('a[data-toggle="tab"]').click(function(e) {
      e.preventDefault();
      $(this).tab("show");
  });

  /* When clicking on Full hide fail/success boxes */
  $('#name').focus(function() {
    $('#success').html('');
  });
}

function getContactScripts(file, cb) {
  var script = document.createElement('script');
  script.src = file;
  script.onload = function(e) {
    cb();
  };
  document.getElementsByTagName('body')[0].appendChild(script);
}
setTimeout(function () {
  getContactScripts('https://cdnjs.cloudflare.com/ajax/libs/jqBootstrapValidation/1.3.6/jqBootstrapValidation.min.js', function() {
    contact.init();
  });  
}, 300);
