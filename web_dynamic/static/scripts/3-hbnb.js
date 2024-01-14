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

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
        $('.places').empty();

        data.forEach(function (place) {
          const article = $('<article>');

          const titleBox = $('<div>').addClass('title_box');
          const title = $('<h2>').text(place.name);
          const priceByNight = $('<div>').addClass('price_by_night').text('$' + place.price_by_night);
          titleBox.append(title, priceByNight);

          const information = $('<div>').addClass('information');
          const maxGuest = $('<div>').addClass('max_guest').text(place.max_guest);
          const numberRooms = $('<div>').addClass('number_rooms').text(place.number_rooms);
          const numberBathrooms = $('<div>').addClass('number_bathrooms').text(place.number_bathrooms);
          information.append(maxGuest, numberRooms, numberBathrooms);

          const description = $('<div>').add(`<div class="description">${place.description}</div>`);

          article.append(titleBox, information, description);

          $('.places').append(article);
        });
      },
      error: function (xhr, status, error) {
        console.error('Error fetching places:', status, error);
      }
    });
  });
})(window.jQuery);
