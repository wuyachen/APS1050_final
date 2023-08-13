App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    /*
     * Replace me...
     */

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

    

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  },
  
  handleBreedCheckbox: function(breed) {
    var age = document.getElementById('ageSlider').value;

    if (document.getElementById(breed).checked) {
      for (i = 0; i < 16; i++) {
        if ($('.col-lg-3').eq(i).find('.pet-breed').text() == breed) {
          var location = $('.col-lg-3').eq(i).find('.pet-location').text()
          if (document.getElementById(location).checked){
            $('.col-lg-3').eq(i).show();
          }
        }
      };
      if (age !== '0'){
        App.handleSlider(age);
      }
    } else {
      if (age !== '0'){
        App.handleSlider(age);
      }
      for (i = 0; i < 16; i++) {
        if ($('.col-lg-3').eq(i).find('.pet-breed').text() == breed) {
          $('.col-lg-3').eq(i).hide();
        }
        }
      };

      App.markAdopted();
    },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

