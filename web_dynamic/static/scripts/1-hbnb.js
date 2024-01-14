(function ($) {
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
})(window.jQuery);
