(function ($) {
  const checkedAmenities = [];

  $('input[type="checkbox"]').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      checkedAmenities.push(amenityId);
    } else {
      const index = checkedAmenities.indexOf(amenityId);
      if (index !== -1) {
        checkedAmenities.splice(index, 1);
      }
    }

    $('.amenities h4').text(amenityName);
  });
})(window.jQuery);
