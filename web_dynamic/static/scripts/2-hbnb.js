(function ($) {
  $(document).ready(function () {
    const checkedAmenities = [];

    $('input[type="checkbox"]').on('change', function () {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');

      if ($(this).prop('checked')) {
        checkedAmenities.push({ id: amenityId, name: amenityName });
      } else {
        const index = checkedAmenities.findIndex(amenity => amenity.id === amenityId);
        if (index !== -1) {
          checkedAmenities.splice(index, 1);
        }
      }

      const selectedNames = checkedAmenities.map(amenity => amenity.name).join(', ');
      $('.amenities h4').text(selectedNames);
    });

    const apiStatus = $('#api-status');

    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function (response) {
        const status = response.status;

        if (status === 'OK') {
          apiStatus.addClass('available');
        } else {
          apiStatus.removeClass('available');
        }
      },
      error: function (xhr, status, error) {
        console.error('AJAX request failed:', status, error);
      }
    });
  });
})(window.jQuery);
