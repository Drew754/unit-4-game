$(document).ready(function() {
    playGame();
});

var playerCharacter;
var defender;
var playerCharacterHealth;
var yourCharacterExperience = 0;
var yourCharacterAttack;
var defenderHealth;
var defenderAttack;

var kyleKatarn = {
    health: 80,
    attack: 80,
    counterAttack: 40,
    image: "assets/images/Katarn_Carlisle.jpg",
    name: "Kyle Katarn"
  };
  
  var janOrs = {
    health: 125,
    attack: 40,
    counterAttack: 20,
    image: "assets/images/jan_ors.png",
    name: "Jan Ors"
  };
  
  var riannaSaren = {
    health: 200,
    attack: 20,
    counterAttack: 10,
    image: "assets/images/riannaHS.jpg",
    name: "Rianna Saren"
  };
  
  var stormtrooper = {
    health: 60,
    counterAttack: 10
    image: "assets/images/anovos_stormtrooper.jpg",
    name: "Stormtrooper"
  };

  var darktrooper1 = {
    health: 80,
    counterAttack: 20
    image: "assets/images/anovos_stormtrooper.jpg",
    name: "Stormtrooper"
  };

  
  var generalRomMohc = {
    health: 100,
    attack: 60,
    counterAttack: 30,
    image: "assets/images/rommohcarmor.jpg",
    name: "General Rom Mohc"
  };

function playGame() {
    selectPlayerCharacter();
    selectDefender();
    attackDefender();
    restartGame();
}

function selectPlayerCharacter() {
    $('.available-characters').on('click', 'character', function() {
        $('.player-character').removeClass('hidden');
        $('.enemy-characters').removeClass('hidden');
        playerCharacterHealth = $(this).attr('data-hp');
        playerCharacterAttack = setPlayerCharacterAttack(this);
        playerCharacter = $(this);
        $('playerCharacter').append($(this));
        $('directions').remove();
        $('available-characters').children().appendTo('enemy-characters');
        $(this).removeClass('col-sm-3 col-xs-6');
    $(this).addClass('col-sm-6 col-xs-12');
  });
}

function selectDefender() {
    $('.enemy-characters').on('click', '.character', function() {
      if ($('.defender').hasClass('hidden')) {
        $('.defender').removeClass('hidden');
        defenderHealth = $(this).attr('data-hp');
        defenderAttack = setDefenderAttack(this);
        defender = $(this);
        $('.defender').append($(this));
        $(this).removeClass('col-sm-3 col-xs-6');
        $(this).addClass('col-sm-6 col-xs-12');
      }
    });
  }

  function attackDefender() {
    $('.attack').on('click', function() {
      playerCharacterHealth = yourCharacterHealth - defenderAttack;
      playerCharacterExperience++;
      updatedAttack = playerCharacterExperience * playerCharacterAttack;
      $('.stats').html('');
      $('.stats').append(
        '<p>You attacked with ' + updatedAttack +' points</p>'
      );
      $('.stats').append(
        '<p>You were hit with ' + defenderAttack + ' points</p>'
      );
      defenderHealth = defenderHealth - updatedAttack;
      playerCharacter.children().children().children('p').html(playerCharacterHealth);
      defender.children().children().children('p').html(defenderHealth);
  
      checkForDefenderDeath();
      checkResult();
    });
  }
  
  function restartGame() {
    $('.restart').on('click', function() {
      reset();
    });
  }
  
  function setYourCharacterAttack(yourCharacterElement) {
    if ($(playerCharacterElement).hasClass('katarn')) {
       return kyleKatarn.attack;
    } else if ($(playerCharacterElement).hasClass('janors')) {
       return janOrs.attack;
    } else if ($(playerCharacterElement).hasClass('rianna')) {
       return riannaSaren.attack;
    }
  }
  
  function setDefenderAttack(defenderElement) {
    if ($(defenderElement).hasClass('vader')) {
       return darthVader.counterAttack;
    } else if ($(defenderElement).hasClass('stormtrooper')) {
       return stormtrooper.counterAttack;
    } else if ($(defenderElement).hasClass('darktrooper')) {
       return darktrooper.counterAttack;
    } else if ($(defenderElement).hasClass('rommohc')) {
       return generalRomMohc.counterAttack;
    }
  }
  
  function checkForDefenderDeath() {
    if (defenderHealth <= 0) {
      $('.defender > .character').remove();
      $('.defender').addClass('hidden');
    }
  }
  
  function checkResult() {
    if (playerCharacterHealth <= 0) {
      alert("You have failed, and so will the rebellion.");
      reset();
    }
    else if ($('.defender').children('.character').length <= 0 &&
        $('.enemy-characters').children('.character').length <= 0) {
      alert('Victory over the Imperial Forces!');
      reset();
    }
  }
  
  function reset() {
    resetDom();
    resetVariables();
    playGame();
  }
  
  function resetVariables() {
    playerCharacter = '';
    defender = '';
    playerCharacterHealth = 0;
    playerCharacterExperience = 0;
    playerCharacterAttack = 0;
    defenderHealth = 0;
    defenderAttack = 0;
  }