$(document).ready(function () {

    //what does this do?  
    //sets 11 12 13 to string names Jake Queen King
    function convert_value_to_string(value) {
        if (value > 10) {
            switch (value) {
                case 11:
                    return 'Jack';
                    break;
                case 12:
                    return 'Queen';
                    break;
                case 13:
                    return 'King';
                    break;
            }
        }
        return value.toString();
    }

    //what does this do?
    //creates the deck
    var deck = [];
    var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    for (var i = 0; i < suits.length; i++) {
        var suit = suits[i];
        for (var j = 0; j < 13; j++) {
            deck.push({ number: j + 1, suit: suit });
        }
    }

    //shuffle the deck
    var cards_player_1 = [];
    var cards_player_2 = [];
    //divide out the cards into the two arrays
    var shuffle = function (deck) {
        var dSize = deck.length;
        var t = '';
        var i = '';

        while (dSize) {
            i = Math.floor(Math.random() * dSize--);

            t = deck[dSize];
            deck[dSize] = deck[i];
            deck[i] = t;
        }
        return deck;
    };

    var deal = function (deckShuffled) {
        for (var d = deckShuffled.length - 1; d > 0; d--) {
            cards_player_1.push(deckShuffled.pop());
            cards_player_2.push(deckShuffled.pop());
            d--;
        }
    };

    shuffle(deck);
    deal(deck);
    //create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
    function war(player1Card, player2Card) {

        if (player1Card.number > player2Card.number) {
            return player1Card;
        }
        else if (player1Card.number === player2Card.number) {
            return false;
        } else {
            return player2Card;
        }
    }


    //create a play function
    //compare the cards
    //give the winner both cards (at end of deck)
    var player1Score = 0;
    var player2Score = 0;
    var victor = '';
    function play() {
        var p1TopCard = cards_player_1.shift();
        var p2TopCard = cards_player_2.shift();

        var winner = war(p1TopCard, p2TopCard);

        console.log(winner);
        if (winner.number === p1TopCard.number) {
            player1Score++;
        }else if (winner.number === p2TopCard.number) {
            player2Score++;
        } else {
            alert("This round is a Draw");
        }

        //this function (defined below) will continue to the next turn
        advance();
    }

    function advance() {
        

        //take the top two cards and display them
        if (cards_player_1.length) {
            var card_1 = cards_player_1[0];
            var card_2 = cards_player_2[0];
            $("#opp-card").html(convert_value_to_string(card_1.number) + " " + card_1.suit);
            $("#opp-card-count").html(cards_player_1.length);
            $("#my-card").html(convert_value_to_string(card_2.number) + " " + card_2.suit);
            $("#my-card-count").html(cards_player_2.length);
            $("#opp-score").html("Opponets Score: " + player1Score);
            $("#my-score").html("My Score: " + player2Score);

        } else {
            if (player1Score > player2Score) {
                victor = "Player 1";
            }
            else if (player1Score === player2Score) {
                victor = "The war was unsuccessful no winners :(";
            } else {
                victor = "Player 2";
            }
            alert(victor); 
        }
    }
    advance();

    $(".btn").click(function () {
        play();
    });
});