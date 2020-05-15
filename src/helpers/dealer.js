import Card from './card';

export default class Dealer {
    constructor(scene) {
        this.dealCards = () => {
            let playerSprite;
            let opponentSprite;
            let cards = ["1-carreaux","1-coeur","1-pique","1-trèfle","2-carreau","2-coeur","2-pique","2-trèfle","3-carreaux","3-coeur","3-pique","3-trèfle","4-carreaux","4-coeur","4-pique","4-trèfle","5-carreaux","5-coeur","5-pique","5-trèfle","6-carreaux","6-coeur","6-pique","6-trèfle","7-carreaux","7-coeur","7-pique","7-trèfle","8-carreaux","8-coeur","8-pique","8-trèfle","9-carreaux","9-coeur","9-pique","9-trèfle","10-carreaux","10-coeur","10-pique","10-trèfle","11-carreaux","11-coeur","11-pique","11-trèfle","12-carreaux","12-coeur","12-pique","12-trèfle","13-carreaux","13-coeur","13-pique","13-trèfle"];
            if (scene.isPlayerA) {
                playerSprite = 'cyanCardFront';
                opponentSprite = 'backcard';
            } else {
                playerSprite = 'magentaCardFront';
                opponentSprite = 'backcard';
            };
            for (let i = 0; i < 52; i++) {
                let playerCard = new Card(scene);
                playerCard.render(300, 350, opponentSprite);
            }
        }
    }
}