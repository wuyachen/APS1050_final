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
	      petTemplate.find('.btn-return').attr("data-id", data[i].id);

        petsRow.append(petTemplate.html());
      }
    });
    return await App.initWeb3();
  },

 
  initWeb3: async function() {

    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access")
      }
    }
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on("click", ".btn-return", App.handleReturn);
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;
    
        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },  


  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;
      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find(".btn-adopt").attr('disabled', true);
	        $('.panel-pet').eq(i).find(".btn-return").removeProp("disabled").addClass("btn-success");
          $('.panel-pet').eq(i).find(".owner-address").html(adopters[i]);
          }		
       }  

      var pets = [];
      for (var i = 1; i <= 16; i++) { 
        pets.push(adoptionInstance.candidates(i));
      }      

      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }

        var voteArea = $("#voteArea");
        voteArea.show();
        var voteResults = $("#voteResults");
        var petSelection = $('#petSelection');

        adoptionInstance.voters(accounts[0]).then(function(voteSuccess) {
          if (voteSuccess) {
            $("#voteSuccess").show();
            $("#voteList").hide();
          } else {
            $("#voteList").show();
          }
        }); 
            
        Promise.all(pets).then(function(values) {

          voteResults.empty();
          petSelection.empty();

          for (var i = 0; i < 16; i++) { 
            var petId = values[i][0];
            var petName = values[i][1];
                  //var breed = values[i][2]
            var count = values[i][2];

            petSelection.append("<option value='" + petId + "' >" + petName + "</option>");

            if (count>0) {
                      //+ breed + "</td><td>" 
              voteResults.append("<tr><td>" + petName + "</td><td>" + count + "</td></tr>");
            }
          }
        }); 
      
      });  
                 
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  hasReturned: function (adopters) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function (instance) {
        adoptionInstance = instance;

        return adoptionInstance.getAdopters.call();
      }).then(function (adopters) {
        for (i = 0; i < adopters.length; i++) {
          if (adopters[i] == "0x0000000000000000000000000000000000000000") {
            $(".panel-pet").eq(i).find(".btn-adopt").removeProp("disabled");
            $(".panel-pet").eq(i).find(".btn-return").attr("disabled", true).removeClass("btn-success");
            $(".panel-pet").eq(i).find(".owner-address").html("");
          }
        }
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },


  handleReturn: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data("id"));

    var returnInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function (instance) {
          returnInstance = instance;
          return returnInstance.returnBack(petId, { from: account });
        }).then(function () {
          return App.hasReturned();
        }).catch(function (err) {
          console.log(err.message);
        });
    });
  },

  handleVote: function () {

    var petId = $('#petSelection').val();
    var voteInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account=accounts[0];

      App.contracts.Adoption.deployed().then(function(instance) {
        voteInstance = instance;
        return voteInstance.vote(petId, { from: account });
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.error(err);
      });
    });
  },



};
  
    /*
     * Replace me...
     */


    handleBreedCheckbox: function(breed) {
      if (document.getElementById(breed).checked) {
        for (i = 0; i < 16; i++) {
          if ($('.col-lg-3').eq(i).find('.pet-breed').text() == breed) {
            $('.col-lg-3').eq(i).show();
          }
        };
      } 
      else{
        for (i = 0; i < 16; i++) {
          if ($('.col-lg-3').eq(i).find('.pet-breed').text() == breed) {
            $('.col-lg-3').eq(i).hide();
          }
          }
      }
      },
  
      handleLocationCheckbox: function(location) {
        if (document.getElementById(location).checked) {
          for (i = 0; i < 16; i++) {
            if ($('.col-lg-3').eq(i).find('.pet-location').text() == location) {
              var breed = $('.col-lg-3').eq(i).find('.pet-breed').text()
              if (document.getElementById(breed).checked){
                $('.col-lg-3').eq(i).show();
              }
            }
          };
        } else {

          for (i = 0; i < 16; i++) {
            if ($('.col-lg-3').eq(i).find('.pet-location').text() == location) {
              $('.col-lg-3').eq(i).hide();
            }
            }
          };
        },

        handleAgeCheckbox: function(age) {
          if (document.getElementById(age).checked) {
            for (i = 0; i < 16; i++) {
              if ($('.col-lg-3').eq(i).find('.pet-age').text() == age) {
                var breed = $('.col-lg-3').eq(i).find('.pet-breed').text()
                if (document.getElementById(breed).checked){
                  $('.col-lg-3').eq(i).show();
                }
              }
            };
          } else {
            for (i = 0; i < 16; i++) {
              if ($('.col-lg-3').eq(i).find('.pet-age').text() == age) {
                $('.col-lg-3').eq(i).hide();
              }
              }
            };
          },
          
  };

$(function() {
  $(window).load(function() {
    App.init();
  });
});
